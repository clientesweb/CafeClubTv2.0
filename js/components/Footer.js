export default function Footer() {
    const footer = document.getElementById('footer');

    if (footer) {
        // Crear elementos de forma más eficiente
        const footerElement = document.createElement('footer');
        footerElement.className = "bg-gradient-to-r from-red-800 to-gray-300 text-white py-12";

        const container = document.createElement('div');
        container.className = "container mx-auto px-4 flex flex-wrap justify-between";

        // Logo y descripción
        const logoSection = document.createElement('div');
        logoSection.className = "w-full md:w-1/3 mb-8 md:mb-0";
        logoSection.innerHTML = `
            <img src="https://www.cafeclubtv.com/images/logi.svg" alt="Logo de Cafe Club Tv" class="h-16 mb-4">
            <p class="text-sm">Estamos comprometidos con ofrecerte la mejor experiencia en entretenimiento y servicios en línea.</p>
        `;
        container.appendChild(logoSection);

        // Redes sociales
        const socialSection = document.createElement('div');
        socialSection.className = "w-full md:w-1/3 mb-8 md:mb-0";
        socialSection.innerHTML = `
            <h3 class="text-lg font-semibold mb-4">Conéctate con Nosotros</h3>
            <div class="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="text-2xl hover:text-gray-300 transition-colors"><i class="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-2xl hover:text-gray-300 transition-colors"><i class="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com/cafeclubtv" target="_blank" rel="noopener noreferrer" class="text-2xl hover:text-gray-300 transition-colors"><i class="fab fa-instagram"></i></a>
                <a href="https://youtube.com/@cafeclubtv" target="_blank" rel="noopener noreferrer" class="text-2xl hover:text-gray-300 transition-colors"><i class="fab fa-youtube"></i></a>
            </div>
        `;
        container.appendChild(socialSection);

        // Mapa
        const mapSection = document.createElement('div');
        mapSection.className = "w-full md:w-1/3";
        mapSection.innerHTML = `
            <h3 class="text-lg font-semibold mb-4">Encuéntranos</h3>
            <div class="h-48 bg-gray-200 rounded-lg overflow-hidden">
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

        // Texto "Powered by Duality Domain"
        const poweredBy = document.createElement('div');
        poweredBy.className = "mt-8 text-center text-sm pb-16";
        poweredBy.innerHTML = `
            <p>Powered by <a href="https://dualitydomain.github.io/Dualitydomain/" target="_blank" rel="noopener noreferrer" class="underline">Duality Domain</a> | &copy; 2024 Todos los derechos reservados.</p>
        `;
        footerElement.appendChild(poweredBy);

        // Insertar el footer en el DOM
        footer.appendChild(footerElement);
    }
}