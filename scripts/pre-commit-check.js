/**
 * Pre-commit Performance Check
 * Verifica se mudanças vão afetar performance
 *
 * Uso: node scripts/pre-commit-check.js
 */

const fs = require('fs');
const path = require('path');

const CHECKS = {
  // Verificar se foram adicionados scripts inline
  inlineScripts: {
    file: 'index.html',
    pattern: /<script\s+[^>]*src=["'](?!https?:\/\/|\/)/g,
    description: 'Scripts inline no HTML',
  },

  // Verificar se imagens sem srcset foram adicionadas
  imagesWithoutSrcset: {
    file: 'index.html',
    pattern: /<img\s+(?!.*srcset)[^>]*src=["']\/dpl-pv01\/images/g,
    description: 'Imagens sem srcset',
  },

  // Verificar scripts de terceiros no head
  thirdPartyInHead: {
    file: 'index.html',
    pattern: /<head>[\s\S]*?(?:googletagmanager|facebook\.net|clarity\.ms)[\s\S]*?<\/head>/g,
    description: 'Scripts de terceiros no <head>',
  },

  // Verificar se o tamanho do JS aumentou significativamente
  jsBundleSize: {
    pattern: /dist\/dpl-pv01\/assets\/.*\.js$/,
    description: 'Tamanho do bundle JS',
  },
};

function checkInlineScripts(html) {
  const matches = html.match(CHECKS.inlineScripts.pattern);
  if (matches) {
    return {
      passed: false,
      message: `${CHECKS.inlineScripts.description}: Encontrado ${matches.length} scripts inline no HTML`,
    };
  }
  return { passed: true };
}

function checkImagesWithoutSrcset(html) {
  const imgTags = html.match(/<img[^>]*>/g) || [];
  const withoutSrcset = imgTags.filter(tag => !tag.includes('srcset'));

  if (withoutSrcset.length > 0) {
    return {
      passed: false,
      message: `${CHECKS.imagesWithoutSrcset.description}: ${withoutSrcset.length} imagens sem srcset`,
    };
  }
  return { passed: true };
}

function checkThirdPartyInHead(html) {
  const headMatch = html.match(/<head>[\s\S]*?<\/head>/);
  if (headMatch && /(?:googletagmanager|facebook\.net|clarity\.ms)/.test(headMatch[0])) {
    return {
      passed: false,
      message: `${CHECKS.thirdPartyInHead.description}: Scripts de terceiros detectados no <head>`,
    };
  }
  return { passed: true };
}

function runPreCommitChecks() {
  console.log('=== Pre-commit Performance Checks ===\n');

  const results = [];

  // Ler HTML
  const htmlPath = path.join(__dirname, '..', 'dist', 'dpl-pv01', 'index.html');
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf-8');

    results.push(checkInlineScripts(html));
    results.push(checkImagesWithoutSrcset(html));
    results.push(checkThirdPartyInHead(html));
  }

  const failures = results.filter(r => !r.passed);

  if (failures.length > 0) {
    console.log('\n❌ CHECKS FAILED:\n');
    failures.forEach(f => {
      console.log(`  • ${f.message}`);
    });

    console.log('\n⚠️  Performance may be degraded. Please review before committing.');
    process.exit(1);
  }

  console.log('\n✅ All performance checks passed!\n');
  process.exit(0);
}

runPreCommitChecks();
