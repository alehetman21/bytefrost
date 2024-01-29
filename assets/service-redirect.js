// Obtén el botón por su ID
const redirectButton = document.querySelector(".info-service-btn");

// Agrega un listener al clic del botón
redirectButton.addEventListener("click", function () {
    // Cambia la ubicación actual a la nueva página
    window.location.href = "assets/webpages/services.html";
});