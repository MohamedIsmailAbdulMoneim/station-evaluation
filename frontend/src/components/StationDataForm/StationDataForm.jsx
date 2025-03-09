'use client';

import styles from './StationDataForm.module.scss';
import Select from '@/components/Ui/Select/Select';
import { getGovernorates, getStations } from '@/lib/apiHandlers/utils';
import { useEffect, useState } from 'react';

const StationDataForm = ({ areas }) => {
  const [formInf, setFormInf] = useState({
    stationName: '',
    govName: '',
    areaName: '',
  });
  const [governs, setGoverns] = useState([]);
  const [stations, setStations] = useState([]);

  const changeHandler = (e) => {
    if (e.target.name === 'stationName')
      localStorage.setItem('station-name', e.target.value);
    setFormInf((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const stationName = localStorage.getItem('station-name');
    setFormInf({ ...formInf, stationName });
  }, []);

  useEffect(() => {
    const areaName = formInf.areaName;
    if (areaName) {
      getGovernorates(areaName).then((data) => {
        setGoverns(data);
      });
    }
  }, [formInf.areaName]);

  useEffect(() => {
    const govName = formInf.govName;
    if (govName) {
      getStations(govName).then((data) => {
        setStations(data);
      });
    }
  }, [formInf.govName]);

  return (
    <div className={styles['form-container']}>
      <div className={styles['inputs-container']}>
        <div className={styles['input-group']}>
          <Select
            onChange={changeHandler}
            label="المنطقة"
            name="areaName"
            options={areas || []}
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
            options={stations || []}
            data={formInf.stationName}
          />
        </div>
      </div>
    </div>
  );
};

export default StationDataForm;
