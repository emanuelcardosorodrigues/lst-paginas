import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve(import.meta.dirname, "../dist");
const sourceSlug = "col-pvia07";
const targetSlug = "col-pvia07-ck-hba";
const sourceDir = path.join(distDir, sourceSlug);
const targetDir = path.join(distDir, targetSlug);
const sourceCheckout = "https://leandrostecca.com.br/r/check/tob-micha-0807";
const targetCheckout = "https://leandrostecca.com.br/r/check/col-tck-hba";

if (!fs.existsSync(path.join(sourceDir, "index.html"))) {
  throw new Error(`Página-fonte ausente: ${sourceDir}`);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });

const indexPath = path.join(targetDir, "index.html");
const page = fs.readFileSync(indexPath, "utf8")
  .replaceAll(sourceSlug, targetSlug)
  .replaceAll(sourceCheckout, targetCheckout);

if (page.includes(sourceCheckout) || !page.includes(targetCheckout)) {
  throw new Error("Falha ao preparar slug ou checkout da cópia.");
}

fs.writeFileSync(indexPath, page);
console.log(`Cópia pronta: /p/${targetSlug}/ → ${targetCheckout}`);
