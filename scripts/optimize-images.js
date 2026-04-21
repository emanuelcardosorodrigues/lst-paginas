/**
 * Script de Otimização de Imagens - DPL-PV01
 * Gera versões responsivas de todas as imagens
 *
 * Uso: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuração de imagens a otimizar
const imagesToOptimize = [
  // Hero image - exibida em 665x328 (mobile) e 860x520 (desktop)
  {
    src: 'hero-bundle.webp',
    originalSize: '2371x1170',
    displaySizes: [
      { width: 665, height: 328, suffix: 'mobile', quality: 85 },
      { width: 860, height: 520, suffix: 'desktop', quality: 90 },
      { width: 1200, height: 726, suffix: 'large', quality: 90 },
    ]
  },
  // Showroom images - exibidas em 620x354 (desktop)
  {
    src: 'showroom-g1-1.webp',
    originalSize: '1536x877',
    displaySizes: [
      { width: 320, height: 183, suffix: 'mobile', quality: 80 },
      { width: 620, height: 354, suffix: 'desktop', quality: 85 },
    ]
  },
  {
    src: 'showroom-g1-2.webp',
    originalSize: '1536x877',
    displaySizes: [
      { width: 320, height: 183, suffix: 'mobile', quality: 80 },
      { width: 620, height: 354, suffix: 'desktop', quality: 85 },
    ]
  },
  {
    src: 'showroom-g1-3.webp',
    originalSize: '1536x924',
    displaySizes: [
      { width: 320, height: 192, suffix: 'mobile', quality: 80 },
      { width: 605, height: 364, suffix: 'desktop', quality: 85 },
    ]
  },
  // Vertical images - exibidas em 225x364 ou 204x364
  {
    src: 'showroom-g2-1.webp',
    originalSize: '754x1218',
    displaySizes: [
      { width: 225, height: 364, suffix: 'mobile', quality: 85 },
      { width: 320, height: 517, suffix: 'desktop', quality: 85 },
    ]
  },
  {
    src: 'showroom-g3-1.webp',
    originalSize: '1352x930',
    displaySizes: [
      { width: 529, height: 364, suffix: 'mobile', quality: 85 },
      { width: 620, height: 427, suffix: 'desktop', quality: 85 },
    ]
  },
  {
    src: 'showroom-g3-2.webp',
    originalSize: '754x1346',
    displaySizes: [
      { width: 204, height: 364, suffix: 'mobile', quality: 85 },
      { width: 320, height: 571, suffix: 'desktop', quality: 85 },
    ]
  },
  {
    src: 'showroom-g2-2.webp',
    originalSize: '1536x877',
    displaySizes: [
      { width: 320, height: 183, suffix: 'mobile', quality: 80 },
      { width: 620, height: 354, suffix: 'desktop', quality: 85 },
    ]
  },
  {
    src: 'showroom-g2-3.webp',
    originalSize: '1536x877',
    displaySizes: [
      { width: 320, height: 183, suffix: 'mobile', quality: 80 },
      { width: 620, height: 354, suffix: 'desktop', quality: 85 },
    ]
  },
  // Proof images
  {
    src: 'proof-midori.webp',
    originalSize: '400x400',
    displaySizes: [
      { width: 200, height: 200, suffix: 'mobile', quality: 85 },
      { width: 400, height: 400, suffix: 'desktop', quality: 90 },
    ]
  },
  {
    src: 'proof-otavio.webp',
    originalSize: '400x400',
    displaySizes: [
      { width: 200, height: 200, suffix: 'mobile', quality: 85 },
      { width: 400, height: 400, suffix: 'desktop', quality: 90 },
    ]
  },
];

const inputDir = path.join(__dirname, '..', 'public', 'images');
const outputDir = path.join(__dirname, '..', 'public', 'images', 'optimized');

// Criar diretório de saída se não existir
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage(image, size) {
  const inputPath = path.join(inputDir, image.src);
  const outputFilename = image.src.replace('.webp', `-${size.suffix}.webp`);
  const outputPath = path.join(outputDir, outputFilename);

  console.log(`  Processando: ${image.src} -> ${size.suffix} (${size.width}x${size.height})`);

  try {
    await sharp(inputPath)
      .resize(size.width, size.height, {
        fit: 'cover',
        position: 'center',
        withoutEnlargement: true,
      })
      .webp({
        quality: size.quality,
        effort: 6, // Máxima compressão
        nearLossless: false,
        smartSubsample: true,
      })
      .toFile(outputPath);

    // Verificar tamanho do arquivo gerado
    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`    ✓ Criado: ${outputFilename} (${sizeKB} KB)`);
  } catch (error) {
    console.error(`    ✗ Erro ao processar ${outputFilename}:`, error.message);
  }
}

async function optimizeImages() {
  console.log('=== Iniciando otimização de imagens ===\n');
  console.log(`Diretório de entrada: ${inputDir}`);
  console.log(`Diretório de saída: ${outputDir}\n`);

  for (const image of imagesToOptimize) {
    console.log(`\n📷 ${image.src} (${image.originalSize})`);

    for (const size of image.displaySizes) {
      await optimizeImage(image, size);
    }
  }

  console.log('\n=== Otimização concluída! ===');
  console.log(`\nTotal de imagens processadas: ${imagesToOptimize.length * 2}`);
  console.log('Imagens salvas em: public/images/optimized/');
}

optimizeImages().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
