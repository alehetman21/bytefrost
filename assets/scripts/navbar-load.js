const path = window.location.pathname;
const htmlName = path.split('/').pop().replace('.html', '');

// Función para modificar los atributos src en el HTML
function modifyData(htmlContent) {
    if (htmlName === 'index' || htmlName === '') {
        htmlContent = htmlContent.replace(/href="\.\//g, 'href="assets/webpages/');
        htmlContent = htmlContent.replace(/src="\.\.\//g, 'src="assets/');
    }
    return htmlContent;
}

// Función para cargar el navbar y realizar las modificaciones necesarias
function loadNavbar() {
    let navbarPath;

    if (htmlName === 'index' || htmlName === '') {
        navbarPath = 'assets/webpages/navbar.html';
    } else {
        navbarPath = './navbar.html';
    }

    return fetch(navbarPath)
        .then(response => response.text())
        .then(data => {
            // Modifica los atributos src antes de insertar el contenido
            const modifiedData = modifyData(data);
            document.getElementById('navbars-container').innerHTML = modifiedData;
        });
}

loadNavbar().then(() => {
    var currentPage = window.location.pathname.split("/").pop();

    var navbarItems = document.querySelectorAll(".navbar-items-container a");

    navbarItems.forEach(function(item) {
        var href = item.getAttribute("href");
        var filename = href.split("/").pop();

        if (filename === currentPage) {
            item.style.fontWeight = "bolder";
        }
    });
});
