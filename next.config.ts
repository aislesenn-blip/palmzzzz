import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Bypass Image Optimization to prevent R2/Loader crashes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all domains for demo mode
      },
    ],
  },
};

export default nextConfig;
