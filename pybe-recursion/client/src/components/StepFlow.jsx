import React, { useState, useEffect, useCallback } from 'react';
import BlockRenderer from './BlockRenderer';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export default function StepFlow({
  blocks = [],
  stepId = 'step1',
  onBlockChange,
  onStepComplete,
  onGoToNextStep,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedMap, setCompletedMap] = useState({});
  const [isContentFullyAppeared, setIsContentFullyAppeared] = useState(false);

  const currentBlock = blocks[currentIndex];
  const isCurrentCompleted = !!completedMap[currentIndex];
  const hasMoreBlocks = currentIndex < blocks.length - 1;
  const isLastBlock = currentIndex === blocks.length - 1;
  const isAllComplete = isLastBlock && isCurrentCompleted;

  // Reset appearance state on block index change
  useEffect(() => {
    setIsContentFullyAppeared(false);
  }, [currentIndex]);

  const handleRightContentAppeared = useCallback(() => {
    setIsContentFullyAppeared(true);
  }, []);

  // Notify parent of block index and appearance changes
  useEffect(() => {
    if (onBlockChange) {
      onBlockChange(currentIndex, isContentFullyAppeared);
    }
  }, [currentIndex, isContentFullyAppeared, onBlockChange]);

  // Handle completion callback from active block
  const handleBlockComplete = useCallback((index) => {
    setCompletedMap((prev) => {
      if (prev[index]) return prev;
      return { ...prev, [index]: true };
    });
  }, []);

  const handleNext = () => {
    if (hasMoreBlocks && isCurrentCompleted) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (isAllComplete && onStepComplete) {
      onStepComplete();
    }
  }, [isAllComplete, onStepComplete]);

  // Determine next step button target label
  const getNextStepLabel = () => {
    if (stepId === 'step1') return 'Proceed to Step 2';
    if (stepId === 'step2') return 'Proceed to Step 3';
    return 'Module Complete';
  };

  return (
    <div style={styles.flowContainer}>
      {/* Beat Header / Progress */}
      <div style={styles.beatHeader}>
        <span style={styles.beatBadge}>BEAT {currentIndex + 1} OF {blocks.length}</span>
        <div style={styles.progressBarTrack}>
          <div
            style={{
              ...styles.progressBarFill,
              width: `${((currentIndex + 1) / blocks.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Active Beat Content (One block visible at a time) */}
      <div style={styles.beatContentArea}>
        {currentBlock && (
          <div key={currentIndex} style={styles.blockWrapper} className="reveal-block">
            <BlockItem
              block={currentBlock}
              index={currentIndex}
              onComplete={handleBlockComplete}
              onRightContentAppeared={handleRightContentAppeared}
            />
          </div>
        )}
      </div>

      {/* Navigation Controls: Back & Next / Next Step */}
      <div style={styles.controlBar}>
        <button
          className="btn-secondary"
          onClick={handleBack}
          disabled={currentIndex === 0}
          style={styles.backBtn}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        {hasMoreBlocks ? (
          <button
            className="btn-primary"
            onClick={handleNext}
            disabled={!isCurrentCompleted}
            style={styles.nextBtn}
          >
            <span>Next</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <div style={styles.endActionGroup}>
            {onGoToNextStep && stepId !== 'step3' ? (
              <button
                className="btn-primary"
                onClick={onGoToNextStep}
                style={styles.nextStepBtn}
              >
                <span>{getNextStepLabel()}</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <div style={styles.completeNotice}>
                <Sparkles size={18} color="var(--success)" />
                <span>All Steps Completed 🎉</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Memoized helper component to pass stable onComplete per index
const BlockItem = React.memo(function BlockItem({
  block,
  index,
  onComplete,
  onRightContentAppeared,
}) {
  const handleComplete = useCallback(() => {
    onComplete(index);
  }, [index, onComplete]);

  return (
    <BlockRenderer
      block={block}
      onComplete={handleComplete}
      onRightContentAppeared={onRightContentAppeared}
    />
  );
});

const styles = {
  flowContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxWidth: '680px',
    margin: '0 auto',
    padding: '1.5rem 1.25rem 1.5rem 1.25rem',
  },
  beatHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    marginBottom: '1.25rem',
  },
  beatBadge: {
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
  },
  progressBarTrack: {
    width: '100%',
    height: '4px',
    backgroundColor: 'var(--border-color)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'var(--primary)',
    transition: 'width 0.3s ease-out',
  },
  beatContentArea: {
    flex: 1,
    overflowY: 'auto',
    paddingRight: '0.25rem',
  },
  blockWrapper: {
    minHeight: '200px',
  },
  controlBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--border-color)',
    flexShrink: 0,
  },
  backBtn: {
    padding: '0.65rem 1.2rem',
  },
  nextBtn: {
    padding: '0.65rem 1.5rem',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
  },
  endActionGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  nextStepBtn: {
    backgroundColor: 'var(--success)',
    color: '#0f172a',
    fontWeight: 700,
    padding: '0.7rem 1.6rem',
    boxShadow: '0 4px 16px rgba(52, 211, 153, 0.3)',
  },
  completeNotice: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--success-bg)',
    border: '1px solid rgba(52, 211, 153, 0.3)',
    color: 'var(--success)',
    fontWeight: 600,
    fontSize: '0.95rem',
  },
};
