'use client';

import { io } from 'socket.io-client';

const uri = process.env.NEXT_PUBLIC_ENDPOINT as string;

export const socket = io(uri);
