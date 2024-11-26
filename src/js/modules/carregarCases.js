
export default class CarregarCases {
  constructor(url) {
    this.url = url;
    this.data = null;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Erro ao carregar JSON');
      this.data = await response.json();
    } catch (error) {
      console.error('Erro ao carregar os cases:', error);
    }
  }

  // 1. Renderizar o submenu de cases
  renderizarSubmenu(selector) {
    const submenu = document.querySelector(selector);
    if (!submenu || !this.data) return;

    submenu.innerHTML = `
      <li><a href="./cases.html">Todos</a></li>
      ${this.data.cases.map(caseItem => `
        <li><a href="./case.html?id=${caseItem.id}">${caseItem.cliente}</a></li>
      `).join('')}
    `;
  }

  // 2. Renderizar os 3 últimos cases na página inicial (index.html)
  renderizarSwiper(selector) {
    const swiperContainer = document.querySelector(selector);
    if (!swiperContainer || !this.data) return;

    const ultimosCases = this.data.cases.slice(-3).reverse();
    swiperContainer.innerHTML = ultimosCases.map(caseItem => `
      <div class="swiper-slide slide-case">
        <img src="${caseItem.imagem}" alt="${caseItem.titulo}" loading="lazy">
        <div class="slide-case-texto">
          <h3>${caseItem.cliente}</h3>
          <p>${caseItem.descricao_home}</p>
          <a class="btn-vazado" href="./case.html?id=${caseItem.id}">Ver case completo</a>
        </div>
      </div>
    `).join('');
  }

 // 3. Renderizar a lista de cases (cases.html)
renderizarListaCases(selector) {
  const listaContainer = document.querySelector(selector);
  if (!listaContainer || !this.data) {
    console.warn('Contêiner ou dados não encontrados para renderizar a lista de cases.');
    return;
  }

  listaContainer.innerHTML = this.data.cases.map(caseItem => `
    <div class="case">
      <h2>${caseItem.titulo}</h2>
      <img src="${caseItem.imagem}" alt="${caseItem.titulo}">
      <a href="./case.html?id=${caseItem.id}" class="btn-ver-mais">Ver o case</a>
    </div>
  `).join('');
}


  // Método para inicializar o modal para vídeos
  initModal() {
    const closeModalButton = document.querySelector('.close-modal');
    if (closeModalButton) {
      closeModalButton.addEventListener('click', () => this.fecharModal());
    }
  }
  
  

  abrirModal(videoUrl) {
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
  
  fecharModal() {
    const modal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('video-player');
  
    if (modal && videoPlayer) {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
      modal.style.display = 'none';
    }
  }
  
  

 // 4. Renderizar o case detalhado (case.html)
renderizarCaseDetalhado(selector) {
  const container = document.querySelector(selector);
  const urlParams = new URLSearchParams(window.location.search);
  const caseId = urlParams.get('id');
  if (!container || !this.data || !caseId) return;

  const caseItem = this.data.cases.find(item => item.id === caseId);
  if (!caseItem) {
    container.innerHTML = "<p>Case não encontrado.</p>";
    return;
  }

  // Renderizar o conteúdo detalhado do case
  container.innerHTML = `
    <!-- Introdução do Case -->
    <section class="case-introducao">
      <div class="container case-introducao-container">
        <div class="case-titulo">
          <h1>${caseItem.titulo}</h1>
        </div>
      </div>
      <img src="${caseItem.imagem}" alt="${caseItem.titulo}" width="800" height="600">
    </section>

    <!-- Detalhamento do Case com Texto e Galeria -->
    <section class="case-container container">
      <div class="case-content-esquerda">
        <!-- Cliente -->
        <div class="case-content">
          <h2>Cliente: ${caseItem.cliente}</h2>
          <p>${caseItem.descricao_cliente}</p>
        </div>
        
        <!-- Desafio -->
        <div class="case-content">
        <h2>Desafio</h2>
        ${Array.isArray(caseItem.desafio) 
          ? caseItem.desafio.map(paragrafo => `<p>${paragrafo}</p>`).join('')
          : `<p>${caseItem.desafio}</p>`}
        </div>


      <!-- Estratégia Implementada -->
      <div class="case-content">
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


        <!-- Resultados -->
        <div class="case-content">
          <h2>Resultados</h2>
          ${Object.keys(caseItem.resultados).map(canal => {
            const resultado = caseItem.resultados[canal];
            if (Array.isArray(resultado)) {
              return `
                <div class="resultado-item">
                  <h3>${canal.charAt(0).toUpperCase() + canal.slice(1)}</h3>
                  <div class="resultado-detalhes">
                    <ul>
                      ${resultado.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                  </div>
                </div>
              `;
            } else {
              return `
                <div class="resultado-item">
                  <h3>${canal.charAt(0).toUpperCase() + canal.slice(1)}</h3>
                  <div class="resultado-detalhes">
                    <p>${resultado}</p>
                  </div>
                </div>
              `;
            }
          }).join('')}
        </div>

        <!-- Conclusão -->
        <div class="case-content">
          <h2>Conclusão</h2>
          ${Array.isArray(caseItem.conclusao)
            ? caseItem.conclusao.map(paragrafo => `<p>${paragrafo}</p>`).join('')
            : `<p>${caseItem.conclusao}</p>`}
          ${caseItem.video ? `<a href="#" class="video-link">Assista o vídeo</a>` : ''}
        </div>
      </div>

      <!-- Galeria de Imagens à Direita -->
      ${caseItem.galeria && caseItem.galeria.length > 0 ? `
      <div class="case-content-direita case-galeria">
        <div class="galeria-container">
          ${caseItem.galeria.map(imagem => `
            <img src="${imagem}" alt="${caseItem.titulo}" class="galeria-imagem">
          `).join('')}
        </div>
      </div>` : ''}
    </section>
  `;

   // Adicionar evento de clique dinamicamente para abrir o modal
   const videoLink = container.querySelector('.video-link');
   if (videoLink && caseItem.video) {
     videoLink.addEventListener('click', (event) => {
       event.preventDefault();
       this.abrirModal(caseItem.video);
     });
   }
}

async init(submenuSelector, swiperSelector, listaSelector, caseSelector) {
  await this.fetchData();

  if (submenuSelector) this.renderizarSubmenu(submenuSelector);
  if (swiperSelector) this.renderizarSwiper(swiperSelector);
  if (listaSelector) this.renderizarListaCases(listaSelector);

  const isCaseDetailPage = window.location.pathname.includes('case.html');
  const urlParams = new URLSearchParams(window.location.search);
  const caseId = urlParams.get('id');

  if (caseSelector && isCaseDetailPage) {
    this.renderizarCaseDetalhado(caseSelector);

    // Inicializar o modal somente se estivermos na página `case.html`
    if (caseId) {
      this.initModal();
    }
  }
}


}