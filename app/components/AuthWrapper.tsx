'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Define public and protected paths
const publicPaths = ['/', '/auth/login', '/auth/register'];
const protectedPaths = ['/profile', '/dashboard', '/settings'];

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = typeof window !== 'undefined' && !!localStorage.getItem('userData');

    // Handle public paths
    if (publicPaths.includes(pathname)) {
      if (isAuthenticated && (pathname === '/auth/login' || pathname === '/auth/register')) {
        router.push('/');
      }
      return;
    }

    // Handle protected paths
    if (protectedPaths.some(path => pathname.startsWith(path))) {
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
} 