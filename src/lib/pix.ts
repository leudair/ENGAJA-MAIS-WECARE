/**
 * Leitura do código Pix copia e cola.
 *
 * O código que o banco gera não é um link: é uma cadeia de campos com o
 * tamanho de cada um na frente, e os dois últimos caracteres são uma soma de
 * conferência. Isso é bom para nós, porque o valor a cobrar vem escrito lá
 * dentro. Enquanto um link de pagamento é uma caixa fechada, aqui dá para
 * conferir sozinho se o código cobra mesmo o preço daquela oferta, e é isso
 * que a construção do site faz antes de publicar.
 */

/** Um campo do código, já separado. */
type Campo = { id: string; valor: string };

/** Quebra o código nos campos do primeiro nível. */
function separar(codigo: string): Campo[] {
  const campos: Campo[] = [];
  let i = 0;
  while (i + 4 <= codigo.length) {
    const id = codigo.slice(i, i + 2);
    const tamanho = Number(codigo.slice(i + 2, i + 4));
    if (!Number.isInteger(tamanho) || tamanho < 0) return campos;
    const inicio = i + 4;
    const fim = inicio + tamanho;
    if (fim > codigo.length) return campos;
    campos.push({ id, valor: codigo.slice(inicio, fim) });
    i = fim;
  }
  return campos;
}

/**
 * A soma de conferência do padrão, CRC-16/CCITT-FALSE. Ela cobre tudo até o
 * "6304" que abre o último campo, e é o que pega um código copiado pela
 * metade ou com um caractere trocado.
 */
function somaDeConferencia(trecho: string): string {
  let crc = 0xffff;
  for (let i = 0; i < trecho.length; i += 1) {
    crc ^= trecho.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export type LeituraPix = {
  /** O valor a cobrar escrito no código, ou `null` quando ele não traz valor. */
  valor: number | null;
  /** Se a soma de conferência bate com o resto do código. */
  somaCerta: boolean;
  /** Se o código se diz mesmo um Pix. */
  ePix: boolean;
};

export function lerCodigoPix(codigo: string): LeituraPix {
  const limpo = codigo.trim();
  const campos = separar(limpo);
  const valorBruto = campos.find((campo) => campo.id === "54")?.valor;
  const valor =
    valorBruto !== undefined &&
    valorBruto !== "" &&
    !Number.isNaN(Number(valorBruto))
      ? Number(valorBruto)
      : null;

  const corte = limpo.lastIndexOf("6304");
  const somaCerta =
    corte > 0 &&
    limpo.length === corte + 8 &&
    somaDeConferencia(limpo.slice(0, corte + 4)) ===
      limpo.slice(corte + 4).toUpperCase();

  const ePix =
    limpo.startsWith("0002") && limpo.toUpperCase().includes("BR.GOV.BCB.PIX");

  return { valor, somaCerta, ePix };
}
