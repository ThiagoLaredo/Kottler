// programasEquipesLoader.js
export class ProgramasEquipesLoader {
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
        document.getElementById('equipesTitle').textContent = serviceData.title;
        document.getElementById('equipesDescription').textContent = serviceData.description;
        document.getElementById('equipesStepsTitle').textContent = serviceData.stepsTitle;
        document.getElementById('equipesSteps').innerHTML = serviceData.steps.map(step => `<li>${step}</li>`).join('');
        document.getElementById('equipesImage').src = serviceData.image;
        document.getElementById('equipesImage').alt = `Imagem do serviço ${serviceData.title}`;
        // Atualizar título da página e descrição do meta
        document.title = serviceData.metaTitle; // Muda o título da aba do navegador para o metaTitle
        document.querySelector('meta[name="description"]').setAttribute("content", serviceData.metaDescription);
    }

    updateUrlHash(serviceId) {
        window.location.hash = serviceId;
    }
}
