const localTranslationsPath = window.location.pathname;
const localTranslationsHtmlName = localTranslationsPath.split('/').pop().replace('.html', '');

document.addEventListener('DOMContentLoaded', function () {
    let translations;

    if (localTranslationsHtmlName === 'index' || localTranslationsHtmlName === '') {
        translationsPath = 'assets/translations.json';
    } else {
        translationsPath = '../translations.json';
    }

    fetch(translationsPath)
        .then(response => response.json())
        .then(data => {
            translations = data;
            region = getLanguageFromRegion();
            if(localStorage.getItem('selectedLanguage') == null){
                changeLanguage(region);
                updateLanguageDropdown(region);
                const languageFlag = document.getElementById('current-language-flag');
                if (localTranslationsHtmlName === 'index' || localTranslationsHtmlName === '') {
                    languageFlag.src = `assets/${region}.png`;
                } else {
                    languageFlag.src = `../${region}.png`;
                }
            }
            else{
                changeLanguage(localStorage.getItem('selectedLanguage'));
                updateLanguageDropdown(localStorage.getItem('selectedLanguage'));
            }

            // Obtener todos los elementos que necesitan ser traducidos
            const translatableElements = document.querySelectorAll('[data-translate-key]');

            // Manejar el cambio de idioma al hacer clic en un enlace de idioma
            const languageDropdown = document.getElementById('languageDropdown');
            const languageMenu = document.getElementById('language-dropdown-menu');

            // Inicializar la lista de idiomas en el dropdown
        })
        .catch(error => console.error('Error loading translations', error));

    function getLanguageFromRegion() {
        // Obtener la información de geolocalización del navegador
        const userRegion = navigator.language || navigator.userLanguage;

        // Determinar el idioma según la región
        if (userRegion.startsWith('es')) {
            return 'es';
        } else if (userRegion.startsWith('fr')) {
            return 'fr';
        } else {
            return 'en';
        }
    }

    function changeLanguage(lang) {
        localStorage.setItem('selectedLanguage', lang);
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
        if (localTranslationsHtmlName === 'index' || localTranslationsHtmlName === '') {
            languageFlag.src = `assets/${currentLang}.png`;
        } else {
            languageFlag.src = `../${currentLang}.png`;
        }
    
        Object.keys(translations).forEach(lang => {
            if (lang !== currentLang) {
                const listItem = document.createElement('li');
                const languageChange = document.createElement('div');
                const languageImage = document.createElement('img');
                const languageLink = document.createElement('a');
    
                languageChange.className = 'language-change'; // Mantener la clase existente
                if (localTranslationsHtmlName === 'index' || localTranslationsHtmlName === '') {
                    languageImage.src = `assets/${lang}.png`;
                } else {
                    languageImage.src = `../${lang}.png`;
                }
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
                    if (localTranslationsHtmlName === 'index' || localTranslationsHtmlName === '') {
                        languageFlag.src = `assets/${selectedLang}.png`;
                    } else {
                        languageFlag.src = `../${selectedLang}.png`;
                    }
                });
            }
        });
    }

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
