


import { getCases } from './fetchCases.js';

export default async function renderizarCaseDetalhado(selector) {
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

    const container = document.querySelector(selector);
    const urlParams = new URLSearchParams(window.location.search);
    const caseId = urlParams.get('id');
    if (!container || !data || !caseId) return;

    const caseItem = data.cases.find(item => item.id === caseId);
    if (!caseItem) {
      container.innerHTML = "<p>Case não encontrado.</p>";
      return;
    }

    container.innerHTML = `
    <section class="case-introducao">
      <div class="container case-introducao-container">
        <div class="case-titulo">
          <h1>${caseItem.titulo}</h1>
        </div>
      </div>
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
    </section>
    
    <section class="case-container container">
      <div class="case-content-esquerda">
        <div class="case-content animate-me">
          <h2>Cliente: ${caseItem.cliente}</h2>
          <p>${caseItem.descricao_cliente}</p>
        </div>
        <div class="case-content animate-me">
          <h2>Desafio</h2>
          ${Array.isArray(caseItem.desafio) 
            ? caseItem.desafio.map(paragrafo => `<p>${paragrafo}</p>`).join('')
            : `<p>${caseItem.desafio}</p>`}
        </div>
        <div class="case-content animate-me">
          <h2>Estratégia Implementada</h2>
          ${caseItem.estrategia.map(estr => `
            <div>
              <h3>${estr.fase}</h3>
              ${Array.isArray(estr.descricao)
                ? estr.descricao.map(desc => `<p>${desc}</p>`).join('')
                : `<p>${estr.descricao}</p>`}
              ${estr.detalhes ? `
                <ul>
                  ${estr.detalhes.map(det => `<li><strong>${det.canal}:</strong> ${det.conteudo}</li>`).join('')}
                </ul>` : ''}
            </div>
          `).join('')}
        </div>
        <div class="case-content">
          <h2>Resultados</h2>
          ${Object.keys(caseItem.resultados).map(canal => {
            const resultado = caseItem.resultados[canal];
            return Array.isArray(resultado) ? `
              <div class="resultado-item">
                <h3>${canal.charAt(0).toUpperCase() + canal.slice(1)}</h3>
                <ul>${resultado.map(item => `<li>${item}</li>`).join('')}</ul>
              </div>` : `
              <div class="resultado-item animate-me">
                <h3>${canal.charAt(0).toUpperCase() + canal.slice(1)}</h3>
                <p>${resultado}</p>
              </div>`;
          }).join('')}
        </div>
        <div class="case-content">
          <h2>Conclusão</h2>
          ${Array.isArray(caseItem.conclusao) 
            ? caseItem.conclusao.map(paragrafo => `<p>${paragrafo}</p>`).join('')
            : `<p>${caseItem.conclusao}</p>`}
          ${caseItem.video && caseItem.video.includes('instagram.com') ? `
            <a href="${caseItem.video}" target="_blank" class="btn btn-video">Assistir o vídeo no Instagram</a>` : ''}
          ${caseItem.video && caseItem.video.endsWith('.mp4') ? `
            <a href="#" class="btn">Assistir o vídeo</a>` : ''}
        </div>
      </div>
    
      ${caseItem.galeria && caseItem.galeria.length > 0 ? `
      <div class="case-content-direita case-galeria">
        <div class="galeria-container">
          ${caseItem.galeria.map(imagem => `<img src="${imagem}" alt="${caseItem.titulo}">`).join('')}
        </div>
      </div>` : ''}
    </section>
    `;

    const videoLink = container.querySelector('.video-link');
    if (videoLink && caseItem.video.endsWith('.mp4')) {
      videoLink.addEventListener('click', (event) => {
        event.preventDefault();
        abrirModal(caseItem.video); // Modifiquei para chamar a função diretamente
      });
    }

    // Inicializando o modal
    initModal(); // Chama a função sem o "this"

  } catch (error) { 
    console.error('Erro ao carregar os cases:', error);
  }
}

function initModal() {
  const closeModalButton = document.querySelector('.close-modal');
  if (closeModalButton) {
    closeModalButton.addEventListener('click', fecharModal);
  }
}

function abrirModal(videoUrl) {
  const modal = document.getElementById('video-modal');
  const videoPlayer = document.getElementById('video-player');
  const videoSource = document.getElementById('video-source');

  if (modal && videoPlayer && videoSource) {
    videoSource.src = videoUrl;
    videoPlayer.load();
    modal.style.display = 'flex';
    videoPlayer.play();
  }
}

function fecharModal() {
  const modal = document.getElementById('video-modal');
  const videoPlayer = document.getElementById('video-player');

  if (modal && videoPlayer) {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    modal.style.display = 'none';
  }
}