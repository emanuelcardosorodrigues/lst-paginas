/**
 * Cache Warming Script
 * Simula requisições para preencher o cache do Cloudflare
 *
 * Uso: node scripts/warm-cache.js
 */

const https = require('https');

const URLS = [
  'https://cf.leandrostecca.com.br/dpl-pv01/',
  'https://cf.leandrostecca.com.br/dpl-pv01/index.html',
  'https://cf.leandrostecca.com.br/dpl-pv01/assets/main-X7pa7VUy.css',
  'https://cf.leandrostecca.com.br/dpl-pv01/assets/main-kpbWQg4d.js',
  'https://cf.leandrostecca.com.br/dpl-pv01/third-party.js',
  'https://cf.leandrostecca.com.br/dpl-pv01/images/optimized/hero-bundle-desktop.webp',
  'https://cf.leandrostecca.com.br/dpl-pv01/images/optimized/hero-bundle-mobile.webp',
];

function warmUrl(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    https.get(url, (res) => {
      const duration = Date.now() - startTime;

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`✓ ${url}`);
        console.log(`  Status: ${res.statusCode}`);
        console.log(`  Size: ${res.headers['content-length']} bytes`);
        console.log(`  Cache: ${res.headers['cf-cache-status'] || 'N/A'}`);
        console.log(`  Duration: ${duration}ms`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`✗ ${url}: ${err.message}`);
      reject(err);
    });
  });
}

async function warmAllCache() {
  console.log('=== Cache Warming ===\n');

  const results = [];

  for (const url of URLS) {
    try {
      await warmUrl(url);
      results.push({ url, success: true });
    } catch (err) {
      results.push({ url, success: false, error: err.message });
    }

    // Pequeno delay entre requisições
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  const success = results.filter(r => r.success).length;
  console.log(`\n=== Completo: ${success}/${results.length} URLs warmed ===`);

  return results;
}

warmAllCache().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
