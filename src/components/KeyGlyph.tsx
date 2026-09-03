import styles from './controls.module.css';

type KeyGlyphProps = {
  activeKeys: readonly string[];
  variant?: 'inline' | 'reference';
};

export type ControlKeyLabel =
  | 'Up'
  | 'Down'
  | 'Left'
  | 'Right'
  | 'Shift'
  | 'Option'
  | 'Enter'
  | 'Play';

type ControlName =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'shift'
  | 'option'
  | 'enter'
  | 'play';

function normalizeKey(key: string): ControlName | undefined {
  const normalized = key.replace(/^Arrow/, '').toLowerCase();
  switch (normalized) {
    case 'up':
    case 'down':
    case 'left':
    case 'right':
    case 'shift':
    case 'option':
    case 'enter':
    case 'play':
      return normalized;
    default:
      return undefined;
  }
}

export function displayKey(key: string) {
  return key.replace(/^Arrow/, '');
}

export default function KeyGlyph({
  activeKeys,
  variant = 'inline',
}: KeyGlyphProps) {
  const active = new Set<ControlName>();
  activeKeys.forEach((key) => {
    const control = normalizeKey(key);
    if (control) active.add(control);
  });
  const buttonClass = (control: ControlName) =>
    `${styles.keyGlyphButton} ${
      active.has(control) ? styles.keyGlyphButtonActive : ''
    }`;

  return (
    <svg
      className={`${styles.keyGlyph} ${
        variant === 'reference' ? styles.keyGlyphReference : ''
      }`}
      viewBox="0 0 84 36"
      aria-hidden="true"
      focusable="false">
      <rect className={buttonClass('up')} x="12" y="2" width="9" height="9" />
      <rect className={buttonClass('left')} x="2" y="13" width="9" height="9" />
      <rect className={buttonClass('right')} x="23" y="13" width="9" height="9" />
      <rect className={buttonClass('down')} x="12" y="24" width="9" height="9" />

      <rect
        className={buttonClass('option')}
        x="48"
        y="3"
        width="13"
        height="11"
        rx="2"
      />
      <rect
        className={buttonClass('enter')}
        x="68"
        y="3"
        width="13"
        height="11"
        rx="2"
      />
      <rect
        className={buttonClass('play')}
        x="48"
        y="22"
        width="13"
        height="11"
        rx="2"
      />
      <rect
        className={buttonClass('shift')}
        x="68"
        y="22"
        width="13"
        height="11"
        rx="2"
      />
    </svg>
  );
}
