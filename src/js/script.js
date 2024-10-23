import "../css/global.css";
import "../css/header.css";
import "../css/introducao.css";
import "../css/introducao-pg-interna.css";
import "../css/sobre.css";
import "../css/sobre-2.css";
import "../css/processo.css";
import "../css/bio.css";
import "../css/frase.css";
import "../css/para-mulheres.css";
import "../css/para-equipes.css";
import "../css/programas-mulheres.css";
import "../css/programas-equipes.css";
import "../css/manifesto.css";
import "../css/depoimentos.css";
import "../css/blog.css";
import "../css/footer.css";
import "../css/text-typing.css";
import "../css/menu-mobile.css";
import "../css/cores.css";
import "../css/componentes.css";
import "../css/embreve.css";

import MenuMobile from './modules/menu-mobile.js';
import { initPageOpenAnimations, initScrollAnimations } from './modules/animations.js';
import { ProgramasMulheresLoader } from './modules/programasMulheresLoader.js';
import { ProgramasEquipesLoader } from './modules/programasEquipesLoader.js';
import { fetchWordPressPosts } from './modules/wpApi.js';
import mulheresData from '../programaMulheres.json';
import equipesData from '../programaEquipes.json';



// Função para configurar os links dos serviços
function setupServiceLinks(serviceLoader, page) {
    const serviceLinks = document.querySelectorAll(`a[href*="${page}"]`);
    serviceLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const serviceId = link.hash.substring(1);
            if (window.location.pathname.includes(page)) {
                console.log('Already on the correct page, loading service dynamically:', serviceId);
                serviceLoader.loadService(serviceId);
            } else {
                console.log('Redirecting to page with hash:', page, serviceId);
                window.location.href = `${page}#${serviceId}`;
            }
        });
    });
}

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

  initPageOpenAnimations();
    initScrollAnimations();

  const pathname = window.location.pathname.toLowerCase();

    if (pathname.includes('programa-mulheres')) {
        console.log('Initializing loader for "programa-mulheres".');
        const loader = new ProgramasMulheresLoader(mulheresData);
        setupServiceLinks(loader, 'programa-mulheres');
        handleInitialLoad(loader);
    } else if (pathname.includes('programa-equipes')) {
        console.log('Initializing loader for "programa-equipes".');
        const loader = new ProgramasEquipesLoader(equipesData);
        setupServiceLinks(loader, 'programa-equipes');
        handleInitialLoad(loader);
    } else {
        console.info('Nenhum loader necessário para esta página.');
    }
});

// Função para carregar o serviço inicial com base no hash da URL
function handleInitialLoad(loader) {
    const serviceId = window.location.hash.substring(1);
    if (serviceId) {
        console.log('Carregando serviço com ID:', serviceId);
        loader.loadService(serviceId);
    } else {
        console.info('Nenhum Service ID encontrado na URL. Carregando conteúdo padrão...');
    }

    window.addEventListener('hashchange', () => {
        const newServiceId = window.location.hash.substring(1);
        if (newServiceId) {
            console.log('Hash changed, carregando novo serviço com ID:', newServiceId);
            loader.loadService(newServiceId);
        } else {
            console.warn('Service ID is undefined or null on hash change');
        }
    });
}

let currentPage = 1; // Página inicial
const postsPerPage = 6; // Número de posts por página

// Função para renderizar posts
async function renderBlogPosts(page = 1) {
  const postsContainer = document.getElementById('blog-container');
  const paginationContainer = document.getElementById('pagination-container');

  // Verifica se os elementos existem antes de tentar manipulá-los
  if (!postsContainer || !paginationContainer) {
    console.warn('Elementos necessários para a renderização do blog não foram encontrados.');
    return; // Sai da função se os elementos não forem encontrados
  }

  const { posts, totalPages } = await fetchWordPressPosts(page, postsPerPage);
  
  // Limpa o container antes de adicionar os posts
  postsContainer.innerHTML = '';
  paginationContainer.innerHTML = '';

  // Verifica se posts é um array antes de usar forEach
  if (Array.isArray(posts) && posts.length > 0) {
    posts.forEach(post => {
      const imageUrl = post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : '';
      
      const postElement = document.createElement('div');
      postElement.classList.add('blog-post');
      
      postElement.innerHTML = `
        <h2>${post.title.rendered}</h2>
        ${imageUrl ? `<img src="${imageUrl}" alt="${post.title.rendered}">` : ''}
        <p>${post.excerpt.rendered}</p>
        <a href="${post.link}">Leia mais</a>
      `;
      
      postsContainer.appendChild(postElement);
    });

    // Gera os botões de paginação
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.classList.add('pagination-button');
      if (i === page) {
        pageButton.classList.add('active');
      }
      
      pageButton.addEventListener('click', () => {
        currentPage = i;
        renderBlogPosts(currentPage);
      });
      
      paginationContainer.appendChild(pageButton);
    }
  } else {
    postsContainer.innerHTML = '<p>Nenhum post disponível no momento.</p>';
  }
}

// Chama a função de renderização após o DOM ser carregado
document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('blog-container');
  
  // Somente chama renderBlogPosts se o #blog-container existir
  if (postsContainer) {
    renderBlogPosts(currentPage);
  }
});
