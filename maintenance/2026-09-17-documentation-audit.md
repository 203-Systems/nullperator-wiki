# Documentation audit — 2026-09-17

## Scope and method

Reviewed the subjects of all 766 first-parent NullPerator commits after the
upstream baseline `7810f2f1`, from the ESP32 port `f1327842` through
`862fe42b`. Inspected relevant feature diffs and current implementation when
a change affected a user-visible workflow, capacity, compatibility promise,
control mapping, or developer build/deployment instruction. This is a
documentation-impact audit, not a new code review of every internal patch.

Firmware main at review time was `3e9286a9`. The working branch also contained
`862fe42b` (delayed-note row volume); its fix does not add a new user control.
Wiki baseline: `947b064`. Do not describe uncommitted LSDJ conversion tools or
the temporary Node Enter/Func remap as released features.

The inventory at the end preserves the complete reviewed history. The tables
below consolidate related commits rather than creating one manual page for
every fix or performance change.

## Gaps corrected

| Evidence / change | Documentation action |
| --- | --- |
| `512420b4`, `d423f4c4`: displayed octave labels | Correct C0–B9 tracker range, C2–B9 SID range, and C4–D#5 slice triggers; explain that stored notes and playback pitch did not change |
| `e05146f3`: GB-Wave, GB-Pulse, GB-Noise | New [GB guide](../docs/instruments/gb.md) with real UI screenshots, saved parameters, envelope/sweep/noise encoding, Wave RAM, FX/SIP map, examples, and compatibility limits; linked from instrument overview and file compatibility |
| `e3261c36`: on-demand preset allocation and shared track voices | Replace stale per-type quotas in capacities, Chiptune, MIDI, SID, and OPAL pages; distinguish 64 presets from eight tracks, three shared SID oscillators, and 16 MIDI channels |
| `e3261c36`: MIDI startup message coalescing | Explain last configured Program/Volume per MIDI channel in the MIDI instrument page |
| `e05146f3`, `8199fa2d`, `fd3f0e73`: synth and Sample FX | Extend command support tables for all GB types and link the GB SIP map; retain existing Stack/Chiptune/Sample details |
| `d49090c2`: synth output calibration | Troubleshooting explains changed gain, preserved saved values, source balancing, and no per-preset loudness normalization |
| `20693788`, `233590d5`, `9e39afba`: battery presentation | Explain independent voltage-derived percentage and charger status; do not imply USB power or 100% means charging is complete |
| `ccd74c63`, `f4ac173f`: input mapping | Correct keyboard C=Shift / X=Play and iOS Menu=Shift / Options=Play |
| `2710d903`: cursor animation preference | Add Device Animation OFF/ON, default/persistence, and presentation-only behavior |
| `2dd5bd07`, `a1edf86a`: platform setting visibility | Correct Web/iOS hidden Device rows across Device, MIDI setup/capabilities, capacities, and troubleshooting |
| `6956873d`, `da7ea489`, `e3261c36`, `e05146f3` | Firmware README now lists 255 chains/phrases, 64 flexible slots, and all currently selectable instrument types instead of Macro |
| `3e9286a9`: separate autosave and new main filename | Existing user pages already covered this; add equivalent developer storage instructions |
| `a16aba18`, `e9e4e6ac`, `f4ac173f`: current semantic controls | Remove obsolete tap/hold Play/NAV instructions from developer WASM acceptance checklist |
| `d2649661`, `6bc2c638`, CI run 35123229780 | Developer guides now run all CTest targets, distinguish packaging from C++ compilation, and explain main-only deployment after acceptance |

## Existing coverage retained

| Commit family / representative evidence | Current manual coverage |
| --- | --- |
| Initial ESP32 port, display/audio/SD/MIDI adapters; hardware build improvements | Platforms, capacities, MIDI setup; firmware `docs/HARDWARE.md`. No new controls from buffer placement, task affinity, or codec implementation fixes. |
| Web runtime/storage/mirror/recovery: `795f603f`, `25c16320`, `068284c8`, `82765b6b` | Platforms, files/backups, troubleshooting; firmware WASM build/storage/testing guides |
| UI2 migration, semantic palette, native controllers, browsers and dialogs | Controls/navigation/editing/selection; settings/theme/font. Retired UI layouts and removed targets are not current instructions. |
| Phrase/reference cloning, inherited instrument, clipboard, Groove selection | Phrase, Table, Groove, selection/clipboard pages |
| Song/Live/context playback: `8dacabc1`, `34c241cf`, `164945c4`, `d12514ca` | Transport and Song/Live pages; bug fixes restore the documented behavior rather than adding another mode |
| Sample atomic edits/recovery: `79b106ce`, `3858357b`, `df6bc9ca`, `de1ab369` | Sample Editor save/copy/discard workflow and file backups |
| Recording and named imports: `cd9273a0`, `f2e68087`, `fccbea9d`, `0fdd0a8c` | Recording and sample library pages already explain input routes, microphone lifetime, naming, and import |
| Slice editing: `fb9418d0`, `8aa12e12`, `d6e264d0`, `76ffb16d` | Slices page; existing bounds/count/zoom workflow retained |
| Instrument sections, Drum grid, SID envelope, OPAL operators: `b4b04795`, `4a2972e2`, `2fdb3fcf`, `883cdb44` | Existing instrument pages already cover these workflows |
| Chiptune and grouped/contextual FX: `8199fa2d`, `69687e42`, `e3878d83`, `9e0406b9` | Existing Chiptune and command pages; extended for GB rather than duplicated |
| Safe Table KIL/STP: `b9595843` | Command reference already distinguishes delayed KIL and Table STP |
| Autosave dirty state and replacement confirmation: `d2ae539f`, `3e9286a9` | Projects/manage, autosave/backups, files/compatibility, troubleshooting |
| MIDI parsing/ownership/routing and iOS callbacks: `1b734e4c`, `9f26d4a7`, `70b2b195`, `378fa180`, `d99e8602`, `fc692b0a` | MIDI setup/capabilities; connection behavior unchanged. No new MIDI message support claimed. |
| iOS native host, Files, Bluetooth MIDI, background audio, responsive controls | Platform and MIDI pages; firmware `ios/README.md` |
| Layout/pixel fixes, VU telemetry, cursor highlights, naming case, focus/repeat fixes | Existing UI workflow remains authoritative; screenshots need updating only when their depicted behavior changes |
| Memory/queue/race/ownership/build/format/test changes and reversions | Developer architecture/build/test guidance; no duplicate user-facing feature pages |

