import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo is nested under a home directory that has its own lockfile; pin the root.
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // The menu is an overlay now.
      { source: "/menu", destination: "/", permanent: true },
      // Placeholder pages from the reference mockup, retired.
      { source: "/project", destination: "/work", permanent: true },
      { source: "/article", destination: "/work", permanent: true },
      { source: "/careers", destination: "/about", permanent: true },
      { source: "/terms", destination: "/legal", permanent: true },
      // Projects are described by business type, not client name.
      { source: "/work/trend-beauty", destination: "/work/beauty-retail", permanent: true },
      { source: "/work/beauty-salon", destination: "/work/beauty-retail", permanent: true },
      { source: "/work/eva-portfolio", destination: "/work/creative-portfolio", permanent: true },
      { source: "/work/kobble-cottage", destination: "/work/holiday-cottage", permanent: true },
      // Product renamed.
      { source: "/services/wallet-loyalty", destination: "/services/loyalty-pass", permanent: true },
    ];
  },
};

export default nextConfig;
