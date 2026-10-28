// dist COMPLETO do w-lst-paginas = espelho do ar (31 raízes) + clone ck-hba + extra-pages (fonte versionada).
// Uso: node scripts/build-full-dist.mjs   (a rede só é usada pelo espelho)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
execFileSync("node", [path.join(root, "scripts/mirror-current-p-pages.mjs")], { stdio: "inherit" });
execFileSync("node", [path.join(root, "scripts/clone-col-pvia07-ck-hba.mjs")], { stdio: "inherit" });
const extra = path.join(root, "extra-pages");
for (const s of fs.readdirSync(extra)) fs.cpSync(path.join(extra, s), path.join(dist, s), { recursive: true });
// ativos-d referencia assets na raiz (/ativos-d/...); aqui tudo vive sob /p/.
const f = path.join(dist, "ativos-d/index.html");
fs.writeFileSync(f, fs.readFileSync(f, "utf8").replaceAll('"/ativos-d/', '"/p/ativos-d/'));
const slugs = fs.readdirSync(dist).filter((n) => fs.existsSync(path.join(dist, n, "index.html")));
fs.writeFileSync(path.join(root, "slugs-todos.list"), slugs.sort().join("\n") + "\n");
const sck = fs.readdirSync(extra).sort();
fs.writeFileSync(path.join(root, "w-lst-paginas/src/sck-slugs.js"),
  `// Gerado por scripts/build-full-dist.mjs (slugs de extra-pages/). Não editar.\nexport const SCK_FIX_SLUGS = new Set(${JSON.stringify(sck)});\n`);
console.log(`dist completo: ${slugs.length} páginas`);
