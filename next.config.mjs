/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: '.next_build',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
