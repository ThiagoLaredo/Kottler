export default class FormHandler {
    constructor({ formId, endpoint, successMessage, errorMessage }) {
        this.form = document.getElementById(formId);
        this.endpoint = endpoint;
        this.successMessage = successMessage;
        this.errorMessage = errorMessage;

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
        fetch(this.endpoint, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    this.showResponseMessage(data.message, 'success');
                } else {
                    this.showResponseMessage(this.errorMessage || 'No message received from server', 'error');
                }
            })
            .catch(() => {
                this.showResponseMessage(this.errorMessage || 'Erro na comunicação com o servidor', 'error');
            });
    }

    showLoadingIndicator() {
        this.responseMessage.textContent = 'Enviando...';
        this.responseMessage.style.display = 'block';
        this.responseMessage.style.opacity = 1;
    }

    showResponseMessage(message, type) {
        this.responseMessage.textContent = message;
        this.styleResponseMessage(type);
        setTimeout(() => {
            this.fadeOut(this.responseMessage);
        }, 10000); // 10 segundos
    }

    styleResponseMessage(type) {
        this.responseMessage.style.marginTop = '10px';
        this.responseMessage.style.color = type === 'success' ? 'green' : 'red';
        this.responseMessage.style.font = '500 1rem/1.4 "Raleway", sans-serif';
    }

    fadeOut(element) {
        let op = 1; // Opacidade inicial
        const timer = setInterval(() => {
            if (op <= 0.01) {
                clearInterval(timer);
                element.style.display = 'none';
                element.style.opacity = 0;
            } else {
                op -= 0.05; // Decrementa a opacidade em passos fixos
                element.style.opacity = op;
            }
        }, 50);
    }
}
