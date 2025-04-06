'use client';

import { SessionProvider } from 'next-auth/react';
import Navbar from './layout/Navbar';
import { Footer } from './layout/Footer';
import AuthWrapper from './AuthWrapper';
import { ProductProvider } from '../context/ProductContext';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <SessionProvider>
      <ProductProvider>
        <AuthWrapper>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </AuthWrapper>
      </ProductProvider>
    </SessionProvider>
  );
} 