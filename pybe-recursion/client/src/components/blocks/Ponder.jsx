import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Lightbulb, ChevronRight, Check } from 'lucide-react';

export default function Ponder({ block, onComplete }) {
  const { prompt, reveal } = block;
  const [isRevealed, setIsRevealed] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Enable Next button in StepFlow immediately so learner is never stuck
  useEffect(() => {
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <div style={styles.card} className="reveal-block">
      <div style={styles.header}>
        <Lightbulb size={20} color="var(--purple)" />
        <span style={styles.badge}>PONDER & THINK</span>
      </div>

      <div style={styles.promptText}>{prompt}</div>

      {!isRevealed ? (
        <div style={styles.actionRow}>
          <button style={styles.revealBtn} onClick={handleReveal}>
            <span>Reveal Solution</span>
            <ChevronRight size={18} />
          </button>
        </div>
      ) : (
        <div style={styles.revealContainer} className="reveal-chunk">
          <div style={styles.revealHeader}>
            <Check size={16} color="var(--success)" />
            <span style={styles.revealTitle}>REVEALED EXPLANATION</span>
          </div>
          <div className="markdown-content" style={styles.revealBody}>
            <ReactMarkdown>{reveal}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    padding: '1.5rem 1.75rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderLeft: '4px solid var(--purple)',
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
    color: 'var(--purple)',
    textTransform: 'uppercase',
  },
  promptText: {
    fontSize: '1rem',
    color: 'var(--text-main)',
    lineHeight: '1.6',
    marginBottom: '1.25rem',
  },
  actionRow: {
    marginTop: '0.5rem',
  },
  revealBtn: {
    backgroundColor: 'var(--purple)',
    color: '#0f172a',
    fontWeight: 600,
    padding: '0.6rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.9rem',
    transition: 'opacity 0.2s ease',
  },
  revealContainer: {
    marginTop: '1rem',
    padding: '1.25rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid var(--border-accent)',
  },
  revealHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    marginBottom: '0.6rem',
  },
  revealTitle: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--success)',
    textTransform: 'uppercase',
  },
  revealBody: {
    fontSize: '0.98rem',
    color: 'var(--text-main)',
    lineHeight: '1.6',
  },
};
