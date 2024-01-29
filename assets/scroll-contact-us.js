document.addEventListener('DOMContentLoaded', function() {
    // Obtiene todos los botones con la clase 'contact-us-btn'
    var contactButtons = document.querySelectorAll('.contact-us-btn');

    // Agrega un evento clic a cada botón
    contactButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Calcula la posición de la sección de contacto
            var contactSection = document.querySelector('.contact-us-general-section');
            var contactSectionPosition = contactSection.offsetTop;

            // Realiza un desplazamiento suave hacia la sección de contacto
            window.scrollTo({
                top: contactSectionPosition-100,
                behavior: 'smooth'
            });
        });
    });
});