document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');
    const headerTitle = document.querySelector('.header__title');
    const headerHeight = header.offsetHeight;
    const toggleMenu = document.querySelector('.toggle-menu');
    const menu = document.getElementById('menu');
    const sectionLinks = document.querySelectorAll('.navbar__link[href^="#"]');
    const body = document.body;

    // Función de Smooth Scroll
    function smoothScroll(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }

        // Cerrar el menú después del desplazamiento si estamos en modo móvil
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            toggleMenu.classList.remove('active');
            menu.classList.remove('open');
            body.classList.remove('no-scroll'); // Desbloquear el scroll
        }
    }

    // Función para manejar el scroll según el dispositivo
    function handleScroll() {
        const scrollPosition = window.scrollY;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            header.classList.toggle('navbar--fixed', scrollPosition > headerHeight);
        } else {
            navbar.classList.toggle('navbar--fixed', scrollPosition > (headerTitle.offsetTop + headerTitle.offsetHeight));
        }
    }

    // Toggle del menú en mobile
    function toggleMenuHandler() {
        toggleMenu.classList.toggle('active');
        menu.classList.toggle('open');
        body.classList.toggle('no-scroll');
    }

    // Comprobar si el botón de menú existe
    if (toggleMenu) {
        toggleMenu.addEventListener('click', () => {
            const isExpanded = toggleMenu.getAttribute('aria-expanded') === 'true';

            // Cambiar el atributo aria-expanded
            toggleMenu.setAttribute('aria-expanded', !isExpanded);
            
            // Agregar o quitar una clase que indique que el menú está abierto
            navbar.classList.toggle('navbar--open', !isExpanded);
        });
    }

    sectionLinks.forEach(link => link.addEventListener('click', smoothScroll));
    toggleMenu.addEventListener('click', toggleMenuHandler);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    handleScroll();
});

AOS.init();

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".project-card__label").forEach(label => {
        const url = new URL(label.href);
        
        // Detectar favicon especial para Instagram
        let faviconUrl;
        if (url.hostname.includes("instagram.com")) {
            faviconUrl = "https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png"; // Favicon de Instagram
        } else {
            faviconUrl = `${url.origin}/favicon.ico`;
        }

        // Crear el elemento img para el favicon
        const faviconImg = document.createElement("img");
        faviconImg.src = faviconUrl;
        faviconImg.alt = `${url.hostname} icon`;
        faviconImg.classList.add("project-card__favicon");

        // Insertar el favicon dentro de la etiqueta de enlace
        const faviconContainer = label.querySelector(".project-card__favicon");
        if (faviconContainer) {
            faviconContainer.appendChild(faviconImg);
        }
    });
});