import type { NextConfig } from "next";

if (process.env.NODE_ENV === 'development') {
  import('@cloudflare/next-on-pages/next-dev').then(({ setupDevPlatform }) => {
    setupDevPlatform().catch(console.error);
  });
}

const nextConfig: NextConfig = {
  serverExternalPackages: ['async_hooks'],
  turbopack: {
    resolveAlias: {
      "async_hooks": "node:async_hooks",
    },
  },
};

export default nextConfig;
