'use client';

import styles from './StationDataForm.module.scss';
import Input from '@/components/Ui/Input/Input';
import Select from '@/components/Ui/Select/Select';
import { useEffect, useState } from 'react';

const StationDataForm = ({ stations }) => {
  const [formData, setFormData] = useState('');

  const changeHandler = (e) => {
    localStorage.setItem('station-name', e.target.value);
    setFormData(e.target.value);
  };

  useEffect(() => {
    const stationName = localStorage.getItem('station-name');
    setFormData(stationName);
  }, []);

  return (
    <div className={styles['form-container']}>
      <div className={styles['inputs-container']}>
        <div className={styles['input-group']}>
          <Input label="المحافظة" name="gov" />
        </div>

        <div className={styles['input-group']}>
          <Input label="المنطقة" name="area" />
        </div>

        <div className={styles['input-group']}>
          <Select
            onChange={changeHandler}
            label="اسم المحطة"
            name="station"
            options={stations}
            data={formData}
          />
        </div>
      </div>
    </div>
  );
};

export default StationDataForm;
