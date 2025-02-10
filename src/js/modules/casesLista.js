// casesLista.js
export function renderizarListaCases(data) {
    const lista = document.querySelector('#cases-lista');
    if (!lista) return;
    
    lista.innerHTML = data.map(item => `
        <article>
            <picture>
                <source srcset="${item.imagemMobile}" media="(max-width: 768px)">
                <img src="${item.imagemDesktop}" alt="${item.titulo}" loading="lazy">
            </picture>
            <h3>${item.titulo}</h3>
            <p>${item.descricao}</p>
        </article>
    `).join('');
}