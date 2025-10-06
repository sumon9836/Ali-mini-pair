
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    WHATSAPP_API_URL: process.env.WHATSAPP_API_URL || "http://yamanote.proxy.rlwy.net:17090",
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/client/**', '**/server/**', '**/node_modules/**'],
    };
    return config;
  },
};

export default nextConfig;
