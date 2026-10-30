// Recusa publicar col-pvia-sentinela gerada com placeholder. Usado por build-full-dist.mjs e pelo teste.
import fs from "node:fs";
import path from "node:path";
const BAD = ["00000000-0000-0000-0000-000000000000", "https://track.leandrostecca.com.br"];
/** Retorna lista de problemas (vazia = ok). Pasta inexistente = ok (a página é opcional). */
export function checkSentinelaDir(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  if (fs.existsSync(path.join(dir, ".placeholder"))) out.push("marcador .placeholder presente");
  const f = path.join(dir, "index.html");
  if (!fs.existsSync(f)) return out.concat("index.html ausente");
  const html = fs.readFileSync(f, "utf8");
  for (const b of BAD) if (html.includes(b)) out.push(`HTML contém placeholder ${b}`);
  return out;
}
