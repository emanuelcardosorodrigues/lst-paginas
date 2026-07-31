/* ═══════════════════════════════════════════════════════════════════
   Edições do roteiro do apresentador.

   O deck é estático num Worker: não existe backend pra guardar texto. As
   edições ficam em localStorage, que é exatamente onde elas precisam
   estar — no notebook em que o presenter roda.

   O preço disso é que limpar o navegador leva as edições junto. Por isso
   existe o `exportar()`: o que ele ajustou ao vivo vira JSON, volta pro
   deck.tsx e passa a ser código. localStorage é o rascunho; o código é o
   original.

   Só os campos do presenter são editáveis. O texto público não: ele é
   literal do roteiro e mudar ali muda o que a plateia lê.
   ═══════════════════════════════════════════════════════════════════ */

const CHAVE = "deck-lps-slide-aula05:roteiro";

export type Campo = "diz" | "tom" | "proximo";
export type Edicoes = Record<number, Partial<Record<Campo, string>>>;

export function carregar(): Edicoes {
  if (typeof localStorage === "undefined") return {};
  try {
    const cru = localStorage.getItem(CHAVE);
    if (!cru) return {};
    const v = JSON.parse(cru);
    return v && typeof v === "object" ? (v as Edicoes) : {};
  } catch {
    /* JSON corrompido não pode derrubar a aula: cai pro original. */
    return {};
  }
}

function gravar(e: Edicoes) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(e));
  } catch {
    /* Cota cheia ou modo privativo: a edição vale só nesta sessão. */
  }
}

/** Texto vazio ou igual ao original não vira edição: apaga a entrada. */
export function editar(atual: Edicoes, n: number, campo: Campo, valor: string, original: string): Edicoes {
  const proximo: Edicoes = { ...atual, [n]: { ...atual[n] } };
  if (valor.trim() === "" || valor === original) {
    delete proximo[n][campo];
    if (Object.keys(proximo[n]).length === 0) delete proximo[n];
  } else {
    proximo[n][campo] = valor;
  }
  gravar(proximo);
  return proximo;
}

export function restaurarSlide(atual: Edicoes, n: number): Edicoes {
  const proximo = { ...atual };
  delete proximo[n];
  gravar(proximo);
  return proximo;
}

export function restaurarTudo(): Edicoes {
  gravar({});
  return {};
}

/** O que ele ajustou ao vivo, pronto pra virar código. */
export function exportar(e: Edicoes): string {
  return JSON.stringify(e, null, 2);
}

export function quantasEdicoes(e: Edicoes): number {
  return Object.keys(e).length;
}
