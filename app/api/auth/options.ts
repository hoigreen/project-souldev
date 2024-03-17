import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/lib/actions';

export const authOptions: NextAuthOptions = {
  jwt: {
    maxAge: 24 * 60 * 60 * 7,
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 * 7,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const dataLogin = await login(credentials);

          if (!dataLogin) {
            return null;
          }

          const user = dataLogin.data as User;

          return user;
        } catch (error) {
          console.log(error);

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.image = user.image;
        token.mobile = user.mobile;
        token.token = user.token;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        _id: token._id,
        email: token.email,
        image: token.image,
        mobile: token.mobile,
        token: token.token,
      };

      return session;
    },
  },
};