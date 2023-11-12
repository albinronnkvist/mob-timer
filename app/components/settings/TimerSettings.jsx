'use client'
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const TimerSettings = ({ onUpdateTime }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const [error, setError] = useState('');

  const handleMinutesChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value));
    setMinutes(isNaN(value) ? '' : value);
    setError('');
  };

  const handleSecondsChange = (e) => {
    const value = Math.max(0, Math.min(59, parseInt(e.target.value)));
    setSeconds(isNaN(value) ? '' : value);
    setError('');
  };

  const isValidTime = () => {
    return (
      !isNaN(minutes) && minutes >= 0 &&
      !isNaN(seconds) && seconds >= 0 && seconds <= 59
    );
  };

  const handleSubmit = () => {
    if (!isValidTime()) {
      setError('Invalid time. Ensure minutes and seconds are correct.');
      return;
    }

    const totalSeconds = (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
    onUpdateTime(totalSeconds);
  };

  return (
    <div className="flex flex-col items-center space-y-2 mb-4">
      <div className="flex space-x-2">
        <input 
          type="number" 
          value={minutes} 
          onChange={handleMinutesChange}
          className="p-2 border border-primary rounded w-16 bg-background text-primary"
        />
        <input 
          type="number" 
          value={seconds} 
          onChange={handleSecondsChange}
          className="p-2 border border-primary rounded w-16 bg-background text-primary"
        />
        <button 
          onClick={handleSubmit} 
          className="p-3 border border-transparent rounded-full bg-primary text-background flex items-center justify-center">
          <FaCheck />
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default TimerSettings;
