"use client"
import React from 'react';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';

const TimerControls = ({ onStart, onPause, onReset, isRunning }) => {
  return (
    <div className="flex justify-center mb-8">
      {isRunning ? (
        <button
          onClick={onPause}
          className="mr-2 p-3 rounded-full bg-yellow hover:bg-yellow border border-transparent"
        >
          <FaPause className="text-background" />
        </button>
      ) : (
        <button
          onClick={onStart}
          className="mr-2 p-3 rounded-full bg-primary hover:bg-primary border border-transparent"
        >
          <FaPlay className="text-background" />
        </button>
      )}
      <button 
        onClick={onReset} 
        className="mr-2 p-3 rounded-full bg-transparent border border-2 border-green">
        <FaRedo className="text-green" />
      </button>
    </div>
  );
};

export default TimerControls;
