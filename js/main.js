// ========================================
// VARIABLES GLOBALES
// ========================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const header = document.getElementById('header');
const galleryGrid = document.getElementById('galleryGrid');
const galleryModal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

let currentImageIndex = 0;

// ========================================
// MENÚ MÓVIL
// ========================================

// Abrir/cerrar menú en móviles
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
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
// GALERÍA DE IMÁGENES - TUS FOTOS REALES
// ========================================

// Array con tus fotos del Civic
const galleryImages = [
    {
        src: 'gallery/civic-front.jpg',
        alt: 'Honda Civic 2013 EXL - Vista frontal',
        caption: 'Vista frontal del Honda Civic 2013 EXL'
    },
    {
        src: 'gallery/civic-side.jpg',
        alt: 'Honda Civic 2013 EXL - Vista lateral',
        caption: 'Elegante perfil lateral'
    },
    {
        src: 'gallery/civic-back.jpg',
        alt: 'Honda Civic 2013 EXL - Vista trasera',
        caption: 'Vista trasera del Civic'
    },
    {
        src: 'gallery/civic-interior.jpg',
        alt: 'Honda Civic 2013 EXL - Interior',
        caption: 'Interior con acabados de lujo'
    },
    {
        src: 'gallery/civic-motor.jpg',
        alt: 'Honda Civic 2013 EXL - Motor',
        caption: 'Motor 1.8L i-VTEC'
    },
    {
        src: 'gallery/civic-detail.jpg',
        alt: 'Honda Civic 2013 EXL - Detalle',
        caption: 'Detalles del vehículo'
    }
];

// Generar galería
function loadGallery() {
    galleryGrid.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" loading="lazy">
            <div class="gallery-overlay">
                <span>🔍</span>
            </div>
        `;
        
        // Abrir modal al hacer clic
        galleryItem.addEventListener('click', () => {
            openModal(index);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Abrir modal
function openModal(index) {
    currentImageIndex = index;
    const image = galleryImages[index];
    modalImg.src = image.src;
    modalImg.alt = image.alt;
    modalCaption.textContent = image.caption;
    galleryModal.classList.add('active');
    galleryModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal() {
    galleryModal.classList.remove('active');
    galleryModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
}

// Navegación en el modal
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const image = galleryImages[currentImageIndex];
    modalImg.src = image.src;
    modalImg.alt = image.alt;
    modalCaption.textContent = image.caption;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const image = galleryImages[currentImageIndex];
    modalImg.src = image.src;
    modalImg.alt = image.alt;
    modalCaption.textContent = image.caption;
}

// Event listeners del modal
if (modalClose) {
    modalClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    });
}

if (modalPrev) {
    modalPrev.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showPrevImage();
    });
}

if (modalNext) {
    modalNext.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showNextImage();
    });
}

// Cerrar modal al hacer clic fuera de la imagen
if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeModal();
        }
    });
}

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('active')) return;
    
    if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        closeModal();
    }
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrevImage();
    }
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNextImage();
    }
});

// Cargar galería al inicio
loadGallery();

// ========================================
// CÓDIGO QR - APUNTA A TU INSTAGRAM
// ========================================

function generateQR() {
    const qrDiv = document.getElementById('qrCode');
    if (qrDiv && typeof QRCode !== 'undefined') {
        // Genera QR que apunta a tu Instagram
        new QRCode(qrDiv, {
            text: 'https://www.instagram.com/andres.esc_19',
            width: 200,
            height: 200,
            colorDark: '#1E1E1E',
            colorLight: '#FFFFFF',
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}

// Generar QR cuando cargue la página
window.addEventListener('load', () => {
    setTimeout(generateQR, 500);
});

// ========================================
// ANIMACIONES AL HACER SCROLL
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
// EFECTO PARALLAX EN EL HERO
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// CONSOLA DE BIENVENIDA
// ========================================

console.log('%c🚗 Honda Civic 2013 EXL', 'color: #0057B8; font-size: 20px; font-weight: bold;');
console.log('%cElegancia y rendimiento en cada kilómetro', 'color: #4A4A4A; font-size: 14px;');
console.log('%cSitio web de Andres Escolastico', 'color: #C8102E; font-size: 12px;');

// ========================================
// PRELOADER
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('✅ Página cargada completamente');
});