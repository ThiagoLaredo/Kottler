export default class EbookForm {
    constructor() {
        this.form = document.getElementById('downloadForm');
        this.thankYouMessage = document.getElementById('ebookThankYouMessage');
        this.popup = document.getElementById('popup');
        this.closeBtn = this.popup?.querySelector('.close-btn');
        this.ebookButton = document.getElementById('ebookButton');

        // Verifica se o usuário já baixou o e-book
        this.hasDownloaded = localStorage.getItem('ebook_downloaded') === 'true';

        if (this.form) {
            this.init();
        }
    }

    init() {
        // Obtém o caminho da URL
        const path = window.location.pathname;
        console.log('Caminho da página (EbookForm):', path);
    
        // Verifica se o pop-up já foi exibido nesta sessão
        const hasShownPopupThisSession = sessionStorage.getItem('ebook_popup_shown');
    
        // Exibir o pop-up automaticamente APENAS na index, caso o e-book não tenha sido baixado
        if (!this.hasDownloaded && !hasShownPopupThisSession && (path === '/' || path === '/index.html')) {
            console.log('Abrindo pop-up automaticamente na index (EbookForm)');
            this.showPopup();
    
            // Marca que o pop-up já foi mostrado nesta sessão
            sessionStorage.setItem('ebook_popup_shown', 'true');
        } else {
            console.log('Pop-up já foi exibido nesta sessão ou não é a index (EbookForm)');
        }
    
        // Fechar pop-up ao clicar no botão de fechar
        this.closeBtn?.addEventListener('click', () => this.hidePopup());
    
        // Mostrar o pop-up ao clicar no botão fixo (permanece em todas as páginas)
        this.ebookButton.addEventListener('click', () => this.showPopup());
    }
     
    showPopup() {
        this.popup.style.visibility = 'visible';
        this.popup.style.opacity = '1';
        this.popup.style.pointerEvents = 'auto';
    }

    hidePopup() {
        this.popup.style.visibility = 'hidden';
        this.popup.style.opacity = '0';
        this.popup.style.pointerEvents = 'none';
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const formData = new FormData(this.form);
        formData.append('apikey', 'a936ac9d-2155-46dc-8ab2-0d46ae112c69');

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success (e-book):', data);

            // Exibe a mensagem abaixo do botão
            this.thankYouMessage.style.display = 'block';

            // Salva no localStorage que o usuário já baixou o e-book
            localStorage.setItem('ebook_downloaded', 'true');

            // Desativa os campos para evitar novo envio
            this.form.querySelectorAll('input, button').forEach(el => el.disabled = true);

            // Inicia o download ou abre o PDF em uma nova aba
            setTimeout(() => {
                window.open('/marketing-e-industria.pdf', '_blank');
            }, 1000);
        })
        .catch(error => {
            console.error('Error (e-book):', error);
            alert('Houve um erro ao enviar o formulário. Tente novamente.');
        });
    }
}
