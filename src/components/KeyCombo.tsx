import KeyGlyph, {displayKey} from './KeyGlyph';
import styles from './controls.module.css';

type KeyComboProps = {
  keys: string[];
  sequence?: boolean;
};

export default function KeyCombo({keys, sequence = false}: KeyComboProps) {
  const labels = keys.map(displayKey);
  return (
    <span
      className={styles.combo}
      aria-label={`${sequence ? 'Press in order' : 'Press together'}: ${keys.join(
        sequence ? ', then ' : ' plus ',
      )}`}>
      <KeyGlyph activeKeys={keys} />
      <span className={styles.comboLabel} aria-hidden="true">
        {labels.join(sequence ? ' → ' : ' + ')}
      </span>
    </span>
  );
}
