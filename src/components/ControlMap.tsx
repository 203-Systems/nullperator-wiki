import {useState} from 'react';

import styles from './controls.module.css';

type ControlId =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'shift'
  | 'option'
  | 'enter'
  | 'play';

type Control = {
  id: ControlId;
  action: string;
  detail: string;
  glyph?: string;
};

const controls: Control[] = [
  {id: 'up', action: 'Up', detail: 'Move up', glyph: '↑'},
  {id: 'down', action: 'Down', detail: 'Move down', glyph: '↓'},
  {id: 'left', action: 'Left', detail: 'Move left', glyph: '←'},
  {id: 'right', action: 'Right', detail: 'Move right', glyph: '→'},
  {id: 'shift', action: 'Shift', detail: 'Navigate and extend'},
  {id: 'option', action: 'Option', detail: 'Alternate action'},
  {id: 'enter', action: 'Enter', detail: 'Edit and confirm'},
  {id: 'play', action: 'Play', detail: 'Transport and preview'},
];

function findControl(id: ControlId) {
  return controls.find((control) => control.id === id)!;
}

export default function ControlMap() {
  const [active, setActive] = useState<ControlId>('enter');
  const selected = findControl(active);

  const renderButton = (id: ControlId, className: string) => {
    const control = findControl(id);
    return (
      <button
        type="button"
        className={`${styles.mapButton} ${styles[className]} ${
          active === id ? styles.mapButtonActive : ''
        }`}
        aria-pressed={active === id}
        onClick={() => setActive(id)}>
        <span className={styles.mapAction}>{control.glyph ?? control.action}</span>
      </button>
    );
  };

  return (
    <div className={styles.controlMap}>
      <div className={styles.controller}>
        <div className={styles.dpad} aria-label="Direction controls">
          {renderButton('up', 'dpadUp')}
          {renderButton('left', 'dpadLeft')}
          <span className={styles.dpadCenter} aria-hidden="true" />
          {renderButton('right', 'dpadRight')}
          {renderButton('down', 'dpadDown')}
        </div>

        <div className={styles.actionKeys} aria-label="Action controls">
          {renderButton('option', 'optionKey')}
          {renderButton('enter', 'enterKey')}
          {renderButton('shift', 'shiftKey')}
          {renderButton('play', 'playKey')}
        </div>
      </div>

      <div className={styles.controlDetail} aria-live="polite">
        <strong>{selected.action}</strong>
        <span>{selected.detail}</span>
      </div>
    </div>
  );
}
