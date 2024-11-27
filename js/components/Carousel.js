export default function Carousel() {
    const carousel = document.getElementById('carousel');
    const images = [
        'https://www.cafeclubtv.com/images/image1.jpg',
        'https://www.cafeclubtv.com/images/image2%20(1).jpg', // Codificado
        'https://www.cafeclubtv.com/images/image3.jpg',
        'https://www.cafeclubtv.com/images/image4.jpg',
        'https://www.cafeclubtv.com/images/image5.jpg',
        'https://www.cafeclubtv.com/images/image6.jpg'
    ];

    let currentSlide = 0;
    let isTransitioning = false;

    // Crear HTML del carrusel
    carousel.innerHTML = `
        <div class="relative w-full aspect-video overflow-hidden rounded-xl shadow-xl">
            <div class="flex transition-transform duration-700 ease-in-out will-change-transform">
                ${images.map(src => `
                    <img 
                        data-src="${src}" 
                        alt="Slide" 
                        class="w-full h-full object-cover flex-shrink-0 lazy-load opacity-0 transition-opacity duration-500"
                    >
                `).join('')}
            </div>
            <button class="prev absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">&#10094;</button>
            <button class="next absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">&#10095;</button>
            <div class="indicators absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                ${images.map((_, index) => `
                    <button class="indicator w-3 h-3 bg-gray-400 rounded-full focus:outline-none ${index === 0 ? 'bg-red-600' : ''}" data-index="${index}"></button>
                `).join('')}
            </div>
        </div>
    `;

    const slideContainer = carousel.querySelector('.flex');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    const slides = carousel.querySelectorAll('.lazy-load');
    const indicators = carousel.querySelectorAll('.indicator');

    // Función para cargar imágenes con lazy loading
    function loadSlideImage(index) {
        const img = slides[index];
        if (!img.src) {
            img.src = img.getAttribute('data-src');
            img.onload = () => {
                img.classList.remove('opacity-0');
            };
        }
    }

    // Mostrar slide actual
    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        currentSlide = index;
        slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        loadSlideImage(currentSlide);
        updateIndicators();

        requestAnimationFrame(() => {
            isTransitioning = false;
        });
    }

    // Actualizar indicadores
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('bg-red-600', index === currentSlide);
            indicator.classList.toggle('bg-gray-400', index !== currentSlide);
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

    // Auto-desplazamiento cada 5 segundos
    setInterval(() => {
        showSlide((currentSlide + 1) % images.length);
    }, 5000);

    // Cargar la primera imagen al iniciar
    loadSlideImage(0);
}