---
title: OPAL instrument
sidebar_position: 5
description: Build two-operator FM and additive patches with the OPAL synthesizer.
---

# OPAL instrument

OPAL is a two-operator FM synthesizer inspired by OPL-era PC sound hardware. Each instrument is monophonic. NullPerator can allocate up to **three OPAL instruments**, so use separate instrument slots when you need simultaneous OPAL voices.

<InterfaceShot src="img/screens/instrument-opal.png" alt="NullPerator OPAL two-operator instrument settings">
  General settings lead into two aligned operator columns.
</InterfaceShot>

## Instrument settings

| Field | Values | Default | Behaviour |
| --- | --- | --- | --- |
| `ALGORITHM` | `1*2`, `1+2` | `1*2` | Serial FM (operator 1 modulates 2) or parallel/additive output. |
| `DEEP TREM/VIB` | Two bits | `00` | Global deep-tremolo and deep-vibrato flags. |
| `FEEDBACK` | `0`–`7` | `0` | Feedback amount for operator 1. |

For `DEEP TREM/VIB`, hold Enter, choose the tremolo or vibrato bit with Left / Right, and toggle it with Up / Down.

## Operator settings

The lower section shows operator 1 and operator 2 side by side. Up / Down moves by row. Left / Right without Enter switches operator columns; hold Enter while changing the selected operator's value.

| Field | Values | OP1 default | OP2 default | Behaviour |
| --- | --- | --- | --- | --- |
| `LEVEL` | `00`–`3F` | `17` | `00` | Output attenuation: `00` is loudest and `3F` is quietest. |
| `MULTIPLIER` | `0`–`F` | `1` | `1` | Operator frequency multiplier. |
| `A/D/S/R` | Four hex digits | `F1C8` | `F1D8` | Attack, decay, sustain, and release. |
| `SHAPE` | Eight choices | `SINE` | `SINE` | `SINE`, `HALF`, `ABS`, `PULS`, `EVEN`, `AB-E`, `SQR`, or `DSQR`. |
| `TR/VB/SU/KSR` | Four bits | `0000` | `0010` | Tremolo, vibrato, sustained envelope, and key-rate scaling flags. |
| `KEYSCALE` | `0`, `1.5`, `3`, `6` | `1.5` | `0` | Selects the displayed high-note attenuation curve. |

`A/D/S/R` and `TR/VB/SU/KSR` are component fields: hold Enter, select a digit or bit with Left / Right, then edit it with Up / Down.

## Voice behaviour

One OPAL instrument owns one synth channel. If the same instrument number is triggered by several tracker tracks, a later note replaces the earlier note. Allocate another OPAL slot for another simultaneous voice, up to the fixed pool limit of three.
