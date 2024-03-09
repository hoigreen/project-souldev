import { getCurrentUser } from '@/lib/actions';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  jwt: {
    maxAge: 24 * 60 * 60 * 7, // 7 days
  },
  session: {
    maxAge: 24 * 60 * 60 * 7, // 7 days
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize() {
        const data = await getCurrentUser();

        if (!data) {
          return null;
        }

        const user = data.data;

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        email: token.email,
      };

      return session;
    },
  },
};
