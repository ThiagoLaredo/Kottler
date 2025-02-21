import { getCases } from './fetchCases.js';

export default async function renderizarListaCases(selector) {
  const listaContainer = document.querySelector(selector);
  if (!listaContainer) {
    console.warn('Contêiner não encontrado para renderizar a lista de cases.');
    return;
  }

  try {
    const data = await getCases();
    if (!data || !data.cases) {
      console.warn('Dados de cases não encontrados.');
      return;
    }

    listaContainer.innerHTML = data.cases.map((caseItem) => {
      return `
        <div class="case">
          <h2>${caseItem.titulo}</h2>
          <img 
            srcset="${caseItem.imagem.mobile} 480w, 
                    ${caseItem.imagem.desktop} 1024w, 
                    ${caseItem.imagem.large} 1920w" 
            sizes="(max-width: 600px) 480px, 
                  (max-width: 1024px) 1024px, 
                  1920px" 
            src="${caseItem.imagem.desktop}" 
            alt="${caseItem.titulo}" 
            loading="lazy">
          <a href="./case.html?id=${caseItem.id}" class="btn-ver-mais">Ver o case</a>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Erro ao carregar os cases:', error);
  }
}
