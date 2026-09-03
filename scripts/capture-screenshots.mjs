import {createHash} from 'node:crypto';
import {execFile as execFileCallback} from 'node:child_process';
import {
  copyFile,
  mkdtemp,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';

import {chromium} from '@playwright/test';

const execFile = promisify(execFileCallback);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destinationDir = path.join(repoRoot, 'static/img/screens');
const firmwareRoot = process.env.NULLPERATOR_SOURCE_DIR
  ? path.resolve(process.env.NULLPERATOR_SOURCE_DIR)
  : path.resolve(repoRoot, '../PicoTracker');

const urlArgument = process.argv.find((argument) => argument.startsWith('--url='));
const baseUrl = urlArgument?.slice('--url='.length)
  ?? process.env.NULLPERATOR_APP_URL
  ?? 'http://127.0.0.1:4173/';
const appUrl = new URL(baseUrl);
appUrl.searchParams.set('ui2', '1');
appUrl.searchParams.set('audio', 'disabled');
appUrl.searchParams.set('views-test', '1');
appUrl.searchParams.set('inputDiagnostics', '1');
appUrl.searchParams.set('storage-test', '1');

const expectedFiles = new Set([
  'chain.png',
  'device.png',
  'font.png',
  'groove.png',
  'instrument-midi.png',
  'instrument-none.png',
  'instrument-opal.png',
  'instrument-sample.png',
  'instrument-sid.png',
  'mixer.png',
  'phrase-loop.png',
  'phrase-note.png',
  'phrase-table.png',
  'project-name.png',
  'project-render.png',
  'project.png',
  'projects.png',
  'sample-editor.png',
  'sample-pool.png',
  'sample-slices.png',
  'song-empty.png',
  'song.png',
  'theme.png',
  'topbar-nav.png',
]);

function createManualSample() {
  const sampleRate = 44_100;
  const frameCount = 4_096;
  const dataBytes = frameCount * 2;
  const wav = Buffer.alloc(44 + dataBytes);
  wav.write('RIFF', 0, 'ascii');
  wav.writeUInt32LE(36 + dataBytes, 4);
  wav.write('WAVE', 8, 'ascii');
  wav.write('fmt ', 12, 'ascii');
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(sampleRate, 24);
  wav.writeUInt32LE(sampleRate * 2, 28);
  wav.writeUInt16LE(2, 32);
  wav.writeUInt16LE(16, 34);
  wav.write('data', 36, 'ascii');
  wav.writeUInt32LE(dataBytes, 40);
  for (let frame = 0; frame < frameCount; frame += 1) {
    const phase = frame / frameCount;
    const envelope = Math.sin(Math.PI * phase);
    const tone = Math.sin(phase * Math.PI * 18)
      + 0.35 * Math.sin(phase * Math.PI * 46);
    const value = Math.round(22_000 * envelope * tone / 1.35);
    wav.writeInt16LE(value, 44 + frame * 2);
  }
  return wav;
}

function inspectPng(contents, file) {
  if (contents.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
    throw new Error(`${file} is not a PNG`);
  }

  const width = contents.readUInt32BE(16);
  const height = contents.readUInt32BE(20);
  if (width !== 240 || height !== 240) {
    throw new Error(`${file} is ${width}x${height}; expected 240x240`);
  }

  return {
    file,
    sha256: createHash('sha256').update(contents).digest('hex'),
    width,
    height,
  };
}

async function sourceRevision() {
  const {stdout} = await execFile('git', ['rev-parse', 'HEAD'], {
    cwd: firmwareRoot,
  });
  const revision = stdout.trim();
  if (!/^[0-9a-f]{40}$/.test(revision)) {
    throw new Error(`Invalid NullPerator source revision: ${revision}`);
  }
  return revision;
}

const temporaryDir = await mkdtemp(path.join(os.tmpdir(), 'nullperator-manual-'));
const captures = new Map();
let browser;

try {
  browser = await chromium.launch({headless: true});
  const context = await browser.newContext({
    deviceScaleFactor: 1,
    viewport: {width: 1280, height: 900},
  });
  const page = await context.newPage();

  await page.goto(appUrl.href, {waitUntil: 'domcontentloaded'});
  await page.locator('[data-runtime-state="ready"]').waitFor({timeout: 20_000});
  await page.locator('[data-storage-state="ready"]').waitFor({timeout: 20_000});
  const canvas = page.locator('#picotracker-canvas');
  await canvas.waitFor({state: 'visible'});
  await page.waitForFunction(() => (
    document.querySelector('#picotracker-canvas')?.dataset.frameContent === 'rendered'
  ));

  async function actionGeneration() {
    return Number(await canvas.getAttribute('data-action-generation'));
  }

  async function waitForGeneration(minimum) {
    await page.waitForFunction((value) => (
      Number(document.querySelector('#picotracker-canvas')?.dataset.actionGeneration) >= value
    ), minimum);
  }

  async function nativeInputGeneration() {
    return page.evaluate(() => globalThis.__picoTrackerViewsTest.inputGeneration());
  }

  async function modelSequence() {
    return page.evaluate(() => globalThis.__picoTrackerViewsTest.modelSnapshot().sequence);
  }

  async function waitForNativeInput(minimum, priorSequence) {
    await page.waitForFunction(({generation, sequence}) => {
      const api = globalThis.__picoTrackerViewsTest;
      return api.inputGeneration() >= generation
        && api.modelSnapshot().sequence > sequence;
    }, {generation: minimum, sequence: priorSequence});
  }

  async function waitForModel(expected) {
    await page.waitForFunction((target) => {
      const current = globalThis.__picoTrackerViewsTest.modelSnapshot();
      return Object.entries(target).every(([key, value]) => current[key] === value);
    }, expected);
  }

  async function tap(key) {
    const before = await actionGeneration();
    const nativeBefore = await nativeInputGeneration();
    const pressSequence = await modelSequence();
    await page.keyboard.down(key);
    await waitForGeneration(before + 1);
    await waitForNativeInput(nativeBefore + 1, pressSequence);
    const releaseSequence = await modelSequence();
    await page.keyboard.up(key);
    await waitForGeneration(before + 2);
    await waitForNativeInput(nativeBefore + 2, releaseSequence);
  }

  async function chord(modifier, key) {
    const before = await actionGeneration();
    const nativeBefore = await nativeInputGeneration();
    let sequence = await modelSequence();
    await page.keyboard.down(modifier);
    await waitForGeneration(before + 1);
    await waitForNativeInput(nativeBefore + 1, sequence);
    sequence = await modelSequence();
    await page.keyboard.down(key);
    await waitForGeneration(before + 2);
    await waitForNativeInput(nativeBefore + 2, sequence);
    sequence = await modelSequence();
    await page.keyboard.up(key);
    await waitForGeneration(before + 3);
    await waitForNativeInput(nativeBefore + 3, sequence);
    sequence = await modelSequence();
    await page.keyboard.up(modifier);
    await waitForGeneration(before + 4);
    await waitForNativeInput(nativeBefore + 4, sequence);
  }

  async function capture(name) {
    const file = `${name}.png`;
    if (!expectedFiles.has(file)) {
      throw new Error(`Unexpected screenshot name: ${file}`);
    }
    if (captures.has(file)) {
      throw new Error(`Screenshot captured twice: ${file}`);
    }

    await page.waitForTimeout(350);
    const dataUrl = await canvas.evaluate((element) => element.toDataURL('image/png'));
    const contents = Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64');
    const metadata = inspectPng(contents, file);
    await writeFile(path.join(temporaryDir, file), contents);
    captures.set(file, metadata);
  }

  async function diagnostic(viewName) {
    const state = await page.evaluate((requested) => {
      const api = globalThis.__picoTrackerViewsTest;
      const index = api.names.indexOf(requested);
      return {before: api.generation(), index};
    }, viewName);
    if (state.index < 0) {
      throw new Error(`Unknown diagnostic view: ${viewName}`);
    }

    await page.evaluate((index) => globalThis.__picoTrackerViewsTest.request(index), state.index);
    await page.waitForFunction(({before, index}) => {
      const api = globalThis.__picoTrackerViewsTest;
      return api.current() === index && api.generation() > before;
    }, state);
    await page.waitForTimeout(280);
  }

  const sample = createManualSample();
  await page.evaluate(async ({bytes, samplePath}) => {
    globalThis.__picoTrackerStorageTest.write(samplePath, bytes);
    await globalThis.__picoTrackerStorageTest.flush();
  }, {
    bytes: Array.from(sample),
    samplePath: '/data/samples/MANUAL.wav',
  });

  // Create the tutorial project through the same controls a reader uses.
  await capture('song-empty');
  await tap('k');
  await chord('x', 'd');
  await tap('k');
  await capture('chain');
  await chord('x', 'd');
  await tap('k');
  await capture('phrase-note');

  for (let row = 0; row < 3; row += 1) {
    for (let step = 0; step < 4; step += 1) await tap('s');
    await tap('k');
  }

  await chord('x', 'd');
  await tap('s');
  await tap('a');
  await capture('instrument-opal');
  await tap('d');
  await capture('instrument-none');
  await tap('d');
  await capture('instrument-sample');
  await tap('d');
  await capture('instrument-midi');
  await tap('d');
  await capture('instrument-sid');

  await tap('d');
  await chord('x', 'a');
  await capture('phrase-loop');
  await chord('x', 'a');
  await chord('x', 'a');
  await capture('song');

  const navBefore = await actionGeneration();
  await page.keyboard.down('x');
  await waitForGeneration(navBefore + 1);
  await capture('topbar-nav');
  await page.keyboard.up('x');
  await waitForGeneration(navBefore + 2);

  await chord('x', 'w');
  await capture('project-name');

  // Save the tutorial project as LOOP using the real rename keyboard.
  await tap('d');
  await tap('d');
  await tap('k');
  await tap('k');
  await tap('s');
  await tap('s');
  for (let column = 0; column < 8; column += 1) await tap('d');
  await tap('k');
  await tap('w');
  await tap('a');
  await tap('k');
  await tap('k');
  await tap('d');
  await tap('k');
  await tap('w');
  await tap('w');
  await tap('w');
  await tap('d');
  await tap('k');
  await waitForModel({projectName: 'LOOP'});
  await page.waitForTimeout(400);
  await capture('project');

  // Open Load to show a real saved-project row, then return to Project.
  await tap('a');
  await tap('k');
  await capture('projects');
  await chord('x', 'a');

  for (let row = 0; row < 7; row += 1) await tap('s');
  await capture('project-render');

  // Import a generated WAV, then open it through the actual Sample workflow.
  await tap('w');
  await tap('w');
  await tap('k');
  await chord('x', 'j');
  await tap('s');
  await tap('k');
  await waitForModel({sampleCount: 1});
  await chord('x', 'j');
  await capture('sample-pool');
  await tap('k');
  await capture('sample-editor');

  const diagnosticViews = new Map([
    ['Device', 'device'],
    ['Font', 'font'],
    ['Groove', 'groove'],
    ['Mixer', 'mixer'],
    ['Phrase Table', 'phrase-table'],
    ['Sample Slices', 'sample-slices'],
    ['Theme', 'theme'],
  ]);
  for (const [viewName, fileName] of diagnosticViews) {
    await diagnostic(viewName);
    await capture(fileName);
  }

  const missing = [...expectedFiles].filter((file) => !captures.has(file));
  if (missing.length > 0) {
    throw new Error(`Missing screenshots: ${missing.join(', ')}`);
  }
} catch (error) {
  await rm(temporaryDir, {recursive: true, force: true});
  throw error;
} finally {
  await browser?.close();
}

const destinationParent = path.dirname(destinationDir);
const publishDir = await mkdtemp(path.join(destinationParent, '.screens-next-'));
const backupDir = path.join(
  destinationParent,
  `.screens-previous-${process.pid}-${Date.now()}`,
);
let destinationBackedUp = false;

try {
  for (const file of expectedFiles) {
    await copyFile(path.join(temporaryDir, file), path.join(publishDir, file));
  }

  const manifest = {
    format: 1,
    source: 'running NullPerator application canvas',
    sourceRevision: await sourceRevision(),
    frames: [...captures.values()].sort((left, right) => left.file.localeCompare(right.file)),
  };
  await writeFile(
    path.join(publishDir, 'capture.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  // Replace the complete screenshot set as one directory. A failed capture or
  // manifest write leaves the previously published manual untouched.
  try {
    await rename(destinationDir, backupDir);
    destinationBackedUp = true;
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
  try {
    await rename(publishDir, destinationDir);
  } catch (error) {
    if (destinationBackedUp) await rename(backupDir, destinationDir);
    throw error;
  }
  if (destinationBackedUp) {
    try {
      await rm(backupDir, {recursive: true, force: true});
    } catch (error) {
      console.warn(`Captured screenshots, but could not remove ${backupDir}: ${error}`);
    }
  }
} finally {
  await rm(temporaryDir, {recursive: true, force: true});
  await rm(publishDir, {recursive: true, force: true});
}

console.log(`Captured ${captures.size} live application screenshots from ${appUrl.origin}.`);
