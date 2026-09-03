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
2. Use <KeyCombo keys={['Shift', 'Right']} /> to open Instrument 00.
3. Move <Keycap>Down</Keycap> once to **Type**.
4. From `NONE`, press <Keycap>Left</Keycap> once to choose `OPAL`.
5. Use <KeyCombo keys={['Shift', 'Left']} /> to return to Phrase.
6. Hold <Keycap>Enter</Keycap> on the note to hear it.

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
| <Keycap>Up</Keycap> / <Keycap>Down</Keycap> | Move through Name, Type, and the parameter list. Long lists scroll with the cursor. |
| <Keycap>Left</Keycap> / <Keycap>Right</Keycap> | Change the selected action, type, selector, or value. Numeric fields use their fine step. |
| <KeyCombo keys={['Enter', 'Up']} /> or <KeyCombo keys={['Enter', 'Down']} /> | Make the selected numeric value's coarse adjustment. On a multi-digit value, edit the focused digit. |
| <KeyCombo keys={['Enter', 'Left']} /> or <KeyCombo keys={['Enter', 'Right']} /> | Make a fine adjustment, or move between digits/bits when the field exposes them. |
| <KeyCombo keys={['Option', 'Up']} /> or <KeyCombo keys={['Option', 'Down']} /> | Select the previous or next instrument slot. The list wraps between `00` and `3F`. |
| <KeyCombo keys={['Option', 'Left']} /> or <KeyCombo keys={['Option', 'Right']} /> | Select track T1–T8 for phrase-context playback. |
| <KeyCombo keys={['Shift', 'Left']} /> | Return to Phrase. |
| <KeyCombo keys={['Shift', 'Down']} /> | Open the selected instrument's Table context. |
| <Keycap>Play</Keycap> | Control phrase-context playback for the selected track. |

Choice fields such as `NO / YES`, loop mode, waveform, and algorithm wrap around when changed. Ordinary numeric ranges clamp at their minimum and maximum.

## Name actions

Move the cursor to **Name**, then use <Keycap>Left</Keycap> / <Keycap>Right</Keycap> to choose one of the three bottom-bar actions:

- **Load** opens the instrument browser. Choose an instrument file and press
  <Keycap>Enter</Keycap> to import it into the current slot. Stop playback first.
- **Save** exports the current instrument. Give it a name first; an empty
  `NONE` instrument cannot be saved. If the name exists, confirm whether to
  replace it.
- **Rename** opens the on-screen keyboard for the current slot.

An exported Sample instrument stores its settings and sample filename; it does **not** bundle the WAV file. Copy the sample separately when moving the instrument to another device or project.

## Changing type

Select **Type** and press <Keycap>Left</Keycap> / <Keycap>Right</Keycap> to cycle through:

`NONE → SAMPLE → MIDI → SID → OPAL → NONE`

If the current instrument has a name or edited settings, NullPerator asks before
replacing it. Stop playback and note preview before changing type.

## Editing fields

Most parameters change directly with <Keycap>Left</Keycap> / <Keycap>Right</Keycap>; holding <Keycap>Enter</Keycap> adds the vertical coarse-edit gesture shown in the bottom bar. Compound values behave differently:

- On a hexadecimal digit field, hold <Keycap>Enter</Keycap>, move <Keycap>Left</Keycap> / <Keycap>Right</Keycap> to choose a digit, then press <Keycap>Up</Keycap> / <Keycap>Down</Keycap> to edit it.
- On a bit field, hold <Keycap>Enter</Keycap>, choose a bit with <Keycap>Left</Keycap> / <Keycap>Right</Keycap>, then press <Keycap>Up</Keycap> / <Keycap>Down</Keycap> to toggle it.
- On an OPAL operator row, <Keycap>Left</Keycap> / <Keycap>Right</Keycap> without <Keycap>Enter</Keycap> switches between operator 1 and operator 2. Hold <Keycap>Enter</Keycap> while editing the operator value.
- On a Sample or MIDI `TABLE` field, press <Keycap>Enter</Keycap> to assign the first free table. This replaces the field's current table number.

Instrument changes are saved with the project. **Save** on the Instrument page
creates a separate instrument file that you can import elsewhere.

See [Limits and compatibility](../reference/capacities-platforms.md) for the
number of instruments available for each type.
