import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-956ad74f3bb84ed9ab20fbcb1c10e84f.r2.dev',
      },
    ],
  },
};

export default nextConfig;
