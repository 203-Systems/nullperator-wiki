import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './controls.module.css';

type InterfaceShotProps = {
  src: string;
  alt: string;
  children?: ReactNode;
};

export default function InterfaceShot({src, alt, children}: InterfaceShotProps) {
  const resolvedSource = useBaseUrl(src);
  return (
    <figure className={styles.interfaceShot}>
      <div className={styles.screenShell}>
        <img
          src={resolvedSource}
          alt={alt}
          width="240"
          height="240"
          loading="lazy"
        />
      </div>
      {children && <figcaption>{children}</figcaption>}
    </figure>
  );
}
