---
title: Scales and roots
sidebar_position: 2
description: The 44 project scales and their pitch classes.
---

# Scales and roots

Project `SCALE` and `ROOT` constrain scale-aware operations such as MIDI chord
offsets. Scale intervals below are semitone offsets from the selected root.
`0` is always the root; values repeat every octave.

| # | Scale | Semitone offsets |
| ---: | --- | --- |
| 1 | None (Chromatic) | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 |
| 2 | Acoustic | 0, 2, 4, 6, 7, 9 |
| 3 | Adonal malakh | 0, 2, 4, 5, 7, 8, 10 |
| 4 | Aeolian mode (minor) | 0, 2, 3, 5, 7, 8, 10 |
| 5 | Algerian | 0, 2, 3, 6, 7, 8, 11 |
| 6 | Altered | 0, 1, 3, 4, 6, 8, 10 |
| 7 | Augmented | 0, 3, 4, 7, 8, 11 |
| 8 | Bebop dominant | 0, 2, 4, 5, 7, 9, 10, 11 |
| 9 | Blues | 0, 3, 5, 6, 7, 10 |
| 10 | Dorian | 0, 2, 3, 5, 7, 9, 10 |
| 11 | Double harmonic | 0, 1, 4, 5, 7, 8, 11 |
| 12 | Enigmatic | 0, 1, 4, 6, 8, 10, 11 |
| 13 | Flamenco | 0, 1, 4, 5, 7, 8, 11 |
| 14 | Gypsy | 0, 2, 3, 6, 7, 8, 10 |
| 15 | Half diminished | 0, 2, 3, 5, 6, 8, 10 |
| 16 | Harmonic major | 0, 2, 4, 5, 7, 8, 11 |
| 17 | Harmonic minor | 0, 2, 3, 5, 7, 8, 11 |
| 18 | Hirajoshi | 0, 2, 3, 7, 8 |
| 19 | Hungarian gypsy | 0, 2, 3, 6, 7, 8, 11 |
| 20 | Hungarian minor | 0, 2, 3, 6, 7, 8, 11 |
| 21 | Insen | 0, 1, 5, 7, 10 |
| 22 | Ionian mode (major) | 0, 2, 4, 5, 7, 9, 11 |
| 23 | Istrian | 0, 1, 3, 4, 6, 7 |
| 24 | Iwato | 0, 1, 5, 6, 10 |
| 25 | Locrian | 0, 1, 3, 5, 6, 8, 10 |
| 26 | Lydian augmented | 0, 2, 4, 6, 8, 9, 11 |
| 27 | Lydian | 0, 2, 4, 6, 7, 9, 11 |
| 28 | Major bebop | 0, 2, 4, 5, 7, 8, 9, 11 |
| 29 | Major locrian | 0, 2, 4, 5, 6, 8, 10 |
| 30 | Major pentatonic | 0, 2, 4, 7, 9 |
| 31 | Melodic minor | 0, 2, 3, 5, 7, 8, 9, 10, 11 |
| 32 | Melodic minor (asc) | 0, 2, 3, 5, 7, 9, 11 |
| 33 | Minor pentatonic | 0, 3, 5, 7, 10 |
| 34 | Mixolydian | 0, 2, 4, 5, 7, 9, 10 |
| 35 | Neapolitan major | 0, 1, 3, 5, 7, 9, 11 |
| 36 | Neapolitan minor | 0, 1, 3, 5, 7, 8, 11 |
| 37 | Octatonic | 0, 2, 3, 5, 6, 8, 9, 11 |
| 38 | Persian | 0, 1, 4, 5, 6, 8, 11 |
| 39 | Phrygian dominant | 0, 1, 4, 5, 7, 8, 10 |
| 40 | Phrygian | 0, 1, 3, 5, 7, 8, 10 |
| 41 | Prometheus | 0, 2, 4, 6, 9, 10 |
| 42 | Tritone | 0, 1, 4, 6, 7, 10 |
| 43 | Ukranian | 0, 2, 3, 6, 7, 9, 10 |
| 44 | Whole tone | 0, 2, 4, 6, 8, 10 |

The Root selector contains `C`, `C#`, `D`, `D#`, `E`, `F`, `F#`, `G`, `G#`,
`A`, `A#`, and `B`, and wraps in both directions.

The spellings in this table match the firmware's selector labels, including
`Ukranian`. Hungarian gypsy and Hungarian minor intentionally share the same
pitch-class set in version 0.1.
