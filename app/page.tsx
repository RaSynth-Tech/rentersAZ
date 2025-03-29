'use client';

import { Box, Grid, Container, Button, Stack, CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import { products } from './data/products';
import Script from 'next/script';
import { useProductFilters } from './hooks/useProductFilters';
import { ProductCard } from './components/ProductCard';
import { Filters } from './components/Filters';

function ProductGridContent() {
  const {
    filters,
    updateFilter,
    filteredProducts,
    paginatedProducts,
    displayCount,
    handleLoadMore,
  } = useProductFilters(products);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Filters
            filters={filters}
            updateFilter={updateFilter}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {paginatedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {displayCount < filteredProducts.length && (
            <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
              <Button
                variant="contained"
                onClick={handleLoadMore}
                size="large"
                sx={{ 
                  minWidth: 200,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Load More
              </Button>
            </Stack>
          )}
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="YOUR-AD-CLIENT-ID"
          data-ad-slot="YOUR-AD-SLOT-ID"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </Box>
    </Container>
  );
}

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
        <ProductGridContent />
      </Suspense>
    </Container>
  );
}
