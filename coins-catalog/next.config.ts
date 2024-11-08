import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['coin-images.coingecko.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/coins',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
