document.addEventListener('DOMContentLoaded', () => {
    // Función para verificar el consentimiento de cookies
    const checkCookieConsent = () => {
        const consent = localStorage.getItem('cookieConsent');
        return consent === 'accepted' || consent === 'rejected';
    };

    // Función para mostrar el banner de cookies
    const showCookieBanner = () => {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.classList.remove('hidden'); // Aseguramos que no esté completamente oculto
            banner.classList.add('show'); // Activamos la animación para que aparezca
        }
    };

    // Función para ocultar el banner de cookies con animación
    const hideCookieBanner = () => {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.classList.remove('show'); // Quitamos la clase que activa la animación
            setTimeout(() => {
                banner.classList.add('hidden'); // Después de la transición, ocultamos completamente
            }, 800); // Tiempo equivalente a la duración de la transición CSS
        }
    };

    // Función para guardar el consentimiento de cookies
    const saveCookieConsent = (decision) => {
        localStorage.setItem('cookieConsent', decision);
        hideCookieBanner(); // Ocultamos el banner después de guardar la decisión
    };

    // Función para manejar la visibilidad inicial del banner
    const handleCookieElements = () => {
        if (!checkCookieConsent()) {
            // Mostramos el banner si no hay consentimiento previo
            setTimeout(() => {
                showCookieBanner();
            }, 500);
        }
    };

    // Funciones para control de modales
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        const overlay = document.getElementById('modalOverlay');
        if (modal && overlay) {
            modal.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        const overlay = document.getElementById('modalOverlay');
        if (modal && overlay) {
            modal.style.display = 'none';
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Event listeners específicos para cookies
    const initializeCookieListeners = () => {
        const acceptCookiesBtn = document.getElementById('acceptCookies');
        const rejectCookiesBtn = document.getElementById('rejectCookies');
        const cookieBannerLink = document.querySelector('.cookie-banner__link');

        if (acceptCookiesBtn) {
            acceptCookiesBtn.addEventListener('click', () => saveCookieConsent('accepted'));
        }

        if (rejectCookiesBtn) {
            rejectCookiesBtn.addEventListener('click', () => saveCookieConsent('rejected'));
        }

        if (cookieBannerLink) {
            cookieBannerLink.addEventListener('click', (e) => {
                e.preventDefault();
                openModal('privacyModal');
            });
        }
    };

    // Funciones de navegación y scroll
    const smoothScroll = (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }

        if (window.innerWidth <= 768) {
            toggleMenu?.classList.remove('active');
            menu?.classList.remove('open');
            body.classList.remove('no-scroll');
        }
    };

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            header?.classList.toggle('navbar--fixed', scrollPosition > header.offsetHeight);
        } else if (headerTitle) {
            const isNavbarFixed = scrollPosition > (headerTitle.offsetTop + headerTitle.offsetHeight);
            navbar?.classList.toggle('navbar--fixed', isNavbarFixed);
        }
    };

    const toggleMenuHandler = () => {
        toggleMenu?.classList.toggle('active');
        menu?.classList.toggle('open');
        body.classList.toggle('no-scroll');
    };

    // Inicialización de favicons en tarjetas de proyecto
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

    // Inicialización de event listeners generales
    const initializeEventListeners = () => {
        sectionLinks.forEach((link) => link.addEventListener('click', smoothScroll));
        toggleMenu?.addEventListener('click', toggleMenuHandler);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        const privacyLink = document.getElementById('privacyLink');
        const termsLink = document.getElementById('termsLink');

        privacyLink?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('privacyModal');
        });

        termsLink?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('termsModal');
        });

        const closeButtons = document.querySelectorAll('.close-btn');
        closeButtons.forEach(button =>
            button.addEventListener('click', () => {
                const modalId = button.closest('.modal')?.id;
                if (modalId) closeModal(modalId);
            })
        );

        overlay?.addEventListener('click', () => {
            const openModals = document.querySelectorAll('.modal[style*="display: block"]');
            openModals.forEach(modal => closeModal(modal.id));
        });
    };

    // Inicialización principal
    const initialize = () => {
        handleCookieElements();
        initializeCookieListeners();
        initializeEventListeners();
        handleScroll();
        addFaviconsToProjectCards();
        if (typeof AOS !== 'undefined') {
            AOS.init();
        }
    };

    // Referencias DOM
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');
    const headerTitle = document.querySelector('.header__title');
    const toggleMenu = document.querySelector('.toggle-menu');
    const menu = document.getElementById('menu');
    const sectionLinks = document.querySelectorAll('.navbar__link[href^="#"]');
    const body = document.body;
    const overlay = document.getElementById('modalOverlay');

    // Ejecutar inicialización
    initialize();
});