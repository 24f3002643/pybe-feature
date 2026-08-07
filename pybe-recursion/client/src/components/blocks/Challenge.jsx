import React, { useEffect, useRef } from 'react';
import { HelpCircle } from 'lucide-react';

export default function Challenge({ block, onComplete }) {
  const { text } = block;
  const hasCompletedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }
  }, []);

  return (
    <div style={styles.card} className="reveal-block">
      <div style={styles.header}>
        <HelpCircle size={20} color="var(--warning)" />
        <span style={styles.title}>THE CHALLENGE</span>
      </div>
      <h3 style={styles.questionText}>{text}</h3>
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
    marginBottom: '0.6rem',
  },
  title: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--warning)',
    textTransform: 'uppercase',
  },
  questionText: {
    fontSize: '1.15rem',
    fontWeight: 600,
    color: '#ffffff',
    lineHeight: 1.4,
  },
};
