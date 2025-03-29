'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Box,
  Grid,
  Button,
} from '@mui/material';

interface User {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.push('/');
        return;
      }
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography>Loading...</Typography>
        </Paper>
      </Container>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                sx={{ width: 120, height: 120, mb: 2 }}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {user.email}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {user.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Member Since:</strong>{' '}
                {new Date().toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push('/my-items')}
                sx={{ mr: 2 }}
              >
                View My Items
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => router.push('/list')}
              >
                List New Item
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 