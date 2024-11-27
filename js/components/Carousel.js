export default function Carousel() {
    const carousel = document.getElementById('carousel');
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

    // Crear HTML del carrusel con efectos modernos
    carousel.innerHTML = `
        <div class="relative w-full aspect-video overflow-hidden rounded-xl shadow-2xl">
            <div class="flex transition-all duration-700 ease-in-out will-change-transform">
                ${images.map((src, index) => `
                    <div class="w-full h-full flex-shrink-0 relative overflow-hidden">
                        <img 
                            data-src="${src}" 
                            alt="Slide ${index + 1}" 
                            class="w-full h-full object-cover absolute top-0 left-0 lazy-load opacity-0 transition-all duration-500 transform scale-105"
                        >
                        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                        <div class="absolute bottom-0 left-0 p-6 text-white">
                            <h2 class="text-3xl font-bold mb-2 transform translate-y-10 opacity-0 transition-all duration-500">Título ${index + 1}</h2>
                            <p class="transform translate-y-10 opacity-0 transition-all duration-500 delay-100">Descripción de la imagen ${index + 1}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="prev absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-3 rounded-full shadow-md hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button class="next absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-3 rounded-full shadow-md hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
            <div class="indicators absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                ${images.map((_, index) => `
                    <button class="indicator w-3 h-3 bg-white bg-opacity-50 rounded-full focus:outline-none hover:bg-opacity-100 transition-all ${index === 0 ? 'bg-red-600' : ''}" data-index="${index}"></button>
                `).join('')}
            </div>
        </div>
    `;

    const slideContainer = carousel.querySelector('.flex');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    const slides = carousel.querySelectorAll('.lazy-load');
    const indicators = carousel.querySelectorAll('.indicator');

    // Función para cargar imágenes con lazy loading y animación
    function loadSlideImage(index) {
        const slide = slides[index].parentNode;
        const img = slides[index];
        const title = slide.querySelector('h2');
        const description = slide.querySelector('p');

        if (!img.src) {
            img.src = img.getAttribute('data-src');
            img.onload = () => {
                img.classList.remove('opacity-0', 'scale-105');
                title.classList.remove('translate-y-10', 'opacity-0');
                description.classList.remove('translate-y-10', 'opacity-0');
            };
        } else {
            img.classList.remove('opacity-0', 'scale-105');
            title.classList.remove('translate-y-10', 'opacity-0');
            description.classList.remove('translate-y-10', 'opacity-0');
        }
    }

    // Mostrar slide actual con efecto de transición
    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        const previousSlide = slides[currentSlide].parentNode;
        previousSlide.querySelector('img').classList.add('opacity-0', 'scale-105');
        previousSlide.querySelector('h2').classList.add('translate-y-10', 'opacity-0');
        previousSlide.querySelector('p').classList.add('translate-y-10', 'opacity-0');

        currentSlide = index;
        slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        loadSlideImage(currentSlide);
        updateIndicators();

        setTimeout(() => {
            isTransitioning = false;
        }, 700);
    }

    // Actualizar indicadores
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('bg-red-600', index === currentSlide);
            indicator.classList.toggle('bg-white', index !== currentSlide);
        });
    }

    prevButton.addEventListener('click', () => {
        showSlide((currentSlide - 1 + images.length) % images.length);
    });

    nextButton.addEventListener('click', () => {
        showSlide((currentSlide + 1) % images.length);
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-index'));
            showSlide(index);
        });
    });

    // Añadir efecto de hover a los botones
    [prevButton, nextButton].forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('scale-110');
        });
        button.addEventListener('mouseleave', () => {
            button.classList.remove('scale-110');
        });
    });

    // Auto-desplazamiento cada 5 segundos con pausa al pasar el mouse
    let autoplayInterval;
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            showSlide((currentSlide + 1) % images.length);
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Iniciar autoplay y cargar la primera imagen
    startAutoplay();
    loadSlideImage(0);

    // Añadir efecto de parallax al mover el mouse
    carousel.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = carousel.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        slides.forEach((slide) => {
            const img = slide;
            img.style.transform = `scale(1.05) translate(${x * 10}px, ${y * 10}px)`;
        });
    });

    carousel.addEventListener('mouseleave', () => {
        slides.forEach((slide) => {
            const img = slide;
            img.style.transform = 'scale(1.05) translate(0, 0)';
        });
    });
}