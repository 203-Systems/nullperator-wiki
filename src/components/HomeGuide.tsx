import Link from '@docusaurus/Link';

import styles from './homeGuide.module.css';

const tasks = [
  {
    number: '01',
    title: 'Make your first sound',
    description: 'Start with an empty project and hear your first note.',
    to: '/start-here/quick-start',
  },
  {
    number: '02',
    title: 'Learn the controls',
    description: 'Find Shift, Option, Enter, and Play wherever you use NullPerator.',
    to: '/controls/buttons',
  },
  {
    number: '03',
    title: 'Make your first loop',
    description: 'Turn one note into a repeating four-note phrase.',
    to: '/start-here/first-loop',
  },
  {
    number: '04',
    title: 'Load or save a project',
    description: 'Open your music, rename it, and keep a safe copy.',
    to: '/projects/manage',
  },
];

export default function HomeGuide() {
  return (
    <div className={styles.taskGrid}>
      {tasks.map((task) => (
        <Link className={styles.taskCard} key={task.to} to={task.to}>
          <span className={styles.taskNumber}>{task.number}</span>
          <strong>{task.title}</strong>
          <span>{task.description}</span>
          <span className={styles.taskLink}>Open guide&nbsp;→</span>
        </Link>
      ))}
    </div>
  );
}

export function MusicFlow() {
  const steps = [
    ['Song', 'eight arranged tracks', '/sequencer/song-live'],
    ['Chain', 'patterns in order', '/sequencer/chain'],
    ['Phrase', 'a short pattern', '/sequencer/phrase'],
    ['Instrument', 'the sound', '/instruments/overview'],
  ];

  return (
    <div className={styles.flow} aria-label="How a NullPerator song is built">
      {steps.map(([title, description, to], index) => (
        <div className={styles.flowStep} key={title}>
          <Link className={styles.flowCard} to={to}>
            <strong>{title}</strong>
            <span>{description}</span>
          </Link>
          {index < steps.length - 1 && (
            <span className={styles.flowArrow} aria-hidden="true">→</span>
          )}
        </div>
      ))}
    </div>
  );
}
