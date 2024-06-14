import { io } from 'socket.io-client';

export const initialSocket = () => {
  const uri = process.env.NEXT_PUBLIC_ENDPOINT as string;

  return io(uri);
};
