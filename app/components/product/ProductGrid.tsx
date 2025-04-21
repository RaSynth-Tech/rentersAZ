'use client';

import { Grid, CircularProgress, Container, Box } from '@mui/material';
import ProductCard from './ProductCard';
import type { Product } from '../../types/product';
import { useProducts } from '../../context/ProductContext';
import ViewMoreButton from './ViewMoreButton';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

export default function ProductGrid({ 
  products, 
  loading
}: ProductGridProps) {
  const { loading: contextLoading } = useProducts();
  
  // Show loading spinner only on initial load
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%',
        mt: 6,
        mb: 4
      }}>
        <ViewMoreButton />
      </Box>
    </Box>
  );
} 