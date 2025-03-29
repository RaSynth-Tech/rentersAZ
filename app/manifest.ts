import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RenterAZ',
    short_name: 'RenterAZ',
    description: 'Your One-Stop Platform for Renting Items',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2196f3',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
} 