'use client'
import React, { createContext, useEffect, useState } from 'react';
import SignalRService from '../utils/SignalRService';

export const SignalRContext = createContext({
  signalRService: null,
  isConnected: false
});

export const SignalRProvider = ({ children, endpoints }) => {
  const [signalRService] = useState(new SignalRService());
  const [connections, setConnections] = useState({});

  const establishConnection = async (endpoint) => {
    try {
      await signalRService.startConnection(endpoint);
      setConnections(prev => ({ ...prev, [endpoint]: true }));
    } catch (err) {
      console.error(`SignalR Connection Error in Provider for ${endpoint}: `, err);
    }
  };

  useEffect(() => {
    endpoints.forEach(endpoint => {
      if (!connections[endpoint]) {
        establishConnection(endpoint);
      }
    });
  }, [endpoints, connections, signalRService]);

  return (
    <SignalRContext.Provider value={{ signalRService, connections }}>
      {children}
    </SignalRContext.Provider>
  );
};