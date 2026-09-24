/**
 * Confere se a escada das ofertas de Crescimento Viral sobe em todas as
 * células, da meta menor para a maior.
 *
 * Por que isso existe: os números vêm de nove artes diferentes, feitas em
 * momentos diferentes, e duas vezes um número de uma meta maior entrou
 * abaixo do mesmo número de uma meta menor, sem ninguém perceber. Uma
 * coluna que desce não quebra o site nem aparece no build, mas quem compara
 * duas ofertas vizinhas na página vê na hora, e é o tipo de erro que custa
 * a venda.
 *
 * Roda com: npx tsx scripts/conferir-escada.ts
 * Sem tsx no ambiente: npx tsc scripts/conferir-escada.ts --outDir /tmp/e
 * --module nodenext --moduleResolution nodenext && node /tmp/e/...
 */
import { viralPackages } from "../src/content/viral-data";

type Celula = {
  nome: string;
  valor: (p: (typeof viralPackages)[number]) => number;
};

const celulas: Celula[] = [
  { nome: "preço", valor: (p) => p.priceBRL },
  { nome: "preço em dólar", valor: (p) => p.priceUSD },
  { nome: "vídeos já publicados", valor: (p) => p.recentCount },
];

for (let v = 0; v < 3; v++) {
  for (const [chave, rotulo] of [
    ["views", "visualizações"],
    ["likes", "curtidas"],
    ["comments", "comentários"],
    ["reposts", "repostagens"],
    ["shares", "compartilhamentos"],
  ] as const) {
    celulas.push({
      nome: `vídeo ${v + 1}, ${rotulo}`,
      valor: (p) => p.videos[v][chave],
    });
  }
}

for (let f = 0; f < 4; f++) {
  for (const [i, ponta] of ["mínimo", "máximo"].entries()) {
    celulas.push({
      nome: `vídeos já publicados, faixa ${f + 1}, ${ponta}`,
      valor: (p) => p.recent[f][i],
    });
  }
}

// Da meta menor para a maior. O arquivo guarda na ordem da página, que é a
// inversa, então aqui a ordem é refeita de propósito.
const escada = [...viralPackages].sort((a, b) => a.followers - b.followers);

const quedas: string[] = [];
const empates: string[] = [];

for (const celula of celulas) {
  for (let i = 1; i < escada.length; i++) {
    const antes = escada[i - 1];
    const agora = escada[i];
    const a = celula.valor(antes);
    const b = celula.valor(agora);
    const linha = `${celula.nome}: meta de ${agora.followers} tem ${b}, meta de ${antes.followers} tem ${a}`;
    if (b < a) quedas.push(linha);
    else if (b === a) empates.push(linha);
  }
}

// Empate é aviso, não erro: repetir o mesmo número em duas metas vizinhas
// passa despercebido. Queda é erro: a meta mais cara entrega menos, e é a
// primeira coisa que alguém vê ao comparar duas ofertas lado a lado.
if (empates.length) {
  console.log(`${empates.length} número repetido entre metas vizinhas:\n`);
  for (const aviso of empates) console.log("  " + aviso);
  console.log("");
}

if (quedas.length) {
  console.error(`${quedas.length} número cai quando a meta sobe:\n`);
  for (const queda of quedas) console.error("  " + queda);
  process.exit(1);
}

console.log(
  `Escada certa: ${escada.length} metas, ${celulas.length} células por meta, nada cai.`,
);
