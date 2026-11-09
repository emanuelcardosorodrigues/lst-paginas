// dist COMPLETO do w-lst-paginas = espelho do ar (31 raízes) + clone ck-hba + extra-pages (fonte versionada).
// Uso: node scripts/build-full-dist.mjs   (a rede só é usada pelo espelho)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { checkSentinelaDir } from "./guard-sentinela.mjs";
import { transform, transformTracker, stripTag } from "./gtm-to-sentinela.mjs";
import { lerModo } from "./gtm-modo.mjs";
const MODO = lerModo(); // com = GTM como espelhado/versionado (default); sem = remove GTM e escreve a tag
console.log(`GTM_MODO=${MODO}`);
const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
execFileSync("node", [path.join(root, "scripts/mirror-current-p-pages.mjs")], { stdio: "inherit" });
execFileSync("node", [path.join(root, "scripts/clone-col-pvia07-ck-hba.mjs")], { stdio: "inherit" });
// INUP: fonte versionada na raiz do repo; o espelho do ar não a traz se ela já tiver caído.
fs.cpSync(path.join(root, "col-inup-cap01-web01"), path.join(dist, "col-inup-cap01-web01"), { recursive: true });
const extra = path.join(root, "extra-pages");
const gs = checkSentinelaDir(path.join(extra, "col-pvia-sentinela"));
if (gs.length) { console.error("ABORTADO: col-pvia-sentinela com placeholder: " + gs.join("; ") + ". Gere de novo com TRACKER_ORIGIN/SENTINEL_TID reais ou apague extra-pages/col-pvia-sentinela."); process.exit(1); }
for (const s of fs.readdirSync(extra)) fs.cpSync(path.join(extra, s), path.join(dist, s), { recursive: true, filter: (p) => path.basename(p) !== ".placeholder" });
// overrides/: arquivos que trocam o espelho do ar sem virar extra-page (não ligam o corretor de sck). Ex.: mockup.webp.
const ov = path.join(root, "overrides");
if (fs.existsSync(ov)) for (const s of fs.readdirSync(ov)) fs.cpSync(path.join(ov, s), path.join(dist, s), { recursive: true });
// ativos-d referencia assets na raiz (/ativos-d/...); aqui tudo vive sob /p/.
const f = path.join(dist, "ativos-d/index.html");
fs.writeFileSync(f, fs.readFileSync(f, "utf8").replaceAll('"/ativos-d/', '"/p/ativos-d/'));
// FAQ estático (faq-panel-N sem bundle React): o gerador injetava o handler antes de </body>, que não existe; sem ele o botão fica morto.
const FAQ_JS = `<script>document.querySelectorAll('[aria-controls^="faq-panel-"]').forEach(function(b){b.addEventListener('click',function(){var p=document.getElementById(b.getAttribute('aria-controls')),o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!o));p.dataset.open=String(!o)})})</script>`;
for (const n of fs.readdirSync(dist)) {
  const h = path.join(dist, n, "index.html");
  if (!fs.existsSync(h)) continue;
  const t = fs.readFileSync(h, "utf8");
  if (t.includes('id="faq-panel-0"') && !/type="module"/.test(t) && !t.includes('[aria-controls^="faq-panel-"]')) fs.writeFileSync(h, t + "\n" + FAQ_JS + "\n");
}
// GTM -> tag Sentinela em todo HTML servido (fora *.bak.html); aborta se sobrar GTM ou se a tag não ficar exatamente 1x.
const htmls = fs.readdirSync(dist, { recursive: true }).filter((n) => n.endsWith(".html") && !n.endsWith(".bak.html")).map((n) => path.join(dist, n));
const bad = [];
// t.js (servido em /p/<slug>/t.js e assets/js/t.js): só atribuição; guard: sem dataLayer/data-gtm-id.
for (const n of fs.readdirSync(dist, { recursive: true }).filter((n) => path.basename(n) === "t.js")) {
  if (MODO === "com") continue;
  const f = path.join(dist, n), t = transformTracker(fs.readFileSync(f, "utf8"));
  fs.writeFileSync(f, t);
  if (/dataLayer|data-gtm-id|__pending/.test(t)) bad.push(`${n} (t.js com resíduo GTM)`);
}
for (const h of htmls) {
  const t = MODO === "sem" ? transform(fs.readFileSync(h, "utf8")) : stripTag(fs.readFileSync(h, "utf8"));
  fs.writeFileSync(h, t);
  const tag = t.split("/api/t/tracker.js").length - 1;
  // com (Chefe 09/11): GTM intacto e SEM a tag Sentinela (Worker com SENTINELA_TAG "0"); nenhum track.leandrostecca no HTML.
  if (MODO === "com") { if (tag || t.includes("track.leandrostecca.com.br")) bad.push(`${path.relative(dist, h)} tag=${tag}`); continue; }
  // Stape GTM não tem a string googletagmanager: checa também gtm.start e o domínio ts.
  // + resíduo de GTM no JS de página (dataLayer, data-gtm-id, ts.leandrostecca) e chamada solta de push()/dl() de wrapper removido.
  if (/googletagmanager\.com|gtm\.start|ts\.leandrostecca|dataLayer|data-gtm-id|(?<![.\w$])(?:push|dl)\(\{\s*event\s*:/i.test(t) || tag !== 1) bad.push(`${path.relative(dist, h)} tag=${tag}`);
}
if (bad.length) { console.error("ABORTADO: " + (MODO === "sem" ? "GTM restante ou tag != 1: " : "tag Sentinela presente: ") + bad.join("; ")); process.exit(1); }
const slugs = fs.readdirSync(dist).filter((n) => fs.existsSync(path.join(dist, n, "index.html")));
fs.writeFileSync(path.join(root, "slugs-todos.list"), slugs.sort().join("\n") + "\n");
const sck = fs.readdirSync(extra).sort();
fs.writeFileSync(path.join(root, "w-lst-paginas/src/sck-slugs.js"),
  `// Gerado por scripts/build-full-dist.mjs (slugs de extra-pages/). Não editar.\nexport const SCK_FIX_SLUGS = new Set(${JSON.stringify(sck)});\n`);
console.log(`dist completo: ${slugs.length} páginas`);
