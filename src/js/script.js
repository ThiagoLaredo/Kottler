import "../css/global.css";
import "../css/header.css";
import "../css/body-index.css";
import "../css/introducao.css";
import "../css/solucoes-home.css";
import "../css/destaques.css";
import "../css/clientes.css";
import "../css/cases-home.css";
import "../css/cases.css";
import "../css/case-detalhado.css";
import "../css/metodologia.css";
import "../css/footer.css";
import "../css/menu-mobile.css";
import "../css/submenu.css";
import "../css/cores.css";
import "../css/componentes.css";
import "../css/fontes.css";
import "../css/solucoes.css";
import "../css/vender.css";
import "../css/metodologia-pg.css";
import "../css/contato.css";

import MenuMobile from './modules/menu-mobile.js';
import HeaderScroll from './modules/header-scroll.js';
import CarregarCases from './modules/carregarCases.js';

import { initPageOpenAnimations, initScrollAnimations } from './modules/animations.js';

// Função principal de inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente carregado.");

    // Inicializa o menu mobile com submenu integrado
    const menuMobile = new MenuMobile('[data-menu="logo"]', '[data-menu="button"]', '[data-menu="list"]', '[data-menu="contato-mobile"]', '[data-menu="linkedin"]', '[data-menu="instagram"]');
    if (menuMobile) {
        console.log('MenuMobile initialized successfully');
        menuMobile.init();
    } else {
        console.error('MenuMobile failed to initialize');
    }

    const headerScroll = new HeaderScroll('.header');
    headerScroll.init();

  initPageOpenAnimations();
    initScrollAnimations();

    const cases = new CarregarCases('../cases.json');

    // Renderizar o conteúdo em diferentes páginas
    cases.init(
      '.submenu-cases',     // Submenu
      '.cases-slides .swiper-wrapper', // Swiper na index.html
      '.cases-lista',       // Página de lista de cases (cases.html)
      '.case-detalhado'     // Página de case detalhado (case.html)
    );
});



