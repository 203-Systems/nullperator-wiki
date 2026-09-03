---
title: Slices
sidebar_position: 3
description: Add, move, delete, audition, and automatically distribute up to 16 slice points.
---

# Slices

Select `SLICES` on a Sample instrument and press <Keycap>Enter</Keycap> to open the Slices page. A sample must already be assigned, and tracker playback must be stopped.

Each Sample instrument stores up to **16 ordered slice starts**. Slice playback begins at the selected point and stops immediately before the next later point, or at the end of the sample.

<InterfaceShot src="img/screens/sample-slices.png" alt="NullPerator Sample Slices waveform and slice markers">
  Add, move, delete, and Auto Slice operate on instrument-owned markers.
</InterfaceShot>

## Quickly chop a drum loop

1. Move <Keycap>Down</Keycap> to the slice count and choose `8` or `16`.
2. Move to **Auto Slice** and press <Keycap>Enter</Keycap>.
3. If slices already exist, choose **Replace** and confirm.
4. Hold <Keycap>Play</Keycap> on a slice to hear it.
5. Return to Phrase. Notes `C2` upward now play the slices in order.

## Waveform controls

| Input | Result |
| --- | --- |
| <Keycap>Left</Keycap> / <Keycap>Right</Keycap> | Select the previous or next slice slot. |
| <Keycap>Enter</Keycap> on an empty slot | Add a slice at the suggested midpoint. |
| <KeyCombo keys={['Enter', 'Left']} /> or <KeyCombo keys={['Enter', 'Right']} /> | Move the selected slice by a fine screen-relative step. |
| <KeyCombo keys={['Enter', 'Up']} /> or <KeyCombo keys={['Enter', 'Down']} /> | Move it by a coarse screen-relative step. |
| <KeyCombo keys={['Shift', 'Enter']} /> | Delete the selected slice and compact the remaining slots. |
| <KeyCombo keys={['Option', 'Up']} /> or <KeyCombo keys={['Option', 'Down']} /> | Zoom in or out around the selected slice. |
| Hold <Keycap>Play</Keycap> | Audition only the selected slice; release to stop. |
| <KeyCombo keys={['Shift', 'Left']} /> | Return to the Sample instrument. |

Slice points stay in order. If you move one past a neighbour, NullPerator keeps
the set ordered for you. A slice with no length cannot be previewed.

The first slice can begin at the very start of the WAV.

## Auto Slice

Use <Keycap>Up</Keycap> / <Keycap>Down</Keycap> without a modifier to move from the waveform to the count and **Auto Slice** rows.

1. Select the slice count and change it with <Keycap>Left</Keycap> / <Keycap>Right</Keycap>. Valid values are 1–16.
2. Move to **Auto Slice** and press <Keycap>Enter</Keycap>.
3. If the instrument already has slices, choose **Cancel** or **Replace**, then press <Keycap>Enter</Keycap>.

Values 2–16 distribute that many starts evenly over the file. A count of **1 clears all slice points**.

Auto Slice replaces the complete slice set; it does not merge new points into the existing set.

## Playing slices from a phrase

When any slices are present, the displayed notes `C2` through `D#3` address
slice slots 1 through 16. Undefined slots in that range are silent. Each slice
plays once and stops before the next slice.

Slice data belongs to the Sample instrument. Importing and assigning a new WAV to that instrument clears the slice set; other instruments that use the same WAV keep their own independent slices.
