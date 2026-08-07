import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen } from 'lucide-react';

export default function Concept({ block, onComplete, onRightContentAppeared }) {
  const { title, text } = block;

  const chunks = useMemo(() => {
    if (!text) return [];
    return text.split(/\n\n+/).filter((c) => c.trim().length > 0);
  }, [text]);

  const [visibleCount, setVisibleCount] = useState(1);
  const hasCompletedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const onRightContentRef = useRef(onRightContentAppeared);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onRightContentRef.current = onRightContentAppeared;
  }, [onComplete, onRightContentAppeared]);

  useEffect(() => {
    hasCompletedRef.current = false;
    setVisibleCount(1);
  }, [text]);

  useEffect(() => {
    if (chunks.length === 0) {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        if (onCompleteRef.current) onCompleteRef.current();
        if (onRightContentRef.current) onRightContentRef.current();
      }
      return;
    }

    if (visibleCount < chunks.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 750);

      return () => clearTimeout(timer);
    } else {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        if (onCompleteRef.current) onCompleteRef.current();
        if (onRightContentRef.current) onRightContentRef.current();
      }
    }
  }, [visibleCount, chunks.length]);

  return (
    <div style={styles.card} className="reveal-block">
      <div style={styles.header}>
        <BookOpen size={20} color="var(--primary)" />
        <span style={styles.badge}>KEY CONCEPT</span>
      </div>

      <h3 style={styles.title}>{title}</h3>

      <div style={styles.bodyText}>
        {chunks.slice(0, visibleCount).map((chunk, idx) => (
          <div key={idx} className="reveal-chunk markdown-content" style={styles.chunkWrapper}>
            <ReactMarkdown>{chunk}</ReactMarkdown>
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
    borderLeft: '4px solid var(--primary)',
    marginBottom: '1.5rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  badge: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--primary)',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '1rem',
  },
  bodyText: {
    fontSize: '0.98rem',
    color: 'var(--text-main)',
    lineHeight: 1.65,
  },
  chunkWrapper: {
    marginBottom: '0.75rem',
  },
};
