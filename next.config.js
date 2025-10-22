/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // Validate environment variables at build time
  experimental: {
    typedRoutes: true,
  },
};

// Import env validation
import('./src/env.ts');

export default nextConfig;
