import fs from "node:fs";
import path from "node:path";

const projectDir = path.resolve(import.meta.dirname);
const referencePath = path.join(projectDir, "reference-pvia05.html");
const publicDir = path.join(projectDir, "public");
// w-lst-paginas serves the repository-level dist directory.
const outputDir = path.resolve(projectDir, "../dist");
const source = fs.readFileSync(referencePath, "utf8");

function topLevelSections(html) {
  const bodyStart = html.indexOf("<body");
  const bodyEnd = html.lastIndexOf("</body>");
  const body = html.slice(bodyStart, bodyEnd);
  const sections = [];
  let cursor = 0;
  let depth = 0;

  while (cursor < body.length) {
    const open = body.indexOf("<section", cursor);
    const close = body.indexOf("</section>", cursor);
    if (open < 0 && close < 0) break;

    if (open >= 0 && (close < 0 || open < close)) {
      if (depth === 0) sections.push({ start: open });
      depth += 1;
      cursor = open + "<section".length;
    } else {
      depth -= 1;
      if (depth === 0) sections.at(-1).end = close + "</section>".length;
      cursor = close + "</section>".length;
    }
  }

  return {
    bodyStart,
    bodyEnd,
    prefix: body.slice(0, sections[0].start),
    suffix: body.slice(sections.at(-1).end),
    sections: sections.map(({ start, end }) => body.slice(start, end)),
  };
}

function removeMatchingDiv(html, startsWith) {
  const start = html.indexOf(startsWith);
  if (start < 0) throw new Error(`Trecho não encontrado: ${startsWith}`);
  const tokens = /<div\b[^>]*>|<\/div>/g;
  tokens.lastIndex = start;
  let depth = 0;
  let match;
  while ((match = tokens.exec(html))) {
    depth += match[0] === "</div>" ? -1 : 1;
    if (depth === 0) return html.slice(0, start) + html.slice(tokens.lastIndex);
  }
  throw new Error(`Div sem fechamento: ${startsWith}`);
}

function addStaticBehavior(html) {
  const behavior = `<script>
    document.querySelectorAll('[aria-controls^="faq-panel-"]').forEach((button) => {
      button.addEventListener('click', () => {
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!isOpen));
        panel.dataset.open = String(!isOpen);
      });
    });
  </script>`;
  return html.replace("</body>", `${behavior}</body>`);
}

const pageStyles = `<style id="pvia06-custom-styles">
  .exclusive-video { background: #f5f7fa; padding: 80px 20px; }
  .exclusive-video__card { max-width: 920px; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1fr) minmax(260px, .82fr); align-items: center; gap: 40px; background: #fff; border: 1px solid rgba(7,18,34,.08); border-radius: 24px; padding: 28px; box-shadow: 0 18px 48px rgba(7,18,34,.08); }
  .exclusive-video__eyebrow, .bonus-section__eyebrow { color: #8a6518; font: 700 12px/1.2 Sora, sans-serif; letter-spacing: .18em; text-transform: uppercase; }
  .exclusive-video h2, .bonus-section h2 { color: #071222; font: 700 clamp(28px,4vw,46px)/1.12 Sora, sans-serif; letter-spacing: -.03em; margin: 12px 0; }
  .exclusive-video p { color: #435064; font: 400 17px/1.6 Sora, sans-serif; max-width: 34ch; }
  .exclusive-video img { width: 100%; max-height: 320px; object-fit: contain; }
  .bonus-section { background: #eaf0f7; padding: 88px 20px; overflow: hidden; }
  .bonus-section__head { max-width: 1080px; margin: 0 auto 34px; text-align: center; }
  .bonus-track { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
  .bonus-card { min-height: 100%; padding: 20px; border-radius: 20px; background: #fff; border: 1px solid rgba(7,18,34,.07); box-shadow: 0 10px 28px rgba(7,18,34,.07); scroll-snap-align: center; }
  .bonus-card img { height: 150px; width: 100%; object-fit: contain; margin-bottom: 16px; }
  .bonus-card h3 { color: #071222; font: 700 18px/1.3 Sora, sans-serif; letter-spacing: -.02em; }
  .bonus-card p { color: #435064; font: 400 14px/1.55 Sora, sans-serif; margin-top: 8px; }
  body.pvia07 .hero-price-cta { display: inline-flex; align-items: center; justify-content: center; min-width: 280px; padding: 16px 24px; border-radius: 12px; background: #cda64a; color: #071222; font: 700 16px/1.2 Sora, sans-serif; box-shadow: 0 8px 24px rgba(163,119,22,.24); transition: transform .2s ease, filter .2s ease; }
  body.pvia07 .hero-price-cta:hover { filter: brightness(1.06); transform: translateY(-2px); }
  @media (max-width: 767px) {
    .exclusive-video, .bonus-section { padding: 56px 20px; }
    .exclusive-video__card { grid-template-columns: 1fr; gap: 20px; padding: 22px; text-align: center; }
    .exclusive-video p { margin-inline: auto; font-size: 16px; }
    .exclusive-video img { max-height: 240px; order: -1; }
    .bonus-track { display: grid; grid-auto-flow: column; grid-auto-columns: calc(100% - 22px); grid-template-columns: none; overflow-x: auto; overscroll-behavior-x: contain; padding: 4px 4px 18px; scroll-snap-type: x mandatory; scrollbar-width: none; }
    .bonus-track::-webkit-scrollbar { display: none; }
    .bonus-card { min-height: 340px; padding: 26px; display: flex; flex-direction: column; justify-content: center; text-align: center; }
    .bonus-card img { height: 180px; }
    body.pvia07 section:first-of-type { padding-top: 16px !important; padding-bottom: 30px !important; }
    body.pvia07 section:first-of-type img { height: 220px !important; }
    body.pvia07 .hero-price-cta { width: 100%; min-width: 0; }
  }
</style>`;

