'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoginModal from './auth/LoginModal';

// Define protected paths (update this list based on your app)
const protectedPaths = ['/profile', '/dashboard', '/settings'];

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    // Wait until the session status is determined
    if (status === 'loading') return;

    // If current route is protected and user is not authenticated, open the modal
    if (protectedPaths.some((path) => pathname.startsWith(path)) && !session) {
      setLoginModalOpen(true);
    } else {
      setLoginModalOpen(false);
    }
  }, [pathname, session, status]);

  return (
    <>
      {children}
      <LoginModal open={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}
