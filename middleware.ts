import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/login' || path === '/auth/register';

  // For client-side routes and API routes, we'll handle auth in the components
  if (path.startsWith('/_next') || path.startsWith('/api')) {
    return NextResponse.next();
  }

  // For public paths, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Check if the user is authenticated
  const token = await getToken({ req: request });
  
  // If the user is not authenticated and trying to access a protected route, redirect to login
  if (!token && (path === '/list' || path.startsWith('/profile') || path.startsWith('/my-items'))) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(url);
  }

  // For all other paths, allow access
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/',
    '/auth/login',
    '/auth/register',
    '/list',
    '/profile/:path*',
    '/my-items/:path*',
    '/api/protected/:path*',
  ],
}; 