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

    async handleSubmit(event) {
        event.preventDefault(); // Evita o comportamento padrão do envio
        const formData = new FormData(this.form);

        // Mostra mensagem de carregamento
        this.showMessage('Enviando...', 'info');

        try {
            const response = await fetch('/', {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            if (response.ok) {
                this.showMessage(this.successMessage, 'success');
                this.form.reset(); // Limpa os campos do formulário
            } else {
                throw new Error('Erro ao enviar o formulário. Tente novamente mais tarde.');
            }
        } catch (error) {
            this.showMessage(error.message || this.errorMessage, 'error');
        }

        // Opcional: Oculta a mensagem após 10 segundos
        setTimeout(() => {
            this.responseMessage.style.display = 'none';
        }, 10000);
    }

    showMessage(message, type) {
        this.responseMessage.textContent = message;
        this.responseMessage.style.display = 'block';
        this.responseMessage.style.color = type === 'success' ? 'green' : type === 'error' ? 'red' : 'black';
    }
}
