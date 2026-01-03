import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.gr-assets.com',
      },
      {
        protocol: 'https',
        hostname: '**.goodreads.com',
      },
      {
        protocol: 'https',
        hostname: 'i.gr-assets.com',
      },
    ],
  },
};

export default nextConfig;
