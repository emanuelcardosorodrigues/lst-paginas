// Monta ./dist: espelho do ar (../dist/kal-pvNN, já com ESCI+sck injetados) + troca do bundle (05/11/2026).
// Remove o sck do HTML porque src/index.js o injeta de novo (evita duplicar). Fonte da imagem nova: ./kal-bundle-preco.webp.
import fs from "node:fs";
import path from "node:path";
const slugs = fs.readFileSync(new URL("./slugs.list", import.meta.url), "utf8").split("\n").filter(Boolean);
const out = new URL("./dist", import.meta.url).pathname;
const img = fs.readFileSync(new URL("./kal-bundle-preco.webp", import.meta.url));
fs.rmSync(out, { recursive: true, force: true });
for (const s of slugs) {
  const src = new URL(`../dist/${s}`, import.meta.url).pathname;
  fs.cpSync(src, path.join(out, s), { recursive: true });
  const f = path.join(out, s, "index.html");
  let h = fs.readFileSync(f, "utf8");
  h = h.replace(/<script>\(function\(\)\{var want="[^"]*";function fix\(ev\)[\s\S]*?<\/script>/, "");
  if (s !== "kal-pv05") {
    h = h.replace(/assets\/img\/kal-tudao\.webp\?v=2" width="600" height="600"/, 'assets/img/kal-bundle-preco.webp?v=1" width="800" height="518"')
      .replace(/\.offer-shot img \{ width: 100%; border-radius: 18px; box-shadow: var\(--shadow-lg\); \}/, ".offer-shot img { width: 100%; height: auto; filter: drop-shadow(0 16px 32px rgba(0,0,0,0.35)); }");
    fs.rmSync(path.join(out, s, "assets/img/kal-tudao.webp"), { force: true });
  } else h = h.replace("kal-bundle-preco.webp?v=1", "kal-bundle-preco.webp?v=2");
  if (/kal-tudao/.test(h) || /var want=/.test(h)) throw new Error(`troca incompleta: ${s}`);
  fs.writeFileSync(f, h);
  fs.writeFileSync(path.join(out, s, "assets/img/kal-bundle-preco.webp"), img);
}
const routes = ["leandrostecca.com.br", "www.leandrostecca.com.br"].flatMap((h) => slugs.flatMap((s) => [`${h}/p/${s}`, `${h}/p/${s}/*`]));
fs.writeFileSync(new URL("./wrangler.jsonc", import.meta.url), JSON.stringify({
  name: "w-lst-kal-pv", main: "src/index.js", compatibility_date: "2026-04-22",
  account_id: "21e4875f53338100ee74196613471f21", assets: { directory: "./dist", binding: "ASSETS" },
  workers_dev: false, routes,
}, null, 2) + "\n");
console.log(`ok: ${slugs.length} slugs, ${routes.length} rotas`);
