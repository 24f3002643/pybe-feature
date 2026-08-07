import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Markdown({ block, onComplete }) {
  const { text } = block;

  // Split narrative text into paragraph chunks
  const chunks = useMemo(() => {
    if (!text) return [];
    return text.split(/\n\n+/).filter((c) => c.trim().length > 0);
  }, [text]);

  const [visibleCount, setVisibleCount] = useState(1);
  const hasCompletedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // Keep onCompleteRef updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Reset when text content changes
  useEffect(() => {
    hasCompletedRef.current = false;
    setVisibleCount(1);
  }, [text]);

  // Staggered reveal timer: 750ms per paragraph chunk
  useEffect(() => {
    if (chunks.length === 0) {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        if (onCompleteRef.current) onCompleteRef.current();
      }
      return;
    }

    if (visibleCount < chunks.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 750); // ~750ms stagger between paragraph thoughts per content-schema.md

      return () => clearTimeout(timer);
    } else {
      // All paragraph chunks revealed
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    }
  }, [visibleCount, chunks.length]);

  return (
    <div style={styles.container} className="reveal-block">
      {chunks.slice(0, visibleCount).map((chunk, idx) => (
        <div key={idx} className="reveal-chunk markdown-content" style={styles.chunkWrapper}>
          <ReactMarkdown>{chunk}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    marginBottom: '1.5rem',
    color: 'var(--text-main)',
    fontSize: '1rem',
    lineHeight: '1.7',
  },
  chunkWrapper: {
    marginBottom: '1rem',
  },
};
