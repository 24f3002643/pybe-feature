import React, { useEffect, useRef } from 'react';
import { BookOpen, CheckCircle } from 'lucide-react';

export default function Banner({ block, onComplete }) {
  const { role, text } = block;
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

  if (role === 'start') {
    return (
      <div style={styles.startBanner} className="reveal-block">
        <div style={styles.startBadge}>
          <BookOpen size={16} color="var(--primary)" />
          <span>STORY INTRO</span>
        </div>
        <p style={styles.startText}>{text}</p>
      </div>
    );
  }

  return (
    <div style={styles.endBanner} className="reveal-block">
      <div style={styles.endIconContainer}>
        <CheckCircle size={28} color="var(--success)" />
      </div>
      <div>
        <span style={styles.endBadge}>MODULE COMPLETE</span>
        <h3 style={styles.endText}>{text}</h3>
      </div>
    </div>
  );
}

const styles = {
  startBanner: {
    padding: '1.25rem 1.5rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'var(--primary-bg)',
    border: '1px solid rgba(56, 189, 248, 0.25)',
    marginBottom: '1.5rem',
  },
  startBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--primary)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
  },
  startText: {
    fontSize: '1.05rem',
    color: 'var(--text-main)',
    fontWeight: 500,
  },
  endBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    padding: '1.75rem 2rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'var(--success-bg)',
    border: '1px solid rgba(52, 211, 153, 0.3)',
    marginTop: '2rem',
    marginBottom: '1.5rem',
  },
  endIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  endBadge: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--success)',
    marginBottom: '0.25rem',
    textTransform: 'uppercase',
  },
  endText: {
    fontSize: '1.15rem',
    color: 'var(--text-main)',
    fontWeight: 600,
    lineHeight: 1.4,
  },
};
