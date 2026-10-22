import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // A raiz abre em português: por ora quem compra é brasileiro morando
      // fora, e só a página em português traz o preço em real com o dólar
      // embaixo. Inglês e espanhol seguem a um toque, no seletor do topo.
      // Quando ele abrir para o comprador americano, aqui vira "/en".
      // A versão B do teste A/B mora num domínio próprio. Quem chega pela
      // raiz dele cai direto na B, sem passar pela A. Fica antes da regra
      // geral porque a primeira que casa é a que vale. Enquanto o domínio
      // não apontar para cá, esta linha não faz nada.
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "(www\\.)?agenciawecare\\.com\\.br",
          },
        ],
        destination: "/pt/b",
        permanent: false,
      },
      { source: "/", destination: "/pt", permanent: false },
    ];
  },
};

export default nextConfig;
