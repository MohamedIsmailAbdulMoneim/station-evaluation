import { useEffect, useState } from 'react';
import styles from './Select.module.scss';

const Select = ({ label, name, data, options, ...props }) => {
  const [value, setValue] = useState('choose');

  useEffect(() => {
    setValue(data ?? '');
  }, [data]);
  return (
    <div className={styles['input-group']}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {/* <input id={name} name={name} className={styles.input} {...props} /> */}
      <select
        value={value}
        id={name}
        name={name}
        className={styles.input}
        {...props}
      >
        <option option="choose">اختر</option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
