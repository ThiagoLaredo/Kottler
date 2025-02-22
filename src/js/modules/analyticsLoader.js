export default class AnalyticsLoader {
    constructor() {
      window.addEventListener('load', () => this.init());
    }
  
    init() {
      document.addEventListener('mousemove', () => this.loadAnalytics(), { once: true });
      document.addEventListener('scroll', () => this.loadAnalytics(), { once: true });
      document.addEventListener('keydown', () => this.loadAnalytics(), { once: true });
    }
  
    loadAnalytics() {
      this.loadScript('https://www.googletagmanager.com/gtag/js?id=G-6RWFRNX0V3', true);
      this.loadScript('https://www.googletagmanager.com/gtag/js?id=G-LCDLGEV4PD', true);
      this.loadScript('https://www.googletagmanager.com/gtm.js?id=GTM-P34T87S9', false);
    }
  
    loadScript(src, async = true) {
      const script = document.createElement('script');
      script.src = src;
      script.async = async;
      if (!async) script.defer = true;
      document.head.appendChild(script);
    }
  }
  
  // Inicializa a classe
  new AnalyticsLoader();
  