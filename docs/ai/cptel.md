# cptel-pv01 (contexto para IA)

- Fonte: `extra-pages/cptel-pv01/index.html` (HTML+CSS+JS inline, sem build próprio). Imagens em `images/` (webp; el-* = elementos da ID visual, tx-02-couro = textura sem costura, ladrilhável a 600px).
- ID visual: Cormorant Garamond (títulos), Manrope (texto), mono (rótulos), script dourado em "em Lucro"; azul ink + dourado + creme; sem vermelho/verde; sem travessão; luz vinda da esquerda.
- Exceção à ID: `--fs-xl` mínimo 50px (a ID pede 64px; 64px estoura a tela de 390px).
- CTAs: acima do preço `href="#oferta"`; 3 com `data-checkout` (oferta, final, dock) recebem `var CHECKOUT_URL` (hoje `#[LINK-CHECKOUT]`).
- D07: 6 slots `<figure class="print" data-print="01..06">` para prints de depoimento 9:16.
- FAQ: respostas escritas pelo construtor a partir de dicas do Chefe; revisar antes de tratar como fato.
- O acento circunflexo alto ("ê") é desenho da Cormorant Garamond, não erro.
- PV02 (pedida em 25/11): página nova `cptel-pv02`, igual à PV01 com primeira dobra nova (cena com janela/monumentos/cadeira/bandeja; arte sem texto virá do Chefe).
- Enquanto `CHECKOUT_URL` começar com `#[`, os botões de checkout continuam em `#oferta` (não ficam mortos).
- Grade: aulas 01–05 seg–sex 20h; aula 06 domingo 19h30; gravações das 01–05 até 18h do domingo (FAQ).
