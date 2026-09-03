---
title: Capacities and platforms
sidebar_position: 3
description: Tracker limits, sample memory budgets, and platform differences.
---

# Capacities and platforms

## Tracker capacities

| Resource | Capacity | Address range / shape |
| --- | ---: | --- |
| Tracks | 8 | T1–T8 |
| Song rows | 128 | `00`–`7F` |
| Chains | 255 | `00`–`FE`, 16 Phrase slots each |
| Phrases | 255 | `00`–`FE`, 16 steps each |
| Tables | 32 | `00`–`1F`, 16 steps, 3 command columns |
| Grooves | 32 | `00`–`1F`, 16 steps each |
| Instrument slots | 64 | `00`–`3F` |
| Project sample filenames | 64 | Shared by Sample instruments in the project |

Instrument slots are type-independent, but the implementation has fixed
per-type pools:

| Instrument type | Maximum simultaneous instances |
| --- | ---: |
| Sample | 32 |
| MIDI | 16 |
| SID | 3 |
| OPAL | 3 |

These pools share the same 64-slot bank. Reaching one type's pool limit does
not imply that every instrument slot is occupied.

## Notes and names

- Tracker notes run from C−2 through B7 (internal notes 0–119).
- `FE` is Note Off and `FF` is an empty note.
- Project names: at most 16 characters.
- Theme names: at most 16 characters.
- Instrument display names: at most 20 characters.
- Stored sample filenames: at most 24 characters including `.wav`.

Names remain single filesystem components. Project and theme names reject
empty names, `.` / `..`, and path separators.

## Audio format

The engine runs at 44.1 kHz stereo. Project rendering writes 44.1 kHz,
16-bit stereo WAV files. Sample memory cost depends on the decoded WAV size,
not merely the compressed or container file size shown by another tool.

## Sample memory budgets

### NullPerator hardware

NullPerator hardware reserves one contiguous sample arena of up to 8 MiB in
PSRAM. Other firmware allocations and fragmentation can reduce what is
actually available, so 8 MiB is a ceiling rather than a promise that every
project at that exact size will load.

On hardware without usable PSRAM, the compatibility path limits an individual
sample allocation to 64 KiB and preserves 128 KiB of internal memory for the
rest of the application. NullPerator hardware is designed to use PSRAM.

### Web and iOS

The Web and iOS sample pools enforce a 32 MiB decoded-sample budget. Browser or
device process memory may be larger, but samples beyond that application budget
are rejected. Stored files are separate from this decoded audio heap.

## Platform comparison

| Area | NullPerator hardware | Web | iOS |
| --- | --- | --- | --- |
| Project storage | SD-card filesystem | Persistent browser virtual disk | App Documents folder |
| Audio start | Hardware driver starts with firmware | Browser audio requires a user gesture | Native CoreAudio |
| Files | Read directly from the card | Upload/download/ZIP through the Files panel | Available in the iOS Files app |
| Brightness | Controls the physical backlight | Preference is saved; canvas brightness is unchanged in 0.1 | Controlled by iOS; tracker row hidden |
| Battery | Device percentage and charge state | No physical battery reported | Device percentage and charge state |
| MIDI | TRS input and output; USB MIDI disabled in 0.1 | Selected Web MIDI input/output | Selected CoreMIDI input/output |
| Sample budget | Up to 8 MiB PSRAM arena | 32 MiB decoded samples | 32 MiB decoded samples |

Web storage is scoped to browser origin and profile. Treat an origin change,
site-data clear, or private-browsing session as a different disk and export a
ZIP before migrating.
