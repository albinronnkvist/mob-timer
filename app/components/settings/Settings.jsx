'use client'
import React, { useState, useContext } from 'react';
import { SignalRContext } from '../../contexts/SignalRContext';

import TimerSettings from './TimerSettings';
import BrowserNotificationSettings from './BrowserNotificationSettings';

const Settings = () => {
  const timerEndpoint = '/timer';
  const { signalRService } = useContext(SignalRContext);
  const [selectedSound, setSelectedSound] = useState('/timesup.mp3');

  const updateTime = (newTime) => {
    signalRService.invoke(timerEndpoint, 'BroadcastUpdateTime', newTime);
  };

  return (
    <div className="flex justify-center mb-8">
      <TimerSettings onUpdateTime={updateTime} />
      <BrowserNotificationSettings
        selectedSound={selectedSound}
        setSelectedSound={setSelectedSound}
      />
    </div>
  );
};

export default Settings;