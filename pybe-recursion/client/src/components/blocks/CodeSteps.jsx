import React, { useState, useEffect, useRef } from 'react';
import { Layers, ChevronLeft, ChevronRight, Code2 } from 'lucide-react';

export default function CodeSteps({ block, onComplete }) {
  const { title, steps = [] } = block;
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
  }, []);

  const activeStep = steps[currentStepIdx];
  const isSingleStep = steps.length <= 1;

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  return (
    <div style={styles.card} className="reveal-block">
      <div style={styles.header}>
        <Layers size={20} color="var(--primary)" />
        <span style={styles.badge}>CODE CONSTRUCTION STEP</span>
      </div>

      <h3 style={styles.title}>{title}</h3>

      {/* Stepper Navigation (only shown if block contains multiple internal steps) */}
      {!isSingleStep && (
        <div style={styles.stepperBar}>
          <span style={styles.stepCounter}>
            Step {currentStepIdx + 1} of {steps.length}
          </span>
          <div style={styles.stepDots}>
            {steps.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentStepIdx(idx)}
                style={{
                  ...styles.dot,
                  backgroundColor: idx === currentStepIdx ? 'var(--primary)' : 'var(--border-color)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {activeStep && (
        <div style={styles.stepContent} className="reveal-chunk" key={currentStepIdx}>
          <p style={styles.instruction}>{activeStep.instruction}</p>

          <div style={styles.codeContainer}>
            <div style={styles.codeHeader}>
              <Code2 size={16} color="var(--primary)" />
              <span style={styles.codeTitle}>PYTHON SNIPPET</span>
            </div>
            <pre style={styles.codeBlock}>
              <code>{activeStep.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Internal Stepper Controls (only shown if block contains multiple internal steps) */}
      {!isSingleStep && (
        <div style={styles.navRow}>
          <button
            style={styles.navBtn}
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
          >
            <ChevronLeft size={16} />
            <span>Previous Step</span>
          </button>

          <button
            style={styles.navBtnPrimary}
            onClick={handleNext}
            disabled={currentStepIdx === steps.length - 1}
          >
            <span>Next Code Step</span>
            <ChevronRight size={16} />
          </button>
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
  stepperBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.25rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid var(--border-color)',
  },
  stepCounter: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--primary)',
  },
  stepDots: {
    display: 'flex',
    gap: '0.4rem',
  },
  dot: {
    width: '12px',
    height: '6px',
    borderRadius: '3px',
    transition: 'background-color 0.2s ease',
  },
  stepContent: {
    marginBottom: '0.5rem',
  },
  instruction: {
    fontSize: '0.98rem',
    color: 'var(--text-main)',
    lineHeight: 1.6,
    marginBottom: '1rem',
  },
  codeContainer: {
    backgroundColor: '#090d16',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
  },
  codeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.5rem 0.85rem',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderBottom: '1px solid var(--border-color)',
  },
  codeTitle: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--primary)',
  },
  codeBlock: {
    padding: '1rem 1.1rem',
    fontFamily: "'Fira Code', 'Courier New', monospace",
    fontSize: '0.92rem',
    color: '#38bdf8',
    overflowX: 'auto',
    lineHeight: 1.5,
    margin: 0,
  },
  navRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    marginTop: '1rem',
  },
  navBtn: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    color: 'var(--text-main)',
    border: '1px solid var(--border-color)',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    fontSize: '0.85rem',
  },
  navBtnPrimary: {
    backgroundColor: 'var(--primary)',
    color: '#0f172a',
    fontWeight: 600,
    border: 'none',
    padding: '0.55rem 1.1rem',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    fontSize: '0.85rem',
  },
};
