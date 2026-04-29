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

// Copiar script de third-party
const thirdPartyScript = path.join(process.cwd(), 'public', 'dpl-pv01', 'third-party.js')
const destThirdParty = path.join(process.cwd(), 'dist', 'dpl-pv01', 'third-party.js')

if (fs.existsSync(thirdPartyScript)) {
  fs.copyFileSync(thirdPartyScript, destThirdParty)
  console.log('✓ Copiado third-party.js para dist/dpl-pv01/')
} else {
  console.log('⚠️  Arquivo third-party.js não encontrado em public/dpl-pv01/')
}

// Copiar imagens otimizadas
const optimizedImagesDir = path.join(process.cwd(), 'public', 'images', 'optimized')
const destOptimizedDir = path.join(process.cwd(), 'dist', 'dpl-pv01', 'images', 'optimized')

if (fs.existsSync(optimizedImagesDir)) {
  if (!fs.existsSync(destOptimizedDir)) {
    fs.mkdirSync(destOptimizedDir, { recursive: true })
  }

  const files = fs.readdirSync(optimizedImagesDir)
  files.forEach(file => {
    fs.copyFileSync(
      path.join(optimizedImagesDir, file),
      path.join(destOptimizedDir, file)
    )
  })
  console.log(`✓ Copiadas ${files.length} imagens otimizadas`)
} else {
  console.log('⚠️  Diretório de imagens otimizadas não encontrado em public/images/optimized/')
}
