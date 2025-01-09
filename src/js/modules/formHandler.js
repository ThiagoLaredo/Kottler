export default class FormHandler {
    constructor({ formId, successMessage, errorMessage, endpoint = '/', hideMessageAfter = 10000 }) {
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
        this.endpoint = endpoint;
        this.hideMessageAfter = hideMessageAfter;

        this.addEventListeners();
    }

    addEventListeners() {
        this.form.addEventListener('submit', event => this.handleSubmit(event));
    }

    async handleSubmit(event) {
        event.preventDefault(); // Evita o comportamento padrão do envio
        const formData = new FormData(this.form);
    
        console.log(`Enviando formulário: ${this.form.id}`);
        console.log('Dados do formulário:', [...formData.entries()]);
    
        // Converte os dados para o formato necessário
        const formBody = new URLSearchParams([...formData.entries()]).toString();
    
        // Mostra a mensagem de carregamento
        this.showMessage('Enviando...', 'info');
    
        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formBody,
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
    
        // Oculta a mensagem após o tempo configurado
        setTimeout(() => {
            this.responseMessage.style.display = 'none';
        }, this.hideMessageAfter);
    }
    

    showMessage(message, type) {
        this.responseMessage.textContent = message;
        this.responseMessage.style.display = 'block';
        this.responseMessage.style.color = type === 'success' ? 'green' : type === 'error' ? 'red' : 'black';
    }
}