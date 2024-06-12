import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
  const { data: session, status } = useSession();
  const socket = useRef<Socket | null>(null);

  const initialSocket = (token: string) => {
    const uri = process.env.NEXT_PUBLIC_ENDPOINT as string;

    return io(uri, {
      autoConnect: true,
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    if (status === 'authenticated') {
      socket.current = initialSocket(session.user.token);
      socket.current.emit('ADD_USER', session.user._id);
    }

    return () => {
      socket.current?.disconnect();
    };
  }, [session, status, socket]);

  return { socket };
};
