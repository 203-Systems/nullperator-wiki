---
title: Choose an instrument
sidebar_position: 1
description: Give Phrase notes a Sample, MIDI, SID, or OPAL sound.
---

# Choose an instrument

An instrument is the sound used by a Phrase note. Each Phrase row chooses an
instrument number such as `I00`; opening that number lets you choose and shape
the sound.

<InterfaceShot src="img/screens/instrument-none.png" alt="Empty NullPerator Instrument view with Name and Type fields">
  An empty instrument begins as NONE. Choose a Type to create its sound.
</InterfaceShot>

## Try the built-in OPAL synth

1. In Phrase, place the cursor on a row that uses `I00`.
2. Hold Shift and press Right to open Instrument 00.
3. Move Down once to **Type**.
4. From `NONE`, press Left once to choose `OPAL`.
5. Hold Shift and press Left to return to Phrase.
6. Hold Enter on the note to hear it.

OPAL and SID make sound without loading a file. A Sample instrument needs a WAV,
and MIDI plays an external instrument.

## Instrument types

| Type | Use it for |
| --- | --- |
| `SAMPLE` | Play, loop, process, and slice a WAV |
| `MIDI` | Play an external synth or software instrument |
| `SID` | Make chip-style basses, leads, and noise |
| `OPAL` | Make FM bells, basses, and additive tones |
| `NONE` | Leave the instrument empty |

## Moving around

| Input | Result |
| --- | --- |
| Up / Down | Move through Name, Type, and the parameter list. Long lists scroll with the cursor. |
| Left / Right | Change the selected action, type, selector, or value. Numeric fields use their fine step. |
| Hold Enter + Up / Down | Make the selected numeric value's coarse adjustment. On a multi-digit value, edit the focused digit. |
| Hold Enter + Left / Right | Make a fine adjustment, or move between digits/bits when the field exposes them. |
| Hold Option + Up / Down | Select the previous or next instrument slot. The list wraps between `00` and `3F`. |
| Hold Option + Left / Right | Select track T1–T8 for phrase-context playback. |
| Hold Shift + Left | Return to Phrase. |
| Hold Shift + Down | Open the selected instrument's Table context. |
| Play | Control phrase-context playback for the selected track. |

Choice fields such as `NO / YES`, loop mode, waveform, and algorithm wrap around when changed. Ordinary numeric ranges clamp at their minimum and maximum.

## Name actions

Move the cursor to **Name**, then use Left / Right to choose one of the three bottom-bar actions:

- **Load** opens the instrument browser. Choose an instrument file and press
  Enter to import it into the current slot. Stop playback first.
- **Save** exports the current instrument. Give it a name first; an empty
  `NONE` instrument cannot be saved. If the name exists, confirm whether to
  replace it.
- **Rename** opens the on-screen keyboard for the current slot.

An exported Sample instrument stores its settings and sample filename; it does **not** bundle the WAV file. Copy the sample separately when moving the instrument to another device or project.

## Changing type

Select **Type** and press Left / Right to cycle through:

`NONE → SAMPLE → MIDI → SID → OPAL → NONE`

If the current instrument has a name or edited settings, NullPerator asks before
replacing it. Stop playback and note preview before changing type.

## Editing fields

Most parameters change directly with Left / Right; holding Enter adds the vertical coarse-edit gesture shown in the bottom bar. Compound values behave differently:

- On a hexadecimal digit field, hold Enter, move Left / Right to choose a digit, then press Up / Down to edit it.
- On a bit field, hold Enter, choose a bit with Left / Right, then press Up / Down to toggle it.
- On an OPAL operator row, Left / Right without Enter switches between operator 1 and operator 2. Hold Enter while editing the operator value.
- On a Sample or MIDI `TABLE` field, press Enter to assign the first free table. This replaces the field's current table number.

Instrument changes are saved with the project. **Save** on the Instrument page
creates a separate instrument file that you can import elsewhere.

See [Limits and compatibility](../reference/capacities-platforms.md) for the
number of instruments available for each type.
