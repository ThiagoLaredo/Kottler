export default class FormHandler {
  constructor() {
    this.contactForm = document.getElementById('contactForm');
    this.newsletterForm = document.getElementById('newsletterForm');
    this.apiKey = 'a936ac9d-2155-46dc-8ab2-0d46ae112c69'; // API Key Web3Forms
    this.init();
  }

  init() {
    if (this.contactForm) {
      this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e, 'contato'));
    }
    if (this.newsletterForm) {
      this.newsletterForm.addEventListener('submit', (e) => this.handleSubmit(e, 'newsletter'));
    }

    if (window.location.pathname.includes('obrigado.html')) {
      this.showThankYouMessage();
    }
  }

  handleSubmit(event, formType) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    formData.append('apikey', this.apiKey);

    localStorage.setItem('formType', formType);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if (data.success) {
          window.location.href = 'obrigado.html';
        } else {
          alert('Erro ao enviar o formulário. Tente novamente.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Houve um erro ao enviar o formulário. Tente novamente.');
      });
  }

  showThankYouMessage() {
    const formType = localStorage.getItem('formType');
    const contactMessage = document.getElementById('contactThankYouMessage');
    const newsletterMessage = document.getElementById('newsletterThankYouMessage');

    if (formType === 'contato' && contactMessage) {
      contactMessage.style.display = 'flex';
      if (newsletterMessage) newsletterMessage.style.display = 'none';
    } else if (formType === 'newsletter' && newsletterMessage) {
      newsletterMessage.style.display = 'flex';
      if (contactMessage) contactMessage.style.display = 'none';
    }
  }
}