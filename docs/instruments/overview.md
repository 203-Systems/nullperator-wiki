---
title: Choose an instrument
sidebar_position: 1
description: Choose Sample, MIDI, SID, OPAL, Drum, Stack, Chiptune, or GB instruments for your Phrase notes.
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
4. Use <Keycap>Left</Keycap> / <Keycap>Right</Keycap> until the Type reads `OPAL`.
5. Use <KeyCombo keys={['Shift', 'Left']} /> to return to Phrase.
6. Hold <Keycap>Enter</Keycap> on the note to hear it.

OPAL, SID, Drum, Stack, Chiptune, and the GB instruments make sound without loading a file. A Sample instrument needs a WAV,
and MIDI plays an external instrument.

## Assign an instrument in Phrase

On an empty `INS` cell, press <Keycap>Enter</Keycap> to insert the remembered
instrument immediately. Creating a NOTE also fills its INS assignment. Keep
<Keycap>Enter</Keycap> held on NOTE or INS to audition the step; release it to
stop the preview.

Use <KeyCombo keys={['Enter', 'Left']} /> or
<KeyCombo keys={['Enter', 'Right']} /> on INS to choose another instrument number.
These change which instrument the row uses, not the sound's settings.

A second consecutive <Keycap>Enter</Keycap> on INS assigns a new empty instrument
slot, even if INS already has a number. The new slot starts as `NONE`; open it
and choose a Type. This does not duplicate the previous sound. To make a copy,
use [Clone referenced data](../sequencer/phrase#clone-referenced-data).

While holding <Keycap>Enter</Keycap>, press <Keycap>Option</Keycap> to cut the
current assignment, including one you just entered. Cutting INS alone leaves
the note in place; cutting NOTE clears both NOTE and INS.

## Instrument types

| Type | Use it for |
| --- | --- |
| `SAMPLE` | Play, loop, process, and slice a WAV |
| `MIDI` | Play an external synth or software instrument |
| `SID` | Make chip-style basses, leads, and noise |
| `OPAL` | Make FM bells, basses, and additive tones |
| [`DRUM`](drum) | Build a twelve-sound synthesized drum kit |
| [`STACK`](stack) | Make layered leads, detuned sounds, and chords from one note |
| [`CHIPTUNE`](chiptune) | Make pulse leads, fast arpeggios, and chip-style noise |
| [`GB-WAVE`](gb#gb-wave) | Edit a 32-point, 4-bit waveform for GB-style basses and leads |
| [`GB-PULSE`](gb#gb-pulse) | Use GB-style pulse duty, envelope, length, and sweep |
| [`GB-NOISE`](gb#gb-noise) | Use a 7- or 15-bit noise generator for percussion and effects |
| `NONE` | Leave the instrument empty |

All 64 slots (`00`–`3F`) accept any available type. There is no separate
two-Chiptune or three-OPAL preset quota: you can give several Chiptune or GB
slots different sounds. Memory is allocated as needed. Preset count is not
the same as simultaneous voice count; see [Capacities and platforms](../reference/capacities-platforms.md#instrument-slots-and-voices).

## Page sections

Blue dividers group each instrument's parameters. They are section labels in
one scrolling list; use <Keycap>Up</Keycap> / <Keycap>Down</Keycap> to move
between editable rows.

| Instrument | Sections |
| --- | --- |
| Sample | Source; Level & Pitch; Character; Filter; Playback; Modulation |
| MIDI | Output; Modulation |
| SID | Oscillator; Envelope; Filter & Output |
| OPAL | General Settings; Operator Settings |
| Drum | Voices; Kit |
| Stack | Oscillator; Tone; Envelope; Modulation |
| Chiptune | Oscillator; Envelope; Vibrato; Sweep; Modulation |
| GB-Pulse | Oscillator; Envelope & Sweep; Modulation |
| GB-Noise | Noise; Envelope; Modulation |
| GB-Wave | Oscillator; Wave RAM (4 Samples / Row); Modulation |

Drum's **Voices** divider shares the column-header row. SID's **Envelope**
divider shares its ATK / DEC / SUS / REL headers, and OPAL's **Operator Settings**
divider shares its OP 1 / OP 2 headers.

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

Select **Type** and press <Keycap>Left</Keycap> / <Keycap>Right</Keycap> to change it.

Available types are `NONE`, `SAMPLE`, `MIDI`, `SID`, `OPAL`, `DRUM`, `STACK`,
`CHIPTUNE`, `GB-WAVE`, `GB-PULSE`, and `GB-NOISE`.
The selector wraps around, so keep moving until the type you want appears.

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
