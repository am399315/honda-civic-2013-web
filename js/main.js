// ========================================
// VARIABLES GLOBALES
// ========================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const header = document.getElementById('header');

// ========================================
// MENÚ MÓVIL
// ========================================

// Abrir/cerrar menú en móviles
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animación del icono hamburguesa
    menuToggle.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ========================================
// MODO OSCURO / CLARO
// ========================================

// Verificar si hay preferencia guardada
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// Toggle del tema
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Guardar preferencia en localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// ========================================
// NAVBAR TRANSPARENTE AL HACER SCROLL
// ========================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========================================
// ANIMACIONES AL HACER SCROLL (Intersection Observer)
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos que queremos animar
const animatedElements = document.querySelectorAll('.sobre, .galeria, .ficha, .contacto');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// SCROLL SUAVE PARA ENLACES INTERNOS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// CARGAR AÑO ACTUAL EN EL FOOTER
// ========================================

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Honda Civic 2013 EXL. Todos los derechos reservados.`;
}

// ========================================
// CONSOLA DE BIENVENIDA
// ========================================

console.log('%c🚗 Honda Civic 2013 EXL', 'color: #0057B8; font-size: 20px; font-weight: bold;');
console.log('%cElegancia y rendimiento en cada kilómetro', 'color: #4A4A4A; font-size: 14px;');
console.log('%cSitio desarrollado con ❤️', 'color: #C8102E; font-size: 12px;');