// Gera wrangler.jsonc: uma rota por slug (mais específica que /p/*, não toca o w-lst-paginas).
import fs from "node:fs";
const slugs = fs.readFileSync(new URL("./slugs.list", import.meta.url), "utf8").split("\n").filter(Boolean);
const routes = [];
for (const h of ["leandrostecca.com.br", "www.leandrostecca.com.br"]) {
  for (const s of slugs) routes.push(`${h}/p/${s}`, `${h}/p/${s}/*`);
}
const cfg = {
  name: "w-lst-paginas-extras",
  main: "src/index.js",
  compatibility_date: "2026-04-22",
  account_id: "21e4875f53338100ee74196613471f21",
  assets: { directory: "./dist", binding: "ASSETS" },
  workers_dev: false,
  routes,
};
fs.writeFileSync(new URL("./wrangler.jsonc", import.meta.url), JSON.stringify(cfg, null, 2) + "\n");
console.log(`wrangler.jsonc: ${routes.length} rotas`);
