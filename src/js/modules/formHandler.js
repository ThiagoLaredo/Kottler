export default class FormHandler {
    constructor({ formId, successMessage, errorMessage }) {
        this.form = document.getElementById(formId);
        this.responseMessage = document.getElementById(`${formId}ResponseMessage`);

        // Logs para verificar se os elementos estão sendo encontrados
        console.log(`Buscando elemento de resposta: ${formId}ResponseMessage`);
        console.log(this.responseMessage);

        // Verifica se o elemento de resposta existe
        if (!this.responseMessage) {
            console.error(`Elemento de mensagem não encontrado: ${formId}ResponseMessage`);
            return;
        }

        this.successMessage = successMessage || 'Formulário enviado com sucesso!';
        this.errorMessage = errorMessage || 'Ocorreu um erro ao enviar o formulário.';

        this.addEventListeners();
    }

    addEventListeners() {
        this.form.addEventListener('submit', event => this.handleSubmit(event));
    }

    async handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);

        this.showMessage('Enviando...', 'info');

        try {
            const response = await fetch('/', {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            if (response.ok) {
                this.showMessage(this.successMessage, 'success');
                this.form.reset();
            } else {
                throw new Error('Erro ao enviar o formulário. Tente novamente mais tarde.');
            }
        } catch (error) {
            this.showMessage(error.message || this.errorMessage, 'error');
        }

        setTimeout(() => {
            this.responseMessage.style.display = 'none';
        }, 10000);
    }

    showMessage(message, type) {
        if (!this.responseMessage) return;

        this.responseMessage.textContent = message;
        this.responseMessage.style.display = 'block';
        this.responseMessage.style.color = type === 'success' ? 'green' : type === 'error' ? 'red' : 'black';
    }
}
