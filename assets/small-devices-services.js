let currentService = "website-development";
let serviceData;

function updateServiceInfo(serviceKey, serviceData) {
    const service = serviceData[serviceKey];
    document.querySelector(".service-image").src = service.imageSrc;
    document.getElementById("service-title").textContent = service.title;
    document.getElementById("service-description").textContent = service.description;
    document.getElementById("service-description").setAttribute('data-translate-key', serviceKey)
    
}

document.querySelector(".left-btn").addEventListener("click", function() {
    const serviceKeys = Object.keys(serviceData);
    const currentIndex = serviceKeys.indexOf(currentService);
    const newIndex = (currentIndex - 1 + serviceKeys.length) % serviceKeys.length;
    currentService = serviceKeys[newIndex];
    updateServiceInfo(currentService, serviceData);
});

document.querySelector(".right-btn").addEventListener("click", function() {
    const serviceKeys = Object.keys(serviceData);
    const currentIndex = serviceKeys.indexOf(currentService);
    const newIndex = (currentIndex + 1) % serviceKeys.length;
    currentService = serviceKeys[newIndex];
    updateServiceInfo(currentService, serviceData);
});

// Cargar el JSON desde el archivo externo
fetch('../services.json')
    .then(response => response.json())
    .then(data => {
        serviceData = data; // Asignar los datos a serviceData
        // Llamada a la función para inicializar con el primer servicio
        updateServiceInfo(currentService, serviceData);
    })
    .catch(error => console.error('Error loading JSON:', error));
