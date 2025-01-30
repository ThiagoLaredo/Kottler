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
import "../css/social-sidebar.css";
import "../css/blog.css";

import MenuMobile from './modules/menu-mobile.js';
import HeaderScroll from './modules/header-scroll.js';
import CarregarCases from './modules/carregarCases.js';
import { setupContactForm, setupNewsletterForm } from './modules/formHandler.js';
import { initPageOpenAnimations, initScrollAnimations } from './modules/animations.js';
import { BlogManager } from "./modules/blog-manager.js";

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente carregado.");

    const blogManager = new BlogManager();

    // Detectar qual página está carregada
    if (window.location.pathname.endsWith("blog")) {
    blogManager.loadPosts();
    } else if (window.location.pathname.endsWith("post")) {
    blogManager.loadPost();
    }

    console.log('Verificando elementos de formulário:');
    console.log('contactForm:', document.getElementById('contactForm'));
    console.log('contactFormResponseMessage:', document.getElementById('contactFormResponseMessage'));
    console.log('newsletterForm:', document.getElementById('newsletterForm'));
    console.log('newsletterFormResponseMessage:', document.getElementById('newsletterFormResponseMessage'));

    // Inicializa o menu mobile com submenu integrado, caso os elementos existam
    const menuMobile = new MenuMobile(
        '[data-menu="logo"]',
        '[data-menu="button"]',
        '[data-menu="list"]',
        '[data-menu="contato-mobile"]',
        '[data-menu="linkedin"]',
        '[data-menu="instagram"]'
    );
    if (menuMobile) {
        console.log('MenuMobile initialized successfully');
        menuMobile.init();
    } else {
        console.error('MenuMobile failed to initialize');
    }

    // Inicializa a mudança de Header ao scroll, se a classe .header existir
    const headerEl = document.querySelector('.header');
    if (headerEl) {
        const headerScroll = new HeaderScroll('.header');
        headerScroll.init();
    }

    // Animações de abertura de página e scroll
    initPageOpenAnimations();
    initScrollAnimations();

    const contactFormEl = document.getElementById('contactForm');
    if (contactFormEl) {
      setupContactForm();
    }
    
    const newsletterFormEl = document.getElementById('newsletterForm');
    if (newsletterFormEl) {
      setupNewsletterForm();
    }
     


    // Carrega e inicializa os cases se existirem os seletores
    const submenuCasesEl = document.querySelector('.submenu-cases');
    const swiperWrapperEl = document.querySelector('.cases-slides .swiper-wrapper');
    const casesListaEl = document.querySelector('.cases-lista');
    const caseDetalhadoEl = document.querySelector('.case-detalhado');

    // Só inicia o carregamento dos cases se pelo menos um dos elementos existir
    if (submenuCasesEl || swiperWrapperEl || casesListaEl || caseDetalhadoEl) {
        const cases = new CarregarCases('../cases.json');
        cases.init(
            '.submenu-cases',     // Submenu
            '.cases-slides .swiper-wrapper', // Swiper na index.html
            '.cases-lista',       // Página de lista de cases (cases.html)
            '.case-detalhado'     // Página de case detalhado (case.html)
        );
    }
});