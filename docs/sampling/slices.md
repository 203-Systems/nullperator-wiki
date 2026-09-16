---
title: Slices
sidebar_position: 3
description: Select, position, and evenly space up to 16 sample slices.
---

# Slices

Slices let different notes play different parts of one WAV. Load a sample,
select the instrument's `SLICES` row, and press <Keycap>Enter</Keycap>.

Slice edits apply to the instrument immediately and are saved with the project.
There is no separate Save action, and the WAV is unchanged. Use the
[Sample Editor](editor) when you want to trim or normalize the audio itself.

<InterfaceShot src="img/screens/sample-slices.png" alt="Sample Slices with a selected slice, Start, Zoom, and Auto Slice rows">
  Slice shows the selected slice number and the total available count.
</InterfaceShot>

## Choose slices and change the count

1. Select the **Slice** row. Use <Keycap>Left</Keycap> / <Keycap>Right</Keycap>
   to select an existing slice. Selection stops at the first and last slice;
   it never enters an empty slot or wraps around.
2. Hold <Keycap>Enter</Keycap> to show **Count** in the bottom bar. Press
   <Keycap>Right</Keycap> to increase the total count, or <Keycap>Left</Keycap>
   to decrease it. Release <Keycap>Enter</Keycap> to return to selection.
3. Tap <Keycap>Play</Keycap> to preview the selected slice; tap again to stop early.

Count is the total number of slices, not the selected slice number. Increasing
it splits the longest remaining interval while preserving existing boundaries.
Decreasing it removes the last boundary. The count is bounded at 1–16 and
cannot create slices shorter than one frame. At 1, the sample is unsliced.

## Move a boundary

Select a slice, then move down to **Start**:

- <Keycap>Left</Keycap> / <Keycap>Right</Keycap> moves its start by one frame.
- Hold <Keycap>Enter</Keycap>, choose one of the seven hexadecimal digits with
  <Keycap>Left</Keycap> / <Keycap>Right</Keycap>, then change it with
  <Keycap>Up</Keycap> / <Keycap>Down</Keycap>.
- <KeyCombo keys={['Shift', 'Enter']} /> on Slice or Start deletes the selected
  defined slice and compacts the remaining slots.

Boundaries stay ordered. The next boundary, or the end of the WAV, determines
where a slice ends.

## Zoom

Move to **Zoom** and use <Keycap>Left</Keycap> / <Keycap>Right</Keycap> directly.
The selector stops at the smallest and largest zoom levels. You can also use
<KeyCombo keys={['Option', 'Up']} /> or
<KeyCombo keys={['Option', 'Down']} /> from any row to zoom around the selected slice.

## Auto Slice

**Auto Slice** spaces the current total count evenly across the WAV. It does
not detect transients or add another set of slices.

1. Set the total count on **Slice** with <Keycap>Enter</Keycap> held.
2. Move to **Auto Slice** and press <Keycap>Enter</Keycap>.
3. If slices already exist, the dialog asks **Space slices evenly?** and shows
   how many will be repositioned. Choose **Cancel** on the left to keep their
   positions, or **Replace** on the right to space them evenly.

<InterfaceShot src="img/screens/sample-slices-auto.png" alt="Auto Slice confirmation with Cancel on the left and Replace on the right">
  Replace redistributes the current count; Cancel keeps the existing positions.
</InterfaceShot>

With 2–16 slices, the first begins at frame zero and the rest divide the file
into equal intervals. A count of 1 clears slice points and restores the whole
sample. Replacing slices changes their positions, not their count or the WAV.

## Play slices from a phrase

Use <KeyCombo keys={['Shift', 'Left']} /> to return to the instrument. When slice
points are present, notes `C4`–`D#5` (stored notes 48–63) address slots 1–16. Undefined slots in that
range are silent. Each slice plays once up to the next boundary, independently
of the instrument's loop mode.

Importing and assigning a different WAV clears that instrument's slices. Other
instruments using the same WAV retain their own independent boundaries.
