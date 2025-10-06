import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    WHATSAPP_API_URL: process.env.WHATSAPP_API_URL || "http://yamanote.proxy.rlwy.net:17090",
  },
};

export default nextConfig;

