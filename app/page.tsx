'use client';

import { Container, CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import Script from 'next/script';
import ProductPageContent from './components/ProductPageContent';

function LoadingFallback() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <CircularProgress />
    </Container>
  );
}

export default function Home() {
  return (
    <Container maxWidth="xl">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR-AD-CLIENT-ID"
        crossOrigin="anonymous"
      />
      <Suspense fallback={<LoadingFallback />}>
        <ProductPageContent />
      </Suspense>
    </Container>
  );
}
