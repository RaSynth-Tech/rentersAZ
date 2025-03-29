'use client';

import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import { Footer } from './Footer';
import { config } from '@/app/config/config';

interface AdBannerProps {
  slot: string;
}

function AdBanner({ slot }: AdBannerProps) {
  return (
    <Box
      sx={{
        height: '90px',
        backgroundColor: 'background.paper',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        my: 2,
      }}
    >
      {/* Add your ad implementation here */}
      <div id={slot}>Advertisement Space</div>
    </Box>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      
      {config.ads.topBanner && (
        <Container maxWidth="lg">
          <AdBanner slot={config.ads.adSlots.top} />
        </Container>
      )}

      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flex: 1,
          py: 4,
        }}
      >
        {children}
      </Container>

      {config.ads.bottomBanner && (
        <Container maxWidth="lg">
          <AdBanner slot={config.ads.adSlots.bottom} />
        </Container>
      )}

      <Footer />
    </Box>
  );
} 