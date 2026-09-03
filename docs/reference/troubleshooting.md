---
title: Troubleshooting
sidebar_position: 6
description: Diagnose project, storage, audio, MIDI, render, theme, and font issues.
---

# Troubleshooting

## A project is missing from the browser

The Project Browser lists **directories**, not loose project documents. Check
that the layout is `/projects/<name>/lgptsav.dat`. A copied `lgptsav.dat`
directly inside `/projects` is not a project entry.

The internal `.untitled` directory is deliberately hidden. Save the new
project under a valid name to make it appear. Use the `..` entry to move to the
parent directory; it does not close the browser.

## `INVALID PROJECT` appears

The selected document failed format, structural, or model validation. Do not
replace its contents with an empty project. Instead:

1. Dismiss the error and confirm the previously open project is still present.
2. Copy the rejected project directory somewhere safe.
3. Confirm it contains the expected `lgptsav.dat`, not an unrelated XML or
   MIDI file renamed as a project.
4. Restore an earlier complete project directory if one is available.

NullPerator accepts its current format and supported legacy PicoTracker project
documents. Validation is based on document content, not the directory name.

## Saving never occurs

Autosave waits for a safe state. Stop playback, close modal workflows, and
return to Song, Chain, Phrase, Table, Groove, Instrument, Device, Theme, or
Mixer. Project, Browser, Font, sample editing, Rename, and Render defer it.

For a new `.untitled` project, use Project → Name → **SAVE** and enter a valid
name. During explicit Rename, complete the pending save before trying to leave
Project. An empty name cannot be saved.

If `CONFIG SAVE FAILED` appears, settings remain pending for a later retry.
Check writable storage and retry after leaving the settings page.

## Web app data disappeared

The virtual disk belongs to the current browser origin and profile. Verify that
the URL origin, browser profile, and privacy mode match the session where the
project was created. Clearing site data removes access to that disk.

Use the Files panel to ZIP-export the virtual disk regularly. Uploading one
project requires its complete directory, not only its sample folder.

## Browser audio is silent

Browser policy requires a user gesture before audio can start. Use the
Web audio control to unlock audio, then start transport again. Confirm
that the browser tab and operating-system output are not muted.

Device Volume controls the browser engine. Device Brightness does not change
the Web app screen in version 0.1.

## MIDI output is silent

- NullPerator hardware: select `TRS`, connect MIDI OUT, and verify the MIDI
  instrument channel. USB MIDI is disabled in NullPerator hardware 0.1.
- Web: press **Enable Web MIDI**, grant permission, select an output, and keep
  the Device MIDI route non-`OFF`.
- iOS: enable MIDI in app settings, select a CoreMIDI output, and reconnect or
  re-pair the device if it is no longer listed.
- MIDI Sync sends Clock/Start/Stop only; notes require a MIDI instrument in the
  played Phrase.
- Incoming MIDI channels 1–16 address instrument slots 00–0F, not the selected
  screen row.

If an external device sends Clock but tempo does not move, that is expected:
NullPerator receives but ignores MIDI Clock. Incoming Start/Stop/Continue are
the implemented transport controls.

## Render is unavailable

Render requires stopped transport and playable content starting from Song row
`00`. That row must reference at least one chain which contains a phrase.
Content only on a later Song row does not satisfy the render preflight.

Mixdown and stems are written under `/renders`. Retrieve them from the SD card
in NullPerator hardware, the Web Files panel, or the NullPerator folder in iOS
Files.

## A theme will not import

Changing a file extension is insufficient. A version 1 NPT file must identify
itself with NPT magic, contain a font value, and contain every one of the 20
semantic colors exactly once. Duplicate, unknown, or missing roles are
rejected before the live palette changes.

## Font selection says unavailable

This is expected in version 0.1. External NPF discovery and loading are not
implemented. **DEFAULT** restores the built-in Regular font, and `CASE` still
switches interface labels among `Case`, `CASE`, and `case` without changing
user-authored names.

## A sample will not load

Confirm that it is a readable WAV and that both a filename slot and decoded
sample memory remain. NullPerator hardware has an 8 MiB PSRAM arena ceiling;
Web and iOS enforce a 32 MiB decoded-sample budget. See
[Capacities and platforms](./capacities-platforms.md) for the complete limits.
