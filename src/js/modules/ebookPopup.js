export default class EbookPopup {
    constructor() {
        this.form = document.getElementById('downloadForm');
        this.thankYouMessage = document.getElementById('ebookThankYouMessage');
        this.popup = document.getElementById('popup');
        this.closeBtn = this.popup?.querySelector('.close-btn');
        this.preloadPopupImage = new Image();
        this.preloadPopupImage.src = '../img/popup/banner-ebook.webp';        

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
    
        const path = window.location.pathname;
        console.log('Caminho da página:', path);
    
        const hasShownPopupThisSession = sessionStorage.getItem('ebook_popup_shown');
    
        if (!hasShownPopupThisSession && (path === '/' || path === '/index.html')) {
            console.log('Abrindo pop-up na index.');
            this.showPopup();
            sessionStorage.setItem('ebook_popup_shown', 'true');
        } else {
            console.log('Pop-up já foi exibido nesta sessão ou não é a index.');
        }
    
        this.closeBtn?.addEventListener('click', () => this.hidePopup());
        this.form.addEventListener('submit', (event) => this.handleFormSubmit(event));

        // Inicializa máscara
        this.initPhoneMask();
    }

    initPhoneMask() {
        const phoneField = document.getElementById('telefone-popup');
        if (phoneField) {
            phoneField.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                let formattedValue = '';
                
                if (value.length > 0) {
                    formattedValue = `(${value.substring(0, 2)}`;
                }
                if (value.length > 2) {
                    formattedValue += `) ${value.substring(2, 7)}`;
                }
                if (value.length > 7) {
                    formattedValue += `-${value.substring(7, 11)}`;
                }
                
                e.target.value = formattedValue;
            });
        }
    }

    showPopup() {
        const popupImage = this.popup.querySelector('.popup-image');
    
        if (!popupImage.style.backgroundImage) {
            popupImage.style.backgroundImage = "url('/img/popup/banner-ebook.webp')";
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

        // Adiciona máscara ao telefone antes de enviar (opcional)
        const phoneInput = document.getElementById('telefone-popup');
        if (phoneInput) {
            formData.set('phone', this.formatPhoneNumber(phoneInput.value));
        }

        // Envio para RD Station
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
                    phone: formData.get('phone'),
                    job_title: formData.get('job_title'),
                    employees_count: formData.get('employees_count'),
                    legal_basis: 'CONSENT',
                    legal_basis_message: 'O usuário concordou em receber comunicações.',
                    conversion_identifier: 'DOWNLOAD_EBOOK'
                }
            })
        })
        .then(rdResponse => rdResponse.json())
        .then(rdData => {
            console.log('Success (RD Station - e-book):', rdData);
            this.thankYouMessage.style.display = 'block';
            localStorage.setItem('ebook_downloaded', 'true');
            setTimeout(() => this.hidePopup(), 3000);
        })
        .catch(rdError => {
            console.error('Error (RD Station - e-book):', rdError);
        });
    }

    // Função auxiliar para formatar telefone (opcional)
    formatPhoneNumber(phone) {
        return phone.replace(/\D/g, '')
                    .replace(/^(\d{2})(\d)/g, '($1) $2')
                    .replace(/(\d)(\d{4})$/, '$1-$2');
    }
}