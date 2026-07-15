import React, { useRef, useState, useEffect } from 'react';
import './OTPInput.css';

export const OTPInput = ({ value = '', onChange }) => {
  const length = 6;
  const [otpArray, setOtpArray] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  // Sync state if value is cleared externally
  useEffect(() => {
    if (value === '') {
      setOtpArray(Array(length).fill(''));
    }
  }, [value]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return; // only allow numbers

    const newOtp = [...otpArray];
    // Keep only the last character entered
    newOtp[index] = val.substring(val.length - 1);
    setOtpArray(newOtp);

    const combinedOtp = newOtp.join('');
    onChange(combinedOtp);

    // Focus next input if current one is filled
    if (newOtp[index] !== '' && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otpArray];
      
      if (newOtp[index] === '' && index > 0) {
        // If current index is empty, clear previous index and focus it
        newOtp[index - 1] = '';
        setOtpArray(newOtp);
        onChange(newOtp.join(''));
        inputsRef.current[index - 1].focus();
      } else {
        // Just clear current index
        newOtp[index] = '';
        setOtpArray(newOtp);
        onChange(newOtp.join(''));
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    if (!/^\d+$/.test(pastedData)) return; // Allow numbers only

    const newOtp = [...otpArray];
    for (let i = 0; i < length; i++) {
      newOtp[i] = pastedData[i] || '';
    }
    setOtpArray(newOtp);
    onChange(newOtp.join(''));

    // Focus last filled or next empty box
    const focusIndex = pastedData.length < length ? pastedData.length : length - 1;
    inputsRef.current[focusIndex].focus();
  };

  return (
    <div className="otp-inputs-wrapper" onPaste={handlePaste}>
      {otpArray.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => (inputsRef.current[idx] = el)}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="otp-digit-box"
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus={idx === 0}
        />
      ))}
    </div>
  );
};

export default OTPInput;
