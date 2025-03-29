'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from '@mui/material';
import { config } from '../config/config';

export default function MyItemsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <Container maxWidth="md">
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography>Loading...</Typography>
        </Paper>
      </Container>
    );
  }

  if (!session?.user) {
    return null;
  }

  // TODO: Replace with actual user's items from the database
  const userItems = [
    {
      id: 1,
      title: 'Sample Item 1',
      description: 'This is a sample item description.',
      price: 100,
      image: 'https://source.unsplash.com/random/400x300?item',
      status: 'available',
    },
    // Add more sample items as needed
  ];

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4">My Listed Items</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/list')}
          >
            List New Item
          </Button>
        </Box>

        {userItems.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center">
            You haven't listed any items yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {userItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{item.price}/day
                    </Typography>
                    <Typography
                      variant="body2"
                      color={item.status === 'available' ? 'success.main' : 'error.main'}
                      sx={{ mt: 1 }}
                    >
                      {item.status === 'available' ? 'Available' : 'Rented'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
} 