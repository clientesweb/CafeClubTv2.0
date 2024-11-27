export default function ParrillaDeProgramas() {
    const parrilla = document.getElementById('parrilla');
    const programas = [
        {
            title: "Programa 1",
            time: "10:00 AM",
            image: 'images/JUAN BORJA_20241122_105637_0000.png',
            link: '/programa-1'
        },
        {
            title: "Programa 2",
            time: "12:00 PM",
            image: 'https://via.placeholder.com/2048x1152?text=Programa+2',
            link: '/programa-2'
        },
        {
            title: "Programa 3",
            time: "2:00 PM",
            image: 'https://via.placeholder.com/2048x1152?text=Programa+3',
            link: '/programa-3'
        },
        {
            title: "Programa 4",
            time: "4:00 PM",
            image: 'https://via.placeholder.com/2048x1152?text=Programa+4',
            link: '/programa-4'
        },
        {
            title: "Programa 5",
            time: "6:00 PM",
            image: 'https://via.placeholder.com/2048x1152?text=Programa+5',
            link: '/programa-5'
        }
    ];

    let currentSlide = 0;
    let isTransitioning = false;
    let startX = 0;
    let endX = 0;

    parrilla.innerHTML = `
        <div class="relative w-full h-0 pb-[56.25%] overflow-hidden">
            <div class="absolute inset-0 flex transition-all duration-1000 ease-in-out" id="program-container">
                ${programas.map((programa, index) => `
                    <div class="w-full h-full flex-shrink-0 relative overflow-hidden">
                        <img 
                            data-src="${programa.image}" 
                            alt="Programa ${index + 1}" 
                            class="w-full h-full object-cover absolute top-0 left-0 lazy-load opacity-0 transition-all duration-1000 transform scale-110"
                        >
                        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black opacity-75"></div>
                        <div class="absolute bottom-4 left-0 right-0 text-white text-center px-4 z-10">
                            <h1 class="text-xl sm:text-2xl font-bold mb-4">${programa.title}</h1>
                            <p class="text-sm sm:text-lg mb-6">${programa.time}</p>
                            <a href="${programa.link}">
                                <button class="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition">
                                    Ver Programa
                                </button>
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="absolute top-4 left-0 right-0 flex justify-center space-x-2">
                ${programas.map((_, index) => `
                    <button class="indicator w-2 h-2 bg-white bg-opacity-50 rounded-full focus:outline-none hover:bg-opacity-100 transition-all ${index === 0 ? 'bg-red-600 w-8' : ''}" data-index="${index}"></button>
                `).join('')}
            </div>
        </div>
    `;

    const programContainer = parrilla.querySelector('#program-container');
    const slides = parrilla.querySelectorAll('.lazy-load');
    const indicators = parrilla.querySelectorAll('.indicator');

    function loadProgramImage(index) {
        const img = slides[index];
        if (!img.src) {
            img.src = img.getAttribute('data-src');
            img.onload = () => img.classList.remove('opacity-0', 'scale-110');
        }
    }

    function showProgram(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentSlide = index;
        programContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
        loadProgramImage(currentSlide);
        setTimeout(() => (isTransitioning = false), 500);
    }

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('bg-red-600', index === currentSlide);
            indicator.classList.toggle('w-8', index === currentSlide);
            indicator.classList.toggle('w-2', index !== currentSlide);
        });
    }

    // Eventos táctiles
    programContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    programContainer.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    programContainer.addEventListener('touchend', () => {
        const diffX = startX - endX;
        if (diffX > 50) {
            showProgram((currentSlide + 1) % programas.length);
        } else if (diffX < -50) {
            showProgram((currentSlide - 1 + programas.length) % programas.length);
        }
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-index'));
            showProgram(index);
        });
    });

    setInterval(() => {
        showProgram((currentSlide + 1) % programas.length);
    }, 5000);

    loadProgramImage(0);
}