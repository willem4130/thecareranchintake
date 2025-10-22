# The Care Ranch Intake

A production-ready Next.js 15 application with NextAuth.js v5, Prisma, tRPC, and shadcn/ui.

## 📦 Technology Stack

### Core Framework

- **Next.js** 15.5.6 - App Router with React Server Components
- **React** 19.2.0 - Latest React with concurrent features
- **TypeScript** 5.7.2 - Strict type safety

### Authentication

- **NextAuth.js** 5.0.0-beta.29 (Auth.js v5)
- Prisma adapter for database sessions
- Customizable auth providers (GitHub, Google, etc.)

### Database

- **Prisma** 6.18.0 - Type-safe database ORM
- **PostgreSQL** - Production database
- Connection pooling ready for serverless deployments

### API Layer

- **tRPC** 11.6.0 - End-to-end type-safe APIs
- **TanStack Query** 5.x - Async state management
- **Superjson** - Automatic serialization for dates, Maps, Sets, etc.

### UI & Styling

- **Tailwind CSS** 4.x - Utility-first CSS framework
- **shadcn/ui** - Radix UI + Tailwind components
- **Lucide React** - Beautiful icon library

### Environment Variables

- **@t3-oss/env-nextjs** 0.13.8 - Type-safe environment validation
- Zod schemas for compile-time safety

### Code Quality

- **ESLint** 9.38.0 - Flat config format
- **Prettier** - Code formatting
- **Husky** v9 - Git hooks
- **lint-staged** - Pre-commit linting
- **Commitlint** - Conventional commit enforcement

### Testing

- **Vitest** 3.2.4 - Unit & component testing
- **Playwright** 1.55.0 - E2E testing
- **Testing Library** - React component testing

## 🏗️ Project Structure

```
thecareranchintake/
├── prisma/
│   └── schema.prisma              # Database schema with NextAuth models
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/                # Auth pages route group
│   │   ├── (dashboard)/           # Protected pages route group
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/  # NextAuth API route
│   │   │   └── trpc/[trpc]/         # tRPC API handler
│   │   ├── layout.tsx             # Root layout with providers
│   │   └── page.tsx               # Homepage
│   ├── components/
│   │   └── ui/                    # shadcn/ui components
│   ├── server/
│   │   ├── api/
│   │   │   ├── routers/           # tRPC routers (feature-based)
│   │   │   ├── root.ts            # Merge all routers
│   │   │   └── trpc.ts            # tRPC initialization
│   │   ├── auth.ts                # NextAuth configuration
│   │   └── db.ts                  # Prisma client singleton
│   ├── trpc/
│   │   ├── client.tsx             # Client-side tRPC setup
│   │   ├── server.ts              # Server-side tRPC caller
│   │   └── query-client.ts        # React Query configuration
│   ├── lib/
│   │   └── utils.ts               # Utility functions (cn, etc.)
│   ├── hooks/                     # Custom React hooks
│   ├── types/                     # TypeScript type definitions
│   ├── styles/
│   │   └── globals.css            # Global styles + Tailwind
│   ├── env.ts                     # Environment variable validation
│   └── middleware.ts              # NextAuth middleware
├── e2e/                           # Playwright E2E tests
│   └── home.spec.ts
├── __tests__/                     # Vitest unit tests
│   └── utils/
│       └── cn.test.ts
├── public/                        # Static assets
├── .husky/                        # Git hooks
├── .env.local                     # Local environment variables
├── .env.example                   # Environment variable template
├── .gitignore
├── .prettierrc
├── .prettierignore
├── .lintstagedrc.json
├── eslint.config.mjs              # ESLint flat config
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── commitlint.config.js
├── components.json                # shadcn/ui config
├── next.config.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9+ (recommended: use nvm or volta)
- PostgreSQL database (local or hosted)
- npm, pnpm, yarn, or bun

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/thecareranchintake?schema=public"

# NextAuth.js - Generate with: npx auth secret
AUTH_SECRET="your-generated-secret-here"

# Optional: Add OAuth providers
# AUTH_GITHUB_ID="your-github-client-id"
# AUTH_GITHUB_SECRET="your-github-client-secret"
```

### 3. Initialize Database

```bash
# Push schema to database
npm run db:push

# Or create migration
npm run db:migrate
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## 📝 Available Scripts

### Development

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run type-check` - Run TypeScript type checking

### Database (Prisma)

- `npm run db:push` - Push schema changes without migrations (dev)
- `npm run db:migrate` - Create and run migrations
- `npm run db:generate` - Generate Prisma Client
- `npm run db:studio` - Open Prisma Studio (database GUI)

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing

