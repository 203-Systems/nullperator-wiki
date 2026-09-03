---
title: SID instrument
sidebar_position: 4
description: Configure the three-oscillator SID synthesizer and its shared filter.
---

# SID instrument

The SID instrument drives one oscillator of NullPerator's emulated SID chip. Up to **three SID instruments** can be allocated, matching the chip's three oscillators.

<InterfaceShot src="img/screens/instrument-sid.png" alt="NullPerator SID instrument settings">
  Voice settings and the shared SID filter live in one scrollable list.
</InterfaceShot>

## Parameters

| Field | Values | Default | Behaviour |
| --- | --- | --- | --- |
| `OSCILLATOR` | `0`–`2` | `0` | SID voice used by this instrument. |
| `PULSEWIDTH` | `000`–`FFF` | `800` | Duty cycle of pulse-containing waveforms. |
| `WAVEFORM` | Nine choices | Triangle | Off, triangle, saw, triangle+saw, pulse, triangle+pulse, saw+pulse, triangle+saw+pulse, or noise. |
| `OSC SYNC` | `NO`, `YES` | `NO` | Hard-syncs the oscillator to the preceding SID oscillator. |
| `RING MOD` | `NO`, `YES` | `NO` | Enables ring modulation. |
| `ENV ADSR` | Four hex digits | `2282` | Attack, decay, sustain, and release nibbles. |
| `FILTER` | `NO`, `YES` | `NO` | Routes this oscillator through the SID filter. |
| `CUTOFF` | `000`–`7FF` | `1FF` | Shared SID filter cutoff. |
| `RESONANCE` | `0`–`F` | `0` | Shared filter resonance. |
| `MODE` | `LP`, `BP`, `HP`, `NOTCH` | `LP` | Shared filter response. |
| `VOLUME` | `0`–`F` | `F` | Shared SID chip output volume. |

Hold <Keycap>Enter</Keycap> on `ENV ADSR`, use <Keycap>Left</Keycap> / <Keycap>Right</Keycap> to choose a nibble, and use <Keycap>Up</Keycap> / <Keycap>Down</Keycap> to edit it.

## Shared state

`CUTOFF`, `RESONANCE`, `MODE`, and `VOLUME` represent chip-wide registers. Changing any of them on one SID instrument changes the value seen by the other SID instruments. `FILTER` remains per oscillator because it controls whether that voice is routed into the shared filter.

Assign the three instruments different `OSCILLATOR` values when you want a conventional three-voice patch. Two instruments targeting the same oscillator overwrite the same SID voice state.

## Note range

The emulated SID frequency table accepts the displayed range **C0–B7**. Notes outside that range are rejected rather than wrapped.
