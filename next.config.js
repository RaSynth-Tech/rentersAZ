/** @type {import('next').NextConfig} */
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
  // Add any other Next.js config options here
};

module.exports = nextConfig; 