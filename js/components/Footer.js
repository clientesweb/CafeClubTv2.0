export default function Footer() {
    const footer = document.getElementById('footer');

    if (footer) {
        const footerElement = document.createElement('footer');
        footerElement.className = "bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white py-16 relative overflow-hidden";

        // Add a subtle pattern overlay
        const patternOverlay = document.createElement('div');
        patternOverlay.className = "absolute inset-0 opacity-10";
        patternOverlay.style.backgroundImage = "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')";
        footerElement.appendChild(patternOverlay);

        const container = document.createElement('div');
        container.className = "container mx-auto px-4 flex flex-wrap justify-between relative z-10";

        // Logo and description
        const logoSection = document.createElement('div');
        logoSection.className = "w-full md:w-1/3 mb-12 md:mb-0 transform hover:scale-105 transition-transform duration-300";
        logoSection.innerHTML = `
            <img src="https://www.cafeclubtv.com/images/logi.svg" alt="Logo de Cafe Club Tv" class="h-20 mb-6 filter drop-shadow-lg">
            <p class="text-sm leading-relaxed text-gray-200 max-w-xs">Estamos comprometidos con ofrecerte la mejor experiencia en entretenimiento y servicios en línea. Descubre un mundo de contenido exclusivo y emocionante.</p>
        `;
        container.appendChild(logoSection);

        // Social media
        const socialSection = document.createElement('div');
        socialSection.className = "w-full md:w-1/3 mb-12 md:mb-0";
        socialSection.innerHTML = `
            <h3 class="text-xl font-bold mb-6 relative inline-block">
                Conéctate con Nosotros
                <span class="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </h3>
            <div class="flex space-x-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="text-3xl hover:text-gray-300 transition-colors transform hover:scale-110 duration-300"><i class="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-3xl hover:text-gray-300 transition-colors transform hover:scale-110 duration-300"><i class="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com/cafeclubtv" target="_blank" rel="noopener noreferrer" class="text-3xl hover:text-gray-300 transition-colors transform hover:scale-110 duration-300"><i class="fab fa-instagram"></i></a>
                <a href="https://youtube.com/@cafeclubtv" target="_blank" rel="noopener noreferrer" class="text-3xl hover:text-gray-300 transition-colors transform hover:scale-110 duration-300"><i class="fab fa-youtube"></i></a>
            </div>
        `;
        container.appendChild(socialSection);

        // Map
        const mapSection = document.createElement('div');
        mapSection.className = "w-full md:w-1/3";
        mapSection.innerHTML = `
            <h3 class="text-xl font-bold mb-6 relative inline-block">
                Encuéntranos
                <span class="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </h3>
            <div class="h-56 bg-gray-200 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.877027213511!2d-80.12933468429243!3d25.95361138391963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9acefaf2880f9%3A0xd11aa38e4d4d73f0!2sMystic%20Pointe%20Dr%2C%20Aventura%2C%20FL%2033180%2C%20EE.%20UU.!5e0!3m2!1ses!2sar!4v1694503364387!5m2!1ses!2sar"
                    width="100%" 
                    height="100%" 
                    style="border:0;" 
                    allowfullscreen 
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Ubicación de Cafe Club Tv">
                </iframe>
            </div>
        `;
        container.appendChild(mapSection);

        footerElement.appendChild(container);

        // "Powered by Duality Domain" text
        const poweredBy = document.createElement('div');
        poweredBy.className = "mt-16 text-center text-sm pb-8 relative z-10";
        poweredBy.innerHTML = `
            <p class="mb-2">Powered by <a href="https://dualitydomain.github.io/Dualitydomain/" target="_blank" rel="noopener noreferrer" class="underline hover:text-gray-300 transition-colors">Duality Domain</a></p>
            <p>&copy; ${new Date().getFullYear()} Cafe Club Tv. Todos los derechos reservados.</p>
        `;
        footerElement.appendChild(poweredBy);

        // Add a decorative element
        const decorativeElement = document.createElement('div');
        decorativeElement.className = "absolute bottom-0 left-0 w-full overflow-hidden leading-none transform rotate-180";
        decorativeElement.innerHTML = `
            <svg class="relative block w-full h-12" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff" fill-opacity="0.1"></path>
            </svg>
        `;
        footerElement.appendChild(decorativeElement);

        // Insert the footer into the DOM
        footer.innerHTML = ''; // Clear existing content
        footer.appendChild(footerElement);

        // Add hover effect to section titles
        const sectionTitles = footer.querySelectorAll('h3');
        sectionTitles.forEach(title => {
            title.addEventListener('mouseenter', () => {
                const underline = title.querySelector('span');
                underline.style.transform = 'scaleX(1)';
            });
            title.addEventListener('mouseleave', () => {
                const underline = title.querySelector('span');
                underline.style.transform = 'scaleX(0)';
            });
        });
    }
}