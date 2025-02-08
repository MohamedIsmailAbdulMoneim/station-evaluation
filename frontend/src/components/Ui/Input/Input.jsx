import { useEffect, useState } from 'react';
import styles from './Input.module.scss';

const Input = ({ label, data, name, ...props }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(data ?? '');
  }, [data]);
  return (
    <div className={styles['input-group']}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        className={styles.input}
        {...props}
        required={true}
      />
    </div>
  );
};

export default Input;
