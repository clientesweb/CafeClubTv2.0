export default function Sponsors() {
    const sponsors = document.getElementById('sponsors');
    const sponsorsData = [
        { id: 1, name: 'Sponsor 1', logo: 'https://www.cafeclubtv.com/images/logo1.png' },
        { id: 2, name: 'Sponsor 2', logo: 'https://www.cafeclubtv.com/images/logo2.png' },
        { id: 3, name: 'Sponsor 3', logo: 'https://www.cafeclubtv.com/images/logo3.png' },
        { id: 4, name: 'Sponsor 4', logo: 'https://www.cafeclubtv.com/images/logo4.png' },
        { id: 5, name: 'Sponsor 5', logo: 'https://www.cafeclubtv.com/images/DOC-20240908-WA0020.-removebg-preview.png' },
        { id: 6, name: 'Sponsor 6', logo: 'https://www.cafeclubtv.com/images/LOGO%20MONO%20COMICS%20NEGRO%20(1).png' },
    ];

    sponsors.innerHTML = `
        <section class="my-12 bg-gradient-to-r from-red-800 via-gray-300 to-white p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold mb-6 text-white text-center">Nuestros Patrocinadores</h2>
            <div class="overflow-hidden relative">
                <div class="flex items-center justify-start space-x-4 transition-transform duration-300" id="sponsorSlider">
                    ${sponsorsData.map(sponsor => `
                        <div class="min-w-[120px] h-24 bg-white rounded-full shadow-md flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110">
                            <img src="${sponsor.logo}" alt="${sponsor.name}" class="max-w-full max-h-full object-contain">
                        </div>
                    `).join('')}
                </div>
                <button id="prevButton" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-500">
                    &lt;
                </button>
                <button id="nextButton" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-500">
                    &gt;
                </button>
            </div>
        </section>
    `;

    const sponsorSlider = document.getElementById('sponsorSlider');
    let currentPosition = 0;
    const slideWidth = 120 + 16; // Ancho de los logos + espacio entre ellos
    const intervalTime = 3000; // Cambiar cada 3 segundos

    function slideNext() {
        currentPosition += slideWidth;
        if (currentPosition >= sponsorSlider.scrollWidth - sponsorSlider.clientWidth) {
            currentPosition = 0; // Reinicia al comienzo cuando llega al final
        }
        sponsorSlider.style.transform = `translateX(-${currentPosition}px)`;
    }

    function slidePrev() {
        currentPosition -= slideWidth;
        if (currentPosition < 0) {
            currentPosition = sponsorSlider.scrollWidth - sponsorSlider.clientWidth; // Regresa al final
        }
        sponsorSlider.style.transform = `translateX(-${currentPosition}px)`;
    }

    // Utilizando requestAnimationFrame para un mejor rendimiento
    function startSliding() {
        setInterval(() => {
            requestAnimationFrame(slideNext);
        }, intervalTime);
    }

    // Controladores de eventos para los botones
    document.getElementById('prevButton').addEventListener('click', () => {
        requestAnimationFrame(slidePrev);
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        requestAnimationFrame(slideNext);
    });

    // Iniciar el desplazamiento automático
    startSliding();
}