import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

export default function MCQ({ block, onComplete }) {
  const { question, options = [], correctIndex } = block;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Enable Next button in StepFlow immediately
  useEffect(() => {
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
  }, []);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const isSelected = selectedIndex !== null;
  const isCorrect = selectedIndex === correctIndex;

  return (
    <div style={styles.card} className="reveal-block">
      <div style={styles.header}>
        <HelpCircle size={20} color="var(--primary)" />
        <span style={styles.badge}>MULTIPLE CHOICE QUESTION</span>
      </div>

      <h3 style={styles.question}>{question}</h3>

      <div style={styles.optionsList}>
        {options.map((opt, idx) => {
          let btnStyle = { ...styles.optionBtn };
          let icon = null;

          if (selectedIndex === idx) {
            if (idx === correctIndex) {
              btnStyle = { ...btnStyle, ...styles.correctBtn };
              icon = <CheckCircle2 size={18} color="var(--success)" />;
            } else {
              btnStyle = { ...btnStyle, ...styles.wrongBtn };
              icon = <XCircle size={18} color="#f87171" />;
            }
          }

          return (
            <button
              key={idx}
              style={btnStyle}
              onClick={() => handleSelect(idx)}
            >
              <span style={styles.optLetter}>{String.fromCharCode(65 + idx)}</span>
              <span style={styles.optText}>{opt}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {isSelected && (
        <div
          style={{
            ...styles.feedbackBox,
            backgroundColor: isCorrect ? 'var(--success-bg)' : 'rgba(239, 68, 68, 0.1)',
            borderColor: isCorrect ? 'rgba(52, 211, 153, 0.3)' : 'rgba(239, 68, 68, 0.3)',
          }}
          className="reveal-chunk"
        >
          {isCorrect ? (
            <p style={{ color: 'var(--success)', fontWeight: 600 }}>
              Correct! Great job understanding this concept.
            </p>
          ) : (
            <p style={{ color: '#f87171', fontWeight: 600 }}>
              Not quite right — give it another try!
            </p>
          )}
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
    fontWeight: 600,
    color: '#ffffff',
    lineHeight: 1.5,
    marginBottom: '1.25rem',
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  optionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    padding: '0.85rem 1.1rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-main)',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
  },
  optLetter: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    backgroundColor: 'var(--border-color)',
    color: 'var(--text-main)',
    fontSize: '0.8rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  optText: {
    flex: 1,
  },
  correctBtn: {
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    borderColor: 'var(--success)',
    color: '#ffffff',
  },
  wrongBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: '#ef4444',
    color: '#ffffff',
  },
  feedbackBox: {
    marginTop: '1.25rem',
    padding: '0.85rem 1.1rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid transparent',
    fontSize: '0.92rem',
  },
};
