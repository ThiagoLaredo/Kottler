export default class FormHandler {
    constructor({ formId, successMessage, errorMessage }) {
        this.form = document.getElementById(formId);
        this.responseMessage = document.getElementById(`${formId}ResponseMessage`);
        this.successMessage = successMessage || 'Formulário enviado com sucesso!';
        this.errorMessage = errorMessage || 'Ocorreu um erro ao enviar o formulário.';

        this.addEventListeners();
    }

    addEventListeners() {
        this.form.addEventListener('submit', event => this.handleSubmit(event));
    }

    handleSubmit(event) {
        // Mostra a mensagem de envio enquanto a Netlify processa o formulário
        this.showMessage('Enviando...', 'info');
    }

    showMessage(message, type) {
        this.responseMessage.textContent = message;
        this.responseMessage.style.display = 'block';
        this.responseMessage.style.color = type === 'success' ? 'green' : type === 'error' ? 'red' : 'black';
    }
}
