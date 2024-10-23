export default class FormHandler {
  constructor(formId) {
      this.form = document.getElementById(formId);
      this.responseMessage = document.createElement('div');
      this.form.append(this.responseMessage);
      this.addEventListeners();
      this.styleResponseMessage();
  }

  addEventListeners() {
      this.form.addEventListener('submit', event => this.handleSubmit(event));
  }

  handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData(this.form);
      
      this.showLoadingIndicator();
      fetch('./enviar.php', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          // console.log('Resposta recebida:', data);
          if (data.message) {
              this.showResponseMessage(data.message, 'success');
            } else {
              this.showResponseMessage('No message received from server', 'error');
          }
      })
      .catch(error => {
          // console.error('Erro ao enviar formulário:', error);
          this.showResponseMessage('Erro na comunicação com o servidor', 'error');
      });
  }

  showLoadingIndicator() {
      this.responseMessage.textContent = 'Enviando...';
      this.responseMessage.style.display = 'block';
      this.responseMessage.style.opacity = 1;
  }

  showResponseMessage(message, type) {
    // console.log('Mostrando mensagem:', message, 'Tipo:', type); // Adicione esta linha
      this.responseMessage.textContent = message;
      this.styleResponseMessage(type);
      setTimeout(() => {
          this.fadeOut(this.responseMessage);
      }, 10000); // 5000 milissegundos = 5 segundos
  }

  styleResponseMessage(type) {
      this.responseMessage.style.marginTop = '10px';
      this.responseMessage.style.color = 'white';
      this.responseMessage.style.font = '500 1rem/1.4 "Hind", sans-serif';
  }

  fadeOut(element) {
    let op = 1;  // Opacidade inicial
    const timer = setInterval(() => {
        if (op <= 0.01) {
            clearInterval(timer);
            element.style.display = 'none';
            element.style.opacity = 0;
            console.log('Elemento ocultado com sucesso.'); // Verificar se chega neste ponto
        } else {
            op -= 0.05; // Decrementa a opacidade em passos fixos
            element.style.opacity = op;
        }
    }, 50);
  }
}