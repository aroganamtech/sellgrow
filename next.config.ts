import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disables image optimization for simple static setups or dynamic dev
  },
};

export default nextConfig;
