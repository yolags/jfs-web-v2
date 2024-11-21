// Funciones para el control de modales (estas van FUERA del DOMContentLoaded)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modalOverlay');
    modal.style.display = 'block';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modalOverlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function checkCookieConsent() {
    return localStorage.getItem('cookieConsent');
}

function saveCookieConsent(decision) {
    localStorage.setItem('cookieConsent', decision);
}

function addCookieButtons() {
    const privacyModal = document.getElementById('privacyModal');
    const modalContent = privacyModal.querySelector('.modal-content');
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'cookie-buttons';
    buttonContainer.style.marginTop = '20px';
    
    const acceptButton = document.createElement('button');
    acceptButton.className = 'cookie-btn accept-btn';
    acceptButton.textContent = 'Aceptar cookies';
    acceptButton.addEventListener('click', () => {
        saveCookieConsent('accepted');
        closeModal('privacyModal');
    });
    
    const rejectButton = document.createElement('button');
    rejectButton.className = 'cookie-btn reject-btn';
    rejectButton.textContent = 'Rechazar cookies';
    rejectButton.addEventListener('click', () => {
        saveCookieConsent('rejected');
        closeModal('privacyModal');
    });
    
    buttonContainer.appendChild(acceptButton);
    buttonContainer.appendChild(rejectButton);
    modalContent.appendChild(buttonContainer);
}

// Código principal de DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');
    const headerTitle = document.querySelector('.header__title');
    const headerHeight = header.offsetHeight;
    const toggleMenu = document.querySelector('.toggle-menu');
    const menu = document.getElementById('menu');
    const sectionLinks = document.querySelectorAll('.navbar__link[href^="#"]');
    const body = document.body;

    /**
     * Smooth Scroll for anchor links.
     * @param {Event} event
     */
    const smoothScroll = (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }

        // Close menu on mobile after scrolling
        if (window.innerWidth <= 768) {
            toggleMenu.classList.remove('active');
            menu.classList.remove('open');
            body.classList.remove('no-scroll');
        }
    };

    /**
     * Handle scroll behavior for different devices.
     */
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            header.classList.toggle('navbar--fixed', scrollPosition > headerHeight);
        } else {
            const isNavbarFixed = scrollPosition > (headerTitle.offsetTop + headerTitle.offsetHeight);
            navbar.classList.toggle('navbar--fixed', isNavbarFixed);
        }
    };

    /**
     * Toggle mobile menu visibility.
     */
    const toggleMenuHandler = () => {
        toggleMenu.classList.toggle('active');
        menu.classList.toggle('open');
        body.classList.toggle('no-scroll');
    };

    /**
     * Initialize menu toggle with aria attributes.
     */
    const initializeMenuToggle = () => {
        if (!toggleMenu) return;

        toggleMenu.addEventListener('click', () => {
            const isExpanded = toggleMenu.getAttribute('aria-expanded') === 'true';
            toggleMenu.setAttribute('aria-expanded', !isExpanded);
            navbar.classList.toggle('navbar--open', !isExpanded);
        });
    };

    // Event Listeners
    sectionLinks.forEach((link) => link.addEventListener('click', smoothScroll));
    toggleMenu?.addEventListener('click', toggleMenuHandler);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Initial execution
    initializeMenuToggle();
    handleScroll();

    // Initialize AOS library
    AOS.init();

    /**
     * Add favicons to project cards based on their links.
     */
    const addFaviconsToProjectCards = () => {
        const labels = document.querySelectorAll('.project-card__label');

        labels.forEach((label) => {
            const url = new URL(label.href);

            const faviconUrl = url.hostname.includes('instagram.com')
                ? 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png'
                : `${url.origin}/favicon.ico`;

            const faviconImg = document.createElement('img');
            faviconImg.src = faviconUrl;
            faviconImg.alt = `${url.hostname} icon`;
            faviconImg.classList.add('project-card__favicon');

            const faviconContainer = label.querySelector('.project-card__favicon');
            if (faviconContainer) {
                faviconContainer.appendChild(faviconImg);
            }
        });
    };

    addFaviconsToProjectCards();

    // Configuración de modales y cookies
    addCookieButtons();

    // Event listeners para los enlaces en el footer
    const privacyLink = document.getElementById('privacyLink');
    const termsLink = document.getElementById('termsLink');
    
    if (privacyLink) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('privacyModal');
        });
    }
    
    if (termsLink) {
        termsLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('termsModal');
        });
    }

    // Agregar event listeners para los botones de cierre
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.closest('.modal').id;
            closeModal(modalId);
        });
    });

    // Cerrar modal al hacer clic en el overlay
    const overlay = document.getElementById('modalOverlay');
    overlay.addEventListener('click', () => {
        const openModals = document.querySelectorAll('.modal[style*="display: block"]');
        openModals.forEach(modal => closeModal(modal.id));
    });

    // Mostrar el modal de privacidad si no hay consentimiento previo
    if (!checkCookieConsent()) {
        openModal('privacyModal');
    }
});