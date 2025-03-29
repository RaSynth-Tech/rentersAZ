import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/login' || path === '/auth/register';

  // For client-side routes, we'll handle auth in the components
  if (path.startsWith('/_next') || path.startsWith('/api')) {
    return NextResponse.next();
  }

  // For public paths, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }

  // For protected paths, allow access (auth will be handled client-side)
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/',
    '/auth/login',
    '/auth/register',
    '/profile/:path*',
    '/api/protected/:path*',
  ],
}; 