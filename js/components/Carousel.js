export default function Hero() {
    const hero = document.getElementById('hero');
    const images = [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1080&h=1920&q=80',
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1080&h=1920&q=80',
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1080&h=1920&q=80',
        'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1080&h=1920&q=80',
        'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1080&h=1920&q=80',
    ];

    const titles = [
        "Bienvenidos Cafeteros",
        "Explora Playlists Increíbles",
        "Shorts, Noticias y Mucho Más",
        "Obtén Tu Propio Programa",
        "Consulta Propuestas Comierciales"
    ];

    const buttons = [
        "Explorar",
        "Ver Más",
        "Descubre Ahora",
        "Solicitar",
        "Contáctanos"
    ];

    let currentSlide = 0;
    let isTransitioning = false;
    let startX = 0;
    let endX = 0;

    hero.innerHTML = `
        <div class="relative w-full h-[60vh] overflow-hidden">
            <div class="absolute inset-0 flex transition-all duration-1000 ease-in-out" id="slide-container">
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
            <div class="absolute bottom-4 left-0 right-0 flex flex-col items-center text-white text-center px-4 z-10" id="hero-text">
                <h1 class="text-2xl sm:text-4xl font-bold mb-4">${titles[0]}</h1>
                <button class="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition">
                    ${buttons[0]}
                </button>
            </div>
            <div class="absolute top-4 left-0 right-0 flex justify-center space-x-2">
                ${images.map((_, index) => `
                    <button class="indicator w-2 h-2 bg-white bg-opacity-50 rounded-full focus:outline-none hover:bg-opacity-100 transition-all ${index === 0 ? 'bg-red-600 w-8' : ''}" data-index="${index}"></button>
                `).join('')}
            </div>
        </div>
    `;

    const slideContainer = hero.querySelector('#slide-container');
    const slides = hero.querySelectorAll('.lazy-load');
    const indicators = hero.querySelectorAll('.indicator');
    const heroText = hero.querySelector('#hero-text');

    function loadSlideImage(index) {
        const img = slides[index];
        if (!img.src) {
            img.src = img.getAttribute('data-src');
            img.onload = () => img.classList.remove('opacity-0', 'scale-110');
        }
    }

    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentSlide = index;
        slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
        updateText();
        loadSlideImage(currentSlide);
        setTimeout(() => (isTransitioning = false), 500);
    }

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('bg-red-600', index === currentSlide);
            indicator.classList.toggle('w-8', index === currentSlide);
            indicator.classList.toggle('w-2', index !== currentSlide);
        });
    }

    function updateText() {
        heroText.innerHTML = `
            <h1 class="text-2xl sm:text-4xl font-bold mb-4">${titles[currentSlide]}</h1>
            <button class="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition">
                ${buttons[currentSlide]}
            </button>
        `;
    }

    // Eventos táctiles
    slideContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slideContainer.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    slideContainer.addEventListener('touchend', () => {
        const diffX = startX - endX;
        if (diffX > 50) {
            showSlide((currentSlide + 1) % images.length);
        } else if (diffX < -50) {
            showSlide((currentSlide - 1 + images.length) % images.length);
        }
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-index'));
            showSlide(index);
        });
    });

    setInterval(() => {
        showSlide((currentSlide + 1) % images.length);
    }, 5000);

    loadSlideImage(0);
}