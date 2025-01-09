// Formulário de Contato
export function setupContactForm() {
    const form = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('contactThankYouMessage'); 
    // <div id="contactThankYouMessage" ...> no HTML
  
    if (!form) {
      console.error('Formulário de contato não encontrado.');
      return;
    }
  
    if (!thankYouMessage) {
      console.error('Mensagem de agradecimento do contato não encontrada.');
      return;
    }
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const formData = new FormData(form);
      formData.append('apikey', '5f26723d-35c4-4a43-b5bd-0ee827dcff90');
  
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
  
          const topPosition = thankYouMessage.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: topPosition, behavior: 'smooth' });
        })
        .catch((error) => {
          console.error('Error (contato):', error);
          alert('Houve um erro ao enviar o formulário de contato. Tente novamente.');
        });
    });
  }
  
  // Formulário de Newsletter
  export function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const thankYouMessage = document.getElementById('newsletterThankYouMessage');
    // <div id="newsletterThankYouMessage" ...> no HTML
  
    if (!form) {
      console.error('Formulário de newsletter não encontrado.');
      return;
    }
  
    if (!thankYouMessage) {
      console.error('Mensagem de agradecimento da newsletter não encontrada.');
      return;
    }
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const formData = new FormData(form);
      formData.append('apikey', '5f26723d-35c4-4a43-b5bd-0ee827dcff90');
  
      // Se quiser identificar qual formulário é qual no painel do Web3Forms,
      // adicione um campo oculto extra, por ex.:
      formData.append('form_id', 'newsletter');
  
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
  
          const topPosition = thankYouMessage.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: topPosition, behavior: 'smooth' });
        })
        .catch((error) => {
          console.error('Error (newsletter):', error);
          alert('Houve um erro ao enviar o formulário de newsletter. Tente novamente.');
        });
    });
  }
  