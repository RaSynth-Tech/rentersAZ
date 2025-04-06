/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  webpack: (config, { dev, isServer }) => {
    // Filter out the webpack cache warning
    config.infrastructureLogging = {
      level: 'error',
    };
    
    // Optimize webpack caching
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: path.resolve(__dirname, '.next/cache/webpack'),
      name: isServer ? 'server' : 'client',
      version: '1.0.0'
    };
    return config;
  },
  // Add any other Next.js config options here
};

module.exports = nextConfig; 