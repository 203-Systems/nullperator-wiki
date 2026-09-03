---
title: MIDI capabilities
sidebar_position: 2
description: What NullPerator can send and receive over MIDI.
---

# MIDI capabilities

## Message support

| MIDI message | Output | Input |
| --- | --- | --- |
| Note On / Note Off | Yes, from MIDI instruments | Yes, live audition with velocity |
| Control Change | Yes, `MCC`, instrument volume, and All Notes Off | Ignored |
| Program Change | Yes, instrument Program and `MPC` | Ignored |
| Pitch Bend | Yes, from `PSL` and `LEG` | Ignored |
| Polyphonic Aftertouch | No | Ignored |
| Channel Aftertouch | No | Ignored |
| Clock | Yes when MIDI Sync is on | Ignored |
| Start | Yes when MIDI Sync is on | Starts Song transport |
| Stop | Yes when MIDI Sync is on | Stops transport |
| Continue | No | Starts transport if stopped |
| Song Position Pointer / Song Select | No | Ignored |
| SysEx | No | No |

## MIDI instrument behavior

Each MIDI instrument selects channel 1–16. When playback begins, it can send
its configured Program Change and CC 7 volume. Phrase and Table commands add
per-step control:

| Command | MIDI behavior |
| --- | --- |
| `VEL --bb` | Set following Note On velocity, limited to `00`–`7F` |
| `VOL aabb` | Send CC 7; `bb` is converted from 0–255 to MIDI 0–127 and `aa` is unused |
| `MCC aabb` | Send CC `aa` with value `bb`; both are restricted to 7 bits on the wire |
| `MPC --bb` | Send Program Change `bb`, restricted to 7 bits |
| `MCH abcd` | Add up to four scale-aware chord notes; a zero nibble omits that voice |
| `PSL aabb` | Linear pitch-bend movement toward `bb` at speed `aa` |
| `LEG aabb` | Curved pitch-bend movement toward `bb` at speed `aa` |
| `RTG aabb` | Repeat the current MIDI note every `bb` ticks; `aa` is unused for MIDI |
| `KIL --bb` | Stop the active voice after `bb` ticks |

When playback stops, NullPerator turns off its active MIDI notes and sends All
Notes Off on the channels it used.

See [Command reference](../reference/commands.md) for all commands, including
commands implemented by Sample, SID, and OPAL instruments.

## MIDI input behavior

Incoming channel numbers map directly to instrument slots 00–0F. Note On with
velocity zero is treated as Note Off. Notes preview the instrument in the
matching slot, so that slot must contain a sound-producing instrument.

MIDI input does not record notes into a Phrase. CC, Program Change, Pitch Bend,
and Aftertouch currently have no live-control mapping. Incoming Clock also
does not change tempo in version 0.1.

## Platform connections

| Capability | NullPerator hardware | Web | iOS |
| --- | --- | --- | --- |
| Input | One TRS MIDI IN | One selected Web MIDI input | One selected CoreMIDI input |
| Output | TRS MIDI OUT | One selected Web MIDI output | One selected CoreMIDI output |
| Device choice | `TRS` is the functional route | Select in the Web MIDI panel; keep the Device route non-`OFF` | Enable MIDI and select endpoints in app settings |
| Bluetooth MIDI | Through an external interface | When exposed by the browser | Pair from the app's Bluetooth MIDI screen |
| SysEx | Unsupported | Unsupported | Unsupported |

The eight-voice input audition limit and the message behavior above are shared
across all platforms.
