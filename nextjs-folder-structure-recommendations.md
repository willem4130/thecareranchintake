# Next.js App Router Production Folder Structure
## Comprehensive Guide for Scalable Projects with T3 Stack

---

## Executive Summary

This document provides industry-standard folder organization patterns for Next.js App Router production applications, based on official Next.js documentation, T3 Stack patterns, shadcn/ui best practices, and production examples.

**Key Principles:**
- Next.js is unopinionated about folder structure
- Use `src/` directory for cleaner separation
- Leverage route groups `()` and private folders `_` for organization
- Choose between feature-based or type-based organization based on scale
- Colocate related files when appropriate

---

## Recommended Production Structure

### Complete Folder Tree

```
project-root/
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── migrations/             # Database migrations
│   └── seed.ts                 # Database seeding script
│
├── public/
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Route group for auth pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx      # Auth-specific layout
│   │   │
│   │   ├── (dashboard)/        # Route group for dashboard
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx      # Dashboard layout
│   │   │
│   │   ├── (marketing)/        # Route group for public pages
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx      # Marketing layout
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts    # NextAuth API routes
│   │   │   └── trpc/
│   │   │       └── [trpc]/
│   │   │           └── route.ts    # tRPC API endpoint
│   │   │
│   │   ├── _components/        # Private: App-wide reusable components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── nav.tsx
│   │   │
│   │   ├── layout.tsx          # Root layout
│   │   ├── error.tsx           # Root error boundary
│   │   ├── loading.tsx         # Root loading UI
│   │   └── not-found.tsx       # 404 page
│   │
│   ├── components/             # Global UI components
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   └── toast.tsx
│   │   │
│   │   ├── forms/              # Composed form components
│   │   │   ├── login-form.tsx
│   │   │   └── user-form.tsx
│   │   │
│   │   └── layout/             # Layout components
│   │       ├── main-nav.tsx
│   │       ├── sidebar.tsx
│   │       └── user-menu.tsx
│   │
│   ├── server/                 # Server-only code
│   │   ├── api/                # tRPC API
│   │   │   ├── routers/        # tRPC routers (feature-based)
│   │   │   │   ├── user.ts
│   │   │   │   ├── post.ts
│   │   │   │   ├── comment.ts
│   │   │   │   └── auth.ts
│   │   │   ├── trpc.ts         # tRPC initialization & context
│   │   │   └── root.ts         # Root router (merges all routers)
│   │   │
│   │   ├── auth.ts             # NextAuth configuration
│   │   └── db.ts               # Prisma client instantiation
│   │
│   ├── trpc/                   # Client-side tRPC
│   │   ├── react.tsx           # tRPC React Query client
│   │   ├── server.ts           # Server-side tRPC caller
│   │   └── query-client.ts     # Query client config
│   │
│   ├── lib/                    # Complex utilities & integrations
│   │   ├── utils.ts            # cn() and other utility functions
│   │   ├── validations/        # Zod schemas
│   │   │   ├── auth.ts
│   │   │   ├── user.ts
│   │   │   └── post.ts
│   │   ├── constants.ts        # App-wide constants
│   │   └── errors.ts           # Custom error classes
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-user.ts
│   │   ├── use-local-storage.ts
│   │   ├── use-media-query.ts
│   │   └── use-toast.ts
│   │
│   ├── types/                  # TypeScript types
│   │   ├── index.ts            # Re-export all types
│   │   ├── api.ts
│   │   └── models.ts
│   │
│   ├── styles/                 # Global styles
│   │   └── globals.css
│   │
│   ├── env.js                  # Environment variable validation (T3)
│   └── middleware.ts           # Next.js middleware (auth, etc.)
│
├── .env                        # Environment variables (gitignored)
├── .env.example                # Example environment variables
├── .eslintrc.cjs               # ESLint configuration
├── .gitignore
├── components.json             # shadcn/ui configuration
├── next.config.mjs             # Next.js configuration
├── package.json
├── postcss.config.js           # PostCSS/Tailwind
├── prettier.config.mjs         # Prettier configuration
├── README.md
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

---

## Detailed Organization Guide

### 1. App Router Directory (`src/app/`)

**Purpose:** All routing, pages, and layouts for Next.js App Router

**Key Conventions:**
- `page.tsx` - Makes route publicly accessible
- `layout.tsx` - Shared UI for route segment and children
- `loading.tsx` - Loading UI with Suspense
- `error.tsx` - Error boundary
- `route.ts` - API endpoints
- `not-found.tsx` - 404 UI

**Route Groups** `(folder-name)`:
- Organize routes without affecting URL structure
- Apply different layouts to different sections
- Examples: `(auth)`, `(dashboard)`, `(marketing)`

**Private Folders** `_folder-name`:
- Excluded from routing system
- Use for app-specific components: `_components/`, `_lib/`
- Prevents accidental route creation

**Colocation:**
- You CAN place components alongside routes
- Example: `app/dashboard/chart-widget.tsx` only used in dashboard
- Not recommended for widely reused components

---

### 2. Components Organization (`src/components/`)

#### Type-Based Structure (Recommended for Small-Medium Projects)

```
src/components/
├── ui/              # shadcn/ui primitive components
├── forms/           # Composed form components
├── layout/          # Layout-specific components
└── features/        # Feature-specific components
```

#### Feature-Based Structure (Recommended for Large Projects)

```
src/components/
├── ui/                      # shadcn/ui components only
├── auth/                    # Auth-related components
│   ├── login-form.tsx
│   ├── register-form.tsx
│   └── auth-provider.tsx
├── dashboard/               # Dashboard components
│   ├── stats-card.tsx
│   └── recent-activity.tsx
└── profile/                 # Profile components
    ├── profile-form.tsx
    └── avatar-upload.tsx
