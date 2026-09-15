import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = process.env.NULLPERATOR_SOURCE_DIR ?? path.resolve(root, '../PicoTracker');
const revision = execFileSync('git', ['rev-parse', 'HEAD'], {cwd: source, encoding: 'utf8'}).trim();
const dirty = execFileSync('git', ['status', '--porcelain'], {cwd: source, encoding: 'utf8'}).trim().length > 0;
const url = new URL(process.env.NULLPERATOR_APP_URL ?? 'http://127.0.0.1:5173/');
for (const [key, value] of Object.entries({audio: 'disabled', 'views-test': '1', 'storage-test': '1', inputDiagnostics: '1'})) url.searchParams.set(key, value);
const directory = path.join(root, 'static/img/screens');
const captures = new Map();
const published = new Set(['fx-sample-sections.png', 'fx-unresolved-scrolled.png', 'fx-sid-sections.png', 'fx-sample-unsupported.png', 'fx-sample-table-sections.png', 'fx-chiptune-sections.png', 'instrument-chiptune.png', 'fx-stack-sip-parameter.png', 'fx-chiptune-sip-parameter.png']);
for (const name of ['stack', 'chiptune', 'unresolved']) {
  for (const state of ['parameter', 'value', 'table']) published.add(`sip-${name}-edit-${state}.png`);
}
const browser = await chromium.launch({headless: true, channel: process.env.CHROME_CHANNEL ?? 'chrome'});
try {
  // Every run uses disposable browser contexts, separate from the user's project.
  const types = [[1, 'sample'], [2, 'midi'], [3, 'sid'], [4, 'opal'], [5, 'drum'], [6, 'stack'], [7, 'chiptune'], [0, 'unresolved']];
  const selected = process.env.NULLPERATOR_FX_TYPES?.split(',').map(Number);
  for (const [type, name] of types.filter(([type]) => !selected || selected.includes(type))) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url.href);
    await page.locator('[data-runtime-state="ready"]').waitFor({timeout: 30000});
    await page.locator('[data-storage-state="ready"]').waitFor({timeout: 30000});
    const settle = () => page.waitForTimeout(200);
    const tap = async key => {
      const before = await page.evaluate(() => globalThis.__picoTrackerViewsTest.inputGeneration());
      await page.keyboard.press(key, {delay: 60});
      await page.waitForFunction(value => globalThis.__picoTrackerViewsTest.inputGeneration() >= value + 2, before);
      await settle();
    };
    const view = async name => {
      const index = await page.evaluate(name => globalThis.__picoTrackerViewsTest.names.indexOf(name), name);
      if (index < 0) throw new Error(`Unknown view ${name}`);
      await page.evaluate(index => globalThis.__picoTrackerViewsTest.request(index), index);
      await page.waitForFunction(index => globalThis.__picoTrackerViewsTest.current() === index, index);
      await settle();
    };
    const capture = async file => {
      await settle();
      const data = await page.locator('#picotracker-canvas').evaluate(canvas => {
        const copy = document.createElement('canvas');
        copy.width = copy.height = 240;
        copy.getContext('2d').drawImage(canvas, 0, 0, 240, 240);
        return copy.toDataURL('image/png');
      });
      const bytes = Buffer.from(data.split(',')[1], 'base64');
      if (published.has(file)) captures.set(file, bytes);
      console.log(`Captured ${file}`);
      return data;
    };
    if (type !== 0) {
      await view('Instrument');
      await tap('s'); // TYPE
      for (let i = 0; i < type; i++) await tap('d');
      if (name === 'chiptune') await capture('instrument-chiptune.png');
    }
    await view('Phrase');
    if (type !== 0) await tap('k'); // Insert note and INS 00.
    await tap('d');
    await tap('d'); // FX1
    await page.keyboard.down('k');
    const initial = await capture(`fx-${name}-sections.png`);
    await tap('x'); // No mode toggle and no transport while choosing.
    const afterPlay = await capture(`fx-${name}-after-play.png`);
    if (initial !== afterPlay) throw new Error(`Play changed the selector for ${name}`);
    if (await page.evaluate(() => globalThis.__picoTrackerViewsTest.modelSnapshot().playerRunning)) throw new Error(`Play started transport for ${name}`);
    if (name === 'sample' || name === 'unresolved') {
      const columns = 5;
      for (let i = 0; i < columns; i++) await tap('d');
      if (name === 'unresolved') await capture('fx-unresolved-scrolled.png');
      for (let i = 0; i < columns; i++) await tap('a');
      const restored = await capture(`fx-${name}-restored.png`);
      if (restored !== initial) throw new Error('Horizontal navigation did not restore the first column');
      await tap('w'); await tap('a');
      if (await capture(`fx-${name}-boundary.png`) !== initial) throw new Error('Top-left boundary changed the selector');
    }
    if (name === 'sample' || name === 'midi') {
      // MCC is now directly accessible in every instrument context.
      for (let i = 0; i < 4; i++) await tap('d');
      await page.keyboard.up('k');
      if (name === 'midi') {
        await view('Instrument');
        await tap('a'); // TYPE: MIDI -> SAMPLE
        await view('Phrase');
      }
      await page.keyboard.down('k');
      const unsupported = await capture('fx-sample-unsupported.png');
      await tap('s'); // MCH: another unsupported command in the same group.
      if (await capture('fx-sample-mch.png') === unsupported) throw new Error('Unsupported command could not be changed');
      await page.keyboard.up('k');
      await page.keyboard.down('k'); // Reopening must preserve the same directory.
      await tap('w'); // MCC
      if (await capture('fx-sample-unsupported-returned.png') !== unsupported) throw new Error('Unsupported command moved after reopening');
    }
    // Return to the first Standard command, then column 3, row 2: TBL.
    for (let i = 0; i < 6; i++) await tap('w');
    for (let i = 0; i < 6; i++) await tap('a');
    await tap('d'); await tap('d'); await tap('s');
    await page.keyboard.up('k');
    await page.keyboard.down('c'); await tap('s'); await page.keyboard.up('c');
    await settle();
    await page.keyboard.down('k');
    await capture(`fx-${name}-table-sections.png`);
    await page.keyboard.up('k');
    if (name === 'stack' || name === 'chiptune' || name === 'unresolved') {
      await view('Phrase'); // The selected command is TBL, column 3 / row 2.
      await page.keyboard.down('k');
      await tap('w');
      for (let i = 0; i < 3; i++) await tap('d'); // Synth, CHB.
      for (let i = 0; i < 3; i++) await tap('s'); // SIP.
      await page.keyboard.up('k');
      await tap('d'); // Parameter field.
      await page.keyboard.down('k');
      await tap('a'); await tap('a'); // Select the low nibble of parameter index aa.
      await tap('w'); await tap('w'); await tap('w'); // SIP 0300.
      await tap('d'); // Value byte, high nibble.
      for (let i = 0; i < 4; i++) await tap('w'); // SIP 0340.
      await tap('a');
      const parameterEdit = await capture(`sip-${name}-edit-parameter.png`);
      await tap('d');
      const valueEdit = await capture(`sip-${name}-edit-value.png`);
      if (parameterEdit === valueEdit) throw new Error(`SIP edit focus did not repaint for ${name}`);
      await tap('a');
      if (await capture(`sip-${name}-edit-returned.png`) !== parameterEdit) throw new Error(`SIP parameter focus did not restore for ${name}`);
      await page.keyboard.up('k');
      await tap('a');
      await page.keyboard.down('k');
      await capture(`fx-${name}-sip-parameter.png`);
      await page.keyboard.up('k');

      // Keep a TBL reference in FX2 so the Table can resolve this row's INS.
      await tap('d'); await tap('d');
      await page.keyboard.down('k');
      for (let i = 0; i < 6; i++) await tap('w');
      for (let i = 0; i < 6; i++) await tap('a');
      await tap('d'); await tap('d'); await tap('s'); // TBL.
      await page.keyboard.up('k');
      await page.keyboard.down('c'); await tap('s'); await page.keyboard.up('c');
      await settle();
      await page.keyboard.down('k');
      for (let i = 0; i < 6; i++) await tap('w');
      for (let i = 0; i < 6; i++) await tap('a');
      for (let i = 0; i < 5; i++) await tap('d');
      for (let i = 0; i < 3; i++) await tap('s'); // SIP.
      await page.keyboard.up('k');
      await tap('d');
      await page.keyboard.down('k');
      for (let i = 0; i < 3; i++) await tap('a');
      // SIP remembers 0340 from Phrase; select its value byte without changing it.
      await tap('d'); await tap('d');
      await capture(`sip-${name}-edit-table.png`);
      await page.keyboard.up('k');
    }
    await context.close();
  }
} finally {
  await browser.close();
}

// Publish only after every instrument passes navigation and preservation checks.
const manifestPath = path.join(directory, 'capture.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const obsolete = new Set(["fx-sample-available.png", "fx-sample-table-available.png", "fx-sid-available.png", "fx-sid-all.png", "fx-sample-any.png", "fx-sample-scrolled.png"]);
const frames = new Map(manifest.frames.filter(frame => !obsolete.has(frame.file)).map(frame => [frame.file, frame]));
for (const [file, bytes] of captures) {
  await writeFile(path.join(directory, file), bytes);
  frames.set(file, {file, sha256: createHash('sha256').update(bytes).digest('hex'), width: 240, height: 240, sourceRevision: revision, sourceDirty: dirty});
}
manifest.frames = [...frames.values()].sort((a, b) => a.file.localeCompare(b.file));
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