## Source anchors

- `Application/Instruments/InstrumentBank.cpp`, `TrackVoices.h`: allocation and ownership.
- `GBInstrument.cpp`, `GBEngine.h`: stored fields, runtime behavior, limits.
- `Application/UI2/Ui2InstrumentParameters.h`, `UI2/Views/Instrument/UiInstrumentSections.h`: visible labels, ranges, sections.
- `Foundation/Types/FxCommands.h`: actual FX capabilities and SIP descriptions.
- `Foundation/Types/SynthLevel.h`: gain calibration, not normalization.
- `Application/UI2/Ui2TrackerApplication.cpp`: Device field visibility and animation.
- `web/src/stores/input.js`, `ios/NullPeratorIOS/Controllers/GameControllerBridge.swift`: physical mappings.
- `Adapters/node/hal/nullperator/power/power.cpp`: voltage versus active-low charge status.
- `.github/workflows/wasm.yml`: host/build/browser/static checks and deployment conditions.

## Complete commit inventory

Reproduce from the firmware repository:

```sh
git log --first-parent --reverse --format='%h %s' \
  7810f2f1a63148456db52d21ac708c4ae01ec337..862fe42b
```

<details>
<summary>766 reviewed commit subjects (oldest first)</summary>

```text
f1327842 node: ESP32S3 port (squashed)
361f92ae Working I guess
c18a3199 Small changes
2aeee16c Small changes
c50a353f Changes
a832b548 Updates
7a78fe20 Resync
c44f3878 Increased stack size
51193e25 Play button hack
d8135784 Increased sleep hold time
c2842e9d Disable build string at boot
0d7a33ee GUI lock
c219cbbf Stealth57 font
9c158d61 Adjust display width to 240px
b65fee02 Updated base view anchor & title position
3ea02e7a Improved map visualizer
951dc34d Temp note visualizer
90ec3eca View improvements
220ede9b Show status text at the bottom of the screen
4748b2ce M8 inspired theme
8303c5e2 Node app window config
d00ef559 Fix time view pos
a11b40e0 Dynamic app window centering
a9361ac9 Node brightness control
802dcc12 Better node loading visual
b8dc64a3 Node use 240mhz CPU
85013cc8 Node use PSRAM
841767ae Node pin task to core 0
ff7460cc Audio improvements
6581524c Node adapter refactored
5ca6ec62 Fix issue trace errors
a9cdcb37 Fix UI color use
01b27c67 Display Improvements
664b6280 Naming changes
c202a60e ES8389 driver improve
fdd65684 Fix time display in song view
f72af05b Display driver improvement
79f13b13 git ignore imprvement
37e33be8 Input Task Stack size increase
3eb3f789 Fix cursor rendering in song view
019fd22a UV meter on NullPerator
93e3ac15 Disable UV in chain view
d9cdac25 Mixer view improvement
32fa2a75 Project & Device page relocated
433884b8 Instrument UI improvement
45c67c75 Instrument views re layout
e7479419 Move Import Instrument Title position
df57d607 Fix issues in Instrument view causing hard fault.
9810d2ff Glyph for nullperator
5c832f8f Mixer view shows mixer
4f2533fa Move battery pos
e087efa5 Clock time & battery render improvement
418fc2c0 NullPerator Power button UI
277dfad9 Fix battery flasing
a0b1c9c6 Move anchor
78fc5495 Theme UI improvement
b5f2f74c Track now shows T# instea just # or 0#
e6e4233c Help legend UI fix
d90fc227 Help Legend text fix
13194cdd Help Legend Multi Line
9c66514b Unknown command shows ??? instead ?
3f320cf0 Fix table view title disappear if no command
4ae3e580 UI refinement
b0175802 Fix nullperator input lag.
24d9c2b8 Project view relayouted
a54787da Revert prev sample instrument changes
06838f7a audio improve log update
d47b27f2 audio: queue node output buffers
46297255 audio: mark hot buffers as fast data
725f16e6 audio: keep small node samples internal
83ede0b6 audio: clamp render buffer length
2e9a5d6e audio: optimize mix output loops
9d9d78ba audio: fast path simple sample playback
203043b9 audio: increase node i2s dma frames
502ad315 WIP
780335ba fix(node): move headphone routing to input task
cd81c46f fix(node): reject truncated sample imports
1d831e21 fix(node): restore parent directory navigation
288fa81d fix(ui): restore upstream modal layout
ce18fd58 docs(audio): track temporary node buffer count
06b246e6 docs(node): explain disabled task watchdog
d1a7fba8 fix(node): release one-shot timer handles
38503396 fix(node): clip display fill rectangles
939d23a0 fix(audio): correct static driver ownership
87c86f3f fix(node): log event task startup failures
b8466fdf fix(node): constrain filesystem paths to SD mount
c80dccdf fix(node): remap edit button as enter
d43f758c docs(wasm): define web workbench architecture
d7b4e0ad docs(wasm): add complete workbench implementation plan
23d696ac build(wasm): add isolated static workbench shell
795f603f feat(wasm): add runtime lifecycle
694885bd feat(wasm): add browser platform services
ffc1215f feat(wasm): render complete tracker UI with SDL2
7919e185 feat(wasm): add complete interactive controls
4418c875 feat(wasm): add realtime PCM transport
5a2b5e47 feat(wasm): add low-latency browser audio
25c16320 feat(wasm): persist projects and samples with IDBFS
6d40821a feat(web): add virtual disk file tools
af4ebad1 fix(node): align Operator START chord semantics
5e8b6476 fix(project): restore standard delete confirmation
b45eb1fd fix(node): use ALT+PLAY for playback controls
c2f7ff6d fix(wasm-ui): render the Node 240x240 text grid
8597b810 fix(wasm): prevent sample import varargs trap
8d4e3672 fix(wasm): defer IDBFS sync until frame boundary
068284c8 feat(web-storage): add transactional host folder sync
5d74a485 feat(web-files): add explicit host folder mirror
82765b6b feat(web-storage): add durability fences and unload protection
ca276d08 feat(wasm): expose application model snapshot
9d8e6785 feat(wasm): add runtime observability and Web MIDI
2885496a feat(web): complete MatrixOS-style WASM workbench
2d4f6efa fix(web-midi): await native reset before reconnect
47a8cd59 test(wasm-ui): refresh Node boot snapshot
b54d4ee4 docs(wasm): add workbench operations and serial CI
f187ba89 refactor(web-ui): simplify device simulator
283ae193 fix(web-ui): remove Alt Play chord hint
487a46d2 refactor(web-ui): adopt minimal Operator control layout
7161741b fix(web-ui): prevent scaled control overlap
8811d749 refactor(web-ui): gate default AudioWorklet with sound prompt
fc24c887 refactor(web-ui): simplify branding and mirror keyboard state
67c182e6 fix(web-ui): restore 203 branding
3f7a57ec docs(ui2): define rendering architecture
342c87ff test(ui2): lock approved golden frames
acfaa0cf feat(ui2): add fixed-memory render core
86e0b801 feat(ui2): add deterministic text and semantic palette
1a1b6e61 feat(ui2): add animated chrome and golden Song view
3456ba97 feat(wasm): add ui2 framebuffer presenter
e9c06d1f feat(ui2): connect shared Song runtime to web preview
4faede6c perf(ui2): render Song changes with dirty regions
af6634cf feat(ui2): render Song and Phrase on firmware
ce30ef23 feat(ui2): port phrase and instrument tables
27cdee4c feat(ui2): reproduce approved instrument states
4f5338eb feat(ui2): reproduce approved mixer view
c2a03df7 feat(ui2): reproduce approved groove view
c5952da1 feat(ui2): reproduce approved chain view
81cdf851 test(ui2): lock approved top bar states
7cb466d9 feat(ui2): reproduce approved project states
0067bc37 feat(ui2): reproduce approved device state
4e51819a feat(ui2): separate approved theme and font views
598f7515 feat(ui2): share approved browser views
22a69a1c test(ui2): center approved record prompt
79730afc feat(ui2): reproduce approved record view
849c74c8 feat(ui2): reproduce approved sample workflows
4cae9367 feat(ui2): reproduce approved dialog states
ca3a1d9c feat(ui2): add semantic themes and scrolling lists
a20b1de3 feat(ui2): wire tracker runtime and interaction states
e5c471e0 feat(ui2): add live selection and view snapshots
28211d83 feat(ui2): integrate device browsers and dialogs
6417f0eb feat(ui2): expand runtime view coverage
51858bd5 refactor(ui2): extract native application controllers
c2db35e0 feat(ui2): run wasm through native application host
4c4de437 feat(ui2): migrate native settings pages
12a26c18 feat(ui2): own rename flow natively
768e1ba3 feat(ui2): make mixer controls native
e45fda3f fix(ui2): display device levels as percentages
1ebd4ab3 fix(ui2): restore project value editing
fb9d5f58 fix(ui2): refine project selectors
e22261cc fix(ui2): align project selectors with device
f3a7db8c fix(ui2): compact wrapping scale selector
9d42950a feat(ui2): show edit adjustment legend
960cb7cc fix(ui2): use enter for numeric adjustment
96dabc6c fix(ui2): draw adjustment arrows as chevrons
fc1ddb2c fix(ui2): retain enter adjustment for project selectors
d73c32cc feat(ui2): show adjustment legend while editing grid values
9095e809 fix(ui2): label chain transpose octave step
ba45eb06 fix(ui2): wrap project root selector
b39b8cb5 feat(ui2): show song live mode selector on edit
fa079eea fix(ui2): redraw song mode selector on change
7cec7bee fix(ui2): project tracker nav state into top bar
16a1992e fix(player): ignore start before audio is ready
2949f737 fix(ui2): unify start navigation in firmware
23063176 fix(ui2): animate contextual navigation map
280ad611 feat(ui2): add native project render lifecycle
d1b132bd test(ui2): add grid model storage stubs
8c230d97 fix(persistency): harden project and instrument storage
94f1e035 feat(session): add autosave and firmware lifecycle
fcb3e646 feat(ui2): implement native tracker controllers
aaf881ba fix(ui2): refine chrome and tracker layouts
a16aba18 refactor(input): align controls with M8 semantics
d029b40b feat(ui2): wire native application workflows
313d2530 build(ui2): select native product pipeline
9737b9d6 fix(ui2): preserve factory project loading compatibility
1017a1bb fix(ui2): restore live playback note feedback
28a4d99b fix(model): restore platform-independent master volume default
e52231b9 refactor(player): publish fixed transport snapshot
b1261032 refactor(ui2): unify project mutation tracking
c09e27d2 refactor(ui2): extract project and groove workflows
911f86f6 refactor(wasm): remove legacy UI runtime graph
7b8fb8cc refactor(wasm): remove obsolete UI2 switch
386aa294 fix(samples): ignore browser rows in pool capacity
27b1ec76 refactor(ui2): remove dormant legacy runtime bridge
b1681446 refactor(filesystem): give project browser path snapshots
d781c2ec perf(ui2): bound project browser snapshot storage
28e50963 refactor(wasm): remove legacy framebuffer bridge
f900cc6d refactor(persistency): extract project file journal
bf278ef2 refactor(ui2): extract instrument lifecycle workflow
d46e17c0 refactor(repo): retire Pico and ADV targets
0a64f223 fix(node): retain vendored TinyUSB dependency
cbcdcc31 fix(node): tune physical display and controls
f1d67b0a perf(ui2): remove full-screen page scrolling
a2a0a5ff revert(node): remove uncalibrated display tone curve
ff7ed5f4 feat(node): add ST7789 gamma comparison mode
26f38e9e fix(node): use calibrated ST7789 gamma
18526bb4 fix(input): repeat held directions consistently
2faf399e fix(ui2): stabilize Sample instrument scrolling
fd51b515 refactor(device): remove Remote Display setting
1903d4b0 fix(ui2): clear Mixer VU when playback stops
69691f1a fix(player): publish transport state across cores
039349e0 fix(ui2): complete Instrument selector contracts
69890ca9 fix(web): forward held direction repeats
e9eea0b4 fix(ui2): harden browser roots and clipboard semantics
8509cff6 fix(web): distinguish disabled audio from failure
a87ada4e refactor(ui2): normalize tracker column spacing
50580040 feat(web): add mobile play mode
ad9b0064 refactor(web): simplify mobile play mode
c4c63f3e build(node): honor configured optimization level
0d2d0604 perf(sampler): use bounded fixed-point multiplies
9b97c704 perf(sampler): skip idle k-rate updates
7a07b9e1 perf(sampler): enable targeted O3 optimization
9eaf3483 fix(ui2): restore tracker playback and selection feedback
31f9aee7 fix(node): restore physical edit button input
b6faf0f7 perf(sampler): keep hot path at O2 after hardware profiling
2af7bb37 fix(ui2): align rename action focus with bottom bar
7861a73a fix(ui2): disable saving empty rename drafts
6956873d feat: expand phrase capacity to 255
a82d1fe6 Optimize sample import scratch allocation
8ade0a62 Delay sample PSRAM arena allocation
ed9a84f8 Remove display gamma calibration mode
fd081401 Add task stack telemetry and trim worker stacks
8020bb7c Guard sample import resampler lifetime
7bb0ca29 Protect internal SRAM from sample fallback
a929cdc6 Reduce WAV recording scratch buffer
135c393f fix(ui2): hide stale playback markers
91edc48d Remove production audio profiler
56258904 Define MIDI queue overflow behavior
06ebb7d4 Release Node sample pool storage on shutdown
abaa843f Use contiguous storage for variable registries
c1a2ff26 Remove unused audio and project state
9514eacf Disable unused FreeRTOS task statistics
d4456a21 Update ETL to 20.48.1
51d9ce59 Define sample updater overflow behavior
c645f614 Remove duplicate sample instrument include
bfa23cce Expose the ETL include root to all targets
3fe1b0b5 Report truncated filesystem listings
bcd0c9dc Apply the ETL profile consistently
44d351a7 Move Node directory cache allocations to PSRAM
b279e398 Replace stream-based Node path parsing
889019cd feat(ui2): show complete playback state
c0fda442 fix(build): remove unused opal profiler dependency
b5eba73b fix(wasm): avoid const ETL expected access in waveform loader
63b5d0f0 test: register main host suite with CTest
8dacabc1 Fix Live Shift-Play stop request
6c58b722 test: expose ETL include root to host targets
3a12aee0 test: update host fixtures for ETL vectors
59e9e6c4 test: make UI2 golden suite opt-in
b6d4eb61 fix(model): format float variables without varargs mismatch
d115b4a3 fix(web): register Font diagnostic view
4ea5fc49 fix(ui2): follow model instrument capacity
52eb6bbf test(web): align input e2e semantics
f46ee548 fix(build): contain TinyXML stdio remapping
1a58128f test(ui2): align tracker cursor layout assertions
ab226243 test(ui2): expect user-facing boolean labels
4acddb34 fix(ui2): use song transport from Mixer
8216f6ec refactor(ui2): single-source VU mapping
7811573b fix(wasm): enter real diagnostic view controllers
b2328701 fix(ui2): start context Shift-Play at song cursor
57b11c09 refactor(sample): mark instrument interface overrides
de11b5b4 fix(ui2): hide internal untitled project name
d39b07f5 fix(ui2): add Groove global Shift-Play
870fe3f0 fix(ui2): add Groove solo playback chords
90133d08 feat(ui2): present saving state before persistence
e92a9496 fix(ui2): surface autosave failures
9bd00ecd fix(ui2): disable unsupported sample save actions
3f2a3947 fix(ui2): make sample editor actions fail closed
c706cb44 refactor(ui2): remove obsolete scene buffer alias
634ce86f refactor(ui2): remove unused nav resolver inputs
0b2fa60c fix(ui2): label native themes as NPT
c35e7942 fix(ui2): keep section jumps stable without a target
eab4401e fix(ui2): expose unavailable slice replacement
906f61f0 build(wasm): avoid locking git during configure
351dca9d fix(ui2): make unavailable recording read-only
83da4f40 refactor(audio): mark output driver overrides
8fb8f1fe build(opal): scope GCC warning suppression
c6ba8219 fix(ui2): wire theme RGB color editing
ed3ce0f6 fix(ui2): restore complete theme edit chords
074a4ab3 perf(ui2): rebuild edited theme once per frame
945e168f fix(persistence): bound TinyXML formatted writes
0a9cefea test(ui2): expect bottom bar through screen edge
d47df744 fix(ui2): repaint dialogs after live page deltas
9448dd55 feat(ui2): add nonblocking feedback overlay
6ffd71c0 fix(ui2): surface allocation and config failures
7552c746 test(ui2): cover feedback timing and live redraw
74cd34df test(persistence): cover bounded formatted writes
9e8fb055 Fix UI2 font page contract
c292082e Avoid redundant default font saves
1de7194e Clear full-width font delta text
2cda63ae Fix UI2 Font cursor animation
cc4912ed fix(ui2): restore Phrase instrument clone chord
0ac260ee fix(ui2): restore referenced Table clone chord
9dc15a0a fix(ui2): reserve pasted Phrase references
cb3212e0 fix(ui2): keep sample browser inside library root
265b2727 fix(ui2): repeat held directions in browsers
08d986c5 fix(ui2): show instrument export feedback
df185dee fix(ui2): report instrument type failures
123e94e7 fix(ui2): remove stale browser metadata
e330b96d fix(ui2): preserve settings names casing
675c0b3f fix(ui2): restore Groove playback cursor
9868917d build: remove orphaned time service target
51b9a9c7 build: drop empty sound source translation unit
6d0cde58 build: declare observable library ownership
1a9fab72 build: attach timer implementations to timer service
4b3d1313 build: remove executable dependency leaks
c2789204 build(node): declare sampler heap dependency
3394041c build(wasm): drop empty template translation units
907f200b build: drop empty core translation units
8655ead6 build: declare command dispatcher dependencies
ea7850be fix(ui2): clear sample page top metadata
f64dbacc fix(ui2): preserve sample filename casing
6a2e5dfb fix(ui2): reject unsavable project names
d955d578 fix(ui2): reject renaming empty instruments
7092fdfc fix(ui2): reject unsavable theme names
97fb2127 fix(ui2): apply synchronized Groove edits
af36a7c9 fix(ui2): preserve inherited Phrase instrument
cb08c456 fix(ui2): make sample directory back reachable
58712f36 test: drop removed header-only sources
c9d09822 fix(ui2): connect FX value paste-last
53bb5459 fix(ui2): share clipboard across Table contexts
19258385 fix(ui2): keep folders in sample library filter
7b2ad439 fix(ui2): preserve sample editor filename case
13b0a075 refactor(ui2): remove unused slice count state
af537ccc fix(player): reject empty phrase storage sentinel
db6b282b fix(player): bound the final song transition
9e2f8f64 fix(ui2): preserve names in confirmation dialogs
843e1aa4 feat(ui2): add independent selection palette
ed181f51 fix(ui2): surface sample browser open failures
97d696de fix(ui2): distinguish project browser failures
90c5b3ae perf(ui2): coalesce font case persistence
548a7670 fix(ui2): restore instrument import title
83c26a7d test(ui2): retain sample editor adapter state
d2649661 ci: run every host CTest target
0b5910f5 fix(ui2): clear completed sample previews
d15c1f15 fix(ui2): share FX selections across phrase and table
d12514ca fix(player): honor context playback requests
c015d857 fix(web): keep mobile controls visible in landscape
63d9b1af feat(ui2): add Groove selection editing
d27eaa01 feat(ui2): present Groove selection mode
7b52ca6d fix(ui2): ignore instrument modal opener repeats
413f40af refactor(node): trim unused UI2 input APIs
6840c418 fix(ui2): gate project dialog opener input
8807f8d1 refactor(node): remove unused HAL declarations
55a96b16 perf(ui2): cache stable VU gradients
6fe6f168 fix(ui2): gate device dialog opener input
fba962f4 fix(ui2): gate sample delete dialog input
0106212a fix(ui2): gate rename opener input
da1997ac fix(ui2): gate companion instrument dialog input
38fd1aba refactor(wasm): remove unused GUI compatibility APIs
aafb74a7 refactor(wasm): trim unused audio and MIDI accessors
7837dfda refactor(ui2): remove unused animation queries
5099f21c refactor(ui2): trim unused controller accessors
7cf09909 refactor(ui2): remove unused layout constants
0f9281f5 fix(web): follow automatic mobile mode on resize
4bc892d3 fix(web): keep compact controls inside short screens
c94bbe70 fix(web): recognize modern phone landscape mode
85bb6e82 fix(web): persist the developer mode preference
b699dd8f fix(web): prevent recovery focus scrolling
03f2a8cd fix(ui2): add M8 browser row jumps
766ea86f fix(web): enlarge mobile settings touch targets
1753f642 fix(web): enlarge the developer toggle target
8c312309 perf(ui2): batch RGB565 palette lookups
16b0b371 perf(ui2): swap dirty run buffers
d24ce996 perf(ui2): avoid printf for frame text copies
77cf4326 perf(ui2): format note cells without printf
e135d311 fix(ui2): read played notes without shared text aliases
b6c5b16c perf(ui2): batch rounded rectangle fills
e3b963b4 refactor(player): remove obsolete played-text accessors
6f33115b fix(ui2): restore sample pool delete chord
34f4b209 fix(ui2): ignore preview repeats after external stop
540753c1 fix(web): keep the display visible across mode switches
a5f90878 refactor(ui2): remove unreachable browser back commands
74a60951 fix(ui2): retain navigation chord after page activation
51e338e3 fix(ui2): keep action repeats edge-triggered
aba0ac5b test(node): add IRAM span budget checker
384172e7 build(node): enforce IRAM span budget
4facaefc fix(ui2): dim muted tracker playback ticks
13b918c4 fix(ui2): edge-trigger navigation chords
ff51d4fd fix(ui2): hide stale table playback cursors
3c6c2826 fix(ui2): retain references pasted from selections
5f45369b fix(ui2): retain Shift across non-grid navigation
921d4ae0 test(ui2): cover pasted table reference retention
4fc548f9 fix(ui2): retain Shift when returning to sample browser
4ebc99bf test(ui2): verify pasted table reference allocation
a00ec2af fix(ui2): preserve the full sample end bound
e91119d7 refactor(ui2): remove orphaned page transitions
53aa753e refactor(ui2): clarify dynamic palette ownership
2b423d7a refactor(ui2): share controller input state
214a13ce refactor(ui2): remove redundant runtime support probe
ab6145aa fix(web): preserve focus across mode switches
82e3f9f3 fix(web): expose developer tool panel state
ef1f9fac fix(web): isolate the audio unlock modal
95f14689 fix(web): restore focus after automatic mode changes
21262f8f fix(web): ignore input while the runtime is unavailable
f66b7086 fix(web): make host conflicts truly modal
dc497cd4 fix(sample): guard default size queries from render state
659e498c refactor(ui2): remove unused RGBA conversion API
1418d256 perf(ui2): fast-path pixel dirty marking
2e3e44a0 chore(ui2): clarify VU palette ownership
1576e625 fix(opal): apply each operator keyscale
e670a976 fix(web): make play settings globally modal
8774df33 fix(web): preserve focus through runtime recovery
45926165 fix(opal): apply instrument feedback
49bd7cc0 fix(opal): apply deep tremolo and vibrato
0e2466c5 fix(sid): initialize playback state
91644191 fix(player): initialize channel activity state
08d46e48 fix(midi): initialize playback state
d2a46caa fix(midi): release note zero
3f03b54c fix(web): release keys after focus changes
88c64a8f fix(macro): initialize render gain
e5586a15 fix(midi): finish instant pitch bends
0b748da4 fix(ui2): recover interrupted sample deletes
a44a8892 fix(ui2): reject truncated project listings
3b07303b refactor(midi): remove unused playback flag
0dd8cb65 refactor(midi): remove unused note preview path
bb700f40 refactor(midi): remove unused channel setter
d8e17858 fix(sample): refresh bounded pan gains
65e175bf fix(midi): advance note length on ticks
52b3d344 fix(web): ignore inactive key releases
3c8d5748 refactor(opal): remove unused channel declarations
4fcaaa4b refactor(instruments): remove player mixer dependency
196c643c refactor(macro): trim unused dependencies
34c241cf fix(ui2): cue Live Song rows with left play
c3db65c6 fix(opal): initialize gate register state
7b7ff469 refactor(ui2): remove obsolete transition timeline
17bb1a04 fix(sample): track active playback channels
9887af24 refactor(midi): remove discarded empty checks
6226e481 fix(wav): reject inconsistent frame alignment
be754070 refactor(midi): remove unused device name read
d60455b9 fix(midi): cancel pending note on when stopped
164945c4 fix(player): allow context transport in Live mode
29ed2df1 fix(midi): size queue for playback boundaries
c299cab1 fix(midi): isolate tracker voice lifecycle state
441a80a9 fix(wav): reject overflowing chunk lengths
06bce09d fix(wav): validate extensible subtype GUIDs
5f8269c2 refactor(midi): honor selected input voice slot
8677b94d refactor(midi): remove unused input note state
c9acbc3a fix(wav): default headers to 16-bit PCM
272d80bf fix(wav): validate extensible payload size
3025a8a2 perf(ui2): format transport time without printf
9f26d4a7 fix(midi): honor input channel routing
448e1e1b fix(midi): release input voices on device lifecycle
2bcfda71 refactor(midi): remove unused input event hooks
2a4e4a82 fix(midi): preserve stopped state on driver failure
32c9fafa fix(wav): zero-pad reads at logical EOF
85946645 fix(midi): preserve routing across input devices
1b734e4c fix(midi): parse running status across byte streams
9a3f9b3d fix(audio): reject empty record streams
d66127af fix(player): retain audio for overlapping sources
38c29c6d fix(midi): release replaced chord notes
147d23f8 fix(midi): stop misrouting input notifications
1a2057b9 perf(ui2): avoid printf for mixer volumes
efcd7765 refactor(midi): remove unreachable event dump toggle
ff028249 refactor(midi): remove unused transport callbacks
5af37e3f refactor(midi): trim unused service dependencies
c12c2b83 perf(ui2): avoid printf for device percentages
4e3ab7a2 fix(midi): keep instrument data in protocol range
576a95f9 perf(ui2): format bounded percentages without printf
55f6e133 fix(midi): encode short messages consistently
c359b632 fix(ui2): report blocked sample open actions
240eb324 fix(ui2): block instrument imports while playing
fab3216f refactor(ui2): make surface offsets explicitly unsigned
77408977 fix(observable): retain unmatched single observer
c12bfd02 refactor(ui2): decode binary widths explicitly
811b5337 fix(ui2): reveal final theme color row
21395767 fix(wasm): apply tracker output volume
677d3287 fix(observable): tolerate self-removal during notify
0adef72a fix(ui2): exclude next slice from preview span
d29343d8 fix(ui2): bound bottom bar item counts
c66fbdc5 fix(ui2): ignore unmatched live song edit releases
f70c4c27 fix(ui2): reject terminal slice previews
6d6f2604 fix(web): rebind host sync after denied folder change
c42e2d07 fix(audio): report stereo peak magnitudes correctly
cecd2671 fix(ui2): align project action order
eb178d5b refactor(ui2): remove dead render-start state
0c7eed3e fix(ui2): retain muted playback under cursors
b89c4aec refactor(ui2): use bounded chrome indices
f0176ac8 perf(ui2): avoid per-pixel RGB565 conversion calls
40db2d8a fix(ui2): page through theme browser with option
11c40275 fix(node): preserve short UI2 input chords
27040cf4 test(web): follow current project action order
4f188a69 fix(wasm): clear closed diagnostic modals
7f5dd696 test(web): follow approved import chrome
84b9603c perf(ui2): batch frame-region damage tracking
bd53650f fix(node): synchronize audio worker run state
c6411905 fix(node): synchronize codec state across tasks
e4ae8d1c refactor(node): remove dead audio adapter state
bc453214 fix(node): preserve recycled UI2 input edges
e4681b8e fix(node): retain short UI2 modifier chords
965fc706 fix(ui2): retain mute chords in selections
4d7b03a3 fix(ui2): isolate selection solo from copy
b1196ae0 fix(audio): publish mixer meters atomically
eb16bd3f fix(audio): synchronize channel mute state
e1026182 refactor(input): align Node button mapping comments
aae2a070 fix(audio): protect project resources from active voices
197eba52 fix(ui2): dim inactive font actions
7bab3865 refactor(ui2): remove retired settings adapters
b9ca9ece refactor(ui2): remove unused modal input gate
f6592686 refactor(input): drop retired button mask aliases
30b61ef4 refactor(ui2): share font text case domain
52278085 fix(wasm): trace native UI2 input dispatch
50e8f7aa fix(player): publish coherent transport snapshots
e69c9c3a fix(ui2): reject out-of-range groove rows
732719cf fix(ui2): suppress type row field edits
8a2a1436 fix(audio): publish played-note telemetry atomically
b1a8ff38 fix(audio): pack groove cursor telemetry atomically
b4004269 fix(audio): snapshot table playback telemetry
5c5035d6 fix(audio): synchronize preview streamer status
303cc8c2 chore: ignore Python tooling caches
75624cd1 fix(node): preload safe audio expander outputs
f7b6b70f refactor(ui2): remove unused browser command predicate
49c8f50c fix(player): bound song transport track ranges
b09fb460 fix(player): process all immediate live starts
dc3289f8 fix(player): end stop-at-end ticks immediately
da7ea489 feat(instruments): expand logical and sample capacity
92b22d74 fix(converter): preserve expanded instrument types
347819de fix(audio): propagate mixer startup failures
8fef9e18 fix(player): gate transport on audio readiness
9bbdb44c fix(player): validate direct note targets
566e958a fix(player): reset mixer lifecycle state
c6ad6800 fix(player): complete stop-at-end teardown
7b5f651c fix(player): retry failed audio initialization
a6111794 fix(ui2): name untitled projects before saving
58092c94 fix(ui2): validate live transport note fallback
74db6e93 fix(ui2): right-align playing elapsed text
233590d5 fix(ui2): map battery fill to percentage
c0492781 fix(ui2): align theme palette rows
54060775 fix(ui2): align tracker grid geometry
a84ea4b6 fix(wasm): prefill audio before worklet startup
ddc5bd83 fix(wasm): retry audio resume on trusted gestures
819db0c4 test(node): lock UI2 physical button mapping
4dcdf877 fix(ui2): restore sample filter controls
0edc1828 fix(web): contain audio gate focus
bc7d5c6e test(web): realign factory project controls
bdef48f0 refactor(audio): localize node buffer ownership
55198f16 fix(node): validate audio buffer submissions
30311a8e refactor(node): remove redundant audio state
e3816d46 refactor(audio): silence default activity hook warning
afe25b30 perf(audio): remove unused output peak scan
d23494e6 refactor(audio): remove duplicate settings storage
da00946e fix(ui2): accept either selection cut chord order
83c4e1cb fix(ui2): clamp font row navigation
3791850e fix(ui2): accept either cell cut chord order
4a091cd5 fix(ui2): preserve mute chord during cell cut
79b106ce feat(ui2): add atomic sample edit transaction
d35ff7ef fix(ui2): isolate sample edit journals
3858357b feat(ui2): expose safe sample rewrite controls
cd47208f fix(ui2): preserve sample backup across save retries
df6bc9ca feat(ui2): connect sample edit persistence
54ff0165 test(web): verify sample editor atomic save
3ec136bd fix(ui2): expose parent project navigation
9e39afba fix(ui2): preserve battery fullness while charging
1eae9884 test(ui2): account for parent navigation row
574b3c6b refactor(ui2): remove dormant sample rename path
39f9c0a9 fix(sample): reject unsupported normalize encodings
28905b70 fix(sample): propagate normalize sync failures
ea26d0bc fix(sample): discard no-op edit copies
da9221eb fix(sample): bound edit journal filenames
f715f296 fix(sample): recover edit journals during directory scans
77d03858 fix(ui2): make single-cell cut atomic
a4197d16 refactor(sample): apply edits cooperatively
392a0c0d fix(ui2): advance sample edits from application tick
56eda4b4 fix(ui2): defer edit until cut chord resolves
a68e1f50 Revert "test(ui2): account for parent navigation row"
8c1015fa Revert "fix(ui2): expose parent project navigation"
007fff80 Reapply "fix(ui2): expose parent project navigation"
7b595f69 Reapply "test(ui2): account for parent navigation row"
fc417c52 fix(player): guard transport after audio rollback
98f87a75 fix(ui2): preserve retryable sample saves
aaeff0da fix(audio): safely truncate finalized WAV data
e9d5f671 fix(audio): validate sample journal backup ownership
051d9be2 fix(audio): finalize canonical WAVs without parse errors
6851e01b fix(player): acquire readiness before bindings
d0e2d99e fix(audio): open new WAVs for header finalization
1dd3fe87 fix(ui2): recover non-retryable sample saves
7abe51e1 feat(ui2): recolor text under animated cursors
c6cd6597 chore(release): set Nullperator version to 0.1
3458dc58 feat(ui2): explain selection copy and expansion
e9e4e6ac refactor(input): rename edit action to enter
16ee3cce refactor(input): remove remaining semantic aliases
2abe0f7b refactor(node): map HAL buttons directly to actions
84b27592 refactor(input): remove unused button mask aliases
2a91ebab refactor(input): centralize action validation
2d19e7a6 refactor(ui2): unify tracker grid state
2ffd4632 feat(ui2): animate saving status
86e878bb fix(ui2): show paste-ready clipboard state
f584037f fix(ui2): exit paste state after use
50d6a1c4 fix(ui2): make clipboard feedback transient
dc6c7ac6 feat(ui2): add groove interpolation feedback
c1cae1fb feat(ui2): show live notes across grid views
5d8f96e9 fix(ui2): show branded device version
68a3f1ec fix(ui2): use aligned solid playback icon
740fdc39 fix(ui2): keep instrument tail selection visible
14463de2 fix(ui2): surface silent paste and render failures
d8db044a refactor(record): model nullperator input sources
cd9273a0 feat(record): implement nullperator capture lifecycle
ab9f5fa1 fix(record): name nullperator input sources
fb9418d0 feat(ui2): complete sample slice editing
fc476258 fix(ui2): anchor device version above bottom bar
af9875cc fix(ui2): distinguish lowercase p glyph
b8e8ecce fix(ui2): render rename keyboard case literally
7e1c8393 feat(ui2): add pixel icons to rename keyboard
b48b4596 fix(ui2): keep active rename shift neutral
1fef2dee fix(ui2): tighten rename special-key cursors
8ccc781a fix(ui2): dim disabled rename save action
c2145ee0 feat(project): adopt NP0.1 format marker
34905f2c refactor(project): separate schema from product version
bb3e56a9 feat(ios): add native C++ runtime adapter
39523111 feat(web): support injected native runtime host
2956c700 feat(ios): add native application shell
d1f10582 docs(ios): add App Store submission material
48c88648 fix(ios): restore native viewport layout
add66258 refine(ios): enlarge directional controls inward
8dc78d79 refine(ios): simplify settings status details
8ddebc32 refine(ios): align software version details
5940b508 refine(ios): update launch branding
ad93375f refine(ios): rebalance launch branding
1aaa9876 fix(ios): remove splash fade transition
2bb1506f fix(ios): rasterize launch wordmarks
b6a7041f fix(ios): invalidate stale launch screen cache
2feabfc2 Revert "fix(ios): invalidate stale launch screen cache"
bad182a6 test(ios): cover native UI device layouts
1c7f00a8 test(ios): capture native layout states
c8dedd62 fix(ios): align native controls across layouts
6ff3c7c0 fix(ios): inset phone portrait controls
0dd088ee fix(ios): restore established phone layout
e55cc698 fix(ios): match approved iPhone Pro layout
98ea4c72 build(ios): package approved phone layout
dc40acf7 fix(ios): keep splash branding position stable
f3918747 fix(ios): adapt controls to unified input actions
3ac89086 fix(ios): keep play and shift ordering consistent
a1edf86a fix(ios): hide unavailable device settings
af125790 chore(ios): adopt production bundle identifier
f8b801c0 fix(ios): declare required reason APIs
8ed42c18 fix(ios): limit launch timing to debug builds
9b5faff5 feat(recording): support platform-managed input routes
f2e68087 feat(ios): record from the system audio input
3b5826e4 build(ios): derive bundle version from product version
4936c43a chore(ios): remove release packaging leftovers
45309f40 docs: align guides with current products
b4dd56ac docs: remove redundant project guides
c1dbd60b docs: rewrite project README for NullPerator
b653e7ee docs: rename hardware product references
b682bb25 docs: add adaptive NullPerator wordmark
8de256d8 ci(web): deploy wasm build to Vercel
fda564db fix(web): align play and shift controls
c50eb259 ci(web): keep visual goldens out of deployment gate
7e16b8ba test(web): align sound gate coverage with gesture recovery
128d9a03 ci(web): pull Vercel settings before prebuilt deploy
7fb58eb2 ci(web): deploy from main branch
867e0293 ci(web): target 203Null Vercel project
0919f180 feat(web): make developer tools additive
fe73df9b feat(web): make file workspace user-safe
1aa71a04 test(web): cover user-first responsive workflows
e32bbf2f style(web): align workbench with MatrixOS
a5d68e79 refactor(web): fold about into settings
df083b6f feat(web): add player display and controller controls
c7d832f5 style(web): adapt player layout to available space
b5baa5b5 fix(web): keep player controls below display
869edc48 style(web): remove workspace navigation label
ac5acb4a feat(web): link wiki from navigation
7f8c129b chore: ignore local reviews and one-off performance artifacts
aa334430 fix(web): validate ZIP imports and retain staged deletions
70b2b195 fix(midi): release active notes after channel remapping
b499d229 refactor(core): separate shared adapters and audio resource ownership
ed445fac fix(sampler): preserve Q15 phase and bound optimized render spans
6922f772 fix(ios): serialize timer restart and drain active callbacks
e216b2ce refactor(app): separate session workflows and persistence responsibilities
2fe0d014 ci: enforce adapter boundaries and ESP32 memory budgets
34c0c480 fix(ui): add parentheses to the tracker font
512420b4 fix(ui): display notes two octaves higher
d423f4c4 fix(ui): align natural and sharp note octaves
e95da184 fix(ui): saturate coarse edits at value bounds
f4ac173f fix(web): map play to X and shift to C
2e7d291b fix(project): accept legacy picoTracker patch versions
46e9c175 test(web): update factory workflows for play and shift keys
c893b15f feat(ui): refine tracker spacing and align stereo meters
2dd5bd07 fix(web): show full battery and align device options with iOS
26146dd3 fix(web): make audio unlock prompt non-blocking
d1a6f4d4 fix(ui): restore branded device version label
ce0b769e fix(ui): right-align battery percentage with a fixed icon gap
6b93cfbc feat(ui): show highlighted back hint in submenus while shift is held
5f3086a9 feat(ui): add hold-enter FX selector
70a42305 feat(ui): show editing legends for held values
d843c454 fix(ui): clarify FX command help text
960d2737 feat(ui): show Project hint while Shift is held
40dfe56f vendor(audio): import copingTracker drum and stack DSP sources
1919d427 fix(audio): adapt coping DSP and validate voice lifecycle
4eaf6c2b fix(audio): clamp detuned Stack notes before pitch multiplication
cb34d784 feat(instruments): integrate Drum and Stack voices with persistence
a7a22bf8 feat(ui): add Drum and Stack instrument parameter pages
be10cc0f fix(ui): remove SID and OPAL experimental labels
31c9a0d9 fix(ui): highlight mixer values with cursor backgrounds
8f756643 fix(ui): animate mixer value cursor with partial text highlighting
652a4443 style: apply clang-format 17 across CI-checked sources
14411f4f fix(tests): link TinyXML DOM typeinfo for sanitizer builds
5ea5ace6 fix(e2e): use current Play and Shift keyboard bindings
6bc2c638 fix(deploy): publish only WASM artifacts built by GitHub Actions
6a18c1ea fix(xml): use I_File seek and tell on every host platform
2e9c8d81 fix(esp32): preserve TinyUSB FreeRTOS include path during formatting
d384a743 fix(ui): fill grid cells immediately on Enter press
b4b04795 feat(ui): add Drum parameter grid and instrument-owned note editing
b93af000 fix(ui): show Drum wave selector only while Enter is held
df7880e2 feat(ios): add Wiki and Discord settings links
a3ec8e41 feat(web): add Discord link above Wiki navigation
b92a1afa chore(ios): prepare App Store build 2
2710d903 feat(device): add persisted cursor animation toggle
b9da0c4c fix(instrument): split sample Load and Edit actions
c5ef57be fix(samples): allow browser navigation above samples directory
045b4fd8 fix(theme): browse and import themes outside default directory
e1a14680 fix(font): show case selector for case field
32f983c1 fix(font): acknowledge unavailable browser with OK dialog
fb6329d0 fix(samples): reuse loaded samples and keep editing outside browser
37274886 fix(ui): show coarse adjustment hints only while Enter is held
7cd2cffe fix(ui): center fine adjustment hint between side arrows
14e5ef8c style(ui): tighten centered adjustment arrow spacing
6202f84d fix(instrument): show digit editing hints for component fields
2606ab14 fix(sample): edit both filter components and audit parameter bounds
08e63e1b fix(instrument): require Enter for component editing
beb71879 fix(opal): show Edit for operator table navigation
9725a30a fix(drum): show Edit for table navigation
ab891621 fix(sid): edit cutoff by hexadecimal digit
8aa12e12 fix(slices): stabilize field focus and add digit position editing
e5cff508 fix(ui): label sample editor as Sample Edit
d6e264d0 fix(slices): preserve sample beginning on first Add
d2ae539f fix(project): confirm replacement of unsaved changes after autosave
de4a53af fix(ui): place affirmative confirmation actions on the right
349eb074 fix(display): apply font casing to Device theme and font labels
fccbea9d feat(audio): capture iOS and web microphones only while recording
0fdd0a8c feat(samples): import named WAV files from iOS and web pickers
de1ab369 feat(samples): streamline recording and transactional sample editing
76ffb16d fix(slices): bound selection and unify count zoom and auto slicing
4a2972e2 feat(instruments): group parameters into sections and compact table headers
068c59c8 feat(project): add section divider above project name
7e61a4bd fix(ui): move playback indicator one pixel left
2fdb3fcf feat(sid): reuse Drum table layout and cell editing for envelope
883cdb44 fix(opal): highlight operator headers only while focused
e3ec6e9e fix(ios): preserve valid microphone frames without zero padding
0d3ef220 fix(samples): toggle preview playback with a single Play tap
1be7468d fix(web): use the application clock for sample playhead updates
966e329a fix(ios): fit Large UI controls within narrow viewports
378fa180 fix(ios): prevent external MIDI crashes and allow audio mixing
d99e8602 fix(ios): receive CoreMIDI packets outside MainActor
fc692b0a fix(ios): receive MIDI device notifications outside MainActor
8199fa2d feat(instruments): port Chiptune and extend Stack FX
fd3f0e73 feat(sample): add independent vibrato command
b9595843 fix(table): schedule KIL and handle STP safely
69687e42 feat(ui): group FX directory and show instrument support
e3878d83 feat(ui): show contextual help while editing FX values
9e0406b9 fix(ui): align FX help with page and instrument semantics
6df3d68d chore(ios): prepare App Store release 0.1.1 build 3
20693788 fix(node): correct active-low charging status
e3261c36 feat(instruments): allocate flexible slots with shared voice storage
e05146f3 feat(instruments): add GB Wave Pulse and Noise synths with native FX
d49090c2 fix(audio): calibrate synth output against sample playback
00755bbd fix(node): correct codec input routing and independent mute controls
f9ec140c fix(node): initialize audio expander outputs to safe levels
ccd74c63 fix(ios): align controller Play and Shift with device layout
3e9286a9 fix(persistence): use npsong saves with legacy recovery fallback
862fe42b fix(player): preserve row volume on delayed note triggers
```

</details>