```

**When to Choose:**
- Type-based: < 10 features, smaller teams
- Feature-based: > 10 features, larger teams, clear domain boundaries

---

### 3. shadcn/ui Components (`src/components/ui/`)

**Official Structure:**
```
src/
├── components/
│   ├── ui/              # ALL shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   └── ...              # Your custom components
└── lib/
    └── utils.ts         # Contains cn() utility
```

**Best Practices:**
- Keep ALL shadcn/ui components in `components/ui/`
- Do NOT modify shadcn components directly
- Create wrapper components for customization
- Use path alias: `@/components/ui/button`

**Example Wrapper:**
```tsx
// components/custom-button.tsx
import { Button } from "@/components/ui/button"

export function PrimaryButton({ children, ...props }) {
  return (
    <Button variant="default" size="lg" {...props}>
      {children}
    </Button>
  )
}
```

---

### 4. tRPC Organization (`src/server/api/`)

**T3 Stack Standard:**
```
src/server/api/
├── routers/                 # Feature-based routers
│   ├── user.ts              # User procedures
│   ├── post.ts              # Post procedures
│   ├── comment.ts           # Comment procedures
│   └── auth.ts              # Auth procedures
├── trpc.ts                  # tRPC config, context, procedures
└── root.ts                  # Merge all routers
```

**Example Router (`routers/post.ts`):**
```typescript
import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany()
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          ...input,
          authorId: ctx.session.user.id,
        },
      })
    }),
})
```

**Root Router (`root.ts`):**
```typescript
import { createTRPCRouter } from "./trpc"
import { postRouter } from "./routers/post"
import { userRouter } from "./routers/user"
import { commentRouter } from "./routers/comment"

export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  comment: commentRouter,
})

export type AppRouter = typeof appRouter
```

**Client Setup (`src/trpc/`):**
```
src/trpc/
├── react.tsx           # Client Components tRPC client
├── server.ts           # Server Components tRPC caller
└── query-client.ts     # Query client configuration
```

---

### 5. Prisma Organization

**Standard Location:**
```
prisma/
├── schema.prisma       # Database schema
├── migrations/         # Generated migration files
└── seed.ts            # Optional: seed script
```

**Prisma Client Instantiation:**
```typescript
// src/server/db.ts (T3 Stack pattern)
import { PrismaClient } from "@prisma/client"
import { env } from "@/env"

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db
```

**Usage:**
```typescript
// Import in tRPC context or API routes
import { db } from "@/server/db"

