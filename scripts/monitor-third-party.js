/**
 * Third-Party Script Monitor
 * Monitora tamanho e mudanças em scripts de terceiros
 * Alerta se houver aumento significativo
 *
 * Uso: node scripts/monitor-third-party.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const THIRD_PARTY_SCRIPTS = [
  {
    name: 'Google Analytics',
    url: 'https://www.googletagmanager.com/gtag/js?id=G-90B11CMJ6L',
    maxBytes: 200000, // 200KB
    warningThreshold: 0.2, // 20% de aumento gera warning
  },
  {
    name: 'Google Tag Manager',
    url: 'https://www.googletagmanager.com/gtm.js?id=GTM-MCZKSV8N',
    maxBytes: 200000,
    warningThreshold: 0.2,
  },
  {
    name: 'Facebook Pixel',
    url: 'https://connect.facebook.net/en_US/fbevents.js',
    maxBytes: 150000,
    warningThreshold: 0.2,
  },
  {
    name: 'Microsoft Clarity',
    url: 'https://www.clarity.ms/tag/v5gov59ztk',
    maxBytes: 100000,
    warningThreshold: 0.2,
  },
];

const HISTORY_FILE = path.join(__dirname, '..', 'third-party-history.json');

function loadHistory() {
  if (fs.existsSync(HISTORY_FILE)) {
    return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
  }
  return {};
}

function saveHistory(history) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

function getScriptSize(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let totalBytes = 0;
      res.on('data', chunk => totalBytes += chunk.length);
      res.on('end', () => resolve({
        size: totalBytes,
        sizeKB: Math.round(totalBytes / 1024),
      }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function monitorScripts() {
  console.log('=== Third-Party Script Monitor ===\n');

  const history = loadHistory();
  const today = new Date().toISOString().split('T')[0];
  const results = [];

  for (const script of THIRD_PARTY_SCRIPTS) {
    console.log(`📊 ${script.name}`);

    try {
      const current = await getScriptSize(script.url);
      const previous = history[script.url];

      console.log(`  Tamanho atual: ${current.sizeKB} KB`);

      // Verificar se excedeu limite
      if (current.size > script.maxBytes) {
        console.log(`  ⚠️  ALERTA: Excedeu limite de ${Math.round(script.maxBytes / 1024)} KB`);
      }

      // Verificar aumento significativo
      if (previous) {
        const increase = (current.size - previous.size) / previous.size;

        if (increase > script.warningThreshold) {
          console.log(`  ⚠️  ALERTA: Aumentou ${(increase * 100).toFixed(0)}% em relação ao anterior (${previous.sizeKB} KB)`);

          // Sugerir ação
          console.log(`  💡 Ação recomendada: Verificar se o script ainda é necessário ou pode ser carregado lazy`);
        } else if (increase < 0) {
          console.log(`  ✓ Diminuiu ${(Math.abs(increase) * 100).toFixed(0)}% em relação ao anterior`);
        } else {
          console.log(`  ✓ Sem mudanças significativas`);
        }
      }

      results.push({
        name: script.name,
        url: script.url,
        current,
        previous,
      });

      // Atualizar histórico
      if (!history[script.url]) {
        history[script.url] = {};
      }
      history[script.url][today] = current;

    } catch (error) {
      console.log(`  ✗ Erro ao carregar: ${error.message}`);
    }

    console.log('');
  }

  saveHistory(history);

  // Manter apenas últimos 30 dias no histórico
  Object.keys(history).forEach(url => {
    const dates = Object.keys(history[url]).sort().reverse();
    if (dates.length > 30) {
      dates.slice(30).forEach(date => {
        delete history[url][date];
      });
    }
  });
  saveHistory(history);

  console.log(`=== Completo. Histórico salvo em: ${HISTORY_FILE} ===`);

  return results;
}

monitorScripts().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
