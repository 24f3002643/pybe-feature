import React from 'react';
import theaterSceneImg from '../assets/theater-scene.png';
import { Award, MessageCircle } from 'lucide-react';

export default function TheaterScene({ currentBlockIndex }) {
  // Scene State triggers
  const isLightsOut = currentBlockIndex >= 1 && currentBlockIndex <= 8;
  const isThoughtBubble = currentBlockIndex === 1;
  const isCongrats = currentBlockIndex === 9;

  return (
    <div style={styles.sceneContainer}>
      {/* Base Theater Image - Fits 1/3 screen cleanly */}
      <img
        src={theaterSceneImg}
        alt="Movie Theater Scene"
        style={{
          ...styles.baseImage,
          filter: isLightsOut ? 'brightness(0.3) contrast(1.2)' : 'brightness(1) contrast(1)',
        }}
      />

      {/* State 1: Lights Out Overlay */}
      <div
        style={{
          ...styles.lightsOutOverlay,
          opacity: isLightsOut ? 1 : 0,
        }}
      />

      {/* State 2: Thought Bubble over Raghav */}
      {isThoughtBubble && (
        <div style={styles.thoughtBubble} className="reveal-block">
          <div style={styles.bubbleHeader}>
            <MessageCircle size={14} color="var(--primary)" />
            <span>RAGHAV THINKS...</span>
          </div>
          <p style={styles.bubbleText}>"Which row am I sitting in?"</p>
          <div style={styles.bubbleTail} />
        </div>
      )}

      {/* State 3: Congrats Overlay */}
      {isCongrats && (
        <div style={styles.congratsOverlay} className="reveal-block">
          <div style={styles.congratsCard}>
            <div style={styles.congratsIconBox}>
              <Award size={36} color="var(--success)" />
            </div>
            <h2 style={styles.congratsTitle}>Congratulations 👏</h2>
            <p style={styles.congratsSubtitle}>
              You have learned the entire concept of recursion!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  sceneContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '200px',
    overflow: 'hidden',
    backgroundColor: '#050914',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 40%',
    display: 'block',
    transition: 'filter 0.5s ease',
  },
  lightsOutOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 10, 24, 0.72)',
    pointerEvents: 'none',
    transition: 'opacity 0.5s ease',
  },
  thoughtBubble: {
    position: 'absolute',
    bottom: '22%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '88%',
    maxWidth: '280px',
    backgroundColor: '#1e293b',
    border: '2px solid var(--primary)',
    borderRadius: '12px',
    padding: '0.75rem 0.9rem',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
    zIndex: 10,
    boxSizing: 'border-box',
  },
  bubbleHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'var(--primary)',
    marginBottom: '0.25rem',
    textTransform: 'uppercase',
  },
  bubbleText: {
    fontSize: '0.88rem',
    fontWeight: 600,
    color: '#ffffff',
    lineHeight: 1.35,
    fontStyle: 'italic',
    wordWrap: 'break-word',
  },
  bubbleTail: {
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTop: '10px solid var(--primary)',
  },
  congratsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.25rem',
    zIndex: 15,
  },
  congratsCard: {
    textAlign: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    border: '1px solid rgba(52, 211, 153, 0.4)',
    borderRadius: 'var(--radius-lg)',
    padding: '1.5rem 1.1rem',
    width: '90%',
    maxWidth: '280px',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
  },
  congratsIconBox: {
    marginBottom: '0.75rem',
    display: 'flex',
    justifyContent: 'center',
  },
  congratsTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '0.4rem',
  },
  congratsSubtitle: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: 1.4,
  },
};
