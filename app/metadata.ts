import { Metadata } from 'next';
import { config } from './config/config';

export const metadata: Metadata = {
  title: config.app.name,
  description: config.app.description,
  manifest: '/manifest.json',
  themeColor: '#2196f3',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: config.app.name,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}; 