import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // A raiz abre a página de engajamento em português.
      { source: "/", destination: "/pt", permanent: false },
    ];
  },
};

export default nextConfig;
