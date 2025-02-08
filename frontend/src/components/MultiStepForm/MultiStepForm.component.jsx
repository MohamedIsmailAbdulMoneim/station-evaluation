'use client';

import { useState } from 'react';
import Step from './Step/Step.component';

const MultiStepForm = ({ steps, onSubmit, errors }) => {
  const [step, setStep] = useState(17);

  const nextStep = () =>
    setStep((prev) => {
      return prev + 1;
    });

  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div>
      <Step
        step={step}
        stepData={steps[step - 1]}
        handleChange={handleChange}
        prevStep={step > 1 ? prevStep : null}
        nextStep={step !== steps.length ? nextStep : onSubmit}
        totalSteps={steps.length}
        stationNull={errors}
      />
    </div>
  );
};

export default MultiStepForm;
