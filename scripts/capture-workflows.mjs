import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const directory = path.join(root, 'static/img/screens');
const source = process.env.NULLPERATOR_SOURCE_DIR ?? path.resolve(root, '../PicoTracker');
const sourceRevision = execFileSync('git', ['rev-parse', 'HEAD'], {cwd: source, encoding: 'utf8'}).trim();
const url = new URL(process.argv.find(arg => arg.startsWith('--url='))?.slice(6)
  ?? process.env.NULLPERATOR_APP_URL ?? 'http://127.0.0.1:4173/');
for (const [key, value] of Object.entries({audio: 'disabled', 'views-test': '1', 'storage-test': '1', inputDiagnostics: '1'})) url.searchParams.set(key, value);
const captures = new Map();
const browser = await chromium.launch({headless: true, ...(process.env.CHROME_CHANNEL ? {channel: process.env.CHROME_CHANNEL} : {})});

// Use a separate browser context for each instrument, never the user's open project.
async function openInstrument(type) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url.href);
  await page.locator('[data-runtime-state="ready"]').waitFor({timeout: 30000});
  await page.locator('[data-storage-state="ready"]').waitFor({timeout: 30000});
  const tap = async key => {
    const before = await page.evaluate(() => globalThis.__picoTrackerViewsTest.inputGeneration());
    await page.keyboard.press(key, {delay: 60});
    await page.waitForFunction(value => globalThis.__picoTrackerViewsTest.inputGeneration() >= value + 2, before);
    await page.waitForTimeout(90);
  };
  const chord = async (modifier, key) => {
    await page.keyboard.down(modifier);
    await tap(key);
    await page.keyboard.up(modifier);
    await page.waitForTimeout(90);
  };
  const view = async name => {
    const index = await page.evaluate(name => globalThis.__picoTrackerViewsTest.names.indexOf(name), name);
    if (index < 0) throw new Error(`Unknown view ${name}`);
    await page.evaluate(index => globalThis.__picoTrackerViewsTest.request(index), index);
    await page.waitForFunction(index => globalThis.__picoTrackerViewsTest.current() === index, index);
    await page.waitForTimeout(200);
  };
  const capture = async name => {
    await page.waitForTimeout(250);
    const data = await page.locator('#picotracker-canvas').evaluate(canvas => {
      const copy = document.createElement('canvas');
      copy.width = copy.height = 240;
      copy.getContext('2d').drawImage(canvas, 0, 0, 240, 240);
      return copy.toDataURL('image/png');
    });
    const bytes = Buffer.from(data.split(',')[1], 'base64');
    if (bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a'
        || bytes.readUInt32BE(16) !== 240 || bytes.readUInt32BE(20) !== 240) throw new Error(`Invalid canvas ${name}`);
    captures.set(`${name}.png`, bytes);
    console.log(`Captured ${name}`);
  };
  await view('Instrument');
  await tap('s'); // TYPE
  for (let i = 0; i < type; i++) await tap('d');
  return {context, page, tap, chord, view, capture};
}

function manualWav() {
  const frames = 44100;
  const wav = Buffer.alloc(44 + frames * 2);
  wav.write('RIFF'); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8);
  wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(44100, 24); wav.writeUInt32LE(88200, 28);
  wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34);
  wav.write('data', 36); wav.writeUInt32LE(frames * 2, 40);
  for (let i = 0; i < frames; i++) {
    const phase = i / frames;
    const envelope = Math.exp(-((phase * 4) % 1) * 5);
    wav.writeInt16LE(Math.round(24000 * envelope * Math.sin(phase * Math.PI * 100)), 44 + i * 2);
  }
  return wav;
}

try {
  for (const [type, name, fieldSteps] of [[2, 'midi', 1], [3, 'sid', 6], [4, 'opal', 1], [5, 'drum', 1], [6, 'stack', 1]]) {
    const session = await openInstrument(type);
    for (let i = 0; i < fieldSteps; i++) await session.tap('s');
    await session.capture(`instrument-${name}`);
    await session.context.close();
  }
  const {context, page, tap, chord, view, capture} = await openInstrument(1);
  await tap('s'); // SAMPLE / Load
  await capture('instrument-sample');
  page.on('dialog', dialog => dialog.accept('MANUAL'));
  await tap('d'); // Import from OS
  const chooser = page.waitForEvent('filechooser');
  await tap('k');
  await (await chooser).setFiles({name: 'MANUAL.wav', mimeType: 'audio/wav', buffer: manualWav()});
  await page.waitForFunction(() => globalThis.__picoTrackerViewsTest.modelSnapshot().sampleCount === 1);
  await tap('d'); // Record
  await tap('k');
  await capture('sample-record'); // Idle only: no microphone permission requested.
  await chord('c', 'a');
  await tap('d'); // Edit
  await tap('k');
  await tap('s'); await tap('s'); // Operation
  await capture('sample-editor');
  await tap('s'); // Save
  await capture('sample-editor-save');
  await chord('c', 'a'); // No edits, so no confirmation.
  await tap('s'); await tap('k'); // Slices
  for (let i = 0; i < 3; i++) await chord('k', 'd'); // Total count 4
  await tap('d'); // Select slice 2
  await capture('sample-slices');
  for (let i = 0; i < 3; i++) await tap('s'); // Auto Slice
  await tap('k');
  await capture('sample-slices-auto');
  await tap('k'); // Cancel
  await chord('c', 'a');
  await tap('w'); await tap('a'); await tap('a'); await tap('a'); // SAMPLE / Load
  await tap('k');
  await chord('c', 'j'); // Project pool
  await capture('sample-pool');
  await context.close();
  const settings = await openInstrument(0);
  for (const [name, file] of [['Project', 'project-name'], ['Device', 'device'], ['Font', 'font']]) {
    await settings.view(name);
    await settings.capture(file);
    if (name === 'Project') await settings.capture('project');
  }
  await settings.context.close();
} finally {
  await browser.close();
}

// Keep screenshots outside this workflow and retain their original provenance.
// Do not publish a partial set if browser capture fails.
const manifest = JSON.parse(await readFile(path.join(directory, 'capture.json'), 'utf8'));
const frames = new Map(manifest.frames.map(frame => [frame.file, frame]));
for (const [file, bytes] of captures) {
  await writeFile(path.join(directory, file), bytes);
  frames.set(file, {file, sha256: createHash('sha256').update(bytes).digest('hex'), width: 240, height: 240, sourceRevision});
}
manifest.frames = [...frames.values()].sort((a, b) => a.file.localeCompare(b.file));
await writeFile(path.join(directory, 'capture.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Updated ${captures.size} screenshots from ${sourceRevision}.`);
