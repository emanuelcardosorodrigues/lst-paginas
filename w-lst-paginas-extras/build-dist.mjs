// Monta ./dist a partir de ./pages (fonte versionada das 36 páginas restauradas em 28/10/2026).
import fs from "node:fs";
import path from "node:path";
const src = process.env.SRC_DIST || new URL("./pages", import.meta.url).pathname;
const slugs = fs.readFileSync(new URL("./slugs.list", import.meta.url), "utf8").split("\n").filter(Boolean);
const out = new URL("./dist", import.meta.url).pathname;
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const s of slugs) {
  if (!fs.existsSync(path.join(src, s, "index.html"))) throw new Error(`sem index.html: ${s}`);
  fs.cpSync(path.join(src, s), path.join(out, s), { recursive: true });
}
// ativos-d referencia assets na raiz (/ativos-d/...), rota que o w-lst-paginas ainda detém: reescreve p/ /p/ativos-d/.
const f = path.join(out, "ativos-d/index.html");
fs.writeFileSync(f, fs.readFileSync(f, "utf8").replaceAll('"/ativos-d/', '"/p/ativos-d/'));
console.log(`dist ok: ${slugs.length} slugs`);
