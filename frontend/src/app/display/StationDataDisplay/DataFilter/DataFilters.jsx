'use client';

import styles from './DataFilters.module.scss';
import Input from '@/components/Ui/Input/Input';
import Select from '@/components/Ui/Select/Select';
import { useState } from 'react';

const DataFilter = ({
  handleGetGov,
  handleGetStation,
  stations,
  governs,
  areas,
  getData,
}) => {
  const [formInf, setFormInf] = useState({
    stationName: '',
    govName: '',
    areaName: '',
    date: '',
  });

  const changeHandler = (e) => {
    if (e.target.name === 'areaName') handleGetGov(e.target.value);
    if (e.target.name === 'govName') handleGetStation(e.target.value);
    setFormInf((old) => ({
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
            label="المنطقة"
            name="areaName"
            options={areas}
            data={formInf.areaName}
          />
        </div>

        <div className={styles['input-group']}>
          <Select
            onChange={changeHandler}
            label="المحافظة"
            name="govName"
            options={governs}
            data={formInf.govName}
          />
        </div>

        <div className={styles['input-group']}>
          <Select
            onChange={changeHandler}
            label="اسم المحطة"
            name="stationName"
            options={stations}
            data={formInf.stationName}
          />
        </div>
        <div className={styles['input-group']}>
          <Input
            onChange={changeHandler}
            type="date"
            label="التاريخ"
            name="date"
            data={formInf.date}
          />
        </div>
      </div>
      <button
        onClick={() => getData(formInf.stationName, formInf.date)}
        className={styles.button}
      >
        بحث
      </button>
    </div>
  );
};

export default DataFilter;
