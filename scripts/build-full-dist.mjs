// dist COMPLETO do w-lst-paginas = espelho do ar (31 raízes) + clone ck-hba + extra-pages (fonte versionada).
// Uso: node scripts/build-full-dist.mjs   (a rede só é usada pelo espelho)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { checkSentinelaDir } from "./guard-sentinela.mjs";
import { transform } from "./gtm-to-sentinela.mjs";
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
for (const h of htmls) {
  const t = transform(fs.readFileSync(h, "utf8"));
  fs.writeFileSync(h, t);
  const tag = t.split("/api/t/tracker.js").length - 1;
  if (/googletagmanager\.com/i.test(t) || tag !== 1) bad.push(`${path.relative(dist, h)} tag=${tag}`);
}
if (bad.length) { console.error("ABORTADO: GTM restante ou tag != 1: " + bad.join("; ")); process.exit(1); }
const slugs = fs.readdirSync(dist).filter((n) => fs.existsSync(path.join(dist, n, "index.html")));
fs.writeFileSync(path.join(root, "slugs-todos.list"), slugs.sort().join("\n") + "\n");
const sck = fs.readdirSync(extra).sort();
fs.writeFileSync(path.join(root, "w-lst-paginas/src/sck-slugs.js"),
  `// Gerado por scripts/build-full-dist.mjs (slugs de extra-pages/). Não editar.\nexport const SCK_FIX_SLUGS = new Set(${JSON.stringify(sck)});\n`);
console.log(`dist completo: ${slugs.length} páginas`);
