let currentBenefit = "global-presence";
let benefitsData;

function updateBenefitsInfo(benefitsKey, benefitsData) {
    const benefit = benefitsData[benefitsKey];
    const benefitsImage = document.querySelector(".benefits-image");
    benefitsImage.src = benefit.imageSrc;
    document.querySelector(".benefits-title").textContent = benefit.title;
    document.querySelector(".benefits-description").textContent = benefit.description;
}

document.querySelector(".left-benefits-btn").addEventListener("click", function() {
    rotateCarousel("left");
});

document.querySelector(".right-benefits-btn").addEventListener("click", function() {
    rotateCarousel("right");
});

function rotateCarousel(direction) {
    const benefitsInfo = document.querySelector(".benefits-info");
    benefitsInfo.classList.remove("left-rotation", "right-rotation");

    // Force a reflow to ensure the class removal takes effect before adding the new class
    void benefitsInfo.offsetWidth;

    benefitsInfo.classList.add(direction === "left" ? "left-rotation" : "right-rotation");

    // Wait for the transition to complete before updating the information
    benefitsInfo.addEventListener("transitionend", function() {
        const benefitsKeys = Object.keys(benefitsData);
        const currentIndex = benefitsKeys.indexOf(currentBenefit);
        const newIndex = (direction === "left" ? currentIndex - 1 + benefitsKeys.length : currentIndex + 1) % benefitsKeys.length;
        currentBenefit = benefitsKeys[newIndex];
        updateBenefitsInfo(currentBenefit, benefitsData);
        benefitsInfo.classList.remove("left-rotation", "right-rotation");
    }, { once: true });
}

fetch('../benefits.json')
    .then(response => response.json())
    .then(data => {
        benefitsData = data;
        updateBenefitsInfo(currentBenefit, benefitsData);
    })
    .catch(error => console.error('Error loading JSON:', error));
