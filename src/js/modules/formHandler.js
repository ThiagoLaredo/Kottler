export default class FormHandler {
    constructor({ formId, successMessage, errorMessage, hideMessageAfter = 10000 }) {
        this.form = document.getElementById(formId);
        this.responseMessage = document.getElementById(`${formId}ResponseMessage`);

        if (!this.form) {
            console.error(`Formulário não encontrado: ${formId}`);
            return;
        }

        if (!this.responseMessage) {
            console.error(`Elemento de mensagem não encontrado para o formulário: ${formId}ResponseMessage`);
            return;
        }

        this.successMessage = successMessage || 'Formulário enviado com sucesso!';
        this.errorMessage = errorMessage || 'Ocorreu um erro ao enviar o formulário.';
        this.hideMessageAfter = hideMessageAfter;

        this.addEventListeners();
    }

    addEventListeners() {
        this.form.addEventListener('submit', event => this.handleSubmit(event));
    }

    handleSubmit(event) {
        // Mostra a mensagem de carregamento
        this.showMessage('Enviando...', 'info');

        // Não impede o comportamento padrão do formulário
        // Deixe o navegador realizar o envio normalmente
    }

    showMessage(message, type) {
        this.responseMessage.textContent = message;
        this.responseMessage.style.display = 'block';
        this.responseMessage.style.color = type === 'success' ? 'green' : type === 'error' ? 'red' : 'black';
    }
}
