import React, { useEffect, useRef } from 'react';
import { GitCompare, ArrowRight } from 'lucide-react';

export default function ConceptMap({ block, onComplete }) {
  const { intro, items = [] } = block;
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
  }, []);

  return (
    <div style={styles.card} className="reveal-block">
      <div style={styles.header}>
        <GitCompare size={20} color="var(--warning)" />
        <span style={styles.badge}>CONCEPT MAPPING</span>
      </div>

      {intro && <p style={styles.introText}>{intro}</p>}

      <div style={styles.grid}>
        {items.map((item, idx) => (
          <div key={idx} style={styles.rowCard} className="reveal-chunk">
            <div style={styles.storyCol}>
              <span style={styles.colLabel}>STORY EVENT</span>
              <p style={styles.storyText}>{item.story}</p>
            </div>
            
            <div style={styles.arrowBox}>
              <ArrowRight size={18} color="var(--warning)" />
            </div>

            <div style={styles.conceptCol}>
              <span style={styles.colLabel}>PROGRAMMING CONCEPT</span>
              <span style={styles.conceptTag}>{item.concept}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: '1.5rem 1.75rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderLeft: '4px solid var(--warning)',
    marginBottom: '1.5rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem',
  },
  badge: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--warning)',
    textTransform: 'uppercase',
  },
  introText: {
    fontSize: '1rem',
    color: 'var(--text-main)',
    lineHeight: 1.6,
    marginBottom: '1.25rem',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
  },
  rowCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '1rem 1.1rem',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
  },
  storyCol: {
    flex: 1,
  },
  arrowBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.4rem',
  },
  conceptCol: {
    flex: '0 0 140px',
    textAlign: 'right',
  },
  colLabel: {
    display: 'block',
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--text-dim)',
    marginBottom: '0.2rem',
    textTransform: 'uppercase',
  },
  storyText: {
    fontSize: '0.9rem',
    color: 'var(--text-main)',
    lineHeight: 1.4,
  },
  conceptTag: {
    display: 'inline-block',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#0f172a',
    backgroundColor: 'var(--warning)',
    padding: '0.25rem 0.65rem',
    borderRadius: 'var(--radius-sm)',
  },
};
