---
title: Browse and import samples
sidebar_position: 1
description: Browse project samples, import WAV files, preview audio, edit, and delete unused files.
---

# Browse and import samples

Open **Samples** from the Project page. The browser has two places:

- **Samples** shows sounds already copied into the current project.
- **Import** shows sounds available to add.

## Add a sample to the project

1. On Project, move to **Samples** and choose **Browse**.
2. Choose **Import** in the bottom bar.
3. Move through folders with Up and Down; press Enter to open one.
4. Select a WAV and hold Play to preview it.
5. Choose **Import** and press Enter.

The browser stays open so you can add more sounds. Hold Shift and tap Option to
switch between **Samples** and **Import** at any time.

<InterfaceShot src="img/screens/sample-pool.png" alt="NullPerator project sample pool browser">
  The title identifies the browser source; actions stay in the bottom bar.
</InterfaceShot>

## Browser controls

| Input | Result |
| --- | --- |
| Up / Down | Select the previous or next entry. |
| Option + Up / Down | Jump eight entries. |
| Left / Right | Select an action in the bottom bar. |
| Enter | Open a directory or run the selected action. |
| Hold Play | Preview the selected WAV; release Play to stop. |
| Shift + Play | Import the selected library WAV immediately. |
| Option + Left | Go to the parent library directory without leaving the browser. |
| Shift + Left | Leave the browser and return to its owner page. |

Stop normal playback before previewing a WAV. The footer shows the selected
file's size and preview volume.

## Project pool actions

For a project sample, the bottom bar offers:

- **Edit** opens the Sample Editor.
- **Import** switches to the `/samples` library.
- **Delete** removes an unused sample after confirmation.

Option + Enter is a delete shortcut when a project file is selected. A file marked `*` is referenced by at least one Sample instrument and cannot be deleted. Deletion is also blocked while transport or sample preview is active.

## Library actions

Directories have an **Open** action and are shown with a `/` prefix. Files have:

- **Import**, which copies and converts the WAV into the current project.
- **Edit**, which opens an editable copy before import.
- **Back**, which returns to the project pool.

Import fails instead of overwriting an existing project sample with the same resolved name. If the current instrument is a Sample instrument, a successful import assigns the new project sample to it and clears its slices.

The library stays open after a successful import, so several WAV files can be
added in one visit. Each successful import becomes the current Sample
instrument's selected file when the browser was opened from that instrument.

A `~` prefix marks a likely single-cycle WAV. Holding Play loops these previews.

## Supported WAV input

Use an uncompressed mono or stereo WAV. Common PCM and floating-point WAV
files are supported.

The Device page's **Resampler** setting changes accepted rates and project conversion:

| Resampler | Accepted source rate | Project copy |
| --- | --- | --- |
| `NONE` | 7,350–44,100 Hz | 16-bit PCM at the source rate |
| `LINEAR` | 7,350–264,600 Hz | 16-bit PCM at 44,100 Hz |

If a WAV is too large or uses an unsupported format, NullPerator rejects it and
keeps the project unchanged. See [Files and compatibility](../reference/files-and-compatibility.md#supported-wav-files)
for the complete format list.
