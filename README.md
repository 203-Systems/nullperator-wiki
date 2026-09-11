# NullPerator Wiki

The official NullPerator manual, built with
[Docusaurus](https://docusaurus.io/). The site is documentation-only: the root
route opens the manual directly and there is no marketing landing page.

## Development

Requires Node.js 20 or newer.

```bash
npm install
npm start
```

## Checks

```bash
npm run typecheck
npm run build
```

Production builds fail on broken links, anchors, or images.

## Source material

The information architecture is derived from the PicoTracker **Pico Edition**
manual in
[`usermanual/pico-edition/content/pages`](https://github.com/xiphonics/picoTracker/tree/master/usermanual/pico-edition/content/pages),
then rewritten against the current NullPerator controllers, workflows, model
ports, and platform adapters. The Advance Edition is not a migration source.
See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for attribution and the
pinned upstream commit.

Manual screenshots are captured from the running NullPerator application. Start
the firmware Web preview on port 4173, then run:

```bash
npm run capture:screenshots
```

Pass `-- --url=http://127.0.0.1:PORT` for a different preview URL. The script
creates the tutorial state through real controls, captures the application's
240×240 canvas, validates each PNG, and removes stale screenshots. Set
`NULLPERATOR_SOURCE_DIR` only when the firmware checkout is not beside this
repository; it is used to record the app revision in `capture.json`.

To refresh the current sampling, instrument, and settings workflows, run:

```bash
npm run capture:workflows -- --url=http://127.0.0.1:5173/
```

This uses isolated browser contexts, imports a generated WAV through the real
file picker, and captures the editor, slices, and idle recorder through their
normal entry points. It does not request microphone access. Set
`CHROME_CHANNEL=chrome` to use installed Chrome instead of Playwright Chromium.
The workflow preserves other screenshots. Each updated frame records its own
`sourceRevision` in `capture.json`; the top-level revision is the fallback for
older frames.

## Content conventions

- Use the product actions **Shift**, **Option**, **Enter**, and **Play**. Physical
  labels and keyboard keys belong in mapping tables, not workflow prose.
- Describe only an action reachable through the current product UI.
- Prefer semantic components (`Keycap`, `KeyCombo`, `ControlMap`, and
  `InterfaceShot`) over hand-drawn button images or inline styling.
- Keep user-created project, instrument, sample, and file names in their
  original case.
