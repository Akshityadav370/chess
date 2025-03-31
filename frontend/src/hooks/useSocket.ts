import { useEffect, useRef, useState } from 'react';

export const useSocket = () => {
  const socket = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:8080');

    socket.current.onopen = () => {
      console.log('WebSocket connection established');
      setIsConnected(true);
    };

    socket.current.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
    };

    return () => {
      socket.current?.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (socket.current && isConnected) {
      socket.current.send(message);
    }
  };

  return { isConnected, sendMessage };
};