// Use in procedures
const users = await db.user.findMany()
```

---

### 6. NextAuth Configuration (`src/server/auth.ts`)

**T3 Stack Pattern:**
```typescript
// src/server/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter"
import { type DefaultSession, type NextAuthConfig } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { db } from "@/server/db"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

export const authConfig = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
```

**API Route Handler:**
```typescript
// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/server/auth"

export const { GET, POST } = handlers
```

**Middleware:**
```typescript
// src/middleware.ts
import { auth } from "@/server/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith("/login")

  if (!isLoggedIn && !isAuthPage) {
    return Response.redirect(new URL("/login", req.nextUrl))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
```

---

### 7. Hooks Organization (`src/hooks/`)

**Structure:**
```
src/hooks/
├── use-user.ts              # User-related hooks
├── use-auth.ts              # Auth hooks
├── use-local-storage.ts     # Storage hooks
├── use-media-query.ts       # UI hooks
├── use-debounce.ts          # Utility hooks
└── use-toast.ts             # Toast notifications
```

**Example Hook:**
```typescript
// src/hooks/use-user.ts
import { api } from "@/trpc/react"

export function useUser() {
  const { data: user, isLoading } = api.user.getCurrentUser.useQuery()
  return { user, isLoading }
}
```

---

### 8. Utils vs Lib (`src/lib/` and `src/utils/`)

**Two Approaches:**

#### Option 1: Single `lib/` Directory (Recommended for T3)
```
src/lib/
├── utils.ts            # cn() and simple utilities
├── validations/        # Zod schemas
├── constants.ts        # Constants
└── errors.ts           # Custom errors
```

#### Option 2: Separate `lib/` and `utils/`
```
src/lib/                # Complex integrations
├── prisma.ts
├── auth.ts
└── stripe.ts

src/utils/              # Pure utility functions
├── format.ts
├── validation.ts
└── helpers.ts
```

**Guideline:**
- `lib/` - Database clients, API clients, third-party integrations
- `utils/` - Pure functions (formatting, validation, helpers)

---

### 9. Types Organization (`src/types/`)

**Structure:**
```
src/types/
├── index.ts            # Re-export all types
├── api.ts              # API response types
├── models.ts           # Database model types
└── components.ts       # Component prop types
```

**Alternative: Colocated Types**
- Place types next to the files that use them
- Better for small projects
- Example: `components/user-form.types.ts`

---

### 10. Testing Organization

**Structure:**
```
__tests__/              # Root-level tests directory
├── integration/
├── e2e/
└── unit/

OR

src/
├── components/
│   ├── button.tsx
│   └── button.test.tsx    # Colocated tests
```

---

## Feature-Based vs Type-Based Organization

### Type-Based (Recommended for Small-Medium Projects)

**Structure:**
```
src/
├── components/
├── hooks/
├── lib/
├── types/
└── utils/
```

**Pros:**
- Simple to understand
- Easy to navigate
- Good for small teams
- Clear separation of concerns

**Cons:**
- Doesn't scale well
- Hard to identify feature boundaries
- Components spread across folders

---

### Feature-Based (Recommended for Large Projects)

**Structure:**
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── types/
│   ├── posts/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── types/
│   └── users/
│       ├── components/
│       ├── hooks/
│       ├── api/
│       └── types/
└── shared/
    ├── components/
    ├── hooks/
    └── utils/
```

**Pros:**
- Scales well
- Clear feature boundaries
- Easy to find related code
- Better for large teams
- Easier to extract features

**Cons:**
- More complex initially
- Requires discipline
- Can lead to duplication

**When to Switch:**
- When you have > 10 distinct features
- When multiple teams work on different features
- When features have clear boundaries

---

## Hybrid Approach (Recommended)

**Best of Both Worlds:**
```
src/
├── app/
├── features/           # Feature-specific code
│   ├── auth/
│   └── dashboard/
├── components/         # Shared components
│   └── ui/            # shadcn/ui
├── server/            # Server-only (tRPC, Prisma)
├── hooks/             # Shared hooks
├── lib/               # Shared utilities
└── types/             # Shared types
```

**Guidelines:**
- Start with type-based
- Create `features/` when a domain emerges
- Keep truly shared code in root folders
- Move feature-specific code to feature folders

---

## Path Aliases (tsconfig.json)

**Recommended Configuration:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/server/*": ["./src/server/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  }
}
```

**Usage:**
```typescript
// Instead of: import { Button } from "../../../../components/ui/button"
import { Button } from "@/components/ui/button"

// Instead of: import { db } from "../../server/db"
import { db } from "@/server/db"
```

---

## Best Practices for Scalability

### 1. Consistency
- Choose a pattern and stick to it
- Document your structure
- Use linting rules to enforce conventions

### 2. Avoid Deep Nesting
- Keep folders 2-3 levels deep maximum
- Use flat structures where possible

### 3. Colocate When Appropriate
- Place files close to where they're used
- If only used in one place, consider colocation

### 4. Separate Client and Server
- Use `src/server/` for server-only code
- Use `"use client"` directive sparingly
- Default to Server Components

### 5. Use Route Groups Effectively
- Organize routes by section: `(auth)`, `(dashboard)`
- Apply different layouts per section
- Keep URLs clean

### 6. Private Folders for Organization
- Use `_components` in app directory
- Prevents routing conflicts
- Clear visual indicator

### 7. Environment Variables
- Validate with Zod (T3 pattern)
- Use `src/env.js` for type-safe env vars
- Never commit `.env` to git

### 8. Barrel Exports
- Use `index.ts` to re-export from folders
- Simplifies imports: `from "@/components"` instead of `from "@/components/button"`
- Don't overuse - can slow builds

---

## Migration Strategy

### From Pages Router to App Router

1. Create `src/app/` alongside `pages/`
2. Migrate incrementally route by route
3. Move API routes last
4. Update imports and exports

### From Type-Based to Feature-Based

1. Identify clear feature boundaries
2. Create `features/` directory
3. Move one feature at a time
4. Update imports
5. Keep shared code in root

---

## Real-World Examples

### T3 Stack (Official)
```
src/
├── app/
├── server/
│   ├── api/
│   ├── auth.ts
│   └── db.ts
├── trpc/
└── env.js
```

### shadcn/ui (Official)
```
src/
├── app/
├── components/
│   └── ui/
└── lib/
    └── utils.ts
```

### Vercel (Production Example)
```
src/
├── app/
├── components/
├── lib/
└── styles/
```

---

## Common Anti-Patterns to Avoid

1. **Everything in `app/` directory**
   - Don't put all code in app router
   - Use `src/` for application code

2. **No clear separation**
   - Separate client and server code
   - Use `src/server/` for server-only

3. **Inconsistent naming**
   - Choose singular or plural and stick to it
   - `component` vs `components`

4. **Too much nesting**
   - Flatten where possible
   - Use route groups instead of nested folders

5. **No type safety**
   - Use TypeScript
   - Validate environment variables

6. **Mixing patterns**
   - Don't mix feature-based and type-based randomly
   - Choose one approach per section

---

## Quick Decision Tree

**Starting a new project?**
→ Use T3 Stack structure with type-based organization

**Growing beyond 10 features?**
→ Migrate to hybrid approach with `features/` directory

**Need custom components with shadcn/ui?**
→ Keep shadcn in `components/ui/`, create wrappers elsewhere

**Server-side code organization?**
→ Everything in `src/server/` with feature-based routers

**Testing strategy?**
→ Colocate tests for components, separate for integration

---

## Official Documentation Links

- **Next.js Project Structure:** https://nextjs.org/docs/app/getting-started/project-structure
- **T3 Stack Folder Structure:** https://create.t3.gg/en/folder-structure-app
- **shadcn/ui Installation:** https://ui.shadcn.com/docs/installation/next
- **tRPC with Next.js:** https://trpc.io/docs/client/nextjs
- **NextAuth.js:** https://next-auth.js.org/configuration/nextjs

---

## Summary

**For most production Next.js App Router projects, use:**

1. `src/` directory for all application code
2. Route groups for organizing app structure
3. `server/` for all server-only code
4. `components/ui/` for shadcn/ui components
5. Feature-based tRPC routers
6. Type-based structure initially, migrate to feature-based as you grow
7. Consistent path aliases
8. Environment variable validation

**Start simple, scale deliberately.**
