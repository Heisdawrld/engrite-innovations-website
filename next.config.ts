import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "standalone" is for Docker/VPS (Caddyfile) deployment.
  // Netlify uses its own serverless runtime — no output mode needed.
  // When deploying to Netlify, use build:netlify script which removes this.
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Ensure static images are optimized for Netlify
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
