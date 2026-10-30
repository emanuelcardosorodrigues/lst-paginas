// Gera extra-pages/col-pvia-sentinela/ a partir de extra-pages/col-pvia06/ (F5 do Sentinela, página-piloto).
// Troca SÓ o bloco de rastreio: sai GTM/dataLayer/t.js/preconnects de terceiros; entra o tracker do Sentinela.
// Uso (Chefe, depois que o DNS track.<dominio> existir):
//   TRACKER_ORIGIN=https://track.leandrostecca.com.br SENTINEL_TID=<uuid da área> node scripts/build-col-pvia-sentinela.mjs
// O host e o tid são os ÚNICOS pontos de configuração. Com o placeholder o build FALHA, salvo ALLOW_PLACEHOLDER=1
// (só para teste local; a página gerada assim NÃO pode ir ao ar).
import fs from "node:fs";
import path from "node:path";

const PLACEHOLDER_ORIGIN = "https://track.leandrostecca.com.br"; // A CONFIRMAR: o subdomínio track. ainda não existe (DNS é do Chefe)
const PLACEHOLDER_TID = "00000000-0000-0000-0000-000000000000"; // A CONFIRMAR: UUID da área no Sentinela
const SRC_SLUG = "col-pvia06";
const SLUG = "col-pvia-sentinela";

const origin = (process.env.TRACKER_ORIGIN || PLACEHOLDER_ORIGIN).replace(/\/+$/, "");
const tid = (process.env.SENTINEL_TID || PLACEHOLDER_TID).toLowerCase();
const isPlaceholder = origin === PLACEHOLDER_ORIGIN || tid === PLACEHOLDER_TID;
if (isPlaceholder && process.env.ALLOW_PLACEHOLDER !== "1") {
  console.error(`ABORTADO: TRACKER_ORIGIN/SENTINEL_TID com valor placeholder (${PLACEHOLDER_ORIGIN} / ${PLACEHOLDER_TID}).\n` +
    "Defina os valores reais ou use ALLOW_PLACEHOLDER=1 (somente teste, nunca para o ar).");
  process.exit(1);
}
if (isPlaceholder) console.warn("AVISO: gerando com PLACEHOLDER. Esta página não pode ser publicada.");
if (!/^https:\/\/[a-z0-9.-]+$/i.test(origin)) { console.error("ABORTADO: TRACKER_ORIGIN deve ser https://host sem caminho"); process.exit(1); }
if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(tid)) { console.error("ABORTADO: SENTINEL_TID não é UUID"); process.exit(1); }

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "extra-pages", SRC_SLUG);
const outDir = path.join(root, "extra-pages", SLUG);
let html = fs.readFileSync(path.join(srcDir, "index.html"), "utf8");

function cut(re, label, repl = "") {
  const before = html;
  html = html.replace(re, repl);
  if (html === before) throw new Error(`bloco não encontrado: ${label}`);
}

// 1. corretor de sck embutido pelo espelho do ar (o Worker injeta o mesmo para este slug em extra-pages/)
cut(/<head><script>\(function\(\)\{var want="[^"]+";.*?<\/script>\n/s, "corretor sck", "<head>\n");
// 2. preconnect/dns-prefetch de GTM, Meta, TikTok, Clarity, Google, CAPI + comentários
cut(/\n    <!-- Preconnect = SÓ[\s\S]*?(?=\n    <!-- Atribuição)/, "preconnects de terceiros");
// 3. __cfg/__pending (alimentam só o t.js) + GTM
cut(/\n    <!-- Atribuição \+ captura[\s\S]*?<!-- End Google Tag Manager -->\n/, "cfg/pending + GTM");
// 4. noscript do GTM
cut(/\n    <!-- Google Tag Manager \(noscript\) -->[\s\S]*?<!-- End Google Tag Manager \(noscript\) -->\n/, "GTM noscript");
// 5. t.js (clique -> dataLayer)
cut(/\n    <script defer src="\/p\/col-pvia06\/t\.js"><\/script>/, "t.js");
// 6. links de checkout: são same-origin (/r/check/...), o tracker só reconhece com o atributo explícito
const linkRe = /<a ([^>]*?href="https:\/\/leandrostecca\.com\.br\/r\/check\/[^"]+"[^>]*?)>/g;
let n = 0;
html = html.replace(linkRe, (_, attrs) => { n++; return `<a ${attrs} data-sentinel-checkout>`; });
if (n < 1) throw new Error("nenhum link de checkout encontrado");
// 7. snippet do Sentinela (único bloco novo)
const host = origin;
const snippet = `    <!-- Sentinela: tracker próprio (sem GTM). Origem e tid vêm de scripts/build-col-pvia-sentinela.mjs -->
    <link rel="preconnect" href="${host}" crossorigin>
    <script>window.sentinel=window.sentinel||function(){(window.sentinel.q=window.sentinel.q||[]).push(arguments)};</script>
    <script async src="${host}/api/t/tracker.js?tid=${tid}"></script>
`;
html = html.replace(/(\n)(    <title>)/, `\n${snippet}\n$2`);
if (!html.includes("/api/t/tracker.js")) throw new Error("snippet não inserido");
// 8. identidade da página (assets, canonical, og:*)
html = html.replaceAll(SRC_SLUG, SLUG);

// guardas: o que NÃO pode existir na página gerada
const banned = [/googletagmanager/i, /GTM-[A-Z0-9]{4,}/, /\bfbq\s*\(/, /connect\.facebook\.net/, /dataLayer/, /gtm\.js/, /clarity\.ms/i, /analytics\.tiktok/i, /google-analytics/i];
for (const re of banned) if (re.test(html)) throw new Error(`rastreio proibido na saída: ${re}`);

fs.rmSync(outDir, { recursive: true, force: true });
fs.cpSync(srcDir, outDir, { recursive: true, filter: (p) => path.basename(p) !== "t.js" && path.basename(p) !== "index.html" });
fs.writeFileSync(path.join(outDir, "index.html"), html);
// marcador fora do HTML publicável: build-full-dist.mjs recusa publicar enquanto existir
if (isPlaceholder) fs.writeFileSync(path.join(outDir, ".placeholder"), "gerada com placeholder; nao publicar\n");
console.log(`OK: extra-pages/${SLUG}/index.html (${html.length} bytes), ${n} links de checkout marcados, tracker ${host}${isPlaceholder ? " [PLACEHOLDER]" : ""}`);
