import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Info } from 'lucide-react';

export default function Fact({ block, onComplete }) {
  const { question, answer } = block;
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
        <Info size={20} color="var(--primary)" />
        <span style={styles.badge}>IMPORTANT FACT</span>
      </div>

      <h3 style={styles.question}>{question}</h3>

      <div className="markdown-content" style={styles.answer}>
        <ReactMarkdown>{answer}</ReactMarkdown>
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
    marginBottom: '0.75rem',
  },
  badge: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--primary)',
    textTransform: 'uppercase',
  },
  question: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '0.85rem',
  },
  answer: {
    fontSize: '0.96rem',
    color: 'var(--text-main)',
    lineHeight: 1.65,
  },
};
