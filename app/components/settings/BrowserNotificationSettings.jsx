'use client'
import React, { useEffect } from 'react';
import BrowserNotificationHandler from '../../utils/BrowserNotificationHandler';

const BrowserNotificationSettings = ({ selectedSound, setSelectedSound }) => {

  useEffect(() => {
    BrowserNotificationHandler.setSelectedSound(selectedSound);
  }, [selectedSound]);

  const handleSoundChange = (event) => {
    setSelectedSound(event.target.value);
  };

  return (
    <div className="flex justify-center">
      <select value={selectedSound} onChange={handleSoundChange}>
        <option value="/timesup.mp3">Time's up!</option>
        <option value="/lazergun.mp3">Lazer gun</option>
      </select>
    </div>
  );
};

export default BrowserNotificationSettings;