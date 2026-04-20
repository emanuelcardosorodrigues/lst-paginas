import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.resolve(__dirname, '../dist/plo-pv01')
const htmlPath = path.join(distDir, 'index.html')

if (!fs.existsSync(htmlPath)) {
  console.log('HTML not found, skipping post-build optimization')
  process.exit(0)
}

let html = fs.readFileSync(htmlPath, 'utf-8')

// Find all CSS files in the assets directory
const assetsDir = path.join(distDir, 'assets')
const cssFiles = fs.existsSync(assetsDir)
  ? fs.readdirSync(assetsDir).filter(f => f.endsWith('.css'))
  : []

if (cssFiles.length === 0) {
  console.log('No CSS files found, skipping post-build optimization')
  process.exit(0)
}

// Create async CSS loading links
const cssLinks = cssFiles.map(cssFile => {
  const cssPath = `/plo-pv01/assets/${cssFile}`
  return `  <link rel="preload" href="${cssPath}" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="${cssPath}"></noscript>`
}).join('\n')

// Insert CSS links before the closing head tag
html = html.replace('</head>', `${cssLinks}\n</head>`)

// Write the modified HTML
fs.writeFileSync(htmlPath, html)
console.log(`✓ Optimized HTML with async CSS loading (${cssFiles.length} files)`)
