// language.js

document.addEventListener('DOMContentLoaded', function () {
    let translations;

    fetch('assets/translations.json')
        .then(response => response.json())
        .then(data => {
            translations = data;

            // Obtener todos los elementos que necesitan ser traducidos
            const translatableElements = document.querySelectorAll('[data-translate-key]');

            // Recorrer cada elemento y establecer su contenido traducido
            translatableElements.forEach(element => {
                const translateKey = element.getAttribute('data-translate-key');
                translateElement(element, translateKey);
            });

            // Manejar el cambio de idioma al hacer clic en un enlace de idioma
            const languageDropdown = document.getElementById('languageDropdown');
            const languageMenu = document.getElementById('language-dropdown-menu');

            const languageItems = document.querySelectorAll('.language-item');
            languageItems.forEach(function (item) {
                item.addEventListener('click', function (event) {
                    event.preventDefault();
                    const selectedLang = item.getAttribute('data-lang');
                    changeLanguage(selectedLang);

                    // Actualizar la lista de idiomas en el dropdown
                    updateLanguageDropdown(selectedLang);
                });
            });

            // Inicializar la lista de idiomas en el dropdown
            updateLanguageDropdown('en');
        })
        .catch(error => console.error('Error loading translations', error));

    function changeLanguage(lang) {
        if (translations && translations[lang]) {
            // Obtener todos los elementos que necesitan ser traducidos
            const translatableElements = document.querySelectorAll('[data-translate-key]');

            // Recorrer cada elemento y establecer su contenido traducido
            translatableElements.forEach(element => {
                const translateKey = element.getAttribute('data-translate-key');
                translateElement(element, translateKey, lang);
            });
        }
    }

    function translateElement(element, translateKey, lang = 'en') {
        if (translations && translations[lang] && translations[lang][translateKey]) {
            element.textContent = translations[lang][translateKey];
        }
    }

    function updateLanguageDropdown(currentLang) {
        const languageMenu = document.getElementById('language-dropdown-menu');
        const languageFlag = document.getElementById('current-language-flag');
        languageMenu.innerHTML = '';
    
        Object.keys(translations).forEach(lang => {
            if (lang !== currentLang) {
                const listItem = document.createElement('li');
                const languageChange = document.createElement('div');
                const languageImage = document.createElement('img');
                const languageLink = document.createElement('a');
    
                languageChange.className = 'language-change'; // Mantener la clase existente
                languageImage.src = `assets/${lang}.png`;
                languageImage.alt = lang;
                languageLink.href = '#';
                languageLink.setAttribute('data-lang', lang);
                languageLink.classList.add('dropdown-item', 'language-item');
    
                // Mostrar el nombre completo del idioma
                languageLink.textContent = getLanguageFullName(lang);
    
                languageChange.appendChild(languageImage);
                languageChange.appendChild(languageLink);
                listItem.appendChild(languageChange);
                languageMenu.appendChild(listItem);
    
                languageLink.addEventListener('click', function (event) {
                    event.preventDefault();
                    const selectedLang = languageLink.getAttribute('data-lang');
                    changeLanguage(selectedLang);
    
                    // Actualizar la lista de idiomas en el dropdown después de cambiar el idioma
                    updateLanguageDropdown(selectedLang);
    
                    // Cambiar la imagen del botón según el idioma seleccionado
                    languageFlag.src = `assets/${selectedLang}.png`;
                });
            }
        });
    }
    
    // Resto del código...
    

    function getLanguageFullName(lang) {
        switch (lang) {
            case 'en':
                return 'English';
            case 'es':
                return 'Spanish';
            case 'fr':
                return 'French';
            // Agrega otros idiomas según sea necesario
            default:
                return lang;
        }
    }
});