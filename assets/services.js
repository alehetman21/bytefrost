// Esta función realiza la carga del contenido desde el JSON
function loadContent(serviceKey) {
    // Hacer la solicitud fetch para obtener el JSON
    fetch('assets/services.json')
        .then(response => response.json())
        .then(jsonData => {
            var content = jsonData[serviceKey];
            var serviceDisplay = document.getElementById('service-display');

            // Crear elemento div para el contenido
            var contentDiv = document.createElement('div');
            contentDiv.className = 'service-content';
            contentDiv.innerHTML = `
                <img src="${content.imageSrc}" alt="${content.title}" class="service-image">
                <h3>${content.title}</h3>
                <p>${content.description}</p>
                <button>${content.buttonText}</button>
            `;

            // Limpiar el contenedor y añadir el nuevo contenido
            serviceDisplay.innerHTML = '';
            serviceDisplay.appendChild(contentDiv);
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

// Esta función muestra el contenido correspondiente al botón clicado
function showContent(serviceKey) {
    loadContent(serviceKey);
}

// Llamar a la función de carga al cargar la página (por ejemplo, para mostrar un contenido inicial)
loadContent('website-development');
