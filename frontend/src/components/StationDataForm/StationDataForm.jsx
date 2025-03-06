'use client';

import styles from './StationDataForm.module.scss';
import Select from '@/components/Ui/Select/Select';
import { useEffect, useState } from 'react';

const StationDataForm = ({ stations, governs, areas }) => {
  const [formData, setFormData] = useState({
    stationName: '',
    govName: '',
    areaName: '',
  });

  const changeHandler = (e) => {
    if (e.target.name === 'stationName')
      localStorage.setItem('station-name', e.target.value);
    setFormData((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const stationName = localStorage.getItem('station-name');
    setFormData(stationName);
  }, []);

  return (
    <div className={styles['form-container']}>
      <div className={styles['inputs-container']}>
        <div className={styles['input-group']}>
          <Select
            onChange={changeHandler}
            label="المحافظة"
            name={formData.govName}
            options={governs}
            data={formData.govName}
          />
        </div>

        <div className={styles['input-group']}>
          <Select
            onChange={changeHandler}
            label="المنطقة"
            name={formData.areaName}
            options={areas}
            data={formData.areaName}
          />
        </div>

        <div className={styles['input-group']}>
          <Select
            onChange={changeHandler}
            label="اسم المحطة"
            name={formData.stationName}
            options={stations}
            data={formData.stationName}
          />
        </div>
      </div>
    </div>
  );
};

export default StationDataForm;
