import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = process.env.NULLPERATOR_SOURCE_DIR ?? path.resolve(root, '../PicoTracker');
const directory = path.join(root, 'static/img/screens');
const registry = (await readFile(path.join(source, 'sources/Foundation/Types/FxCommands.h'), 'utf8')).split('commands{{')[1].split('}};')[0];
const commands = [...registry.matchAll(/\{FourCC::\w+, "(---|\w+)"([^}]+)\}/g)].map(([, name, fields]) => ({name, group: fields.match(/Group::(\w+)/)?.[1] ?? 'Standard'}));
if (commands.length !== 32) throw new Error('Unexpected command registry');
const position = (name, table) => {
  let column = 0;
  for (const group of ['Standard', 'Sample', 'Midi', 'Synth']) {
    const entries = commands.filter(entry => entry.group === group && !(table ? ['DLY', 'TBL', 'TPO'] : ['IRT', 'STP']).includes(entry.name));
    const index = entries.findIndex(entry => entry.name === name);
    if (index >= 0) return [column + Math.floor(index / 6), index % 6];
    column += Math.ceil(entries.length / 6);
  }
  throw new Error(`Command ${name} not available on this page`);
};
const revision = execFileSync('git', ['rev-parse', 'HEAD'], {cwd: source, encoding: 'utf8'}).trim();
const dirty = execFileSync('git', ['status', '--porcelain'], {cwd: source, encoding: 'utf8'}).trim().length > 0;
const url = new URL(process.env.NULLPERATOR_APP_URL ?? 'http://127.0.0.1:5173/');
for (const [key, value] of Object.entries({audio: 'disabled', 'views-test': '1', 'storage-test': '1', inputDiagnostics: '1'})) url.searchParams.set(key, value);
const captures = new Map();
const browser = await chromium.launch({headless: true, channel: process.env.CHROME_CHANNEL ?? 'chrome'});
try {
  // These contexts do not share the user's saved projects or storage.
  for (const [type, name, cases] of [
    [1, 'sample', [['VOL', '0180', [1, 2]], ['FLT', '8040', [0, 3]], ['ARP', '047C', [2]], ['TPO', '0078', [3]], ['DLY', '000F', [3]], ['CSH', '12A4', [2]], ['MCC', '0740', [2]]]],
    [2, 'midi', [['MCC', '0740', [1, 3]], ['VOL', '0180', [3, 0]], ['MCH', '0470', [3]]]],
    [6, 'stack', [['CHB', 'C047', [0, 2]], ['SIP', '0340', [1, 3]]]],
    [7, 'chiptune', [['VOL', '0280', [1, 3]], ['CSH', '1204', [0, 3]]]],
  ]) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url.href);
    await page.locator('[data-runtime-state="ready"]').waitFor({timeout: 30000});
    await page.locator('[data-storage-state="ready"]').waitFor({timeout: 30000});
    const settle = () => page.waitForTimeout(160);
    const tap = async key => {
      const before = await page.evaluate(() => globalThis.__picoTrackerViewsTest.inputGeneration());
      await page.keyboard.press(key, {delay: 55});
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
    const choose = async (command, table = false) => {
      await page.keyboard.down('k');
      for (let i = 0; i < 6; i++) await tap('w');
      for (let i = 0; i < 6; i++) await tap('a');
      const [column, row] = position(command, table);
      for (let i = 0; i < column; i++) await tap('d');
      for (let i = 0; i < row; i++) await tap('s');
      await page.keyboard.up('k');
      await tap('d'); // Parameter cell.
    };
    let current = '0000';
    const setValue = async target => {
      await page.keyboard.down('k');
      for (let i = 0; i < 3; i++) await tap('a');
      for (let digit = 0; digit < 4; digit++) {
        const delta = parseInt(target[digit], 16) - parseInt(current[digit], 16);
        for (let i = 0; i < Math.abs(delta); i++) await tap(delta > 0 ? 'w' : 's');
        if (digit < 3) await tap('d');
      }
      current = target;
    };
    const focus = async digit => {
      for (let i = 0; i < 3; i++) await tap('a');
      for (let i = 0; i < digit; i++) await tap('d');
    };
    const capture = async file => {
      await settle();
      const data = await page.locator('#picotracker-canvas').evaluate(canvas => {
        const copy = document.createElement('canvas');
        copy.width = copy.height = 240;
        copy.getContext('2d').drawImage(canvas, 0, 0, 240, 240);
        return copy.toDataURL('image/png');
      });
      captures.set(file, Buffer.from(data.split(',')[1], 'base64'));
      console.log(`Captured ${file}`);
    };
    await view('Instrument'); await tap('s');
    for (let i = 0; i < type; i++) await tap('d');
    await view('Phrase'); await tap('k'); await tap('d'); await tap('d');
    for (const [command, value, digits] of cases) {
      await choose(command);
      await setValue(value);
      for (const digit of digits) {
        await focus(digit);
        await capture(`fx-edit-${name}-${command.toLowerCase()}-${digit}.png`);
      }
      await page.keyboard.up('k'); await tap('a');
    }
    if (name === 'sample') {
      // A real TBL reference carries the Phrase instrument context into Table.
      await choose('TBL'); await setValue('0000'); await page.keyboard.up('k');
      await page.keyboard.down('c'); await tap('s'); await page.keyboard.up('c');
      await settle();
      await choose('HOP', true); await setValue('0304');
      await focus(1); await capture('fx-edit-table-hop-count.png');
      await focus(3); await capture('fx-edit-table-hop-step.png');
      await page.keyboard.up('k');
    }
    if (errors.length) throw new Error(errors.join('\n'));
    await context.close();
  }
} finally { await browser.close(); }
const manifestPath = path.join(directory, 'capture.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const frames = new Map(manifest.frames.map(frame => [frame.file, frame]));
for (const [file, bytes] of captures) {
  await writeFile(path.join(directory, file), bytes);
  frames.set(file, {file, sha256: createHash('sha256').update(bytes).digest('hex'), width: 240, height: 240, sourceRevision: revision, sourceDirty: dirty});
}
manifest.frames = [...frames.values()].sort((a, b) => a.file.localeCompare(b.file));
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Verified ${captures.size} FX editing frames`);
