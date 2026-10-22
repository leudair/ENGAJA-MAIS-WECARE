import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // A raiz abre em português: por ora quem compra é brasileiro morando
      // fora, e só a página em português traz o preço em real com o dólar
      // embaixo. Inglês e espanhol seguem a um toque, no seletor do topo.
      // Quando ele abrir para o comprador americano, aqui vira "/en".
      { source: "/", destination: "/pt", permanent: false },
    ];
  },
};

export default nextConfig;
