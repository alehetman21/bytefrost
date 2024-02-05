const path = window.location.pathname;
const htmlName = path.split('/').pop().replace('.html', '');

// Función para modificar los atributos src en el HTML
function modifyData(htmlContent) {
    if (htmlName === 'index') {
        htmlContent = htmlContent.replace(/href="\.\//g, 'href="assets/webpages/');
        htmlContent = htmlContent.replace(/src="\.\.\//g, 'src="assets/');
    }
    return htmlContent;
}

// Función para cargar el navbar y realizar las modificaciones necesarias
function loadNavbar() {
    let navbarPath;

    if (htmlName === 'index') {
        navbarPath = 'assets/webpages/navbar.html';
    } else {
        navbarPath = './navbar.html';
    }

    // Realiza la solicitud fetch con la ruta correspondiente
    fetch(navbarPath)
        .then(response => response.text())
        .then(data => {
            // Modifica los atributos src antes de insertar el contenido
            const modifiedData = modifyData(data);
            document.getElementById('navbars-container').innerHTML = modifiedData;
        });
}

// Llama a la función para cargar el navbar
loadNavbar();
