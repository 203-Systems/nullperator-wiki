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

## Project files

Each named project has its own folder at `/projects/<name>/`:

| File or folder | Purpose |
| --- | --- |
| `npsong.dat` | Main project file written by manual **SAVE** and Save As |
| `autosave.dat` | Recovery file written by autosave without overwriting the main file |
| `lgptsav.dat` | Legacy main file, read when `npsong.dat` is absent |
| `samples/` | Samples imported into this project |

When loading, NullPerator prefers a valid autosave over the manual save. It
recovers interrupted writes from matching `.tmp` and `.bak` files when
possible. Do not remove those files while the app is running.

Opening a legacy project does not convert or rename its main file. The next
manual **SAVE** writes `npsong.dat`, clears the autosave, and leaves the original
`lgptsav.dat` unchanged. If both main filenames are present, `npsong.dat` takes
precedence. A corrupt new main file does not silently fall back to the older
legacy copy.

Older app or firmware builds may still write and read only `lgptsav.dat` as the
main file. Update the destination before moving a newly saved project there;
the retained legacy file does not contain later edits, and renaming a file does
not make its contents compatible with an older build.

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

GB instruments store their sound settings in the project or exported instrument;
GB-Wave's 32 waveform points are included and need no external WAV. Use a build
that supports the GB types on the destination device. The flexible 64-slot bank
also allows type combinations that older fixed-pool builds cannot load.

### LSDJ and other trackers

The [GB instruments](../instruments/gb.md) are native NullPerator synth types,
not an LSDJ project importer. The Project Browser does not directly open
`.lsdprj`, Game Boy `.sav`, or M8 project files. Renaming those files to
`npsong.dat` does not convert them. Recreating a song requires translating its
patterns, instruments, timing, and effects; GB-like tone generation alone does
not guarantee identical LSDJ playback.

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
