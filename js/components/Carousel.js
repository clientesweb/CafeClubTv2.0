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
        "Consulta Propuestas Comerciales"
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

    hero.innerHTML = `
        <div class="relative w-full h-screen overflow-hidden">
            <div class="flex transition-transform duration-1000 ease-in-out" id="slide-container">
                ${images.map((src, index) => `
                    <div class="w-full h-screen flex-shrink-0 relative">
                        <img 
                            data-src="${src}" 
                            alt="Hero Image ${index + 1}" 
                            class="lazy-load opacity-0 w-full h-full object-cover"
                        >
                        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
                    </div>
                `).join('')}
            </div>
            <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-white">
                <h1 class="text-4xl font-bold mb-4">${titles[0]}</h1>
                <button class="px-6 py-3 bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition">
                    ${buttons[0]}
                </button>
            </div>
            <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                ${images.map((_, index) => `
                    <button class="indicator w-2 h-2 bg-white bg-opacity-50 rounded-full transition-all ${index === 0 ? 'bg-red-600 w-8' : ''}" data-index="${index}"></button>
                `).join('')}
            </div>
        </div>

        <div class="relative w-full h-[20vh] md:h-[25vh] bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1601573112024-1c4c0f0112d9');">
            <div class="absolute inset-0 bg-black/50 flex justify-center items-center">
                <button class="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition">
                    JUEGA
                </button>
            </div>
        </div>
    `;

    const slideContainer = hero.querySelector('#slide-container');
    const slides = hero.querySelectorAll('.lazy-load');
    const indicators = hero.querySelectorAll('.indicator');

    function loadSlideImage(index) {
        const img = slides[index];
        if (!img.src) {
            img.src = img.getAttribute('data-src');
            img.onload = () => img.classList.add('opacity-100');
        }
    }

    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentSlide = index;
        slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('bg-red-600', i === currentSlide);
            indicator.classList.toggle('w-8', i === currentSlide);
        });
        loadSlideImage(currentSlide);
        setTimeout(() => isTransitioning = false, 1000);
    }

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = Number(indicator.getAttribute('data-index'));
            showSlide(index);
        });
    });

    setInterval(() => {
        showSlide((currentSlide + 1) % images.length);
    }, 5000);

    loadSlideImage(0);
}