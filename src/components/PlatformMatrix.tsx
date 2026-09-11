import styles from './platformMatrix.module.css';

const rows = [
  {
    topic: 'Controls',
    node: 'D-pad and action buttons',
    web: 'Keyboard or on-screen controls',
    ios: 'Touch controls; optional keyboard or game controller',
  },
  {
    topic: 'Files',
    node: 'SD card',
    web: 'Browser storage and the Files panel',
    ios: 'NullPerator folder in the iOS Files app',
  },
  {
    topic: 'Audio',
    node: 'Built-in output',
    web: 'Browser audio; choose Enable sound once',
    ios: 'Native iOS audio',
  },
  {
    topic: 'MIDI',
    node: 'TRS input and output in version 0.1',
    web: 'Web MIDI when supported by the browser',
    ios: 'CoreMIDI, including Bluetooth MIDI pairing',
  },
  {
    topic: 'Recording',
    node: 'Line in, onboard mic, or headset mic',
    web: 'Browser microphone; permission required',
    ios: 'Current iOS input route; microphone permission required',
  },
  {
    topic: 'Leave safely',
    node: 'Wait for saving to finish, then shut down',
    web: 'Wait for saving to finish, then close the tab',
    ios: 'Wait for saving to finish, then leave the app',
  },
];

const platforms = [
  ['node', 'NullPerator hardware'],
  ['web', 'Web'],
  ['ios', 'iOS'],
] as const;

export default function PlatformMatrix() {
  return (
    <div className={styles.matrix} role="table" aria-label="Platform differences">
      <div className={styles.header} role="row">
        <span role="columnheader">Area</span>
        {platforms.map(([, label]) => <span role="columnheader" key={label}>{label}</span>)}
      </div>
      {rows.map((row) => (
        <div className={styles.row} role="row" key={row.topic}>
          <strong role="rowheader">{row.topic}</strong>
          {platforms.map(([key, label]) => (
            <span role="cell" key={key}>
              <b className={styles.mobileLabel}>{label}</b>
              {row[key]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
