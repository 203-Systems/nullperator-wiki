import KeyGlyph, {displayKey} from './KeyGlyph';
import styles from './controls.module.css';

type KeycapProps = {
  children: string;
};

export default function Keycap({children}: KeycapProps) {
  return (
    <kbd className={styles.keycap}>
      <KeyGlyph activeKeys={[children]} />
      <span>{displayKey(children)}</span>
    </kbd>
  );
}
