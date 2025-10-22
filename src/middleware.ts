import { auth } from '@/server/auth';
import { NextResponse } from 'next/server';

// TEMPORARY: Authentication disabled for UI testing
// Re-enable by uncommenting the export default auth() wrapper

export default auth((req) => {
  // const { pathname } = req.nextUrl;
  // const isAuthenticated = !!req.auth;

  // // Protected routes that require authentication
  // const protectedRoutes = ['/questionnaire'];
  // const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // // Redirect to sign-in if trying to access protected route without auth
  // if (isProtectedRoute && !isAuthenticated) {
  //   const signInUrl = new URL('/sign-in', req.url);
  //   signInUrl.searchParams.set('callbackUrl', pathname);
  //   return NextResponse.redirect(signInUrl);
  // }

  // // Redirect to questionnaire if already signed in and trying to access sign-in page
  // if (pathname === '/sign-in' && isAuthenticated) {
  //   return NextResponse.redirect(new URL('/questionnaire/1', req.url));
  // }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
