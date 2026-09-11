---
title: Device settings
sidebar_position: 1
description: Audio, MIDI, display, theme, and font settings across NullPerator platforms.
---

# Device settings

<InterfaceShot src="img/screens/device.png" alt="NullPerator Device settings with Connections, Audio, and Display sections">
  Device settings use the same scrollable-list and contextual-bottom-bar system as Project and Instrument.
</InterfaceShot>

Device settings belong to the installation, not to the current project. A
change is applied immediately where the platform supports it and saved
automatically. If saving fails, `CONFIG SAVE FAILED` appears so you can try
again.

Use <Keycap>Up</Keycap> and <Keycap>Down</Keycap> to choose a row. Selector rows change directly with
<Keycap>Left</Keycap> and <Keycap>Right</Keycap>; <Keycap>Enter</Keycap> is not required. Hold <Keycap>Enter</Keycap> while using <Keycap>Up</Keycap> or <Keycap>Down</Keycap> for ±10 steps
on numeric rows. Holding a direction repeats after the initial delay.

## Available rows

| Row | Values | Behavior |
| --- | --- | --- |
| MIDI Device | `OFF`, `TRS`, `USB`, `TRS+USB` | Selects MIDI **output** routing and wraps |
| MIDI Sync | `OFF`, `ON` | Sends transport clock when on; clamps at the ends |
| Resampler | `NONE`, `LINEAR` | Resampling used when importing a sample; wraps |
| Volume | `0%`–`100%` | Output gain, ±1 horizontally or ±10 with <KeyCombo keys={['Enter', 'Up']} /> or <KeyCombo keys={['Enter', 'Down']} /> |
| Brightness | `0%`–`100%` | Display control, ±1 horizontally or ±10 with <KeyCombo keys={['Enter', 'Up']} /> or <KeyCombo keys={['Enter', 'Down']} /> |
| Theme | Current theme name | Press <Keycap>Enter</Keycap> to open Theme |
| Font | Current font state | Press <Keycap>Enter</Keycap> to open Font |

iOS hides `MIDI DEVICE`, `VOLUME`, and `BRIGHTNESS`; those are managed by the
native app or by iOS. The remaining rows use the same controls and values.

In **Display**, Theme and Font names follow the Font page's **Case** preference.

The footer displays the current app version, `0.1` in this release.

### Brightness safety

The visible percentage maps to a nonzero hardware backlight range. `0%` is the
minimum visible brightness rather than a completely black screen, so the
device cannot be made unusable from this row.

### Resampler

`NONE` keeps the import path as direct as possible. `LINEAR` uses linear
interpolation when a source sample must be converted. This setting affects
future imports; it does not rewrite samples that are already in a project.

## Platform differences

The Device page adapts to the services available on each platform:

| Setting | NullPerator hardware | Web | iOS |
| --- | --- | --- | --- |
| Volume | Controls the hardware output | Controls browser audio | Row hidden; use system volume |
| Brightness | Controls the ST7789 backlight | Saves the preference, but does not alter the canvas in 0.1 | Row hidden; use system brightness |
| MIDI output | Use `TRS` in NullPerator hardware 0.1 | Uses the output selected in the Web MIDI panel | Row hidden; choose a CoreMIDI output in app settings |
| Battery | Device percentage and charge state | No physical battery reported | Device percentage and charge state |

For port setup and the exact MIDI behavior, see [MIDI setup](../midi/setup.md)
and [MIDI capabilities](../midi/capabilities.md).
