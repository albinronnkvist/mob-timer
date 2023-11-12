'use client'
import React, { useState, useEffect, useContext } from 'react';
import BrowserNotificationHandler from '../utils/BrowserNotificationHandler'
import { SignalRContext } from '../contexts/SignalRContext';

// Components
import TimerControls from './TimerControls';

const Timer = () => {
  const { signalRService, connections } = useContext(SignalRContext);
  const timerEndpoint = '/timer';
  const [timeLeft, setTimeLeft] = useState(59);
  const [selectedTime, setSelectedTime] = useState(59);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (connections[[timerEndpoint]]) {
      signalRService.on(timerEndpoint, 'UpdateTime', (newTime) => {
        setTimeLeft(newTime);
        setSelectedTime(newTime);
        setIsRunning(false);
      });

      signalRService.on(timerEndpoint, 'StartTimer', (duration) => {
        setTimeLeft(duration);
        setIsRunning(true);
      });

      signalRService.on(timerEndpoint, 'PauseTimer', () => setIsRunning(false));

      signalRService.on(timerEndpoint, 'ResetTimer', (selectedTime) => {
        setTimeLeft(selectedTime);
        setIsRunning(false);
      });

      signalRService.on(timerEndpoint, 'EndTimer', (selectedTime) => {
        setTimeLeft(selectedTime);
        setIsRunning(false);
        BrowserNotificationHandler.showNotification("Time's up!", "Next one in line");
      });
    }
  }, [connections, signalRService]);

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

  const startTimer = () => {
    signalRService.invoke(timerEndpoint, 'BroadcastStartTimer', timeLeft);
  };

  const pauseTimer = () => {
    signalRService.invoke(timerEndpoint, 'BroadcastPauseTimer');
  };

  const resetTimer = () => {
    signalRService.invoke(timerEndpoint, 'BroadcastResetTimer', selectedTime);
  };

	const endTimer = () => {
    setTimeout(() => {
      signalRService.invoke(timerEndpoint, 'BroadcastEndTimer', selectedTime);
    }, 1000);
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
    </>
  );
};

export default Timer;
