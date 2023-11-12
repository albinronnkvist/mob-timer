"use client"
import React, { useState, useEffect } from 'react';
import BrowserNotificationHandler from '../utils/BrowserNotificationHandler'

// Components
import TimerControls from './TimerControls';
import TimerSetter from './TimerSetter';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(59);
  const [selectedTime, setSelectedTime] = useState(59);
  const [isRunning, setIsRunning] = useState(false);
	const [selectedSound, setSelectedSound] = useState('/timesup.mp3');

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

  const resetTimer = () => {
    setTimeLeft(selectedTime);
    setIsRunning(false);
  };

	const endTimer = () => {
		setTimeout(() => {
			setIsRunning(false);
			setTimeLeft(selectedTime);
			BrowserNotificationHandler.showNotification("Time's up!", "Next one in line");
		}, 1000);
  };

	const handleSoundChange = (event) => {
    setSelectedSound(event.target.value);
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
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onReset={resetTimer}
        isRunning={isRunning}
      />
      <TimerSetter onTimeSet={handleTimeSet} />
			<div className="flex justify-center">
				<select value={selectedSound} onChange={handleSoundChange}>
					<option value="/timesup.mp3">Time's up!</option>
					<option value="/lazergun.mp3">Lazer gun</option>
				</select>
			</div>
    </>
  );
};

export default Timer;
