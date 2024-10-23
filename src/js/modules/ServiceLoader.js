export class ServiceLoader {
    constructor(data) {
        this.data = data;
        console.log('ServiceLoader initialized for Programa Mulheres with data:', data);
    }

    loadService(serviceId) {
        console.log('Attempting to load service for Programa Mulheres with ID:', serviceId);
        if (!serviceId) {
            console.error('Service ID is undefined or null');
            return;
        }

        const serviceData = this.data.services.find(s => s.id === serviceId);
        if (serviceData) {
            console.log('Service data found:', serviceData);
            this.displayService(serviceData);
        } else {
            console.error('Service not found:', serviceId);
        }
    }

    displayService(serviceData) {
        // Assume that this code is only executed if the current page is 'programa-mulheres.html'
        console.log('Displaying service data on Programa Mulheres page:', serviceData);
        document.getElementById('serviceIcon').src = serviceData.icon;
        document.getElementById('serviceTitle').textContent = serviceData.title;
        document.getElementById('serviceDescription').innerHTML = serviceData.description.map(item => `<li>${item}</li>`).join('');
        document.getElementById('text-to-highlight').innerHTML = serviceData.duration;
        document.getElementById('contentImage').src = serviceData.contentImage;
        document.getElementById('contentImage').alt = `Imagem do conteúdo do serviço ${serviceData.title}`;
        document.getElementById('contentSteps').innerHTML = serviceData.contentSteps.map(step => `<li>${step}</li>`).join('');
    }
}
