
import { Suspense } from 'react';
import { CircularProgress, Container } from '@mui/material';
import ProductPageContent from '../product/ProductPageContent';

function LoadingFallback() {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
      <CircularProgress />
    </Container>
  );
}

export default function ClientHomePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductPageContent />
    </Suspense>
  );
} 