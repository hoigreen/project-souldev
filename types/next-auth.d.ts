// Refer: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultUser & {
      id: string;
      email: string;
      token: string;
    };
  }

  interface User extends DefaultUser {
    id: string;
    token: string;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    token: string;
  }
}
