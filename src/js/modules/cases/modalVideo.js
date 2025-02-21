// src/js/modules/cases/modalVideo.js
export function initModal() {
    const modal = document.querySelector('.modal');
    const closeButton = document.querySelector('.modal-close');
  
    if (modal && closeButton) {
      closeButton.addEventListener('click', () => fecharModal());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal();
      });
    }
  }
  
  export function abrirModal(videoUrl) {
    const modal = document.querySelector('.modal');
    const iframe = document.querySelector('.modal iframe');
  
    if (modal && iframe) {
      iframe.src = videoUrl;
      modal.classList.add('active');
    }
  }
  
  export function fecharModal() {
    const modal = document.querySelector('.modal');
    const iframe = document.querySelector('.modal iframe');
  
    if (modal && iframe) {
      iframe.src = '';
      modal.classList.remove('active');
    }
  }
  