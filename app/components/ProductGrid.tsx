'use client';

import { Grid, Button, Stack, CircularProgress, Container } from '@mui/material';
import { useState } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types/product';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  displayCount: number;
  filteredProductsLength: number;
  handleLoadMore: () => void;
}

export default function ProductGrid({ 
  products, 
  loading, 
  displayCount, 
  filteredProductsLength, 
  handleLoadMore 
}: ProductGridProps) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMoreClick = async () => {
    setIsLoadingMore(true);
    await handleLoadMore();
    setIsLoadingMore(false);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {displayCount < filteredProductsLength && (
        <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleLoadMoreClick}
            size="large"
            disabled={isLoadingMore}
            sx={{ 
              minWidth: 200,
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            {isLoadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </Stack>
      )}
    </>
  );
} 