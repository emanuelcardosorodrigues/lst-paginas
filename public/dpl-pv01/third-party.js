/**
 * Third-Party Script Loader - DPL-PV01
 * Carrega scripts de terceiros de forma não-bloqueante
 * após a primeira interação do usuário ou timeout
 */

(function() {
  'use strict';

  // Configurações
  const CONFIG = {
    GA_ID: 'G-90B11CMJ6L',
    GTM_ID: 'GTM-MCZKSV8N',
    FB_PIXEL_ID: '1535636554388338',
    CLARITY_ID: 'v5gov59ztk',
    LOAD_DELAY: 3000, // ms - carregar após este timeout se não houver interação
  };

  // Estado
  let loaded = false;
  let timeoutId = null;

  /**
   * Carrega um script dinamicamente
   * @param {string} src - URL do script
   * @param {object} attributes - Atributos adicionais
   * @returns {Promise}
   */
  function loadScript(src, attributes = {}) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;

      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });

      script.onload = resolve;
      script.onerror = () => {
        console.warn(`Failed to load script: ${src}`);
        reject(new Error(`Failed to load: ${src}`));
      };

      document.body.appendChild(script);
    });
  }

  /**
   * Inicializa Google Analytics
   */
  function loadGoogleAnalytics() {
    loadScript('https://www.googletagmanager.com/gtag/js?id=' + CONFIG.GA_ID, {
      'data-cfasync': 'false'
    }).then(() => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', CONFIG.GA_ID);
    }).catch(() => {});
  }

  /**
   * Inicializa Google Tag Manager
   */
  function loadGoogleTagManager() {
    loadScript('https://www.googletagmanager.com/gtm.js?id=' + CONFIG.GTM_ID, {
      'data-cfasync': 'false'
    }).then(() => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({'event':'gtm.js','gtm.start':new Date().getTime(),'eventID':'gtm1'});
    }).catch(() => {});
  }

  /**
   * Inicializa Facebook Pixel
   */
  function loadFacebookPixel() {
    loadScript('https://connect.facebook.net/en_US/fbevents.js', {
      'data-cfasync': 'false'
    }).then(() => {
      window.fbq = window.fbq || function() {
        (window.fbq.q = window.fbq.q || []).push(arguments);
      };
      fbq('init', CONFIG.FB_PIXEL_ID);
      fbq('track', 'PageView');
    }).catch(() => {});
  }

  /**
   * Inicializa Microsoft Clarity
   */
  function loadClarity() {
    loadScript('https://www.clarity.ms/tag/' + CONFIG.CLARITY_ID, {
      'data-cfasync': 'false'
    }).catch(() => {});
  }

  /**
   * Carrega todos os scripts de terceiros
   */
  function loadAllThirdPartyScripts() {
    if (loaded) return;
    loaded = true;

    // Limpar timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    // Carregar scripts em paralelo
    loadGoogleAnalytics();
    loadGoogleTagManager();
    loadFacebookPixel();
    loadClarity();

    // Remover event listeners
    ['click', 'scroll', 'keydown', 'touchstart', 'mousemove'].forEach(event => {
      window.removeEventListener(event, triggerOnInteraction, { passive: true });
    });
  }

  /**
   * Handler para disparo por interação
   */
  function triggerOnInteraction() {
    loadAllThirdPartyScripts();
  }

  /**
   * Configurar triggers de carregamento
   */
  function setupTriggers() {
    // Trigger após timeout (3 segundos)
    timeoutId = setTimeout(loadAllThirdPartyScripts, CONFIG.LOAD_DELAY);

    // Trigger na primeira interação do usuário
    const events = ['click', 'scroll', 'keydown', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, triggerOnInteraction, {
        once: true,
        passive: true,
        capture: true
      });
    });
  }

  // Iniciar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupTriggers);
  } else {
    setupTriggers();
  }

  // Expor função para carregamento manual (se necessário)
  window.loadThirdPartyScripts = loadAllThirdPartyScripts;
})();
