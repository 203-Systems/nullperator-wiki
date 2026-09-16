---
title: GB-Wave, GB-Pulse, and GB-Noise
sidebar_position: 9
description: Shape GB-style pulse, wave-RAM, and noise sounds with native NullPerator effects.
---

# GB-Wave, GB-Pulse, and GB-Noise

Choose `GB-WAVE`, `GB-PULSE`, or `GB-NOISE` in the Instrument **Type** row.
These are three independent synth types, not Stack modes. They need no sample
files and can occupy any of the 64 instrument slots, with different settings
in each slot.

Use **GB-Pulse** for duty-cycle leads, **GB-Wave** for a custom 4-bit waveform,
and **GB-Noise** for percussion. Choose [Chiptune](chiptune) instead when you
want its broader waveform selection, noise burst, and built-in arpeggio-speed
control, or [Stack](stack) for chords and detuned layers.

## Try a pulse lead

1. Assign an instrument to a Phrase note and open that instrument.
2. Change **Type** to `GB-PULSE`. Keep **DUTY** at `50%`, **ENVELOPE** at `F0`,
   and **LENGTH /256S** at `00`.
3. Return to Phrase and play the note. It holds until replaced or stopped.
4. Add `ARP 4700` to cycle the base note, major third, and fifth.
5. Try `SIP 0001` on a later step: the sounding voice changes to 25% duty.
   Triggering a new note restores the instrument's saved 50% duty.

All numeric values below are hexadecimal unless stated otherwise. On
digit-editable fields, hold <Keycap>Enter</Keycap>, choose a digit with
<Keycap>Left</Keycap> / <Keycap>Right</Keycap>, and adjust it with
<Keycap>Up</Keycap> / <Keycap>Down</Keycap>.

## Shared controls

| Field | Values | Default | Meaning |
| --- | --- | --- | --- |
| `VOLUME` | `00`–`FF` | `80` | Voice output gain, separate from the pulse/noise envelope or wave output level |
| `TRANSPOSE` | −24 to +24, decimal | 0 | Semitone offset; Pulse and Wave only |
| `LENGTH /256S` | Pulse/Noise `00`–`40`; Wave `000`–`100` | `00` / `000` | Countdown in 1/256-second units; zero disables automatic length stopping |
| `TABLE` | `--`, `00`–`1F` | `--` | Attached instrument Table |
| `AUTOMATION` | `NO`, `YES` | `NO` | Uses the instrument-table automation mode |

For example, length `40` is 64/256 seconds (one quarter second), not 40
tracker ticks. Envelope, sweep, and length clocks are independent of song tempo.
Note Off and `GOF` stop a GB voice immediately; `KIL` uses its tracker-tick delay.

## GB-Pulse

<InterfaceShot src="img/screens/instrument-gb-pulse.png" alt="GB-Pulse with duty changed to 75 percent, envelope F0, length 00, and sweep 00">
  Pulse keeps duty, envelope, length, sweep, and Table controls in one instrument. This example changes duty from its default 50% to 75%.
</InterfaceShot>

| Field | Values | Default | Meaning |
| --- | --- | --- | --- |
| `DUTY` | `12.5%`, `25%`, `50%`, `75%` | `50%` | Four pulse patterns; `SIP` addresses them as `00`–`03` |
| `ENVELOPE` | `00`–`FF` | `F0` | Initial level, direction, and automatic level-step period |
| `SWEEP` | `00`–`7F` | `00` | Pulse frequency-period sweep |

The envelope byte is `VVVVDPPP` in binary: `V` is the starting level 0–15,
`D` selects increase (1) or decrease (0), and `P` is the number of 1/64-second
intervals between level steps. `P = 0` disables automatic steps. `F0` holds the
maximum envelope level; `F2` starts at maximum and decreases every 2/64 seconds.
Values `00`–`07` disable the pulse/noise DAC and produce no sound.

The sweep byte is `0PPPDSSS`: `P` sets the sweep period in 1/128-second units,
`D` chooses subtraction (1) or addition (0) to the frequency period, and `S`
is the right-shift amount used to calculate the change. Zero period disables
periodic sweep. A sweep that overflows the supported period stops the voice.
Keep `00` while editing a steady lead.

## GB-Wave

<InterfaceShot src="img/screens/instrument-gb-wave.png" alt="GB-Wave with its first four waveform samples edited to 0124">
  Each digit under Wave RAM is one sample. Here the fourth point has changed from 3 to 4; scroll down for the remaining wave and Table rows.
</InterfaceShot>

| Field | Values | Default | Meaning |
| --- | --- | --- | --- |
| `OUTPUT LEVEL` | `MUTE`, `100%`, `50%`, `25%` | `100%` | Wave-sample bit shift; separate from `VOLUME` |
| `00-03` through `1C-1F` | Four digits per row, each `0`–`F` | See below | 32 waveform samples, four samples per row |

