import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
  async redirects() {
    return [
      { source: "/solutions/:path*", destination: "/industries/:path*", permanent: true },
      { source: "/insights/:path*", destination: "/blog/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
