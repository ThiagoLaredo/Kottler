export function renderizarSubmenu(data) {
    const menu = document.querySelector('#submenu');
    if (!menu) return;
    
    menu.innerHTML = data.map(item => `
        <li>
            <a href="${item.link}">${item.titulo}</a>
        </li>
    `).join('');
}