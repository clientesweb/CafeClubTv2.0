export default function Hero() {
    const hero = document.getElementById('hero');
    const images = [
        'https://www.cafeclubtv.com/images/image1.jpg',
        'https://www.cafeclubtv.com/images/image2%20(1).jpg',
        'https://www.cafeclubtv.com/images/image3.jpg',
        'https://www.cafeclubtv.com/images/image4.jpg',
        'https://www.cafeclubtv.com/images/image5.jpg',
        'https://www.cafeclubtv.com/images/image6.jpg'
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
            <div class="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
                <h1 class="text-5xl md:text-7xl font-bold mb-4 text-center transition-all duration-700 transform translate-y-10 opacity-0">Bienvenido a Café Club TV</h1>
                <p class="text-xl md:text-2xl mb-8 text-center max-w-2xl transition-all duration-700 delay-200 transform translate-y-10 opacity-0">Descubre el mundo del café a través de nuestras historias y experiencias únicas</p>
                <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                    Explorar Ahora
                </button>
            </div>
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                ${images.map((_, index) => `
                    <button class="indicator w-3 h-3 bg-white bg-opacity-50 rounded-full focus:outline-none hover:bg-opacity-100 transition-all ${index === 0 ? 'bg-red-600' : ''}" data-index="${index}"></button>
                `).join('')}
            </div>
        </div>
    `;

    const slideContainer = hero.querySelector('.flex');
    const slides = hero.querySelectorAll('.lazy-load');
    const indicators = hero.querySelectorAll('.indicator');
    const heroTitle = hero.querySelector('h1');
    const heroDescription = hero.querySelector('p');

    // Función para cargar imágenes con lazy loading y animación
    function loadSlideImage(index) {
        const slide = slides[index].parentNode;
        const img = slides[index];

        if (!img.src) {
            img.src = img.getAttribute('data-src');
            img.onload = () => {
                img.classList.remove('opacity-0', 'scale-110');
                heroTitle.classList.remove('translate-y-10', 'opacity-0');
                heroDescription.classList.remove('translate-y-10', 'opacity-0');
            };
        } else {
            img.classList.remove('opacity-0', 'scale-110');
            heroTitle.classList.remove('translate-y-10', 'opacity-0');
            heroDescription.classList.remove('translate-y-10', 'opacity-0');
        }
    }

    // Mostrar slide actual con efecto de transición
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

    // Actualizar indicadores
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('bg-red-600', index === currentSlide);
            indicator.classList.toggle('bg-white', index !== currentSlide);
        });
    }

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-index'));
            showSlide(index);
        });
    });

    // Auto-desplazamiento cada 7 segundos
    setInterval(() => {
        showSlide((currentSlide + 1) % images.length);
    }, 7000);

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
}