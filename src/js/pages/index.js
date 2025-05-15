import "../../css/global.css";
import "../../css/header.css";
import "../../css/introducao.css";
import "../../css/solucoes-home.css";
import "../../css/destaques.css";
import "../../css/clientes.css";
import "../../css/cases-home.css";
import "../../css/metodologia.css";
import "../../css/footer.css";
import "../../css/menu-mobile.css";
import "../../css/submenu.css";
import "../../css/cores.css";
import "../../css/componentes.css";
import "../../css/fontes.css";
import "../../css/solucoes.css";
import "../../css/social-sidebar.css";
import "../../css/popup.css";
import "../../css/btn-float.css";

import MenuMobile from '../modules/menu-mobile.js';
import HeaderScroll from '../modules/header-scroll.js';
import FormHandler from '../modules/formHandler.js';
import { initPageOpenAnimations, initScrollAnimations } from '../modules/animations.js';
import VideoPreload from "../modules/VideoPreload.js";
import { updateBackgrounds } from "../modules/updateBackgrounds.js";
import EbookForm from "../modules/ebookForm.js";
import EbookPopup from "../modules/ebookPopup.js";
import {
    MySwiperSolucoes, 
    MySwiperCases 
  } from "../modules/myswiper.js";
import renderizarSubmenu from '../modules/cases/renderizarSubmenu.js';
import renderizarSwiper from "../modules/cases/renderizarSwiper.js";
import AnalyticsLoader from '../modules/analyticsLoader.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente carregado.");

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

    // Animações de abertura e scroll
    initPageOpenAnimations();
    initScrollAnimations();

    // Popup do e-book
    new EbookPopup();
    new EbookForm();
    new VideoPreload();

    // Sliders
    new MySwiperSolucoes();
    new MySwiperCases();

    // Inicializa a classe
    new AnalyticsLoader();

    updateBackgrounds();
    window.addEventListener("resize", updateBackgrounds);

    new FormHandler();

    // JSON dos cases
    const submenuCasesEl = document.querySelector('.submenu-cases');
    const swiperWrapperEl = document.querySelector('.cases-slides .swiper-wrapper');

    if (submenuCasesEl) {
        renderizarSubmenu('.submenu-cases', '../cases.json');
    }

    if (swiperWrapperEl) {
        renderizarSwiper('.cases-slides .swiper-wrapper', '../cases.json');
    }
});