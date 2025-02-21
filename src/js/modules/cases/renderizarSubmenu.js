// src/js/modules/cases/renderizarSubmenu.js
import { getCases } from './fetchCases.js';

export default async function renderizarSubmenu(selector) {
  const submenu = document.querySelector(selector);
  if (!submenu) return;

  const data = await getCases();
  if (!data) return;

  submenu.innerHTML = `
    <li><a href="./cases.html">Todos</a></li>
    ${data.cases.map(caseItem => `
      <li><a href="./case.html?id=${caseItem.id}">${caseItem.cliente}</a></li>
    `).join('')}
  `;
} 