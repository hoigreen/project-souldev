'use client';

import { initialSocket } from '@/lib/socket';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

export default function InitialSocket() {
  const socket = useRef<Socket | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    socket.current = initialSocket();

    socket.current.on('connect', () => {
      socket.current?.emit('ADD_USER', session.user._id);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return null;
}
