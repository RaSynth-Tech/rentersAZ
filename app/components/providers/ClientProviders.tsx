'use client';

import { SessionProvider } from 'next-auth/react';
import { ProductProvider } from '../../context/ProductContext';
import AuthWrapper from '../AuthWrapper';
import Navbar from '../layout/Navbar';
import { Footer } from '../layout/Footer';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
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