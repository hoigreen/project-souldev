import { initialSocket } from '@/lib/socket';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
  const { data: session } = useSession();
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (!session) return;

    socket.current = initialSocket();

    socket.current.emit('ADD_USER', session.user._id);

    return () => {
      socket.current?.disconnect();
    };
  }, [session]);

  return { socket };
};
