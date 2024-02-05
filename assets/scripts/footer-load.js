const currentPath = window.location.pathname;
const currentHtmlName = currentPath.split('/').pop().replace('.html', '');

// Función para modificar los atributos src en el HTML
function modifyImagePaths(htmlContent) {
    if (currentHtmlName === 'index' || currentHtmlName === '') {
        // Reemplaza "../" por "assets/" en los atributos src de imágenes
        htmlContent = htmlContent.replace(/src="\.\.\//g, 'src="assets/');
    }
    return htmlContent;
}

// Función para cargar el footer y realizar las modificaciones necesarias
function loadFooter() {
    let footerPath;

    if (currentHtmlName === 'index' || currentHtmlName === '') {
        footerPath = 'assets/webpages/footer.html';
    } else {
        footerPath = './footer.html';
    }

    // Realiza la solicitud fetch con la ruta correspondiente
    fetch(footerPath)
        .then(response => response.text())
        .then(data => {
            // Modifica los atributos src antes de insertar el contenido
            const modifiedData = modifyImagePaths(data);
            document.getElementById('footer-section').innerHTML = modifiedData;
        });
}

// Llama a la función para cargar el footer
loadFooter();
