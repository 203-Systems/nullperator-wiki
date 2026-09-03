---
title: MIDI instrument
sidebar_position: 3
description: Send notes, volume, program changes, and table automation to external MIDI gear.
---

# MIDI instrument

A MIDI instrument sends sequenced notes and commands to an external MIDI destination. It produces no audio inside NullPerator. Configure the active MIDI connection on the Device page before using it.

<InterfaceShot src="img/screens/instrument-midi.png" alt="NullPerator MIDI instrument settings">
  MIDI instrument values are stored with the project and sent to the selected output.
</InterfaceShot>

NullPerator can allocate up to **16 MIDI instruments** at once.

## Send your first note

1. Connect MIDI and choose the output as described in [MIDI setup](../midi/setup.md).
2. Set the instrument Type to `MIDI`.
3. Set `CHANNEL` to the receiving instrument's channel.
4. Optionally choose a `PROGRAM`.
5. Return to Phrase, enter a note with this instrument, and press <Keycap>Play</Keycap>.

If nothing sounds, check the receiving device's channel, volume, and MIDI input
indicator before changing Phrase data.

## Parameters

| Field | Values | Default | Behaviour |
| --- | --- | --- | --- |
| `CHANNEL` | `01`–`16` decimal | `01` | MIDI channel. The display is decimal even when nearby values are hexadecimal. |
| `VOLUME` | `00`–`FF` | `FF` | At playback start, a non-zero value sends CC 7 scaled to MIDI's 0–127 range. `00` leaves the receiver's current volume unchanged. |
| `LENGTH` | `00`–`FF` | `00` | Gate length in tracker ticks. `00` holds until another event stops the note. |
| `PROGRAM` | `--`, `00`–`7F` | `--` | Program Change sent at playback start. `--` disables start-time Program Change; choosing a numeric program while playing sends it immediately. |
| `AUTOMATION` | `NO`, `YES` | `NO` | Advances the attached table on instrument triggers when enabled. |
| `TABLE` | `--`, `00`–`1F` | `--` | Table attached to this instrument. <Keycap>Enter</Keycap> assigns the first free table. |

`VOLUME` controls MIDI CC 7, not Note On velocity. Notes initially use velocity 127; tracker FX can change velocity for subsequent notes.

## When notes stop

When a phrase triggers the instrument, NullPerator sends Note On on the chosen
channel. A non-zero `LENGTH` sends Note Off after that many ticks. Stopping
playback also stops notes that are still held.

Program Change and volume setup are sent when playback starts. This makes a project reproducible, but it can also change the state of connected hardware; save the external device's patch before testing an unfamiliar project.

## Tables and MIDI FX

The attached table can sequence velocity, CC, program change, pitch movement,
chords, and retriggering. If connected gear misses events, reduce very dense CC
automation or large simultaneous chords.
