import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, "../dist/col-pvia01");
const htmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(htmlPath)) {
  console.log("HTML not found, skipping post-build optimization");
  process.exit(0);
}

let html = fs.readFileSync(htmlPath, "utf-8");

const assetsDir = path.join(distDir, "assets");
const cssFiles = fs.existsSync(assetsDir)
  ? fs.readdirSync(assetsDir).filter((f) => f.endsWith(".css"))
  : [];

if (cssFiles.length === 0) {
  console.log("No CSS files found, skipping post-build optimization");
  process.exit(0);
}

for (const cssFile of cssFiles) {
  const blockingPattern = new RegExp(
    `\\s*<link rel="stylesheet" crossorigin href="/p/col-pvia01/assets/${cssFile.replace(".", "\\.")}">`,
    "g"
  );
  html = html.replace(blockingPattern, "");
}

const cssLinks = cssFiles
  .map((cssFile) => {
    const cssPath = `/p/col-pvia01/assets/${cssFile}`;
    return `  <link rel="preload" href="${cssPath}" as="style" onload="this.onload=null;this.rel='stylesheet'">\n  <noscript><link rel="stylesheet" href="${cssPath}"></noscript>`;
  })
  .join("\n");

html = html.replace("</head>", `${cssLinks}\n</head>`);
fs.writeFileSync(htmlPath, html);
console.log(`✓ Async CSS loading applied (${cssFiles.length} CSS files)`);
