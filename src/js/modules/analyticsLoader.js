export default class AnalyticsLoader {
    constructor() {
      this.loaded = false; // Evita carregamento múltiplo
      this.gtmLoaded = false; // Evita carregar o GTM várias vezes
      window.addEventListener('load', () => this.init());
    }
  
    init() {
      ['mousemove', 'scroll', 'keydown'].forEach(event =>
        document.addEventListener(event, () => this.loadAnalytics(), { once: true })
      );
    }
  
    loadAnalytics() {
      if (this.loaded) return; // Já carregou uma vez, não carrega novamente
      this.loaded = true;
      
      // Carregar Google Tag Manager (não precisa carregar gtag.js separado)
      if (!this.gtmLoaded) {
        this.loadScript('https://www.googletagmanager.com/gtm.js?id=GTM-P34T87S9');
        this.gtmLoaded = true;
      }
    }
  
    loadScript(src, async = true) {
      const script = document.createElement('script');
      script.src = src;
      script.async = async;
      if (!async) script.defer = true;
      document.head.appendChild(script);
    }
}