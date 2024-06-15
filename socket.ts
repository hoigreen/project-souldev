'use client';

import { io } from 'socket.io-client';
import cookie from './lib/cookie';

const uri = process.env.NEXT_PUBLIC_ENDPOINT as string;
const userId = cookie.get(process.env.NEXT_PUBLIC_USERID_COOKIE as string);

export const socket = io(uri, {
  query: {
    userId,
  },
});
