'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Rating,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import Image from 'next/image';
import Script from 'next/script';
import { Product } from '@/app/lib/api';

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isRenting, setIsRenting] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    notFound();
  }

  const handleRent = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setIsRenting(false);
    } catch (err) {
      setError('Failed to process rental. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR-AD-CLIENT-ID"
        crossOrigin="anonymous"
      />

      {/* Top Ad */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="YOUR-AD-CLIENT-ID"
          data-ad-slot="YOUR-AD-SLOT-ID"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </Box>

      <Grid container spacing={4}>
        {/* Image Gallery */}
        <Grid item xs={12} md={8}>
          <Box sx={{ position: 'relative', height: 400, mb: 2 }}>
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
              onError={handleImageError}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {imageError && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.100',
                }}
              >
                <Typography color="text.secondary">Image not available</Typography>
              </Box>
            )}
          </Box>
          <Grid container spacing={2}>
            {product.images.slice(1).map((image, index) => (
              <Grid item xs={4} key={index}>
                <Box sx={{ position: 'relative', height: 100 }}>
                  <Image
                    src={image}
                    alt={`${product.title} - Image ${index + 2}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 33vw"
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ₹{product.price}/day
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product.rating.toFixed(1)})
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Location
            </Typography>
            <Typography variant="body2">
              {product.location.city}, {product.location.state}, {product.location.country}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={() => setIsRenting(true)}
            disabled={loading}
          >
            Rent Now
          </Button>
        </Grid>
      </Grid>

      {/* Rental Dialog */}
      <Dialog open={isRenting} onClose={() => setIsRenting(false)}>
        <DialogTitle>Rent {product.title}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Rental successful! You can view your rentals in your profile.
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsRenting(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleRent}
            disabled={loading || !startDate || !endDate}
          >
            {loading ? <CircularProgress size={24} /> : 'Confirm Rental'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bottom Ad */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
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