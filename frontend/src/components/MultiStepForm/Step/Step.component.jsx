'use client';

import { useState, useRef, useEffect } from 'react';
import Radio from '@/components/Ui/RadioBtn/RadioBtn';
import styles from './Step.module.scss';
import Input from '@/components/Ui/Input/Input';

const Step = ({
  stepData,
  nextStep,
  prevStep,
  step,
  totalSteps,
  stationNull,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [insertedData, setInsertedData] = useState({});
  const [errors, setErrors] = useState({}); // Track validation errors
  const questionContainerRef = useRef(null);

  const scrollToTop = () => {
    if (questionContainerRef.current) {
      questionContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const validateFields = () => {
    const newErrors = {};
    stepData.questions.forEach((question) => {
      const storedValue = localStorage.getItem('station-evaluation');
      const parsedData = storedValue ? JSON.parse(storedValue) : {};
      const value = parsedData[question.question_id];

      if (!value || value.trim() === '') {
        newErrors[question.question_id] = 'This field is required.';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (!validateFields()) return; // Stop if validation fails

    setIsAnimating(true);
    nextStep();
    setTimeout(() => {
      scrollToTop();
      setIsAnimating(false);
    }, 100);
  };

  const handlePrevStep = () => {
    setIsAnimating(true);
    prevStep();
    setTimeout(() => {
      scrollToTop();
      setIsAnimating(false);
    }, 100);
  };

  const handleChange = (e) => {
    let stationEvaluation = JSON.parse(
      localStorage.getItem('station-evaluation'),
    );

    const insertedValue = {
      [e.target.name]: e.target.value,
    };

    stationEvaluation = { ...stationEvaluation, ...insertedValue };
    setInsertedData(stationEvaluation);
    localStorage.setItem(
      'station-evaluation',
      JSON.stringify(stationEvaluation),
    );

    // Remove validation error when the user enters valid input
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  useEffect(() => {
    const stationEvaluation = JSON.parse(
      localStorage.getItem('station-evaluation'),
    );

    setInsertedData(stationEvaluation);

    if (!stationEvaluation) {
      localStorage.setItem('station-evaluation', JSON.stringify({}));
    }
  }, []);

  return (
    <div
      className={`${styles.container} ${isAnimating ? styles.animate : ''}`}
      ref={questionContainerRef}
    >
      <div className={styles.card}>
        <div className={styles.titles}>
          <h2 className={styles.title}>{stepData.title}</h2>
          <h2 className={styles.title}>{stepData.subTitle}</h2>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <div>
          {stepData.questions.map((question, index) =>
            question.question_type === 'option' ? (
              <div
                className={`${styles['question-container']} ${
                  errors[question.question_id] ? styles.invalid : ''
                }`}
                key={question.question_id}
              >
                <div className={styles.questionHeader}>
                  <span className={styles.questionNumber}>{index + 1}</span>
                  <Radio
                    name={question.question_id}
                    onChange={handleChange}
                    options={question.options.split(',')}
                    label={question.question}
                    data={insertedData?.[question.question_id] ?? ''}
                    containOther={question.options.split(',').includes('other')}
                  />
                </div>
                {errors[question.question_id] && (
                  <p className={styles.error}>{errors[question.question_id]}</p>
                )}
              </div>
            ) : (
              <div
                className={`${styles['question-container']} ${
                  errors[question.question_id] ? styles.invalid : ''
                }`}
                key={question.question_id}
              >
                <div className={styles.questionHeader}>
                  <span className={styles.questionNumber}>{index + 1}</span>
                  <Input
                    onChange={handleChange}
                    label={question.question}
                    name={question.question_id}
                    placeholder={question.question}
                    className={styles['input-field']}
                    data={insertedData?.[question.question_id] ?? ''}
                  />
                </div>
                {errors[question.question_id] && (
                  <p className={styles.error}>{errors[question.question_id]}</p>
                )}
              </div>
            ),
          )}
        </div>

        <div className={styles.buttons}>
          {prevStep && (
            <button className={styles.backButton} onClick={handlePrevStep}>
              Back
            </button>
          )}
          {step !== totalSteps ? (
            <button className={styles.nextButton} onClick={handleNextStep}>
              Next
            </button>
          ) : (
            <button
              type="submit"
              onClick={nextStep}
              className={styles.submitButton}
            >
              Submit
            </button>
          )}
        </div>
        {stationNull && <h1 style={{ color: 'red' }}>{stationNull}</h1>}

        <div className={styles.pageCounter}>
          Page {step} of {totalSteps}
        </div>
      </div>
    </div>
  );
};

export default Step;
