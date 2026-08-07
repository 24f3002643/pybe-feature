import React from 'react';
import { BookOpen, ShieldCheck, RefreshCw, HelpCircle, Code2, Sparkles, Info } from 'lucide-react';

export default function StepStaticPanel({
  stepId,
  currentBlockIndex = 0,
  activeBlock,
  isContentFullyAppeared = false,
}) {
  if (stepId === 'step2') {
    // Beats 1 & 2 (indices 0 and 1): Big centered italic bold title
    if (currentBlockIndex < 2) {
      return (
        <div style={styles.titlePanelContainer} className="reveal-block">
          <div style={styles.titleBox}>
            <Sparkles size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h2 style={styles.bigItalicTitle}>Understanding Recursion</h2>
          </div>
        </div>
      );
    }

    // Beats 3 to 5 (indices 2 to 4): Small underlined header at top + Python code after right content appears
    if (currentBlockIndex < 5) {
      const hasCode = activeBlock && activeBlock.code;

      return (
        <div style={styles.topHeaderPanelContainer}>
          {/* Underlined Small Header at Top */}
          <div style={styles.smallHeaderBox}>
            <u style={styles.underlinedTitle}>Understanding Recursion</u>
          </div>

          {/* Delayed Python Code Display */}
          <div style={styles.codeDisplayArea}>
            {hasCode && isContentFullyAppeared ? (
              <div style={styles.codeCard} className="reveal-block">
                <div style={styles.codeHeader}>
                  <Code2 size={16} color="var(--primary)" />
                  <span style={styles.codeTitle}>PYTHON EXAMPLE</span>
                </div>
                <pre style={styles.codeBlock}>
                  <code>{activeBlock.code}</code>
                </pre>
                {activeBlock.codeNote && (
                  <div style={styles.codeNoteRow}>
                    <Info size={14} color="var(--text-muted)" />
                    <span style={styles.codeNoteText}>{activeBlock.codeNote}</span>
                  </div>
                )}
              </div>
            ) : hasCode ? (
              <div style={styles.waitingNotice}>
                <span style={styles.waitingText}>Read explanation on the right...</span>
              </div>
            ) : null}
          </div>
        </div>
      );
    }

    // Beat 6 onwards (index >= 5): Reveal core concepts summary panel
    return (
      <div style={styles.panelContainer} className="reveal-block">
        <div style={styles.panelHeader}>
          <Sparkles size={20} color="var(--primary)" />
          <h3 style={styles.panelTitle}>Recursion Overview</h3>
        </div>
        <p style={styles.panelSubtitle}>Key pillars of recursive thinking</p>

        <div style={styles.cardsStack}>
          <div style={{ ...styles.conceptCard, borderLeftColor: 'var(--primary)' }}>
            <div style={styles.cardTitleRow}>
              <BookOpen size={16} color="var(--primary)" />
              <span style={{ ...styles.cardTitle, color: 'var(--primary)' }}>1. RECURSION</span>
            </div>
            <p style={styles.cardText}>
              Solving a problem by breaking it into a smaller sub-problem of the <strong>exact same kind</strong>.
            </p>
          </div>

          <div style={{ ...styles.conceptCard, borderLeftColor: 'var(--success)' }}>
            <div style={styles.cardTitleRow}>
              <ShieldCheck size={16} color="var(--success)" />
              <span style={{ ...styles.cardTitle, color: 'var(--success)' }}>2. BASE CASE</span>
            </div>
            <p style={styles.cardText}>
              The stopping condition where the function returns a value <strong>without calling itself</strong>.
            </p>
          </div>

          <div style={{ ...styles.conceptCard, borderLeftColor: 'var(--warning)' }}>
            <div style={styles.cardTitleRow}>
              <RefreshCw size={16} color="var(--warning)" />
              <span style={{ ...styles.cardTitle, color: 'var(--warning)' }}>3. RECURSIVE CASE</span>
            </div>
            <p style={styles.cardText}>
              The step where the problem is solved in a smaller form that <strong>moves closer to the base case</strong>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (stepId === 'step3') {
    // Beats 1 & 2 (indices 0 and 1): Big centered italic bold title
    if (currentBlockIndex < 2) {
      return (
        <div style={styles.titlePanelContainer} className="reveal-block">
          <div style={styles.titleBox}>
            <Sparkles size={28} color="var(--purple)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ ...styles.bigItalicTitle, background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Designing a Recursive Function
            </h2>
          </div>
        </div>
      );
    }

    // Beat 3 onwards (index >= 2): Reveal Function Blueprint panel
    return (
      <div style={styles.panelContainer} className="reveal-block">
        <div style={styles.panelHeader}>
          <Code2 size={20} color="var(--purple)" />
          <h3 style={styles.panelTitle}>Function Blueprint</h3>
        </div>
        <p style={styles.panelSubtitle}>3 questions to design any recursive function</p>

        <div style={styles.cardsStack}>
          <div style={{ ...styles.conceptCard, borderLeftColor: 'var(--purple)' }}>
            <div style={styles.cardTitleRow}>
              <HelpCircle size={16} color="var(--purple)" />
              <span style={{ ...styles.cardTitle, color: 'var(--purple)' }}>Q1. RETURN VALUE</span>
            </div>
            <p style={styles.cardText}>
              What specific result should the function compute and return?
            </p>
          </div>

          <div style={{ ...styles.conceptCard, borderLeftColor: 'var(--success)' }}>
            <div style={styles.cardTitleRow}>
              <ShieldCheck size={16} color="var(--success)" />
              <span style={{ ...styles.cardTitle, color: 'var(--success)' }}>Q2. SMALLEST CASE</span>
            </div>
            <p style={styles.cardText}>
              What is the simplest input (e.g. <code>n == 1</code>) solved directly?
            </p>
          </div>

          <div style={{ ...styles.conceptCard, borderLeftColor: 'var(--primary)' }}>
            <div style={styles.cardTitleRow}>
              <RefreshCw size={16} color="var(--primary)" />
              <span style={{ ...styles.cardTitle, color: 'var(--primary)' }}>Q3. RECURSIVE STEP</span>
            </div>
            <p style={styles.cardText}>
              How do we express <code>problem(n)</code> in terms of <code>problem(n - 1)</code>?
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

const styles = {
  titlePanelContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1.5rem',
    backgroundColor: '#070c18',
    textAlign: 'center',
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigItalicTitle: {
    fontSize: '2.1rem',
    fontWeight: 800,
    fontStyle: 'italic',
    color: '#ffffff',
    lineHeight: 1.35,
    letterSpacing: '-0.02em',
    background: 'linear-gradient(135deg, #ffffff 0%, #38bdf8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  topHeaderPanelContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem 1.25rem',
    backgroundColor: '#070c18',
  },
  smallHeaderBox: {
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  underlinedTitle: {
    fontSize: '0.95rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    color: 'var(--primary)',
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
  },
  codeDisplayArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  codeCard: {
    backgroundColor: '#090d16',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
  },
  codeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.55rem 0.85rem',
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
  codeNoteRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.4rem',
    padding: '0.65rem 0.85rem',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderTop: '1px solid var(--border-color)',
  },
  codeNoteText: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    lineHeight: 1.35,
    fontStyle: 'italic',
  },
  waitingNotice: {
    textAlign: 'center',
    padding: '1rem',
  },
  waitingText: {
    fontSize: '0.8rem',
    color: 'var(--text-dim)',
    fontStyle: 'italic',
  },
  panelContainer: {
    padding: '1.75rem 1.25rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    backgroundColor: '#070c18',
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.2rem',
  },
  panelTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: '#ffffff',
  },
  panelSubtitle: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    marginBottom: '1.5rem',
  },
  cardsStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  conceptCard: {
    padding: '1rem 1.1rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    border: '1px solid var(--border-color)',
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
  },
  cardTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    marginBottom: '0.4rem',
  },
  cardTitle: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  cardText: {
    fontSize: '0.88rem',
    color: 'var(--text-main)',
    lineHeight: 1.45,
  },
};
