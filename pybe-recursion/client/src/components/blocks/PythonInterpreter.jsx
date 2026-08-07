import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function PythonInterpreter({ initialCode, defaultN = 5 }) {
  const [nInput, setNInput] = useState(defaultN);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const runFactorial = () => {
    setIsRunning(true);
    setHasRun(true);
    setConsoleLogs([]);

    const num = parseInt(nInput, 10);

    if (isNaN(num) || num < 0) {
      setConsoleLogs([
        { text: `ValueError: factorial() not defined for negative numbers or invalid input`, type: 'error' },
      ]);
      setIsRunning(false);
      return;
    }

    if (num > 15) {
      setConsoleLogs([
        { text: `RecursionError: maximum recursion depth exceeded (limit test <= 15)`, type: 'error' },
      ]);
      setIsRunning(false);
      return;
    }

    let logs = [];
    logs.push({ text: `>>> Running factorial(${num}) in Python 3.11...`, type: 'info' });

    // Step 1: Forward recursion trace
    function calcFactorial(n, depth = 0) {
      const indent = '  '.repeat(depth);
      if (n === 0) {
        logs.push({
          text: `${indent}↳ factorial(0) → Base Case reached! Returning 1`,
          type: 'success',
        });
        return 1;
      }

      logs.push({
        text: `${indent}↳ factorial(${n}) calls ${n} * factorial(${n - 1})`,
        type: 'call',
      });

      const subResult = calcFactorial(n - 1, depth + 1);
      const result = n * subResult;

      logs.push({
        text: `${indent}⮤ factorial(${n}) returns ${n} * ${subResult} = ${result}`,
        type: 'return',
      });

      return result;
    }

    const finalResult = calcFactorial(num);

    logs.push({
      text: `----------------------------------------`,
      type: 'info',
    });
    logs.push({
      text: `Output: factorial(${num}) = ${finalResult}`,
      type: 'result',
    });

    // Simulate terminal typing line-by-line
    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx < logs.length) {
        const nextLog = logs[logIdx];
        setConsoleLogs((prev) => [...prev, nextLog]);
        logIdx++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 120);
  };

  const handleClear = () => {
    setConsoleLogs([]);
    setHasRun(false);
  };

  return (
    <div style={styles.container} className="reveal-block">
      <div style={styles.interpreterHeader}>
        <div style={styles.titleGroup}>
          <Terminal size={18} color="var(--success)" />
          <span style={styles.titleText}>PYTHON INTERPRETER & EXECUTION ENGINE</span>
        </div>
        <span style={styles.envTag}>Python 3.11</span>
      </div>

      {/* Code Editor Preview */}
      <div style={styles.editorBox}>
        <pre style={styles.codeContent}>
          <code>{initialCode || `def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n-1)`}</code>
        </pre>
      </div>

      {/* Input & Controls */}
      <div style={styles.controlRow}>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Input n =</label>
          <input
            type="number"
            min="0"
            max="15"
            value={nInput}
            onChange={(e) => setNInput(e.target.value)}
            style={styles.numInput}
          />
        </div>

        <div style={styles.btnGroup}>
          <button
            style={styles.runBtn}
            onClick={runFactorial}
            disabled={isRunning}
          >
            <Play size={15} fill="currentColor" />
            <span>{isRunning ? 'Executing...' : `Run factorial(${nInput || 0})`}</span>
          </button>

          {hasRun && (
            <button style={styles.clearBtn} onClick={handleClear}>
              <RotateCcw size={14} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Terminal Window */}
      {(hasRun || consoleLogs.length > 0) && (
        <div style={styles.terminalBox} className="reveal-chunk">
          <div style={styles.terminalHeader}>
            <span style={styles.terminalDotRed} />
            <span style={styles.terminalDotYellow} />
            <span style={styles.terminalDotGreen} />
            <span style={styles.terminalTitle}>stdout - Python Execution Trace</span>
          </div>

          <div style={styles.terminalBody}>
            {consoleLogs.map((log, idx) => {
              let color = '#38bdf8';
              if (log.type === 'error') color = '#f87171';
              if (log.type === 'success') color = '#34d399';
              if (log.type === 'result') color = '#fbbf24';
              if (log.type === 'return') color = '#a78bfa';

              return (
                <div key={idx} style={{ color, ...styles.terminalLine }}>
                  {log.text}
                </div>
              );
            })}
            {isRunning && (
              <div style={styles.typingLine}>
                <span className="typing-cursor">|</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: '1.5rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: '#090d16',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
  },
  interpreterHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.65rem 1rem',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderBottom: '1px solid var(--border-color)',
  },
  titleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  titleText: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--success)',
  },
  envTag: {
    fontSize: '0.7rem',
    fontWeight: 600,
    color: 'var(--text-muted)',
    backgroundColor: 'rgba(51, 65, 85, 0.5)',
    padding: '0.15rem 0.5rem',
    borderRadius: '4px',
  },
  editorBox: {
    padding: '1rem',
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: '#060a12',
  },
  codeContent: {
    fontFamily: "'Fira Code', 'Courier New', monospace",
    fontSize: '0.92rem',
    color: '#38bdf8',
    margin: 0,
    lineHeight: 1.6,
  },
  controlRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  inputLabel: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-main)',
  },
  numInput: {
    width: '60px',
    padding: '0.35rem 0.5rem',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: '#0f172a',
    border: '1px solid var(--primary)',
    color: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: 700,
    textAlign: 'center',
  },
  btnGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  runBtn: {
    backgroundColor: 'var(--success)',
    color: '#0f172a',
    fontWeight: 700,
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius-sm)',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.85rem',
    boxShadow: '0 2px 10px rgba(52, 211, 153, 0.2)',
  },
  clearBtn: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    color: 'var(--text-muted)',
    border: '1px solid var(--border-color)',
    padding: '0.45rem 0.75rem',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.8rem',
  },
  terminalBox: {
    borderTop: '1px solid var(--border-color)',
    backgroundColor: '#04070f',
  },
  terminalHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.4rem 0.85rem',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderBottom: '1px solid rgba(51, 65, 85, 0.4)',
  },
  terminalDotRed: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#ef4444',
  },
  terminalDotYellow: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#f59e0b',
  },
  terminalDotGreen: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
  },
  terminalTitle: {
    fontSize: '0.7rem',
    fontWeight: 600,
    color: 'var(--text-muted)',
    marginLeft: '0.4rem',
  },
  terminalBody: {
    padding: '0.85rem 1rem',
    fontFamily: "'Fira Code', 'Courier New', monospace",
    fontSize: '0.85rem',
    minHeight: '120px',
    maxHeight: '260px',
    overflowY: 'auto',
  },
  terminalLine: {
    marginBottom: '0.35rem',
    lineHeight: 1.4,
  },
  typingLine: {
    display: 'inline-block',
  },
};
