// casesSwiper.js
export function renderizarSwiper(data) {
    const container = document.querySelector('#swiper-container');
    if (!container) return;
    
    container.innerHTML = data.map(item => `
        <div class="swiper-slide">
            <picture>
                <source srcset="${item.imagemMobile}" media="(max-width: 768px)">
                <img src="${item.imagemDesktop}" alt="${item.titulo}" loading="lazy">
            </picture>
            <h3>${item.titulo}</h3>
        </div>
    `).join('');
}