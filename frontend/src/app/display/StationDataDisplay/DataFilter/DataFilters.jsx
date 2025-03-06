'use client';

import styles from './DataFilters.module.scss';
import Input from '@/components/Ui/Input/Input';
import Select from '@/components/Ui/Select/Select';
import { useEffect, useState } from 'react';

const DataFilter = ({ stations, governs, areas, getData }) => {
  const [formData, setFormData] = useState({
    stationName: '',
    govName: '',
    areaName: '',
    date: '',
  });

  const changeHandler = (e) => {
    setFormData((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles['form-container']}>
      <div className={styles['inputs-container']}>
        <div className={styles['input-group']}>
          <Select
            onChange={changeHandler}
            label="المحافظة"
            name="gov"
            options={governs}
            data={formData.govName}
          />
        </div>

        <div className={styles['input-group']}>
          <Select
            onChange={changeHandler}
            label="المنطقة"
            name="area"
            options={areas}
            data={formData.areaName}
          />
        </div>

        <div className={styles['input-group']}>
          <Select
            onChange={changeHandler}
            label="اسم المحطة"
            name="stationName"
            options={stations}
            data={formData.stationName}
          />
        </div>
        <div className={styles['input-group']}>
          <Input
            onChange={changeHandler}
            type="date"
            label="التاريخ"
            name="date"
            data={formData.date}
          />
        </div>
      </div>
      <button
        onClick={() => getData(formData.stationName, formData.date)}
        className={styles.button}
      >
        بحث
      </button>
    </div>
  );
};

export default DataFilter;
