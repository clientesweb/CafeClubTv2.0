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
        <section class="sponsors-section my-12 px-4 md:px-6 lg:px-8 py-6 rounded-lg shadow-lg bg-[#8B0000]">
            <h2 class="text-2xl font-bold mb-6 text-white text-center">Nuestros Patrocinadores</h2>
            <div class="overflow-hidden relative">
                <div class="flex gap-8 transition-transform duration-300 ease-in-out transform" id="sponsorSlider">
                    ${sponsorsData.map(sponsor => `
                        <div class="sponsor-card w-[180px] h-32 bg-red-600 rounded-lg shadow-xl flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105 transform hover:shadow-2xl">
                            <img src="${sponsor.logo}" alt="${sponsor.name}" class="max-w-full max-h-full object-contain">
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;

    const sponsorSlider = document.getElementById('sponsorSlider');
    let currentPosition = 0;
    const slideWidth = 180 + 24; // Ancho de los logos + espacio entre ellos
    const intervalTime = 3000; // Cambiar cada 3 segundos

    // Deslizar a la siguiente posición
    function slideNext() {
        currentPosition += slideWidth;
        if (currentPosition >= sponsorSlider.scrollWidth - sponsorSlider.clientWidth) {
            currentPosition = 0; // Reinicia al comienzo cuando llega al final
        }
        sponsorSlider.style.transform = `translateX(-${currentPosition}px)`;
    }

    // Iniciar el desplazamiento automático
    function startSliding() {
        setInterval(() => {
            requestAnimationFrame(slideNext);
        }, intervalTime);
    }

    // Iniciar el desplazamiento automático
    startSliding();
}