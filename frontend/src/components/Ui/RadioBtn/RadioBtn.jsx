'use client';

import { useEffect, useState } from 'react';
import './RadioBtn.css'; // Import CSS file

const Radio = ({
  options,
  label,
  containOther = false,
  name,
  data,
  ...handlers
}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [otherValue, setOtherValue] = useState('');

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value !== 'Other') {
      setOtherValue(''); // Reset text input when another option is selected
    }

    if (handlers.onChange) {
      handlers.onChange(e); // Pass event for normal radio buttons
    }
  };

  const handleOtherTextChange = (e) => {
    const value = e.target.value;
    setOtherValue(value);

    if (handlers.onChange) {
      // Create a custom event to mimic onChange
      handlers.onChange({
        target: {
          name,
          value, // Pass the text input value
        },
      });
    }
  };

  useEffect(() => {
    if (data === 'نعم' || data === 'لا') setSelectedOption(data ?? '');
    else setOtherValue(data ?? '');
  }, [data]);

  return (
    <div className="radio-group">
      <label className="radio-label">{label}</label>
      <div className="radio-container">
        {options.map((option, index) => (
          <div key={`${name}_${option}_${index}`} className="radio-option">
            {option !== 'other' ? (
              <>
                <input
                  {...handlers}
                  type="radio"
                  value={option}
                  name={name}
                  id={`${name}_${option}_${index}`}
                  className="radio-input"
                  checked={selectedOption === option}
                  onChange={handleRadioChange}
                  required={true}
                />
                <label
                  htmlFor={`${name}_${option}_${index}`}
                  className="custom-radio"
                >
                  <span className="checkmark"></span>
                  {option}
                </label>
              </>
            ) : (
              <div className="other-option">
                <input
                  type="radio"
                  value="Other"
                  id={`${name}_Other`}
                  className="radio-input"
                  name={name}
                  checked={selectedOption === 'Other'}
                  onChange={handleRadioChange}
                  required={true}
                />
                <label htmlFor={`${name}_Other`} className="custom-radio">
                  <span className="checkmark"></span>
                  Other
                </label>
                <input
                  name={`${name}_OtherInput`}
                  type="text"
                  value={otherValue}
                  id={`${name}_OtherInput`}
                  className="other-input"
                  disabled={selectedOption !== 'Other'}
                  onChange={handleOtherTextChange} // Pass input value
                  required={true}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Radio;
