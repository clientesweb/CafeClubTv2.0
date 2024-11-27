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
        <div class="relative w-full h-screen overflow-hidden">
            <div class="absolute inset-0 flex transition-all duration-1000 ease-in-out">
                ${images.map((src, index) => `
                    <div class="w-full h-full flex-shrink-0 relative overflow-hidden">
                        <img 
                            data-src="${src}" 
                            alt="Hero Image ${index + 1}" 
                            class="w-full h-full object-cover absolute top-0 left-0 lazy-load opacity-0 transition-all duration-1000 transform scale-110"
                        >
                        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black opacity-75"></div>
                    </div>
                `).join('')}
            </div>
            <div class="absolute inset-0 flex flex-col justify-end items-center text-white z-10 pb-20 px-4">
                <h1 class="text-4xl md:text-6xl font-bold mb-4 text-center transition-all duration-700 transform translate-y-10 opacity-0">Descubre el Mundo del Café</h1>
                <p class="text-lg md:text-xl mb-8 text-center max-w-2xl transition-all duration-700 delay-200 transform translate-y-10 opacity-0">Explora historias, sabores y experiencias únicas en Café Club TV</p>
                <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                    Comienza tu Viaje
                </button>
            </div>
            <div class="absolute top-4 left-0 right-0 flex justify-center space-x-2">
                ${images.map((_, index) => `
                    <button class="indicator w-2 h-2 bg-white bg-opacity-50 rounded-full focus:outline-none hover:bg-opacity-100 transition-all ${index === 0 ? 'bg-red-600 w-8' : ''}" data-index="${index}"></button>
                `).join('')}
            </div>
        </div>
    `;

    const slideContainer = hero.querySelector('.flex');
    const slides = hero.querySelectorAll('.lazy-load');
    const indicators = hero.querySelectorAll('.indicator');
    const heroTitle = hero.querySelector('h1');
    const heroDescription = hero.querySelector('p');

    function loadSlideImage(index) {
        const slide = slides[index].parentNode;
        const img = slides[index];

        if (!img.src) {
            img.src = img.getAttribute('data-src');
            img.onload = () => {
                img.classList.remove('opacity-0', 'scale-110');
                heroTitle.classList.remove('translate-y-10', 'opacity-0');
                heroDescription.classList.remove('translate-y-10', 'opacity-0');
                adjustImageSize(img);
            };
        } else {
            img.classList.remove('opacity-0', 'scale-110');
            heroTitle.classList.remove('translate-y-10', 'opacity-0');
            heroDescription.classList.remove('translate-y-10', 'opacity-0');
            adjustImageSize(img);
        }
    }

    function adjustImageSize(img) {
        const containerAspectRatio = hero.offsetWidth / hero.offsetHeight;
        const imageAspectRatio = 1080 / 1920; // Aspect ratio of the original image

        if (containerAspectRatio > imageAspectRatio) {
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.top = '50%';
            img.style.left = '0';
            img.style.transform = 'translateY(-50%)';
        } else {
            img.style.width = 'auto';
            img.style.height = '100%';
            img.style.top = '0';
            img.style.left = '50%';
            img.style.transform = 'translateX(-50%)';
        }
    }

    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        const previousSlide = slides[currentSlide];
        previousSlide.classList.add('opacity-0', 'scale-110');

        currentSlide = index;
        slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        loadSlideImage(currentSlide);
        updateIndicators();

        heroTitle.classList.add('translate-y-10', 'opacity-0');
        heroDescription.classList.add('translate-y-10', 'opacity-0');

        setTimeout(() => {
            heroTitle.classList.remove('translate-y-10', 'opacity-0');
            setTimeout(() => {
                heroDescription.classList.remove('translate-y-10', 'opacity-0');
            }, 200);
            isTransitioning = false;
        }, 500);
    }

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('bg-red-600', index === currentSlide);
            indicator.classList.toggle('w-8', index === currentSlide);
            indicator.classList.toggle('w-2', index !== currentSlide);
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
            slide.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    });

    // Iniciar con la primera imagen
    loadSlideImage(0);

    // Añadir interactividad al botón
    const exploreButton = hero.querySelector('button');
    exploreButton.addEventListener('mouseenter', () => {
        exploreButton.classList.add('animate-pulse');
    });
    exploreButton.addEventListener('mouseleave', () => {
        exploreButton.classList.remove('animate-pulse');
    });

    // Ajustar tamaño de imagen al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
        slides.forEach((slide, index) => {
            adjustImageSize(slide);
        });
    });
}