- `npm run test` - Run Vitest unit tests
- `npm run test:e2e` - Run Playwright E2E tests

## 🔐 Authentication Setup

The project uses **NextAuth.js v5** (Auth.js). To add authentication providers:

### 1. Add Provider to Configuration

Edit `src/server/auth.ts`:

```typescript
import GitHub from 'next-auth/providers/github';
import { env } from '@/env';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
  ],
  // ...rest of config
});
```

### 2. Add Environment Variables

Update `src/env.ts` to validate the new variables:

```typescript
server: {
  // ...existing vars
  AUTH_GITHUB_ID: z.string(),
  AUTH_GITHUB_SECRET: z.string(),
},
```

Add to `.env.local`:

```bash
AUTH_GITHUB_ID="your-client-id"
AUTH_GITHUB_SECRET="your-client-secret"
```

### 3. Generate AUTH_SECRET

```bash
npx auth secret
```

## 📡 Adding tRPC Procedures

### 1. Create a New Router

Create `src/server/api/routers/user.ts`:

```typescript
import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.user.findUnique({ where: { id: input.id } });
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string(), email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({ data: input });
    }),
});
```

### 2. Add Router to Root

Edit `src/server/api/root.ts`:

```typescript
import { userRouter } from './routers/user';

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter, // Add here
});
```

### 3. Use in Components

**Server Component:**

```typescript
import { api } from "@/trpc/server";

export default async function UsersPage() {
  const users = await api.user.getAll();
  return <div>{users.map(u => <p key={u.id}>{u.name}</p>)}</div>;
}
```

**Client Component:**

```typescript
"use client";
import { api } from "@/trpc/client";

export function UserList() {
  const { data: users } = api.user.getAll.useQuery();
  return <div>{users?.map(u => <p key={u.id}>{u.name}</p>)}</div>;
}
```

## 🎨 Adding shadcn/ui Components

```bash
# Add specific components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form

# Add all components
npx shadcn@latest add -a
```

Components are installed to `src/components/ui/`.

## 🧪 Testing

### Unit Tests (Vitest)

Create tests in `__tests__/`:

```typescript
// __tests__/components/Button.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

Run tests:

```bash
npm run test
```

### E2E Tests (Playwright)

Create tests in `e2e/`:

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test('user can sign in', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Sign in');
  await expect(page).toHaveURL(/\/api\/auth\/signin/);
});
```

Run E2E tests:

```bash
npm run test:e2e
```

## 🚢 Deployment (Vercel)

### 1. Push to GitHub

```bash
git add .
git commit -m "feat: initial project setup"
git remote add origin your-repo-url
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your repository
3. Add environment variables in project settings:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `AUTH_SECRET` - Run `npx auth secret` and paste the value
   - Add any OAuth provider credentials

### 3. Run Migrations

After first deployment, run migrations:

```bash
# Using Vercel CLI
vercel env pull .env.production
npx prisma migrate deploy
```

## 📚 Next Steps

1. **Add Authentication Providers** - Configure GitHub, Google, Discord, etc.
2. **Design Database Schema** - Add your application models to `prisma/schema.prisma`
3. **Build API Routes** - Create tRPC routers in `src/server/api/routers/`
4. **Add UI Components** - Install shadcn/ui components as needed
5. **Configure Middleware** - Protect routes in `src/middleware.ts`
6. **Write Tests** - Add unit tests (Vitest) and E2E tests (Playwright)

## 🔧 Important Notes

### NextAuth.js v5 Beta

This project uses NextAuth.js v5 (still in beta). Key differences from v4:

- Configuration in `src/server/auth.ts` instead of API route
- Single `auth()` function replaces `getServerSession()`, `getSession()`, etc.
- Environment variables use `AUTH_*` prefix instead of `NEXTAUTH_*`
- `AUTH_SECRET` is required in production

### Prisma Connection Pooling

For serverless deployments (Vercel, AWS Lambda):

- Use `DATABASE_URL` with connection pooling (e.g., PgBouncer or Prisma Accelerate)
- Use `POSTGRES_URL_NON_POOLING` for migrations (direct connection)
- Set `connection_limit=1` per function

### tRPC v11

This project uses tRPC v11 with:

- Fetch Adapter for App Router
- React Query v5 integration
- Superjson transformer for automatic serialization

## 🐛 Troubleshooting

### Environment Variables Not Loading

Make sure `src/env.ts` is imported in `next.config.js`:

```javascript
import('./src/env.ts');
```

### Prisma Client Not Found

Run:

```bash
npm run db:generate
```

### NextAuth Session Not Persisting

1. Check `AUTH_SECRET` is set
2. Verify database connection
3. Run migrations: `npm run db:migrate`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using the T3 Stack pattern
