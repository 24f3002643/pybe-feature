import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function QAReflection({ block, onComplete }) {
  const { intro, items = [] } = block;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Enable Next button in StepFlow immediately so learner can advance smoothly
  useEffect(() => {
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
  }, []);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
    }
  };

  const currentItem = items[currentIndex];

  return (
    <div style={styles.card} className="reveal-block">
      <div style={styles.header}>
        <MessageSquare size={20} color="var(--primary)" />
        <span style={styles.badge}>QA REFLECTION</span>
      </div>

      {intro && <p style={styles.introText}>{intro}</p>}

      {/* Progress Dots */}
      <div style={styles.progressRow}>
        {items.map((_, idx) => (
          <div
            key={idx}
            style={{
              ...styles.dot,
              backgroundColor:
                idx < currentIndex || (idx === currentIndex && showAnswer)
                  ? 'var(--primary)'
                  : 'var(--border-color)',
            }}
          />
        ))}
        <span style={styles.progressLabel}>
          Question {currentIndex + 1} of {items.length}
        </span>
      </div>

      {currentItem && (
        <div style={styles.itemContainer} className="reveal-chunk" key={currentIndex}>
          <div style={styles.questionBox}>
            <span style={styles.questionNumber}>Q{currentIndex + 1}</span>
            <p style={styles.questionText}>{currentItem.question}</p>
          </div>

          {!showAnswer ? (
            <div style={styles.actionRow}>
              <button style={styles.showAnswerBtn} onClick={handleShowAnswer}>
                <span>Show Explanation</span>
              </button>
            </div>
          ) : (
            <div style={styles.answerBox} className="reveal-chunk">
              <div style={styles.answerHeader}>
                <CheckCircle2 size={16} color="var(--primary)" />
                <span style={styles.answerTitle}>EXPLANATION</span>
              </div>
              <div className="markdown-content" style={styles.answerText}>
                <ReactMarkdown>{currentItem.answer}</ReactMarkdown>
              </div>

              {currentIndex < items.length - 1 && (
                <div style={styles.actionRow}>
                  <button style={styles.nextQBtn} onClick={handleNextQuestion}>
                    <span>Next Question</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
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
    marginBottom: '0.5rem',
  },
  badge: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--primary)',
    textTransform: 'uppercase',
  },
  introText: {
    fontSize: '1rem',
    color: 'var(--text-main)',
    fontWeight: 500,
    marginBottom: '1rem',
  },
  progressRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    marginBottom: '1.25rem',
  },
  dot: {
    height: '6px',
    width: '20px',
    borderRadius: '3px',
    transition: 'background-color 0.3s ease',
  },
  progressLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    marginLeft: '0.5rem',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  questionBox: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    padding: '1rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
  },
  questionNumber: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--primary)',
    backgroundColor: 'var(--primary-bg)',
    padding: '0.2rem 0.5rem',
    borderRadius: 'var(--radius-sm)',
  },
  questionText: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#ffffff',
    lineHeight: 1.5,
  },
  actionRow: {
    marginTop: '0.5rem',
  },
  showAnswerBtn: {
    backgroundColor: 'var(--primary)',
    color: '#0f172a',
    fontWeight: 600,
    padding: '0.6rem 1.2rem',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  answerBox: {
    padding: '1rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    border: '1px solid var(--border-accent)',
  },
  answerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    marginBottom: '0.5rem',
  },
  answerTitle: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--primary)',
    textTransform: 'uppercase',
  },
  answerText: {
    fontSize: '0.95rem',
    color: 'var(--text-main)',
    lineHeight: 1.6,
  },
  nextQBtn: {
    marginTop: '1rem',
    backgroundColor: 'var(--bg-card-hover)',
    color: 'var(--text-main)',
    border: '1px solid var(--border-color)',
    fontWeight: 600,
    padding: '0.55rem 1.1rem',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.85rem',
  },
};
