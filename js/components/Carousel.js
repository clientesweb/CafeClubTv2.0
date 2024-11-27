export default function Hero() {
    const hero = document.getElementById('hero');
    const images = [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1080&h=1920&q=80', // Café en taza
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1080&h=1920&q=80', // Granos de café
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1080&h=1920&q=80', // Barista preparando café
        'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1080&h=1920&q=80', // Plantación de café
        'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1080&h=1920&q=80', // Latte art
    ];

    let currentSlide = 0;
    let isTransitioning = false;

    // Crear HTML del HERO
    hero.innerHTML = `
        <style>
            .hero-container {
                width: 100%;
                height: 100vh;
                position: relative;
                overflow: hidden;
            }
            .hero-slide {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
            }
            .hero-slide.active {
                opacity: 1;
            }
            .hero-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            }
            .hero-content {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 2rem;
                background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
                color: white;
                text-align: center;
                transform: translateY(20px);
                opacity: 0;
                transition: transform 0.5s ease-out, opacity 0.5s ease-out;
            }
            .hero-slide.active .hero-content {
                transform: translateY(0);
                opacity: 1;
            }
            .hero-indicators {
                position: absolute;
                top: 1rem;
                left: 0;
                right: 0;
                display: flex;
                justify-content: center;
                gap: 0.5rem;
            }
            .indicator {
                width: calc(20% - 0.4rem);
                height: 0.25rem;
                background-color: rgba(255,255,255,0.5);
                border: none;
                padding: 0;
                transition: all 0.3s ease;
            }
            .indicator.active {
                background-color: #ef4444;
            }
            @media (min-aspect-ratio: 9/16) {
                .hero-image {
                    width: auto;
                    height: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        </style>
        <div class="hero-container">
            ${images.map((src, index) => `
                <div class="hero-slide ${index === 0 ? 'active' : ''}">
                    <img 
                        src="${src}" 
                        alt="Hero Image ${index + 1}" 
                        class="hero-image"
                    >
                    <div class="hero-content">
                        <h1 class="text-4xl md:text-6xl font-bold mb-4">Descubre el Mundo del Café</h1>
                        <p class="text-lg md:text-xl mb-8">Explora historias, sabores y experiencias únicas en Café Club TV</p>
                        <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                            Comienza tu Viaje
                        </button>
                    </div>
                </div>
            `).join('')}
            <div class="hero-indicators">
                ${images.map((_, index) => `
                    <button class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
                `).join('')}
            </div>
        </div>
    `;

    const slides = hero.querySelectorAll('.hero-slide');
    const indicators = hero.querySelectorAll('.indicator');

    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        const currentSlide = slides[currentSlide];
        const nextSlide = slides[index];

        currentSlide.classList.remove('active');
        nextSlide.classList.add('active');

        updateIndicators(index);

        setTimeout(() => {
            isTransitioning = false;
        }, 500);

        currentSlide = index;
    }

    function updateIndicators(activeIndex) {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndex);
        });
    }

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-index'));
            showSlide(index);
        });
    });

    // Navegación con gestos táctiles
    let touchStartX = 0;
    let touchEndX = 0;

    hero.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    hero.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            showSlide((currentSlide + 1) % images.length);
        }
        if (touchEndX - touchStartX > 50) {
            showSlide((currentSlide - 1 + images.length) % images.length);
        }
    }

    // Auto-desplazamiento cada 5 segundos
    setInterval(() => {
        showSlide((currentSlide + 1) % images.length);
    }, 5000);

    // Añadir efecto de parallax al hacer scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        slides.forEach((slide) => {
            const image = slide.querySelector('.hero-image');
            image.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    });

    // Añadir interactividad al botón
    const exploreButtons = hero.querySelectorAll('button:not(.indicator)');
    exploreButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('animate-pulse');
        });
        button.addEventListener('mouseleave', () => {
            button.classList.remove('animate-pulse');
        });
    });
}