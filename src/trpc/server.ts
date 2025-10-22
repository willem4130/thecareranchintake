import 'server-only';

import { cache } from 'react';
import { headers } from 'next/headers';
import { createTRPCContext } from '@/server/api/trpc';
import { appRouter } from '@/server/api/root';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = await headers();
  return createTRPCContext({
    headers: heads,
  });
});

export const api = appRouter.createCaller(createContext);
