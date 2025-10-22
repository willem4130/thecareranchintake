import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './db';
import type { DefaultSession } from 'next-auth';

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object
 * and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    /**
     * Add your auth providers here.
     * For a full list of providers, see:
     * @see https://next-auth.js.org/providers
     *
     * Example with GitHub:
     * GitHubProvider({
     *   clientId: env.AUTH_GITHUB_ID,
     *   clientSecret: env.AUTH_GITHUB_SECRET,
     * }),
     */
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  pages: {
    signIn: '/sign-in',
    // signOut: "/sign-out",
    // error: "/error",
  },
});
