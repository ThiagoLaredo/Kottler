import "../../css/global.css";
import "../../css/header.css";
import "../../css/introducao.css";
import "../../css/solucoes-intro.css";
import "../../css/footer.css";
import "../../css/menu-mobile.css";
import "../../css/submenu.css";
import "../../css/cores.css";
import "../../css/componentes.css";
import "../../css/fontes.css";;
import "../../css/social-sidebar.css";
import "../../css/popup.css";
import "../../css/btn-float.css";
import "../../css/cases.css";
import "../../css/case-detalhado.css";

import MenuMobile from '../modules/menu-mobile.js';
import HeaderScroll from '../modules/header-scroll.js';
import FormHandler from '../modules/formHandler.js';
import { initPageOpenAnimations, initScrollAnimations } from '../modules/animations.js';
import EbookPopup from "../modules/ebookPopup.js";
import { updateBackgrounds } from "../modules/updateBackgrounds.js";
import EbookForm from "../modules/ebookForm.js";
import renderizarSubmenu from '../modules/cases/renderizarSubmenu.js';
import renderizarListaCases from '../modules/cases/renderizarCaseDetalhado.js'

document.addEventListener('DOMContentLoaded', () => {

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
        menuMobile.init();
    } else {
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


    // Performance imagens Background
    updateBackgrounds();
    window.addEventListener("resize", updateBackgrounds);

    // Formulário
    new FormHandler();

    // JSON dos cases
    const submenuCasesEl = document.querySelector('.submenu-cases');
    const caseDetalhadoEl = document.querySelector('.case-detalhado');

    if (submenuCasesEl) {
        renderizarSubmenu('.submenu-cases', '../cases.json');
    }

    if (caseDetalhadoEl) {
        renderizarListaCases('.case-detalhado', '../cases.json');
    }
});