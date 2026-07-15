import React from 'react';
import './ProgressSteps.css';

export const ProgressSteps = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, label: 'Delivery Address' },
    { id: 2, label: 'Order Review' },
    { id: 3, label: 'Payment' }
  ];

  return (
    <div className="progress-steps-container">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <React.Fragment key={step.id}>
            <div className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="step-circle">
                {isCompleted ? (
                  <span className="step-check">✓</span>
                ) : (
                  <span className="step-number">{step.id}</span>
                )}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`step-connector ${isCompleted ? 'completed' : ''}`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressSteps;
