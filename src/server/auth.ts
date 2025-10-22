import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Resend from 'next-auth/providers/resend';
import { db } from './db';
import { env } from '@/env';
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
      role: 'ADMIN' | 'PARTICIPANT';
    } & DefaultSession['user'];
  }

  interface User {
    role: 'ADMIN' | 'PARTICIPANT';
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // @ts-expect-error - Adapter type mismatch between @auth/core versions
  adapter: PrismaAdapter(db),
  providers: [
    Resend({
      apiKey: env.RESEND_API_KEY,
      from: env.RESEND_FROM_EMAIL ?? 'noreply@thecareranch.com',
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: (user as { role?: 'ADMIN' | 'PARTICIPANT' }).role ?? 'PARTICIPANT',
      },
    }),
  },
  pages: {
    signIn: '/sign-in',
    verifyRequest: '/verify-request',
  },
});
