'use client';

import { SessionProvider } from 'next-auth/react';
import { ProductProvider } from '../../context/ProductContext';
import AuthWrapper from '../AuthWrapper';
import Navbar from '../layout/Navbar';
import { Footer } from '../layout/Footer';
import { ThemeProvider } from '../layout/ThemeProvider';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
} 