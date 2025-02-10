// casesModal.js
export function initModal() {
    const modal = document.querySelector('#modal');
    if (!modal) return;
    modal.addEventListener('click', fecharModal);
}

export function abrirModal(videoUrl) {
    const modal = document.querySelector('#modal');
    const video = document.querySelector('#modal video');
    if (!modal || !video) return;
    video.src = videoUrl;
    modal.classList.add('ativo');
}

export function fecharModal() {
    const modal = document.querySelector('#modal');
    const video = document.querySelector('#modal video');
    if (!modal || !video) return;
    video.src = '';
    modal.classList.remove('ativo');
}

export function renderizarCaseDetalhado(selector, data) {
    const container = document.querySelector(selector);
    if (!container) return;
    
    container.innerHTML = `
        <h1>${data.titulo}</h1>
        <picture>
            <source srcset="${data.imagemMobile}" media="(max-width: 768px)">
            <img src="${data.imagemDesktop}" alt="${data.titulo}" loading="lazy">
        </picture>
        <p>${data.descricao}</p>
    `;
}