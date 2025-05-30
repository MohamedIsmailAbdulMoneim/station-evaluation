'use client';

import { useState } from 'react';

import MultiStepForm from '@/components/MultiStepForm/MultiStepForm.component';
import StationDataForm from '@/components/StationDataForm/StationDataForm';
import correct from '@/assets/correct.svg';
import Image from 'next/image';
import Spinner from '@/components/Ui/Spinner/Spinner';

const StationEvalPage = ({ areas, insertAnswers, steps }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [errors, setErrors] = useState('');

  const submitForm = () => {
    const stationEvaluation = JSON.parse(
      localStorage.getItem('station-evaluation'),
    );

    const stationName = localStorage.getItem('station-name');

    if (!stationName || stationName === 'اختر') {
      setErrors('يرجى إدخال اسم المحطة');
      return;
    }
    setIsLoading(true);

    insertAnswers(stationEvaluation, stationName).then(() => {
      setIsLoading(false);
      setFormIsSubmitted(true);
      localStorage.removeItem('station-evaluation');
      localStorage.removeItem('station-name');
    });
  };

  if (isLoading) return <Spinner />;

  return formIsSubmitted ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <Image src={correct} alt="done" />
    </div>
  ) : (
    <>
      <StationDataForm areas={areas} />
      <MultiStepForm steps={steps} onSubmit={submitForm} errors={errors} />
    </>
  );
};

export default StationEvalPage;
