

export function setupForm() {
    const form = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    if (!form) {
        console.error('Formulário não encontrado.');
        return;  // Interrompe a execução se o formulário não for encontrado
    }

    if (!thankYouMessage) {
        console.error('Mensagem de agradecimento não encontrada.');
        return;  // Interrompe a execução se a mensagem não for encontrada
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevenir o envio tradicional do formulário

        const formData = new FormData(form);
        formData.append('apikey', '9d6f5468-0dc7-4c4b-b0d1-e285b610e0b1'); // Substitua com sua chave real do Web3Forms

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            thankYouMessage.style.display = 'block';
            form.style.display = 'none';
            form.reset();
            const topPosition = thankYouMessage.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: topPosition, behavior: 'smooth' });
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Houve um erro ao enviar o formulário, tente novamente.');
        });
    });
}