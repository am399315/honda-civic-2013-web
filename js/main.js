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
// GALERÍA DE IMÁGENES
// ========================================

// Array de imágenes (puedes agregar tus propias fotos aquí)
const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
        alt: 'Honda Civic - Vista frontal',
        caption: 'Vista frontal del Honda Civic 2013 EXL'
    },
    {
        src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        alt: 'Honda Civic - Vista lateral',
        caption: 'Elegante perfil lateral'
    },
    {
        src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
        alt: 'Honda Civic - Interior',
        caption: 'Interior con acabados de lujo'
    },
    {
        src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
        alt: 'Honda Civic - Detalle',
        caption: 'Detalles que marcan la diferencia'
    },
    {
        src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
        alt: 'Honda Civic - Motor',
        caption: 'Motor 1.8L i-VTEC'
    },
    {
        src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
        alt: 'Honda Civic - Vista trasera',
        caption: 'Vista trasera elegante'
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
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
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
modalClose.addEventListener('click', closeModal);
modalPrev.addEventListener('click', showPrevImage);
modalNext.addEventListener('click', showNextImage);

// Cerrar modal al hacer clic fuera de la imagen
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        closeModal();
    }
});

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
});

// Cargar galería al inicio
loadGallery();

// ========================================
// CÓDIGO QR
// ========================================

function generateQR() {
    const qrDiv = document.getElementById('qrCode');
    if (qrDiv && typeof QRCode !== 'undefined') {
        // Genera QR con la URL actual del sitio
        new QRCode(qrDiv, {
            text: window.location.href,
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
    // Esperar un poco para asegurar que la librería QRCode esté cargada
    setTimeout(generateQR, 500);
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
// ANIMACIÓN DE NÚMEROS (Counter Animation)
// ========================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ========================================
// LAZY LOADING DE IMÁGENES
// ========================================

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

// Observar todas las imágenes con loading="lazy"
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
});

// ========================================
// EFECTO PARALLAX EN EL HERO
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// CONSOLA DE BIENVENIDA
// ========================================

console.log('%c🚗 Honda Civic 2013 EXL', 'color: #0057B8; font-size: 20px; font-weight: bold;');
console.log('%cElegancia y rendimiento en cada kilómetro', 'color: #4A4A4A; font-size: 14px;');
console.log('%cSitio desarrollado con ❤️', 'color: #C8102E; font-size: 12px;');

// ========================================
// DETECTAR SI ES MÓVIL
// ========================================

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    console.log('📱 Navegando desde dispositivo móvil');
}

// ========================================
// PRELOADER (OPCIONAL)
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('✅ Página cargada completamente');
});