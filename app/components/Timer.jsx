"use client"
import React, { useState, useEffect, useRef } from 'react';
import BrowserNotificationHandler from '../utils/BrowserNotificationHandler'
import SignalRService from '../hooks/SignalRService';

// Components
import TimerControls from './TimerControls';
import TimerSetter from './TimerSetter';
import TimerSoundSetter from './TimerSoundSetter';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(59);
  const [selectedTime, setSelectedTime] = useState(59);
  const [isRunning, setIsRunning] = useState(false);
	const [selectedSound, setSelectedSound] = useState('/timesup.mp3');

  let signalRServiceRef = useRef(null);

  useEffect(() => {
    signalRServiceRef.current = new SignalRService('/timer');

    signalRServiceRef.current.on('UpdateTime', (newTime) => {
      setTimeLeft(newTime);
      setSelectedTime(newTime);
      setIsRunning(false);
    });

    signalRServiceRef.current.on('StartTimer', (duration) => {
      handleTimeSet(duration);
      setIsRunning(true);
    });

    signalRServiceRef.current.on('PauseTimer', () => setIsRunning(false));

    signalRServiceRef.current.on('ResetTimer', (selectedTime) => {
      setTimeLeft(selectedTime);
      setIsRunning(false);
    });

    signalRServiceRef.current.on('EndTimer', (selectedTime) => {
      setTimeLeft(selectedTime);
      setIsRunning(false);
      BrowserNotificationHandler.showNotification("Time's up!", "Next one in line");
    });

    return () => {
      signalRServiceRef.current.close();
    };
  }, []);

	useEffect(() => {
		BrowserNotificationHandler.setSelectedSound(selectedSound);
  }, [selectedSound]);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      endTimer()
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimeSet = (newTime) => {
    setTimeLeft(newTime);
    setSelectedTime(newTime);
    setIsRunning(false);
  };

  const updateTime = (newTime) => {
    signalRServiceRef.current.invoke('BroadcastUpdateTime', newTime);
  };

  const startTimer = () => {
    signalRServiceRef.current.invoke('BroadcastStartTimer', timeLeft);
  };

  const pauseTimer = () => {
    signalRServiceRef.current.invoke('BroadcastPauseTimer');
  };

  const resetTimer = () => {
    signalRServiceRef.current.invoke('BroadcastResetTimer', selectedTime);
  };

	const endTimer = () => {
		signalRServiceRef.current.invoke('BroadcastEndTimer', selectedTime);
  };

  const radius = 150;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((timeLeft / selectedTime) * circumference) - circumference;
	const circleStyle = {
    transition: 'stroke-dashoffset .98s linear',
  };

  return (
    <>
      <svg width="320" height="320" className="mx-auto mb-4">
        <circle
					cx="160"
					cy="160"
					r={radius}
					fill="none"
					strokeWidth="5"
					className="stroke-current text-black"
        />
        <circle
					cx="160"
					cy="160"
					r={radius}
					fill="none"
					strokeWidth="5"
					style={circleStyle}
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					transform="rotate(-90 160 160)"
					className={`stroke-current ${isRunning ? 'text-primary' : 'text-yellow'}`}
        />
        <text
					x="50%" 
					y="50%" 
					dy=".3em" 
					textAnchor="middle" 
					fontSize="36"
					className={`fill-current ${isRunning ? 'text-primary' : 'text-yellow'}`}
        >
            {formatTime()}
        </text>
      </svg>
			<TimerControls
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
        isRunning={isRunning}
      />
      <TimerSetter onTimeSet={updateTime} />
			<TimerSoundSetter
        selectedSound={selectedSound}
        setSelectedSound={setSelectedSound}
      />
    </>
  );
};

export default Timer;
