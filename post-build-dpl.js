import fs from 'fs'
import path from 'path'

const distDir = 'dist/dpl-pv01'
const htmlPath = path.join(distDir, 'index.html')
const sourceHtml = path.join(process.cwd(), 'index.html')

console.log('🔧 Otimizando HTML do DPL-PV01...')

// Copiar HTML original para o dist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

// Ler HTML original
let html = fs.readFileSync(sourceHtml, 'utf-8')

// Encontrar o CSS gerado pelo Vite
const assetsDir = path.join(distDir, 'assets')
let cssFile = null
let jsFile = null

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir)
  cssFile = files.find(f => f.endsWith('.css'))
  jsFile = files.find(f => f.endsWith('.js') && f.startsWith('main-'))
}

if (!cssFile || !jsFile) {
  console.error('❌ CSS ou JS não encontrado em assets/')
  console.log('Arquivos:', fs.readdirSync(assetsDir || '.'))
  process.exit(1)
}

console.log(`✅ CSS encontrado: ${cssFile}`)
console.log(`✅ JS encontrado: ${jsFile}`)

// Remover links de CSS antigos
html = html.replace(/<link[^>]*href="\/dpl-pv01\/src\/style\.css"[^>]*>/g, '')
html = html.replace(/<link[^>]*rel="stylesheet"[^>]*href="\/dpl-pv01\/src\/style\.css"[^>]*>/g, '')

// Adicionar async CSS loading
const asyncCSS = `
  <!-- Async CSS loading for performance -->
  <link rel="preload" href="/dpl-pv01/assets/${cssFile}" as="style" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link rel="stylesheet" href="/dpl-pv01/assets/${cssFile}" /></noscript>
`
html = html.replace(/<!-- Non-blocking CSS load -->[\s\S]*?<\/noscript>/, asyncCSS.trim())

// Adicionar script module
const scriptTag = `
  <script type="module" crossorigin src="/dpl-pv01/assets/${jsFile}"></script>
`
html = html.replace(/<script type="module"[^>]*><\/script>/, scriptTag.trim())

// Salvar HTML otimizado
fs.writeFileSync(htmlPath, html, 'utf-8')

console.log('✅ HTML otimizado com async CSS loading!')
console.log(`📁 Arquivo: ${htmlPath}`)
