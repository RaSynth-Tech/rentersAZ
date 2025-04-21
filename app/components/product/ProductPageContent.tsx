'use client';

import { Box, Grid, Container, CircularProgress } from '@mui/material';
import { Filters } from './../Filters';
import ProductGrid from './../product/ProductGrid';
import { useProductFilters } from '../..//hooks/useProductFilters';
import { useProducts } from '../../context/ProductContext';

export default function ProductPageContent() {
  const { products, loading, error, pagination } = useProducts();

  const {
    filters,
    updateFilter,
    filteredProducts,
  } = useProductFilters(products);

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <p>Error: {error}</p>
      </Container>
    );
  }

  // Only show loading spinner on initial load, not when loading more
  const isInitialLoading = loading && products.length === 0;

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Filters filters={filters} updateFilter={updateFilter} />
        </Grid>
        <Grid item xs={12} md={9}>
          <ProductGrid 
            products={filteredProducts}
            loading={isInitialLoading}
          />
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