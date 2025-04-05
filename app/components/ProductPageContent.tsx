'use client';

import { Box, Grid, Container, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { Filters } from './Filters';
import ProductGrid from './ProductGrid';
import { useProductFilters } from '../hooks/useProductFilters';
import type { Product } from '../types/product';

export default function ProductPageContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    filters,
    updateFilter,
    filteredProducts,
    paginatedProducts,
    displayCount,
    handleLoadMore,
  } = useProductFilters(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        // Ensure each product has an _id property
        const productsWithId = data.map((product: any) => ({
          ...product,
          _id: product._id || product.id
        }));
        setProducts(productsWithId);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <p>Error: {error}</p>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Filters filters={filters} updateFilter={updateFilter} />
        </Grid>
        <Grid item xs={12} md={9}>
          <ProductGrid 
            products={paginatedProducts}
            loading={loading}
            displayCount={displayCount}
            filteredProductsLength={filteredProducts.length}
            handleLoadMore={handleLoadMore}
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