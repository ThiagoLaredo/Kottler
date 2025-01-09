// forms.js

// Função para o formulário de contato
export function setupContactForm() {
  const form = document.getElementById('contactForm');
  const thankYouMessage = document.getElementById('contactThankYouMessage');

  if (!form) {
    console.error('Formulário de contato não encontrado.');
    return;
  }
  if (!thankYouMessage) {
    console.error('Mensagem de agradecimento do contato não encontrada.');
    return;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    // Substitua pela sua própria chave de API Web3Forms
    formData.append('apikey', '650f678e-3e77-48c4-9fb8-be003c8b4b3c');

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success (contato):', data);
        thankYouMessage.style.display = 'block';
        form.style.display = 'none';
        form.reset();

        const topPosition =
          thankYouMessage.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: topPosition, behavior: 'smooth' });
      })
      .catch(error => {
        console.error('Error (contato):', error);
        alert('Houve um erro ao enviar o formulário de contato. Tente novamente.');
      });
  });
}

// Função para o formulário de newsletter
export function setupNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  const thankYouMessage = document.getElementById('newsletterThankYouMessage');

  if (!form) {
    console.error('Formulário de newsletter não encontrado.');
    return;
  }
  if (!thankYouMessage) {
    console.error('Mensagem de agradecimento da newsletter não encontrada.');
    return;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    // Substitua pela sua própria chave de API Web3Forms
    formData.append('apikey', '650f678e-3e77-48c4-9fb8-be003c8b4b3c');

    // Se quiser identificar qual formulário é qual no painel do Web3Forms,
    // adicione um campo extra: formData.append('form_id', 'newsletter');

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success (newsletter):', data);
        thankYouMessage.style.display = 'block';
        form.style.display = 'none';
        form.reset();

        const topPosition =
          thankYouMessage.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: topPosition, behavior: 'smooth' });
      })
      .catch(error => {
        console.error('Error (newsletter):', error);
        alert('Houve um erro ao enviar o formulário de newsletter. Tente novamente.');
      });
  });
}