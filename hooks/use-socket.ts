import { initialSocket } from '@/lib/socket';
import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

export const useSocket = () => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = initialSocket();

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return { socket };
};
