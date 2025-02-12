export default class EbookPopup {
    constructor() {
        this.form = document.getElementById('downloadForm');
        this.thankYouMessage = document.getElementById('ebookThankYouMessage');
        this.popup = document.getElementById('popup');
        this.closeBtn = this.popup?.querySelector('.close-btn');

        // Verifica se o usuário já baixou o e-book
        this.hasDownloaded = localStorage.getItem('ebook_downloaded') === 'true';

        if (this.form) {
            this.init();
        }
    }

    init() {
        if (this.hasDownloaded) {
            this.hidePopup();
            return;
        }
    
        // Obtém o caminho da URL e verifica se está na index
        const path = window.location.pathname;
        console.log('Caminho da página:', path);
    
        // Verifica se o pop-up já foi exibido nesta sessão
        const hasShownPopupThisSession = sessionStorage.getItem('ebook_popup_shown');
    
        // Se ainda não foi mostrado nesta sessão e está na index, exibe o pop-up
        if (!hasShownPopupThisSession && (path === '/' || path === '/index.html')) {
            console.log('Abrindo pop-up na index.');
            this.showPopup();
    
            // Marca que o pop-up já foi mostrado nesta sessão
            sessionStorage.setItem('ebook_popup_shown', 'true');
        } else {
            console.log('Pop-up já foi exibido nesta sessão ou não é a index.');
        }
    
        // Fechar pop-up ao clicar no botão de fechar
        this.closeBtn?.addEventListener('click', () => this.hidePopup());
    
        // Submeter o formulário
        this.form.addEventListener('submit', (event) => this.handleFormSubmit(event));
    }
    
    
    // showPopup() {
    //     // Carrega a imagem de fundo apenas quando o popup é aberto
    //     const popupImage = this.popup.querySelector('.popup-image');
    //     popupImage.style.backgroundImage = "url('./img/popup/banner-ebook.webp')";
    //     this.popup.style.visibility = 'visible';
    //     this.popup.style.opacity = '1';
    //     this.popup.style.pointerEvents = 'auto';
    // }

    showPopup() {
        const popupImage = this.popup.querySelector('.popup-image picture');
    
        // Define a imagem correta com base no tamanho da tela
        const mobileImage = './img/popup/banner-ebook-mobile.webp';
        const desktopImage = './img/popup/banner-ebook-desktop.webp';
    
        if (window.innerWidth <= 768) {
            popupImage.innerHTML = `<source srcset="${mobileImage}" media="(max-width: 768px)">`;
        } else {
            popupImage.innerHTML = `<source srcset="${desktopImage}" media="(min-width: 769px)">`;
        }
    
        // Exibe o popup
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
