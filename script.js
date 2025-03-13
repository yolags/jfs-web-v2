document.addEventListener('DOMContentLoaded', () => {
    // Referencias DOM
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');
    const headerTitle = document.querySelector('.header__title');
    const toggleMenu = document.querySelector('.toggle-menu');
    const menu = document.getElementById('menu');
    const sectionLinks = document.querySelectorAll('.navbar__link[href^="#"]');
    const body = document.body;
    const overlay = document.getElementById('modalOverlay');

    // Función para verificar el consentimiento de cookies
    const checkCookieConsent = () => {
        const consent = localStorage.getItem('cookieConsent');
        return consent === 'accepted' || consent === 'rejected';
    };

    // Función para mostrar el banner de cookies
    const showCookieBanner = () => {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.classList.remove('hidden');
            banner.classList.add('show');
        }
    };

    // Función para ocultar el banner de cookies con animación
    const hideCookieBanner = () => {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => banner.classList.add('hidden'), 800);
        }
    };

    // Función para guardar el consentimiento de cookies
    const saveCookieConsent = (decision) => {
        localStorage.setItem('cookieConsent', decision);
        hideCookieBanner();
    };

    // Función para manejar la visibilidad inicial del banner
    const handleCookieElements = () => {
        if (!checkCookieConsent()) {
            setTimeout(showCookieBanner, 500);
        }
    };

    // Funciones para control de modales
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal && overlay) {
            modal.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal && overlay) {
            modal.style.display = 'none';
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Función del Carrusel de Reseñas
    const initReviewCarousel = () => {
        const reviews = document.querySelectorAll(".review");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        let currentIndex = 0;

        const updateReviews = () => {
            reviews.forEach((review, index) => {
                review.style.opacity = index === currentIndex ? "1" : "0";
                review.style.transform = index === currentIndex ? "translateX(0)" : "translateX(100%)";
                review.style.position = index === currentIndex ? "relative" : "absolute";
            });
        };

        prevBtn?.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
            updateReviews();
        });

        nextBtn?.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % reviews.length;
            updateReviews();
        });

        updateReviews();
    };

    // Event listeners específicos para cookies
    const initializeCookieListeners = () => {
        const acceptCookiesBtn = document.getElementById('acceptCookies');
        const rejectCookiesBtn = document.getElementById('rejectCookies');
        const cookieBannerLink = document.querySelector('.cookie-banner__link');

        acceptCookiesBtn?.addEventListener('click', () => saveCookieConsent('accepted'));
        rejectCookiesBtn?.addEventListener('click', () => saveCookieConsent('rejected'));
        cookieBannerLink?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('privacyModal');
        });
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
            // Comportamiento para móviles y tablets
            header?.classList.toggle('navbar--fixed', scrollPosition > header.offsetHeight);
        } else {
            // Comportamiento para escritorio
            const headerTitleHeight = headerTitle?.offsetHeight || 0;
            const navbarHeight = navbar?.offsetHeight || 0;
    
            if (scrollPosition > headerTitleHeight) {
                navbar?.classList.add('navbar--fixed');
                document.body.style.marginTop = `${navbarHeight}px`;
            } else {
                navbar?.classList.remove('navbar--fixed');
                document.body.style.marginTop = '0';
            }
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
            faviconContainer?.appendChild(faviconImg);
        });
    };

    // Inicialización de event listeners generales
    const initializeEventListeners = () => {
        sectionLinks.forEach((link) => link.addEventListener('click', smoothScroll));
        toggleMenu?.addEventListener('click', toggleMenuHandler);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        document.getElementById('privacyLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('privacyModal');
        });

        document.getElementById('termsLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('termsModal');
        });

        document.querySelectorAll('.close-btn').forEach(button =>
            button.addEventListener('click', () => {
                const modalId = button.closest('.modal')?.id;
                if (modalId) closeModal(modalId);
            })
        );

        overlay?.addEventListener('click', () => {
            document.querySelectorAll('.modal[style*="display: block"]').forEach(modal => closeModal(modal.id));
        });
    };

    // Inicialización principal
    const initialize = () => {
        handleCookieElements();
        initializeCookieListeners();
        initializeEventListeners();
        handleScroll();
        addFaviconsToProjectCards();
        initReviewCarousel();
        if (typeof AOS !== 'undefined') {
            AOS.init();
        }
    };

    // Ejecutar inicialización
    initialize();
});