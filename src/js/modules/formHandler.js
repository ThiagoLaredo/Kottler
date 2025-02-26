export default class FormHandler {
  constructor() {
      this.contactForm = document.getElementById('contactForm');
      this.newsletterForm = document.getElementById('newsletterForm');
      this.downloadForm = document.getElementById('downloadForm'); // Formulário do e-book

      this.web3ApiKey = 'a936ac9d-2155-46dc-8ab2-0d46ae112c69'; // Web3Forms para o contato
      this.rdAccessToken = '634fc3d1dab9cb69902321349bc3181d'; // Token Público da RD Station

      this.init();
  }

  init() {
      if (this.contactForm) {
          this.contactForm.addEventListener('submit', (e) => this.handleSubmitWeb3Forms(e, 'contato'));
      }

      if (this.newsletterForm) {
          this.newsletterForm.addEventListener('submit', (e) => this.handleSubmitRDStation(e, 'newsletter'));
      }

      if (this.downloadForm) {
          this.downloadForm.addEventListener('submit', (e) => this.handleSubmitRDStation(e, 'ebook'));
      }

      if (window.location.pathname.includes('obrigado.html')) {
          this.showThankYouMessage();
      }
  }

  // ==============================================
  // ENVIO PARA WEB3FORMS (CONTATO)
  // ==============================================
    handleSubmitWeb3Forms(event, formType) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      formData.append('apikey', this.web3ApiKey);

      localStorage.setItem('formType', formType);

      fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
      })
      .then(response => response.json())
      .then(data => {
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

    handleSubmitRDStation(event, formType) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        // Determinando os nomes dos campos com base no tipo de formulário
        let nome, email;
        
        if (formType === 'newsletter') {
            nome = formData.get('nome-newsletter');
            email = formData.get('email-newsletter');
        } else if (formType === 'ebook') {
            nome = formData.get('name');  // name no formulário de e-book
            email = formData.get('email'); // email no formulário de e-book
        }

        // Verificando se nome e e-mail estão preenchidos
        if (!email || !nome) {
            alert('Os campos de nome e e-mail são obrigatórios.');
            return;
        }

        // Gerando um identificador único para a conversão
        const conversionIdentifier = formType === 'ebook' 
        ? 'Download_Ebook_Marketing_Industria' 
        : formType === 'newsletter' 
            ? 'Cadastro_Newsletter' 
            : `${email}-${new Date().getTime()}`;
    
        // Agora, definimos 'CONVERSION' como o valor do event_type
        const payload = {
            event_type: 'CONVERSION',  // Garantindo que 'CONVERSION' seja o tipo correto
            event_family: 'CDP',
            payload: {
                name: nome,
                email: email,
                legal_basis: 'CONSENT',
                legal_basis_message: 'O usuário concordou em receber comunicações.',
                conversion_identifier: conversionIdentifier  // Adicionando o identificador único
            }
        };

        localStorage.setItem('formType', formType);

        fetch('.netlify/functions/send-to-rdstation', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.event_uuid) {
                localStorage.setItem('formType', formType);
        
                // Redireciona primeiro para a página obrigado.html
                window.location.href = 'obrigado.html';
        
                // Depois de redirecionar, o PDF será aberto pela página obrigado.html
                if (formType === 'ebook') {
                    localStorage.setItem('downloadEbook', 'true'); // Marca que o PDF deve abrir
                }
            }
        })        
        .catch(error => {
            console.error('Error:', error);
            alert('Houve um erro ao enviar o formulário. Tente novamente.');
        });
    }

  // ==============================================
  // MENSAGEM DE AGRADECIMENTO NA PÁGINA OBRIGADO
  // ==============================================

showThankYouMessage() {
    const formType = localStorage.getItem('formType');
    const downloadEbook = localStorage.getItem('downloadEbook'); // Verifica se deve fazer o download
    const contactMessage = document.getElementById('contactThankYouMessage');
    const newsletterMessage = document.getElementById('newsletterThankYouMessage');

    if (formType === 'contato' && contactMessage) {
        contactMessage.style.display = 'flex';
        if (newsletterMessage) newsletterMessage.style.display = 'none';
    } else if (formType === 'newsletter' && newsletterMessage) {
        newsletterMessage.style.display = 'flex';
        if (contactMessage) contactMessage.style.display = 'none';
    }

    // Abre o PDF se o formulário for do e-book
    if (downloadEbook === 'true') {
        setTimeout(() => {
            window.open('/marketing-e-industria.pdf', '_blank'); // PDF em nova aba
            localStorage.removeItem('downloadEbook'); // Evita downloads repetidos
        }, 1000); // Delay de 1s para garantir que a página foi carregada
    }

    localStorage.removeItem('formType'); // Limpa o localStorage após exibir a mensagem
}

}