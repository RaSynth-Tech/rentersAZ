'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './components/layout/ThemeProvider';
import Navbar from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SessionProvider } from 'next-auth/react';
import { metadata } from './metadata';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <SessionProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
