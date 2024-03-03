// import CredentialsProvider from 'next-auth/providers/credentials';
// import { NextAuthOptions } from 'next-auth';

// export const authOptions: NextAuthOptions = {
//   jwt: {
//     maxAge: 24 * 60 * 60 * 7, // 7 days
//   },
//   session: {
//     maxAge: 24 * 60 * 60 * 7, // 7 days
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {},
//       async authorize(_, req) {
//         const { data, error } = await requestServer(
//           CurrentUserDocument,
//           {},
//           {
//             cookie: req.headers?.['cookie'],
//           },
//         );

//         if (error) {
//           return null;
//         }

//         const { currentUser } = data;

//         const user = currentUser as User;

//         if (!user) {
//           return null;
//         }

//         const {
//           data: { token },
//         } = await session(
//           {
//             appId: process.env.HERMES_APP_ID as string,
//             appUserId: user.id,
//           },
//           {
//             headers: {
//               Signature: user.chatSignature,
//             },
//           },
//         );

//         user.chatToken = token;

//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, session, trigger }) {
//       if (user) {
//         token.role = user.role;
//         token.chatToken = user.chatToken;
//         token.isOnboardingCompleted = user.isOnboardingCompleted;
//         token.id = user.id;
//         token.recruiterName = getFullName(user?.firstName, user?.lastName);
//       }

//       if (trigger === 'update' && session.isOnboardingCompleted) {
//         token.isOnboardingCompleted = session.isOnboardingCompleted;
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       session.user = {
//         ...session.user,
//         id: token.id,
//         role: token.role,
//         chatToken: token.chatToken,
//         isOnboardingCompleted: token.isOnboardingCompleted,
//         recruiterName: token.recruiterName,
//       };

//       return session;
//     },
//   },
// };
