import type { NextConfig } from "next";

if (process.env.NODE_ENV === 'development') {
  import('@cloudflare/next-on-pages/next-dev').then(({ setupDevPlatform }) => {
    setupDevPlatform().catch(console.error);
  });
}

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "async_hooks": "node:async_hooks",
    };
    return config;
  },
};

export default nextConfig;
