// export default class EbookPopup {
//     constructor() {
//         this.form = document.getElementById('downloadForm');
//         this.thankYouMessage = document.getElementById('ebookThankYouMessage');
//         this.popup = document.getElementById('popup');
//         this.closeBtn = this.popup?.querySelector('.close-btn');
//         this.preloadPopupImage = new Image();
//         this.preloadPopupImage.src = '../img/popup/banner-ebook.webp';        

//         // Verifica se o usuário já baixou o e-book
//         this.hasDownloaded = localStorage.getItem('ebook_downloaded') === 'true';

//         if (this.form) {
//             this.init();
//         }
//     }

//     init() {
//         if (this.hasDownloaded) {
//             this.hidePopup();
//             return;
//         }
    
//         // Obtém o caminho da URL e verifica se está na index
//         const path = window.location.pathname;
//         console.log('Caminho da página:', path);
    
//         // Verifica se o pop-up já foi exibido nesta sessão
//         const hasShownPopupThisSession = sessionStorage.getItem('ebook_popup_shown');
    
//         // Se ainda não foi mostrado nesta sessão e está na index, exibe o pop-up
//         if (!hasShownPopupThisSession && (path === '/' || path === '/index.html')) {
//             console.log('Abrindo pop-up na index.');
//             this.showPopup();
    
//             // Marca que o pop-up já foi mostrado nesta sessão
//             sessionStorage.setItem('ebook_popup_shown', 'true');
//         } else {
//             console.log('Pop-up já foi exibido nesta sessão ou não é a index.');
//         }
    
//         // Fechar pop-up ao clicar no botão de fechar
//         this.closeBtn?.addEventListener('click', () => this.hidePopup());
    
//         // Submeter o formulário
//         this.form.addEventListener('submit', (event) => this.handleFormSubmit(event));
//     }

//     showPopup() {
//         const popupImage = this.popup.querySelector('.popup-image');
    
//         // Apenas define a imagem se ainda não foi aplicada
//         if (!popupImage.style.backgroundImage) {
//             popupImage.style.backgroundImage = "url('/img/popup/banner-ebook.webp')";
//         }
    
//         this.popup.style.visibility = 'visible';
//         this.popup.style.opacity = '1';
//         this.popup.style.pointerEvents = 'auto';
//     }    

//     hidePopup() {
//         this.popup.style.visibility = 'hidden';
//         this.popup.style.opacity = '0';
//         this.popup.style.pointerEvents = 'none';
//     }

//     handleFormSubmit(event) {
//         event.preventDefault();

//         const formData = new FormData(this.form);
//         formData.append('apikey', 'a936ac9d-2155-46dc-8ab2-0d46ae112c69');

//         // RD Station
//         fetch('http://localhost:3000/rdstation', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 event_type: 'CONVERSION',
//                 event_family: 'CDP',
//                 payload: {
//                     name: formData.get('name'),
//                     email: formData.get('email'),
//                     legal_basis: 'CONSENT',
//                     legal_basis_message: 'O usuário concordou em receber comunicações.',
//                     conversion_identifier: 'DOWNLOAD_EBOOK'
//                 }
//             })
//         })
//         .then(rdResponse => rdResponse.json())
//         .then(rdData => {
//             console.log('Success (RD Station - e-book):', rdData);
//         })
//         .catch(rdError => {
//             console.error('Error (RD Station - e-book):', rdError);
//         });
//     }
// }

export default class EbookPopup {
    constructor() {
        this.form = document.getElementById('downloadForm');
        this.thankYouMessage = document.getElementById('ebookThankYouMessage');
        this.popup = document.getElementById('popup');
        this.closeBtn = this.popup?.querySelector('.close-btn');

        // Caminho para as imagens geradas pelo Webpack
        this.mobileImagePath = './img/popup/banner-ebook-mobile.webp';
        this.desktopImagePath = './img/popup/banner-ebook-desktop.webp';

        // Criando a imagem com srcset, sizes e lazy loading
        this.popupImage = new Image();
        this.popupImage.srcset = `${this.mobileImagePath} 300w, ${this.desktopImagePath} 283w`;
        this.popupImage.sizes = '(max-width: 600px) 300px, 283px';  // Ajuste com base no tamanho da tela
        this.popupImage.src = this.mobileImagePath;  // Caminho inicial para o carregamento
        this.popupImage.loading = 'lazy';  // Ativar lazy loading

        // Verifica se o usuário já baixou o e-book
        this.hasDownloaded = localStorage.getItem('ebook_downloaded') === 'true';

        if (this.form) {
            this.init();
        }

        // Adicionar preload dinâmico
        this.addImagePreload();
    }

    // Função para adicionar preload dinâmico
    addImagePreload() {
        const isMobile = window.innerWidth <= 600;  // Definir o limite para mobile
        const imageToPreload = isMobile
            ? this.mobileImagePath
            : this.desktopImagePath;

        // Criar o elemento <link rel="preload">
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = imageToPreload;
        preloadLink.type = 'image/webp';
        preloadLink.fetchpriority = 'high';  // Alta prioridade para carregamento

        // Adicionar o <link> ao <head> do documento
        document.head.appendChild(preloadLink);
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

    showPopup() {
        const popupImage = this.popup.querySelector('.popup-image');

        // Carrega a imagem somente quando o pop-up for exibido
        if (!popupImage.style.backgroundImage) {
            this.popupImage.onload = () => {
                // Aplica a imagem carregada ao fundo do pop-up
                popupImage.style.backgroundImage = `url('${this.popupImage.src}')`;
            };

            // Iniciar o carregamento da imagem com srcset e lazy loading
            this.popupImage.srcset = `${this.mobileImagePath} 300w, ${this.desktopImagePath} 283w`;
            this.popupImage.sizes = '(max-width: 600px) 300px, 283px'; // Ajuste conforme a largura da tela
        }

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

        // RD Station
        fetch('http://localhost:3000/rdstation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_type: 'CONVERSION',
                event_family: 'CDP',
                payload: {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    legal_basis: 'CONSENT',
                    legal_basis_message: 'O usuário concordou em receber comunicações.',
                    conversion_identifier: 'DOWNLOAD_EBOOK'
                }
            })
        })
        .then(rdResponse => rdResponse.json())
        .then(rdData => {
            console.log('Success (RD Station - e-book):', rdData);
        })
        .catch(rdError => {
            console.error('Error (RD Station - e-book):', rdError);
        });
    }
}
