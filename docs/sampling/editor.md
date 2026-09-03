---
title: Sample Editor
sidebar_position: 2
description: Preview, trim, normalize, and save a WAV.
---

# Sample Editor

Open **Edit** on a WAV in the Sample Browser, or press <Keycap>Enter</Keycap> on a Sample
instrument's `SAMPLE` row.

Edits stay in a temporary copy until you choose **Save**. **Discard** or
<KeyCombo keys={['Shift', 'Left']} /> leaves the original WAV unchanged.

<InterfaceShot src="img/screens/sample-editor.png" alt="NullPerator Sample Editor waveform and markers">
  Start and End markers choose the part of the waveform you want to edit.
</InterfaceShot>

## Trim a sample

1. Move the Start and End markers around the sound you want to keep.
2. Choose `TRIM` on the Operation row.
3. Select **Apply**, press <Keycap>Enter</Keycap>, and confirm.
4. Preview the result with <Keycap>Play</Keycap>.
5. Choose **Save**, or **Save & Load** when editing a library sample you also
   want to add to the project.

To make a quiet sample louder, follow the same steps with `NORMALIZE`.

## Waveform controls

| Input | Result |
| --- | --- |
| <Keycap>Up</Keycap> / <Keycap>Down</Keycap> | Move through Waveform, Start, End, Operation, Apply, and the bottom actions. |
| <KeyCombo keys={['Option', 'Left']} /> / <KeyCombo keys={['Option', 'Right']} /> | Select the Start or End marker and center it. |
| <KeyCombo keys={['Option', 'Up']} /> or <KeyCombo keys={['Option', 'Down']} /> | Zoom in or out around the selected marker. |
| <KeyCombo keys={['Enter', 'Left']} /> or <KeyCombo keys={['Enter', 'Right']} /> | Move the selected waveform marker by a fine screen-relative step. |
| <KeyCombo keys={['Enter', 'Up']} /> or <KeyCombo keys={['Enter', 'Down']} /> | Move the selected waveform marker by a coarse screen-relative step. |
| Hold <Keycap>Play</Keycap> | Preview from Start to End; release to stop. |
| <KeyCombo keys={['Shift', 'Left']} /> | Return without saving the working copy. |

Short single-cycle files loop during preview. Longer files play once through the selected range.

## Start and End

`START` and `END` are seven-digit hexadecimal frame positions. On either row:

1. Move <Keycap>Left</Keycap> / <Keycap>Right</Keycap> to choose a digit.
2. Hold <Keycap>Enter</Keycap> and press <Keycap>Up</Keycap> / <Keycap>Down</Keycap> to change that digit.

Start cannot move past End, and End cannot move before Start or beyond the last frame.

## Apply an operation

The `OPERATION` selector offers:

- **Trim** keeps the Start–End range.
- **Normalize** scans the complete working WAV and scales its peak to full range. Normalize currently supports PCM 8-bit and PCM 16-bit WAV data.

Use <Keycap>Left</Keycap> / <Keycap>Right</Keycap> on the Operation row to choose an operation, select **Apply**,
and press <Keycap>Enter</Keycap>. Confirm the operation in the dialog. Applying shows progress;
choose **Cancel** to stop and return to the last valid version.

You can apply more than one operation before saving. The waveform reloads from the newest valid working copy after each successful apply.

## Save, Save & Load, and Discard

The bottom actions depend on where the file came from:

| Source | Actions | Result |
| --- | --- | --- |
| Project samples | `SAVE`, `DISCARD` | Save replaces the project's WAV. Reload the project before an already-loaded Sample instrument uses the rewritten audio. |
| Sample library | `SAVE`, `SAVE & LOAD`, `DISCARD` | Save updates the library WAV. Save & Load also imports it into the project and, when the current slot is a Sample instrument, assigns it there. |

If **Save & Load** says the import failed, the edited library WAV may still have
been saved. Return to Samples and check whether a file with the same name is
already in the project.
