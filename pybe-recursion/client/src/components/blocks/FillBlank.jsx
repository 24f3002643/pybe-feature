import React, { useState, useEffect, useRef } from 'react';
import { Edit3, CheckCircle2, RefreshCw } from 'lucide-react';
import PythonInterpreter from './PythonInterpreter';

export default function FillBlank({ block, onComplete }) {
  const { title, instruction, code, blanks = [], optionPool = [] } = block;

  const [filledValues, setFilledValues] = useState({});
  const [activeBlankId, setActiveBlankId] = useState(blanks[0]?.id || null);
  const [isChecked, setIsChecked] = useState(false);
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

  const handleSelectOption = (option) => {
    if (!activeBlankId) return;
    setFilledValues((prev) => ({
      ...prev,
      [activeBlankId]: option,
    }));
    setIsChecked(false);

    // Auto-advance active blank if another blank exists
    const currentIndex = blanks.findIndex((b) => b.id === activeBlankId);
    if (currentIndex < blanks.length - 1) {
      setActiveBlankId(blanks[currentIndex + 1].id);
    }
  };

  const handleReset = () => {
    setFilledValues({});
    setIsChecked(false);
    setActiveBlankId(blanks[0]?.id || null);
  };

  const allFilled = blanks.length > 0 && blanks.every((b) => !!filledValues[b.id]);
  const isCorrect = allFilled && blanks.every((b) => filledValues[b.id] === b.answer);

  // Constructed valid factorial code snippet for interpreter
  const validFactorialCode = `def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)`;

  // Render code line with interactive blank placeholders
  const renderCodeSnippet = () => {
    let parts = [];
    let textToParse = code;

    // Pattern to match ____ or ______
    const regex = /____+/g;
    let match;
    let lastIndex = 0;
    let blankIdx = 0;

    while ((match = regex.exec(textToParse)) !== null) {
      // Add text before blank
      if (match.index > lastIndex) {
        parts.push(textToParse.substring(lastIndex, match.index));
      }

      const blankObj = blanks[blankIdx] || { id: `blank-${blankIdx}` };
      const currentVal = filledValues[blankObj.id];
      const isActive = activeBlankId === blankObj.id;

      let blankStyle = { ...styles.blankSlot };
      if (isActive) blankStyle = { ...blankStyle, ...styles.blankSlotActive };
      if (currentVal) blankStyle = { ...blankStyle, ...styles.blankSlotFilled };
      if (isChecked) {
        if (currentVal === blankObj.answer) {
          blankStyle = { ...blankStyle, ...styles.blankSlotCorrect };
        } else {
          blankStyle = { ...blankStyle, ...styles.blankSlotWrong };
        }
      }

      parts.push(
        <span
          key={blankObj.id}
          style={blankStyle}
          onClick={() => setActiveBlankId(blankObj.id)}
        >
          {currentVal || '____'}
        </span>
      );

      lastIndex = regex.lastIndex;
      blankIdx++;
    }

    if (lastIndex < textToParse.length) {
      parts.push(textToParse.substring(lastIndex));
    }

    return parts;
  };

  return (
    <div style={styles.card} className="reveal-block">
      <div style={styles.header}>
        <Edit3 size={20} color="var(--purple)" />
        <span style={styles.badge}>FILL IN THE BLANKS & EXECUTE</span>
      </div>

      <h3 style={styles.title}>{title}</h3>
      {instruction && <p style={styles.instruction}>{instruction}</p>}

      {/* Code Display Area */}
      <div style={styles.codeContainer}>
        <pre style={styles.codeBlock}>
          <code>{renderCodeSnippet()}</code>
        </pre>
      </div>

      {/* Options Pool */}
      <div style={styles.optionsSection}>
        <span style={styles.optionsLabel}>Tap an option to place into highlighted blank:</span>
        <div style={styles.optionsPool}>
          {optionPool.map((opt, idx) => (
            <button
              key={idx}
              style={styles.optionBtn}
              onClick={() => handleSelectOption(opt)}
            >
              {opt}
            </button>
          ))}
          {Object.keys(filledValues).length > 0 && (
            <button style={styles.resetBtn} onClick={handleReset} title="Reset Blanks">
              <RefreshCw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Validation Row */}
      {allFilled && (
        <div style={styles.actionRow} className="reveal-chunk">
          {!isChecked ? (
            <button style={styles.checkBtn} onClick={() => setIsChecked(true)}>
              <CheckCircle2 size={16} />
              <span>Check Answer</span>
            </button>
          ) : (
            <div
              style={{
                ...styles.feedbackBox,
                backgroundColor: isCorrect ? 'var(--success-bg)' : 'rgba(239, 68, 68, 0.1)',
                borderColor: isCorrect ? 'rgba(52, 211, 153, 0.3)' : 'rgba(239, 68, 68, 0.3)',
              }}
            >
              {isCorrect ? (
                <p style={{ color: 'var(--success)', fontWeight: 600 }}>
                  Excellent! Your recursive factorial(n) function is complete and ready to execute!
                </p>
              ) : (
                <p style={{ color: '#f87171', fontWeight: 600 }}>
                  Some blanks are incorrect. Tap a blank and select the right option!
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Python Interpreter & Call Stack Execution Area */}
      <PythonInterpreter initialCode={validFactorialCode} defaultN={5} />
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
    marginBottom: '0.5rem',
  },
  badge: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--purple)',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '0.4rem',
  },
  instruction: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    marginBottom: '1.25rem',
  },
  codeContainer: {
    backgroundColor: '#090d16',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    padding: '1.25rem',
    marginBottom: '1.25rem',
  },
  codeBlock: {
    fontFamily: "'Fira Code', 'Courier New', monospace",
    fontSize: '0.95rem',
    color: '#38bdf8',
    lineHeight: 1.8,
    margin: 0,
    whiteSpace: 'pre-wrap',
  },
  blankSlot: {
    display: 'inline-block',
    padding: '0.15rem 0.6rem',
    margin: '0 0.25rem',
    borderRadius: '4px',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    border: '1.5px dashed var(--primary)',
    color: 'var(--primary)',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  blankSlotActive: {
    borderColor: 'var(--warning)',
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    color: 'var(--warning)',
    boxShadow: '0 0 8px rgba(251, 191, 36, 0.3)',
  },
  blankSlotFilled: {
    borderStyle: 'solid',
    backgroundColor: 'rgba(167, 139, 250, 0.2)',
    color: '#ffffff',
    borderColor: 'var(--purple)',
  },
  blankSlotCorrect: {
    borderColor: 'var(--success)',
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    color: 'var(--success)',
  },
  blankSlotWrong: {
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    color: '#f87171',
  },
  optionsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  optionsLabel: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--text-dim)',
  },
  optionsPool: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.6rem',
    alignItems: 'center',
  },
  optionBtn: {
    fontFamily: "'Fira Code', 'Courier New', monospace",
    fontSize: '0.88rem',
    fontWeight: 600,
    padding: '0.45rem 0.85rem',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'rgba(167, 139, 250, 0.15)',
    border: '1px solid var(--purple)',
    color: 'var(--purple)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  resetBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    padding: '0.4rem 0.75rem',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-muted)',
    fontSize: '0.8rem',
    cursor: 'pointer',
    marginLeft: 'auto',
  },
  actionRow: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  checkBtn: {
    backgroundColor: 'var(--success)',
    color: '#0f172a',
    fontWeight: 700,
    padding: '0.65rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.9rem',
  },
  feedbackBox: {
    padding: '0.85rem 1.1rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid transparent',
    fontSize: '0.92rem',
  },
};
