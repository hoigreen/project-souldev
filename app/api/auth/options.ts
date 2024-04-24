import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import { authGitHub, authGoogle, login } from '@/lib/actions';
import { SignupBody } from '@/lib/definitions';
import cookie from '@/lib/cookie';

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
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
        token.name = user.name;
        token.first_name = user.first_name || (user.name?.split(' ')[0] ?? '');
        token.last_name = user.last_name || (user.name?.split(' ')[1] ?? '');
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
        name: token.name,
        first_name: token.first_name,
        last_name: token.last_name,
      };

      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === 'google' && profile) {
        const profileData = profile as GoogleProfile;
        const signUpData: SignupBody = {
          email: profileData.email as string,
          first_name: profileData.given_name as string,
          last_name: profileData.family_name as string,
          image: profileData.picture as string,
          password: '123456',
          terms: true,
        };
        const data = await authGoogle(signUpData);

        cookie.set(
          process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string,
          data.data.token,
          7,
        );
      }

      if (account?.provider === 'github' && profile) {
        const profileData = profile as GithubProfile;
        const signUpData: SignupBody = {
          email: profileData.email as string,
          first_name: profileData.name?.split(' ')[0] as string,
          last_name: profileData.name?.split(' ')[1] as string,
          image: profileData.avatar_url as string,
          password: '123456',
          terms: true,
        };
        const data = await authGitHub(signUpData);

        if (data.status)
          cookie.set(
            process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string,
            data.data.token,
            7,
          );
      }
      return true;
    },
  },
};
