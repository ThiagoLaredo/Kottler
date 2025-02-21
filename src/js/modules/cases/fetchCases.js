// src/js/modules/cases/fetchCases.js

let data = null; // Cache dos dados para evitar múltiplas chamadas

export async function getCases() {
  if (!data) {
    try {
      const response = await fetch('/cases.json');
      if (!response.ok) throw new Error('Erro ao carregar JSON');
      data = await response.json();
    } catch (error) {
      console.error('Erro ao carregar os cases:', error);
      return null;
    }
  }
  return data;
}