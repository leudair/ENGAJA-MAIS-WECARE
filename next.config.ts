import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // A raiz abre em inglês: o comprador é dos Estados Unidos. Português e
      // espanhol continuam a um toque, no seletor de idioma do topo.
      { source: "/", destination: "/en", permanent: false },
    ];
  },
};

export default nextConfig;