The default waveform is:

```text
0123 4567 89AB CDEF FEDC BA98 7654 3210
```

Each digit is one 4-bit sample, not part of an ordinary 16-bit amplitude.
Editing `00-03` from `0123` to `012F` changes only sample `03`. The eight rows
form one repeating waveform. Wave data is saved inside the instrument.

There is no Pulse/Noise-style envelope or sweep field on GB-Wave. Use Table
`VOL` or `SIP` steps for level changes. `OUTPUT LEVEL` reduces sample precision
by bit shifting; `VOLUME` controls the subsequent voice gain.

## GB-Noise

<InterfaceShot src="img/screens/instrument-gb-noise.png" alt="GB-Noise with shape 36, volume 80, envelope F2, and length 00">
  Noise shape changes the generator's clock and width. This example edits the default shape 35 to 36.
</InterfaceShot>

| Field | Values | Default | Meaning |
| --- | --- | --- | --- |
| `SHAPE (NR43)` | `00`–`FF` | `35` | Noise clock shift, register width, and divisor code |
| `ENVELOPE` | `00`–`FF` | `F2` | Same encoding as GB-Pulse |

`SHAPE (NR43)` is `SSSSWDDD` in binary: `S` is the clock shift, `W` chooses
a 7-bit (1) or 15-bit (0) noise register, and `D` is the divisor code.
For example, `35` and `3D` use the same shift/divisor with different widths.
Clock shifts `E` and `F` stop noise-clock advancement; choose a lower shift
for changing noise.

Notes trigger the sound but do not set its pitch. Change **SHAPE (NR43)** or
use `SIP 00bb` to alter the noise clock. There is no transpose control, and
`ARP`, `LEG`, `PFT`, `PSL`, and `VIB` do not affect GB-Noise.

## Native effects

| Type | Instrument effects |
| --- | --- |
| GB-Pulse / GB-Wave | `ARP`, `GOF`, `LEG`, `PAN`, `PFT`, `PSL`, `SIP`, `VIB`, `VOL` |
| GB-Noise | `GOF`, `PAN`, `SIP`, `VOL` |

Common Phrase/Table commands such as `DLY`, `KIL`, `TBL`, and `IRT` remain
available in their respective contexts. GB types do not implement `CSH`,
`RTG`, or Stack chord commands. The [command reference](../reference/commands.md)
lists page restrictions and parameter timing.

On GB types, `VOL aabb` applies `bb` immediately and ignores `aa`; it does
**not** use Chiptune's volume-ramp timing. Pulse/Wave `ARP` advances on tracker
ticks. Native `PAN` supports intermediate positions, not just hard left/right.

### SIP parameter map

`SIP aabb` changes the sounding voice, not the saved instrument. A new note
restores the saved settings. Unlisted indices are ignored.

| `aa` | GB-Pulse | GB-Wave | GB-Noise |
| --- | --- | --- | --- |
| `00` | Duty `00`–`03` | Output level `00`–`03` (mute/full/half/quarter) | Noise shape byte |
| `01` | Transpose, signed byte clamped to −24…+24 | Same | Ignored |
| `02` | Volume `00`–`FF` | Same | Same |
| `03` | Length `00`–`40` | Length `00`–`FF` | Length `00`–`40` |
| `04` | Envelope byte | Ignored | Envelope byte |
| `05` | Sweep `00`–`7F` | Ignored | Ignored |
| `10`–`2F` | Ignored | Wave sample `00`–`1F`, value `00`–`0F` | Ignored |

Wave's saved length can reach `100`, but the one-byte `SIP` value reaches only
`FF`. `SIP 100F` sets the first waveform point to `F`; `SIP 2F00` sets its last
point to `0`. `SIP 010C` transposes Pulse or Wave up 12 semitones.

## Voices and compatibility

GB instruments share eight track voices. A preset can play on several tracks;
different GB presets can play on different tracks. A new note on the same track
replaces its previous voice. The project is not constrained to a Game Boy's
two-Pulse / one-Wave / one-Noise arrangement.

These synths implement GB-style period quantization, pulse patterns, wave RAM,
noise registers, and frame-sequencer timing. They are not a full CPU/APU bus
emulator: wave-RAM corruption, envelope zombie writes, and DIV-write quirks are
not emulated. Native tracker effects are not LSDJ commands, and LSDJ-specific
sequencing, wave synthesis, and kit playback are not supplied by these types.
See [LSDJ and other trackers](../reference/files-and-compatibility.md#lsdj-and-other-trackers)
before moving a project from another tracker.
