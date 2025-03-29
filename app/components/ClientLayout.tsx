'use client';

import { SessionProvider } from 'next-auth/react';
import Navbar from './layout/Navbar';
import { Footer } from './layout/Footer';
import AuthWrapper from './AuthWrapper';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <SessionProvider>
      <AuthWrapper>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </AuthWrapper>
    </SessionProvider>
  );
} 