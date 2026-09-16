---
title: MIDI setup
sidebar_position: 1
description: Connect MIDI input, output, and playback sync on NullPerator hardware, Web, or iOS.
---

# MIDI setup

NullPerator treats MIDI input and output as separate paths. The Device page's
`MIDI DEVICE` row controls **output** routing wherever that row is shown; it
does not turn incoming notes or transport messages on and off. Web and iOS choose
routes in the surrounding app's MIDI panel/settings instead.

## NullPerator hardware

### TRS output

1. Connect the NullPerator hardware MIDI OUT jack to the receiving device.
2. On Device, set `MIDI DEVICE` to `TRS`.
3. Create a MIDI instrument and set its channel from 1 to 16.
4. Enter notes with that instrument in a Phrase and start playback.

Use `TRS` for MIDI output on NullPerator hardware 0.1. The `USB` route is not
available in this version.

### TRS input

The NullPerator hardware MIDI IN jack starts with the application and is
independent of the output selector. Incoming channels 1–16 address instrument
slots 00–0F in order. For example, channel 1 auditions instrument 00 and
channel 16 auditions instrument 0F.

Up to eight incoming notes can be previewed at once.

## Web app

Browser MIDI requires the Web MIDI API and a user gesture:

1. Open the Web app's **MIDI** panel.
2. Press **Enable Web MIDI** and grant the browser permission.
3. Select an input and/or output from the browser device lists.
4. Return to the tracker and play a MIDI instrument. The current Web build
   does not show a separate `MIDI DEVICE` row in the tracker.

The Web app remembers the selected device and waits for it to reconnect. If the
Web MIDI panel is missing or unsupported, try a browser with Web MIDI support
on a secure or local site.

## iOS app

1. Open the app settings and choose **MIDI**.
2. Turn on **Enable MIDI**.
3. Choose a CoreMIDI input and/or output.
4. To use a Bluetooth device, open **Bluetooth MIDI** there and pair it first.
5. Return to the tracker; no `MIDI DEVICE` row is shown on iOS.

iOS remembers the selected endpoints and reconnects when they become
available. MIDI accessories connected through iOS and paired Bluetooth MIDI
devices appear in the same input and output lists.

## Send transport clock

Set `MIDI SYNC` to `ON` to keep an external device in time with NullPerator. It
sends MIDI Clock while playing, plus Start and Stop messages.

This is **send-only sync**: incoming MIDI Clock does not change NullPerator's
tempo. Incoming Start, Stop, and Continue can still control playback.

NullPerator does not send song position. Set the receiving device to the right
position before starting if it needs an absolute timeline.

See [MIDI capabilities](./capabilities.md) for the complete message matrix and
the commands available to MIDI instruments.
