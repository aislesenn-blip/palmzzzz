import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* We are silencing linter to get to production first */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, /* Keeps images working on all plans */
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
