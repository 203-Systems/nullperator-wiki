---
title: Command reference
sidebar_position: 1
description: Verified Phrase and Table command mnemonics, parameters, and targets.
---

# Command reference

Phrase `FX1` and `FX2`, and the three Table command columns, use the same
command list. A parameter is four hexadecimal nibbles, shown below as `aabb`,
`abcd`, or dashes for unused digits. A command that the current player context
or instrument does not implement has no effect.

| Command | Parameter | Applies to | Implemented behavior |
| --- | --- | --- | --- |
| `---` | `----` | All | No command |
| `ARP` | `abcd` | Sample | Cycle the original note and up to four relative-pitch offsets from `a`–`d` |
| `CSH` | `aa-b` | Sample | Set drive from `aa` and bit-crush from low nibble `b`; a zero component leaves that component unchanged |
| `DLY` | `---b` | Phrase note | Delay the note start by `b + 1` ticks |
| `FCT` | `aabb` | Sample | Ramp filter cutoff toward `bb` at speed `aa` |
| `FLT` | `aabb` | Sample | Set cutoff `aa` and resonance `bb` immediately |
| `FRS` | `aabb` | Sample | Ramp filter resonance toward `bb` at speed `aa` |
| `GOF` | `----` | SID, OPAL | Turn the synth gate off |
| `GRV` | `aabb` | Player, Table | Select groove `bb`; in a Phrase, nonzero `aa` applies it to all tracks, while a Table uses its local groove |
| `HOP` | `aabb` | Phrase, Table | In a Phrase, jump to step `b` when that next step is reached; in a Table, jump to `b` and use `aa` as the repeat count |
| `IRT` | `--bb` | Table | Retrigger the current instrument with signed 8-bit semitone offset `bb` |
| `KIL` | `--bb` | Player, Table | Stop the active voice after `bb` ticks |
| `LEG` | `aabb` | Sample, MIDI | Slide toward pitch target `bb` at speed `aa`; MIDI uses its curved pitch-bend path |
| `LOF` | `aaaa` | Sample | Shift loop start and end together by the signed offset, within sample bounds |
| `MCC` | `aabb` | MIDI | Send Control Change number `aa` with value `bb`; both become 7-bit MIDI values |
| `MCH` | `abcd` | MIDI | Add four scale-aware chord offsets; a zero nibble omits that added note |
| `MPC` | `--bb` | MIDI | Send Program Change `bb` as a 7-bit value |
| `PAN` | `aabb` | Sample | Ramp pan toward `bb` at speed `aa`; `00` is right in the current engine |
| `PFT` | `aabb` | Sample | Fine-tune toward `bb` at speed `aa`, over approximately ±1 semitone |
| `POF` | `aabb` | Sample | If `aa` is nonzero, jump to absolute fraction `aa/256`, then add signed relative fraction `bb/256`; position wraps |
| `PSL` | `aabb` | Sample, MIDI | Slide toward pitch target `bb` at speed `aa`; MIDI uses its linear pitch-bend path |
| `RTG` | `aabb` | Sample, MIDI | Retrigger every `bb` ticks; Sample advances by offset `aa` per repeat, while MIDI ignores `aa` |
| `STP` | `----` | Table | Stop the current Table playback |
| `TBL` | `--bb` | Player | Start Table `00`–`1F` for the current track |
| `TPO` | `aabb` | Player | Set tempo from 16-bit hexadecimal `aabb`, clamped to 60–400 BPM (`003C`–`0190`) |
| `VEL` | `--bb` | MIDI | Set following MIDI Note On velocity, limited to `00`–`7F` |
| `VOL` | `aabb` | Sample, MIDI | Sample ramps volume toward `bb` at speed `aa`; MIDI sends CC 7 from `bb/2` and ignores `aa` |

## Editing command fields

<Keycap>Left</Keycap> and <Keycap>Right</Keycap> move between a command mnemonic and its parameter field.
Changing a mnemonic updates the help text for that command. Hold <Keycap>Enter</Keycap> on a
parameter to address and adjust an individual hexadecimal digit.

Parameters are hexadecimal even when their musical meaning is a decimal count.
For example, `TPO 0078` is 120 BPM and `KIL --0C` is 12 ticks.

## Context details

- Phrase commands are evaluated with the Phrase note on the same step. `DLY`
  therefore affects note start timing rather than delaying the command row.
- Table columns advance independently. `HOP` and `STP` operate on Table
  playback state, while instrument commands are forwarded to the instrument.
- `GRV` in a Table masks the selected groove to the available `00`–`1F` range.
- `IRT` interprets `80`–`FF` as negative offsets. For example, `FF` is −1
  semitone.
- Pitch targets and speeds preserve the historical tracker command encoding;
  they are not MIDI cents or milliseconds.
