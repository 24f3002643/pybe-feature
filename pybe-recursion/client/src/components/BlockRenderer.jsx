import React from 'react';
import Banner from './blocks/Banner';
import Markdown from './blocks/Markdown';
import Challenge from './blocks/Challenge';
import Ponder from './blocks/Ponder';
import QAReflection from './blocks/QAReflection';
import Concept from './blocks/Concept';
import ConceptMap from './blocks/ConceptMap';
import MCQ from './blocks/MCQ';
import Fact from './blocks/Fact';
import CodeSteps from './blocks/CodeSteps';
import FillBlank from './blocks/FillBlank';
import Video from './blocks/Video';

export default function BlockRenderer({ block, onComplete, onRightContentAppeared }) {
  if (!block || !block.type) {
    return null;
  }

  switch (block.type) {
    case 'banner':
      return <Banner block={block} onComplete={onComplete} />;
    case 'markdown':
      return <Markdown block={block} onComplete={onComplete} />;
    case 'challenge':
      return <Challenge block={block} onComplete={onComplete} />;
    case 'ponder':
      return <Ponder block={block} onComplete={onComplete} />;
    case 'qa-reflection':
      return <QAReflection block={block} onComplete={onComplete} />;
    case 'concept':
      return (
        <Concept
          block={block}
          onComplete={onComplete}
          onRightContentAppeared={onRightContentAppeared}
        />
      );
    case 'concept-map':
      return <ConceptMap block={block} onComplete={onComplete} />;
    case 'mcq':
      return <MCQ block={block} onComplete={onComplete} />;
    case 'fact':
      return <Fact block={block} onComplete={onComplete} />;
    case 'code-steps':
      return <CodeSteps block={block} onComplete={onComplete} />;
    case 'fill-blank':
      return <FillBlank block={block} onComplete={onComplete} />;
    case 'video':
      return <Video block={block} onComplete={onComplete} />;
    default:
      return (
        <div style={styles.fallback}>
          <code>[Unhandled block type: {block.type}]</code>
        </div>
      );
  }
}

const styles = {
  fallback: {
    padding: '1rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-card)',
    border: '1px border-dashed var(--border-color)',
    color: 'var(--text-muted)',
    marginBottom: '1rem',
  },
};