function videoSection() {
  return `<section class="exclusive-video"><div class="exclusive-video__card"><div><p class="exclusive-video__eyebrow">Exclusivo para você</p><h2>Vídeo Passo a Passo</h2><p>Como usar na prática, mesmo se você não entende nada de cálculos.</p></div><img src="/p/SLUG/images/ent-video.webp" alt="Vídeo Passo a Passo da Calculadora OdontoLucro" loading="lazy" decoding="async"></div></section>`;
}

function bonusesSection() {
  const bonuses = [
    ["ent-masterclass.webp", "Masterclass sobre os custos ocultos e como lucrar com eles", "Com estudo de caso."],
    ["ent-precificacao.webp", "Aula de Precificação Estratégica", "Não importa o tamanho da sua cidade."],
    ["ent-dobrar.webp", "Como Dobrar Seu Lucro em 6 Meses", "Com uma calculadora personalizada para a sua realidade."],
    ["ent-5perigos.webp", "Os 5 Perigos da Nova Reforma Tributária", "O que muda e como se proteger."],
  ];
  const cards = bonuses.map(([image, title, description]) => `<article class="bonus-card"><img src="/p/SLUG/images/${image}" alt="${title}" loading="lazy" decoding="async"><h3>${title}</h3><p>${description}</p></article>`).join("");
  return `<section class="bonus-section"><div class="bonus-section__head"><p class="bonus-section__eyebrow">Bônus exclusivos:</p><h2>Mais clareza para lucrar de verdade</h2></div><div class="bonus-track" aria-label="Bônus exclusivos">${cards}</div></section>`;
}

function createPage(slug, addHeroCta) {
  const { prefix, suffix, sections } = topLevelSections(source);
  const [hero, beforeAfter, socialProof, wrongPrice, calculator, threeSteps, _deliverables, pricing, _whatComesWith, guarantee, narrative, authority, faq, decision, finalCta] = sections;

  const calculatorWithoutLabel = calculator.replace(/<div class="font-body[^>]*>Entregáveis<\/div>/, "");
  const pricingWithoutGuarantee = removeMatchingDiv(pricing, '<div class="mt-7 pt-7 border-t border-line flex items-center justify-center gap-3 text-left">');
  const heroForPage = addHeroCta
    ? hero.replace(/<div class="mt-6 md:mt-10 flex flex-col items-center gap-3">[\s\S]*?<\/div><\/div><\/section>$/, '<div class="mt-5 md:mt-10 flex flex-col items-center gap-3"><a class="hero-price-cta" href="#pricing">Ver meu preço lucrativo <span aria-hidden="true">→</span></a></div></div></section>')
    : hero;

  let head = source.slice(0, source.indexOf("</head>") + "</head>".length)
    .replace(/\s*<script type="module"[^>]*><\/script>/, "")
    .replace(/\s*<link rel="modulepreload"[^>]*>/g, "")
    .replace("</head>", `${pageStyles}</head>`);
  let bodyPrefix = prefix;
  if (addHeroCta) bodyPrefix = bodyPrefix.replace("<body>", '<body class="pvia07">');

  const content = [
    heroForPage,
    wrongPrice,
    beforeAfter,
    socialProof,
    threeSteps,
    calculatorWithoutLabel,
    videoSection(),
    bonusesSection(),
    pricingWithoutGuarantee,
    guarantee,
    narrative,
    authority,
    faq,
    decision,
    finalCta,
  ].join("");

  return addStaticBehavior(`${head}${bodyPrefix}${content}${suffix}`.replaceAll("SLUG", slug).replaceAll("col-pvia05", slug));
}

for (const [slug, withHeroCta] of [["col-pvia06", false], ["col-pvia07", true]]) {
  const pageDir = path.join(outputDir, slug);
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, "index.html"), createPage(slug, withHeroCta));
  fs.cpSync(publicDir, pageDir, { recursive: true });
}
