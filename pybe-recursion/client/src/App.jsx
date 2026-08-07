import React, { useState } from 'react';
import step1Blocks from './data/content-step-1.json';
import step2Blocks from './data/content-step-2.json';
import step3Blocks from './data/content-step-3.json';
import StepFlow from './components/StepFlow';
import TheaterScene from './components/TheaterScene';
import StepStaticPanel from './components/StepStaticPanel';
import { Layers, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { id: 'step1', title: 'Step 1: The Theater Story (Mental Model)', blocks: step1Blocks },
  { id: 'step2', title: 'Step 2: Understanding Recursion (Core Pillars)', blocks: step2Blocks },
  { id: 'step3', title: 'Step 3: Designing a Recursive Function (Blueprint)', blocks: step3Blocks },
];

export default function App() {
  const [activeStepId, setActiveStepId] = useState('step1');
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [isContentFullyAppeared, setIsContentFullyAppeared] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({});

  const activeStepObj = STEPS.find((s) => s.id === activeStepId) || STEPS[0];

  const handleStepComplete = (stepId) => {
    setCompletedSteps((prev) => ({ ...prev, [stepId]: true }));
  };

  const handleStepSelect = (stepId) => {
    setActiveStepId(stepId);
    setCurrentBlockIndex(0);
    setIsContentFullyAppeared(false);
  };

  const handleBlockChange = (index, fullyAppeared) => {
    setCurrentBlockIndex(index);
    setIsContentFullyAppeared(fullyAppeared);
  };

  const handleGoToNextStep = () => {
    if (activeStepId === 'step1') {
      handleStepComplete('step1');
      handleStepSelect('step2');
    } else if (activeStepId === 'step2') {
      handleStepComplete('step2');
      handleStepSelect('step3');
    }
  };

  return (
    <div className="app-container">
      {/* Top Header with Step Tabs */}
      <header className="app-header">
        <div className="header-content">
          <div className="brand-row">
            <div className="logo-badge">
              <Layers size={18} color="var(--primary)" />
            </div>
            <div>
              <h1 className="header-title">PyBE: Recursion</h1>
              <p className="header-subtitle">{activeStepObj.title}</p>
            </div>
          </div>

          {/* Step Navigation Tabs */}
          <div className="step-tabs">
            {STEPS.map((step, idx) => {
              const isActive = step.id === activeStepId;
              const isDone = !!completedSteps[step.id];
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepSelect(step.id)}
                  className={`step-tab-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                >
                  {isDone ? (
                    <CheckCircle2 size={14} color="var(--success)" />
                  ) : (
                    <span className="step-num">{idx + 1}</span>
                  )}
                  <span>Step {idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Split-Pane Content Layout (Full Browser Height for all steps) */}
      <main className="split-pane-layout">
        {/* Left Pane (1/3 width, static content / illustration) */}
        <aside className="left-scene-pane">
          {activeStepId === 'step1' ? (
            <TheaterScene currentBlockIndex={currentBlockIndex} />
          ) : (
            <StepStaticPanel
              stepId={activeStepId}
              currentBlockIndex={currentBlockIndex}
              activeBlock={activeStepObj.blocks[currentBlockIndex]}
              isContentFullyAppeared={isContentFullyAppeared}
            />
          )}
        </aside>

        {/* Right Pane (2/3 width, beat-based scrollable content area) */}
        <section className="right-content-pane">
          <StepFlow
            key={activeStepId}
            stepId={activeStepId}
            blocks={activeStepObj.blocks}
            onBlockChange={handleBlockChange}
            onStepComplete={() => handleStepComplete(activeStepId)}
            onGoToNextStep={handleGoToNextStep}
          />
        </section>
      </main>
    </div>
  );
}
