export class ProgramasMulheresLoader {
    constructor(data) {
        this.data = data; // Certifique-se de que 'data' é um array de objetos
    }

    loadService(serviceId) {
        const serviceData = this.data.find(s => s.id === serviceId);
        if (serviceData) {
            this.displayService(serviceData);
            this.updateUrlHash(serviceId);
        } else {
            console.error('Service not found:', serviceId);
        }
    }

    displayService(serviceData) {
        document.getElementById('serviceTitle').textContent = serviceData.title;
        document.getElementById('serviceIcon').src = serviceData.icon;
        document.getElementById('serviceDescription').innerHTML = serviceData.description.map(item => `<li>${item}</li>`).join('');
        document.getElementById('text-to-highlight').innerHTML = serviceData.duration;
        document.getElementById('contentImage').src = serviceData.contentImage;
        document.getElementById('contentImage').alt = `Imagem do conteúdo do serviço ${serviceData.title}`;
        document.getElementById('contentSteps').innerHTML = serviceData.contentSteps.map(step => `<li>${step}</li>`).join('');
        // Atualizar título da página e descrição do meta
        document.title = serviceData.title; // Muda o título da aba do navegador
        document.querySelector('meta[name="description"]').setAttribute("content", serviceData.description.join(', ')); // Atualiza a meta descrição com uma descrição concatenada
         // Atualizar título da página e descrição do meta
        document.title = serviceData.metaTitle; // Muda o título da aba do navegador para o metaTitle
        document.querySelector('meta[name="description"]').setAttribute("content", serviceData.metaDescription);
    }
    
    updateUrlHash(serviceId) {
        window.location.hash = serviceId;
    }
}