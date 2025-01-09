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
import FormHandler from './modules/formHandler.js';
// import { fetchWordPressPosts } from './modules/wpAPI.js';
import { initPageOpenAnimations, initScrollAnimations } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente carregado.");
    // Verifica os elementos de formulário e resposta no DOM
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

    // Instancia o formulário de contato se existir na página
    // if (document.getElementById('contactForm')) {
    //     new FormHandler({
    //         formId: 'contactForm',
    //         endpoint: './enviar.php',
    //         successMessage: 'Mensagem enviada com sucesso!',
    //         errorMessage: 'Erro ao enviar a mensagem.',
    //     });
    // }

    // Instancia o formulário de newsletter se existir na página
    // if (document.getElementById('newsletterForm')) {
    //     new FormHandler({
    //         formId: 'newsletterForm',
    //         endpoint: './newsletter.php',
    //         successMessage: 'Inscrição realizada com sucesso!',
    //         errorMessage: 'Erro ao realizar a inscrição.',
    //     });
    // }

    // Verifica e inicializa o formulário de contato
    const contactFormEl = document.getElementById('contactForm');
    const contactResponseEl = document.getElementById('contactFormResponseMessage');

    if (contactFormEl && contactResponseEl) {
        console.log('Inicializando FormHandler para o formulário de contato');
        new FormHandler({
            formId: 'contactForm',
            successMessage: 'Mensagem enviada com sucesso!',
            errorMessage: 'Erro ao enviar a mensagem. Por favor, tente novamente.',
        });
    } else {
        console.error('Erro: Formulário de contato ou elemento de resposta não encontrado no DOM.');
    }

    // Verifica e inicializa o formulário de newsletter
    const newsletterFormEl = document.getElementById('newsletterForm');
    const newsletterResponseEl = document.getElementById('newsletterResponseMessage');

    if (newsletterFormEl && newsletterResponseEl) {
        console.log('Inicializando FormHandler para o formulário de newsletter');
        new FormHandler({
            formId: 'newsletterForm',
            successMessage: 'Inscrição realizada com sucesso!',
            errorMessage: 'Erro ao realizar a inscrição. Por favor, tente novamente.',
        });
    } else {
        console.error('Erro: Formulário de newsletter ou elemento de resposta não encontrado no DOM.');
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

    // Renderização de posts do blog
    // const postsContainer = document.getElementById('blog-container');
    // const paginationContainer = document.getElementById('pagination-container');

    // Somente chama renderBlogPosts se #blog-container existir
    // if (postsContainer && paginationContainer) {
    //     let currentPage = 1; // Página inicial
    //     const postsPerPage = 6; // Número de posts por página

    //     async function renderBlogPosts(page = 1) {
    //         const { posts, totalPages } = await fetchWordPressPosts(page, postsPerPage);

    //         // Limpa o container antes de adicionar os posts
    //         postsContainer.innerHTML = '';
    //         paginationContainer.innerHTML = '';

    //         if (Array.isArray(posts) && posts.length > 0) {
    //             posts.forEach(post => {
    //                 const imageUrl = post._embedded && post._embedded['wp:featuredmedia'] 
    //                     ? post._embedded['wp:featuredmedia'][0].source_url 
    //                     : '';
                    
    //                 const postElement = document.createElement('div');
    //                 postElement.classList.add('blog-post');
                    
    //                 postElement.innerHTML = `
    //                     <h2>${post.title.rendered}</h2>
    //                     ${imageUrl ? `<img src="${imageUrl}" alt="${post.title.rendered}">` : ''}
    //                     <p>${post.excerpt.rendered}</p>
    //                     <a href="${post.link}">Leia mais</a>
    //                 `;
                    
    //                 postsContainer.appendChild(postElement);
    //             });

    //             // Gera os botões de paginação
    //             for (let i = 1; i <= totalPages; i++) {
    //                 const pageButton = document.createElement('button');
    //                 pageButton.textContent = i;
    //                 pageButton.classList.add('pagination-button');
    //                 if (i === page) {
    //                     pageButton.classList.add('active');
    //                 }
                    
    //                 pageButton.addEventListener('click', () => {
    //                     currentPage = i;
    //                     renderBlogPosts(currentPage);
    //                 });
                    
    //                 paginationContainer.appendChild(pageButton);
    //             }
    //         } else {
    //             postsContainer.innerHTML = '<p>Nenhum post disponível no momento.</p>';
    //         }
    //     }

    //     // Chama a função de renderização de posts inicialmente
    //     renderBlogPosts(currentPage);
    // } else {
    //     console.warn('Elementos necessários para a renderização do blog não foram encontrados.');
    // }
});
