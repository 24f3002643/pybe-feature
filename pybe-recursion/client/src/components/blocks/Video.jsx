import React, { useEffect, useRef } from 'react';
import { Video as VideoIcon, ExternalLink, Play } from 'lucide-react';

export default function Video({ block, onComplete }) {
  const { title, url, note, optional } = block;
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
        <VideoIcon size={20} color="var(--primary)" />
        <span style={styles.badge}>
          {optional ? 'OPTIONAL VIDEO REFERENCE' : 'RECOMMENDED VIDEO'}
        </span>
      </div>

      <h3 style={styles.title}>{title}</h3>

      {note && <p style={styles.note}>{note}</p>}

      <div style={styles.actionRow}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.videoLinkBtn}
        >
          <Play size={16} fill="currentColor" />
          <span>Watch Visual Explanation</span>
          <ExternalLink size={14} />
        </a>
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
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '0.5rem',
  },
  note: {
    fontSize: '0.92rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
    marginBottom: '1.25rem',
  },
  actionRow: {
    display: 'flex',
  },
  videoLinkBtn: {
    backgroundColor: 'var(--primary)',
    color: '#0f172a',
    fontWeight: 700,
    padding: '0.65rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
    transition: 'opacity 0.2s ease',
  },
};
