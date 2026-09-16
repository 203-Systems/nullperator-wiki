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

## Instrument slots and voices

The 64 instrument slots are freely assignable. Sample, MIDI, SID, OPAL, Drum,
Stack, Chiptune, GB-Wave, GB-Pulse, and GB-Noise have no separate preset quota.
For example, all 64 slots can hold Chiptune presets, or a mix of GB types and
Samples. Empty slots share an empty definition; choosing a type allocates its
settings as needed.

Available memory still matters, especially on hardware. Heavy synth presets
and decoded samples compete for device resources. An allocation failure does
not mean the type has a fixed two-, three-, or four-instrument limit.

Preset storage and sounding voices are different limits:

| Type | Playback constraint |
| --- | --- |
| Drum, Stack, Chiptune | Shared per-track voice storage; different presets can sound on different tracks without reserving eight voices per preset |
| GB-Wave, GB-Pulse, GB-Noise | Share eight per-track voices across the GB family; no fixed two-Pulse / one-Wave / one-Noise track layout |
| OPAL | One monophonic synth per instrument; use another slot for another simultaneous OPAL voice |
| SID | Presets share one three-oscillator SID chip and its filter; additional presets do not add oscillators |
| MIDI | More than 16 presets are allowed, but the selected output still has 16 MIDI channels |

There are still eight tracker tracks, not 64 independent sequencer voices.
Stack chords and MIDI chords can produce more than one note from a track.

## Notes and names

- Tracker notes display as C0 through B9 (internal notes 0–119). Older builds
  displayed these same stored notes two octaves lower; the label change does
  not transpose existing songs or change their playback pitch.
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
| Brightness | Controls the physical backlight | Tracker row hidden | Controlled by iOS; tracker row hidden |
| Battery | Device percentage and charge state | No physical battery reported | Device percentage and charge state |
| MIDI | TRS input and output; USB MIDI disabled in 0.1 | Selected Web MIDI input/output | Selected CoreMIDI input/output |
| Sample budget | Up to 8 MiB PSRAM arena | 32 MiB decoded samples | 32 MiB decoded samples |

Web storage is scoped to browser origin and profile. Treat an origin change,
site-data clear, or private-browsing session as a different disk and export a
ZIP before migrating.
