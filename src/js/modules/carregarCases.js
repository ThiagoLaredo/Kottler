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



  renderizarSwiper(selector) {
    const swiperContainer = document.querySelector(selector);
    if (!swiperContainer || !this.data) return;
  
    const ultimosCases = this.data.cases.slice(-3).reverse();
    swiperContainer.innerHTML = ultimosCases.map(caseItem => `
      <div class="swiper-slide slide-case">
<img 
    srcset="${caseItem.imagem.mobile} ${caseItem.imagem.mobile_width}w, 
            ${caseItem.imagem.desktop} ${caseItem.imagem.desktop_width}w,
            ${caseItem.imagem.large} 1920w" 
    sizes="(max-width: 600px) 100vw, 
           (max-width: 1024px) 70vw, 
           50vw"
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


  renderizarListaCases(selector) {
    const listaContainer = document.querySelector(selector);
    if (!listaContainer || !this.data) {
      console.warn('Contêiner ou dados não encontrados para renderizar a lista de cases.');
      return;
    }

    listaContainer.innerHTML = this.data.cases.map(caseItem => `
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
          loading="lazy">           <a href="./case.html?id=${caseItem.id}" class="btn-ver-mais">Ver o case</a>
      </div>
    `).join('');
  }

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
    if (caseSelector && isCaseDetailPage) {
      this.renderizarCaseDetalhado(caseSelector);
      this.initModal();
    }
  }
}