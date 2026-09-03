import styles from './navigationMap.module.css';

type MapNodeProps = {
  x: number;
  y: number;
  letter: string;
  name: string;
  current?: boolean;
};

function MapNode({x, y, letter, name, current = false}: MapNodeProps) {
  const className = current
    ? `${styles.node} ${styles.currentNode}`
    : styles.node;

  return (
    <g className={className} transform={`translate(${x} ${y})`}>
      <rect x="-84" y="-27" width="168" height="54" rx="4" />
      <text className={styles.nodeLetter} x="-67" y="6">
        {letter}
      </text>
      <text className={styles.nodeName} x="-39" y="5">
        {name}
      </text>
    </g>
  );
}

export default function NavigationMap() {
  return (
    <figure className={styles.figure}>
      <div className={styles.panel}>
        <div className={styles.heading}>Navigation map</div>
        <svg
          className={styles.diagram}
          viewBox="0 0 800 400"
          role="img"
          aria-labelledby="navigation-map-title navigation-map-description">
          <title id="navigation-map-title">NullPerator navigation map</title>
          <desc id="navigation-map-description">
            Song, Chain, Phrase, and Instrument form a horizontal row. Device
            is above Project, Project is above Song, and Mixer is below Song.
            Groove is above Phrase, with Phrase Table below. Instrument Table
            is below Instrument and connected to Phrase Table. Song is
            highlighted as the current view.
          </desc>

          <g className={styles.routes} aria-hidden="true">
            <path d="M100 50V350" />
            <path d="M100 250H700" />
            <path d="M500 150V350" />
            <path d="M700 250V350" />
            <path d="M500 350H700" />
          </g>

          <MapNode x={100} y={50} letter="D" name="Device" />
          <MapNode x={100} y={150} letter="P" name="Project" />
          <MapNode x={500} y={150} letter="G" name="Groove" />
          <MapNode x={100} y={250} letter="S" name="Song" current />
          <MapNode x={300} y={250} letter="C" name="Chain" />
          <MapNode x={500} y={250} letter="P" name="Phrase" />
          <MapNode x={700} y={250} letter="I" name="Instrument" />
          <MapNode x={100} y={350} letter="M" name="Mixer" />
          <MapNode x={500} y={350} letter="T" name="Phrase Table" />
          <MapNode x={700} y={350} letter="T" name="Inst Table" />
        </svg>
        <div
          className={styles.mobileDiagram}
          role="img"
          aria-label="Expanded NullPerator navigation map with Song highlighted">
          <span className={`${styles.mobileRoute} ${styles.songRoute}`} />
          <span className={`${styles.mobileRoute} ${styles.mainRoute}`} />
          <span className={`${styles.mobileRoute} ${styles.phraseRoute}`} />
          <span className={`${styles.mobileRoute} ${styles.instrumentRoute}`} />
          <span className={`${styles.mobileRoute} ${styles.tableRoute}`} />

          <div className={styles.mobileNode} style={{gridColumn: 1, gridRow: 1}}>
            <strong>D</strong>
            <span>Device</span>
          </div>
          <div className={styles.mobileNode} style={{gridColumn: 1, gridRow: 2}}>
            <strong>P</strong>
            <span>Project</span>
          </div>
          <div className={styles.mobileNode} style={{gridColumn: 3, gridRow: 2}}>
            <strong>G</strong>
            <span>Groove</span>
          </div>
          <div
            className={`${styles.mobileNode} ${styles.mobileCurrent}`}
            style={{gridColumn: 1, gridRow: 3}}>
            <strong>S</strong>
            <span>Song</span>
          </div>
          <div className={styles.mobileNode} style={{gridColumn: 2, gridRow: 3}}>
            <strong>C</strong>
            <span>Chain</span>
          </div>
          <div className={styles.mobileNode} style={{gridColumn: 3, gridRow: 3}}>
            <strong>P</strong>
            <span>Phrase</span>
          </div>
          <div className={styles.mobileNode} style={{gridColumn: 4, gridRow: 3}}>
            <strong>I</strong>
            <span>Instrument</span>
          </div>
          <div className={styles.mobileNode} style={{gridColumn: 1, gridRow: 4}}>
            <strong>M</strong>
            <span>Mixer</span>
          </div>
          <div className={styles.mobileNode} style={{gridColumn: 3, gridRow: 4}}>
            <strong>T</strong>
            <span>Phrase Table</span>
          </div>
          <div className={styles.mobileNode} style={{gridColumn: 4, gridRow: 4}}>
            <strong>T</strong>
            <span>Inst Table</span>
          </div>
        </div>
      </div>
      <figcaption>
        The expanded guide adds Device above the compact top-bar map. Cyan
        marks the current view; this example starts on Song.
      </figcaption>
    </figure>
  );
}
