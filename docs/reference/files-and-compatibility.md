---
title: Files and compatibility
sidebar_position: 5
description: Back up, move, and share NullPerator projects and content.
---

# Files and compatibility

You do not need to manage files by hand for normal use. This page is for
backups and moving content between NullPerator devices.

## Where files are kept

| Folder | What it contains |
| --- | --- |
| `/projects/` | Saved projects and their imported samples |
| `/samples/` | Samples available to import into a project |
| `/instruments/` | Exported instruments |
| `/themes/` | NullPerator themes |
| `/renders/` | Mixdowns and stems |

On NullPerator hardware these folders are on the SD card. In the Web app, open
the **Files** panel to upload, download, or export them as a ZIP. On iOS they
live in the NullPerator app folder in **Files**; open it from the app's settings
or from the Files app.

Back up the whole project folder, not only the main project file. This keeps its
imported samples with the song.

## Moving a project

1. Stop playback and save the project.
2. Copy or export the complete project folder.
3. Put it inside the destination's `/projects/` folder.
4. Open Project, choose **Load**, and select it.

NullPerator 0.1 opens current NullPerator projects and supported PicoTracker
projects. When an older project opens successfully, save it once in
NullPerator before making further copies.

If a project is rejected, the current song remains open. Keep the rejected
folder unchanged, make a backup, and try an older backup of that project.

## Themes and instruments

NullPerator themes use the `.npt` format and are checked by their file content,
not only their filename. Instruments use NullPerator's supported instrument
format. Import these through their browser pages so the file can be checked
before it replaces anything.

## Supported WAV files

NullPerator imports uncompressed RIFF/WAVE files with one or two channels:

- PCM: unsigned 8-bit or signed 16-, 24-, or 32-bit;
- floating point: 32- or 64-bit;
- WAVE_FORMAT_EXTENSIBLE with a PCM or floating-point subtype.

With Device **Resampler NONE**, source rates from 7,350 to 44,100 Hz keep their
rate and are stored as 16-bit PCM. With **Resampler LINEAR**, source rates up to
264,600 Hz are converted to 44,100 Hz, 16-bit PCM.

A project can hold up to 64 samples. Project sample filenames can use up to 24
characters including `.wav`.
