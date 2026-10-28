// Monta ./dist com as 36 páginas /p/* restauradas (fonte: dist do protocolo-dpl, 28/10/2026).
import fs from "node:fs";
import path from "node:path";
const src = process.env.SRC_DIST || path.join(process.env.HOME, "orca/projects/protocolo-dpl/dist");
const slugs = fs.readFileSync(new URL("./slugs.list", import.meta.url), "utf8").split("\n").filter(Boolean);
const out = new URL("./dist", import.meta.url).pathname;
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const s of slugs) {
  if (!fs.existsSync(path.join(src, s, "index.html"))) throw new Error(`sem index.html: ${s}`);
  fs.cpSync(path.join(src, s), path.join(out, s), { recursive: true });
}
console.log(`dist ok: ${slugs.length} slugs`);
