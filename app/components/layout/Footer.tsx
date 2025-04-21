'use client';

import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  useTheme,
} from '@mui/material';
import { config } from '@/app/config/config';
import Link from 'next/link';

export function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
        p: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {config.app.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {config.app.description}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <MuiLink 
                component={Link} 
                href="/about" 
                color="text.secondary" 
                sx={{ display: 'block', mb: 1 }}
              >
                About Us
              </MuiLink>
              <MuiLink 
                component={Link} 
                href="/terms" 
                color="text.secondary" 
                sx={{ display: 'block', mb: 1 }}
              >
                Terms of Service
              </MuiLink>
              <MuiLink 
                component={Link} 
                href="/privacy" 
                color="text.secondary" 
                sx={{ display: 'block', mb: 1 }}
              >
                Privacy Policy
              </MuiLink>
              <MuiLink 
                component={Link} 
                href="/contact" 
                color="text.secondary" 
                sx={{ display: 'block' }}
              >
                Contact Us
              </MuiLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {config.company.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {config.company.address}
              <br />
              {config.company.city}, {config.company.state} {config.company.pincode}
              <br />
              {config.company.country}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {config.company.email}
              <br />
              Phone: {config.company.phone}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} {config.company.name}. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 