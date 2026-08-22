import React, { createContext, useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [livePrices, setLivePrices] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');
      setSocket(newSocket);

      newSocket.on('stockPriceUpdate', (data) => {
        setLivePrices((prev) => ({
          ...prev,
          [data.symbol]: data,
        }));
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, livePrices }}>
      {children}
    </SocketContext.Provider>
  );
};
