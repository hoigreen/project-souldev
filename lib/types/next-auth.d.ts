import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    image: string;
    mobile: string;
    token: string;
    isOnboardingCompleted: boolean;
  }

  // eslint-disable-next-line no-unused-vars -- used in the code below
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  // eslint-disable-next-line no-unused-vars -- used in the code below
  interface JWT extends Record<string, unknown>, DefaultJWT {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    image: string;
    mobile: string;
    token: string;
    isOnboardingCompleted: boolean;
  }
}
