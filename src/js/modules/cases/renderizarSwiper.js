// src/js/modules/cases/renderizarSwiper.js
import { getCases } from './fetchCases.js';

export default async function renderizarSwiper(selector) {
  const swiperContainer = document.querySelector(selector);
  if (!swiperContainer) return;

  const data = await getCases();
  if (!data) return;

  const ultimosCases = data.cases.slice(-3).reverse();
  swiperContainer.innerHTML = ultimosCases.map(caseItem => `
    <div class="swiper-slide slide-case">
      <img 
        srcset="${caseItem.imagem.mobile} ${caseItem.imagem.mobile_width}w, 
                ${caseItem.imagem.desktop} ${caseItem.imagem.desktop_width}w,
                ${caseItem.imagem.large} 1920w" 
        sizes="(max-width: 480px) 100vw,  
        (max-width: 768px) 80vw,  
        (max-width: 1024px) 60vw,  
        (max-width: 1440px) 50vw,  
        40vw"
        src="${caseItem.imagem.mobile}" 
        alt="${caseItem.titulo}" 
        loading="lazy"
        width="${caseItem.imagem.desktop_width}" 
        height="${caseItem.imagem.desktop_height}">
      <div class="slide-case-texto">
        <h3>${caseItem.cliente}</h3>
        <p>${caseItem.descricao_home}</p>
        <a class="btn-vazado" href="./case.html?id=${caseItem.id}">Ver case completo</a>
      </div>
    </div>
  `).join('');
}
