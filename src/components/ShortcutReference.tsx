import KeyGlyph, {type ControlKeyLabel} from './KeyGlyph';
import styles from './shortcutReference.module.css';

type Shortcut = {
  detail?: string;
  input: string;
  keys: readonly ControlKeyLabel[];
  title: string;
};

type ShortcutGroup = {
  items: readonly Shortcut[];
  title: string;
};

type ShortcutReferenceProps = {
  groups: readonly ShortcutGroup[];
};

export default function ShortcutReference({groups}: ShortcutReferenceProps) {
  return (
    <div className={styles.reference}>
      {groups.map((group) => (
        <section className={styles.group} key={group.title}>
          <h3 className={styles.groupTitle}>{group.title}</h3>
          <div className={styles.items}>
            {group.items.map((shortcut) => (
              <div
                className={styles.shortcut}
                key={`${shortcut.title}-${shortcut.input}`}>
                <KeyGlyph activeKeys={shortcut.keys} variant="reference" />
                <div className={styles.copy}>
                  <strong>{shortcut.title}</strong>
                  <span className={styles.input}>{shortcut.input}</span>
                  {shortcut.detail && (
                    <span className={styles.detail}>{shortcut.detail}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
