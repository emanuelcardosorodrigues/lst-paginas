# cptel-pv01 (contexto para IA)

- Fonte: `extra-pages/cptel-pv01/index.html` (HTML+CSS+JS inline, sem build próprio). Imagens em `images/` (webp; el-* = elementos da ID visual, tx-02-couro = textura sem costura, ladrilhável a 600px).
- ID visual: Cormorant Garamond (títulos), Manrope (texto), mono (rótulos), script dourado em "em Lucro"; azul ink + dourado + creme; sem vermelho/verde; sem travessão; luz vinda da esquerda.
- Exceção à ID: `--fs-xl` mínimo 50px (a ID pede 64px; 64px estoura a tela de 390px).
- CTAs: acima do preço `href="#oferta"`; 3 com `data-checkout` (oferta, final, dock) recebem `var CHECKOUT_URL` (hoje `#[LINK-CHECKOUT]`).
- D07: 6 slots `<figure class="print" data-print="01..06">` para prints de depoimento 9:16.
- FAQ: respostas escritas pelo construtor a partir de dicas do Chefe; revisar antes de tratar como fato.
- O acento circunflexo alto ("ê") é desenho da Cormorant Garamond, não erro.
- PV02 (`extra-pages/cptel-pv02/`, 25/11): cópia da PV01 com primeira dobra nova. `<picture>` hero-mobile.webp (9:16, até 899px) / hero-desktop.webp (16:9), logo-cptel.webp transparente dentro do `<h1>` (alt = nome do curso), barra de lote 78%, chip, 6 resultados em 2 colunas, CTA `#oferta`. `noindex` (variante da PV01, evita duplicado). Slug do tracking = cptel-pv02. O texto do chip ("6 TAREFAS") e os números pintados na arte (R$ 298,00, +32%, 70%) vêm do mockup e da arte enviados pelo Chefe em 25/11. O hero da PV01 usa `hero-cena.webp` com véu creme vindo da esquerda (desktop) e a cena abaixo do texto (mobile).
- Rodapé sem CNPJ (Chefe, 25/11).
- Couro: `tx-02-couro.webp` com luz uniforme (sem faixa a cada 600px) + véu ink .55; cartões de bônus rgba ink .68 (AA). Refletor do hero da PV01 com `mask-image` para o braço sumir antes da borda (Chefe, 25/11).
- Enquanto `CHECKOUT_URL` começar com `#[`, os botões de checkout continuam em `#oferta` (não ficam mortos).
- Grade: aulas 01–05 seg–sex 20h; aula 06 domingo 19h30; gravações das 01–05 até 18h do domingo (FAQ).
