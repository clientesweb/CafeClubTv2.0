export default function BottomNav() {
    const bottomNav = document.getElementById('bottom-nav');

    // Verificar si el elemento existe antes de proceder
    if (bottomNav) {
        bottomNav.innerHTML = `
            <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-40">
                <div class="flex justify-around items-center py-2">
                    <a href="#playlists" class="flex flex-col items-center text-gray-500 hover:text-red-600 transition-colors duration-300">
                        <i class="fas fa-home text-xl mb-1"></i>
                        <span class="text-xs">Inicio</span>
                    </a>
                    <a href="#features" class="flex flex-col items-center text-gray-500 hover:text-red-600 transition-colors duration-300">
                        <i class="fas fa-calendar-alt text-xl mb-1"></i>
                        <span class="text-xs">Eventos</span>
                    </a>
                    <a href="#shorts-section" class="flex flex-col items-center text-gray-500 hover:text-red-600 transition-colors duration-300">
                        <i class="fas fa-tags text-xl mb-1"></i>
                        <span class="text-xs">Ofertas</span>
                    </a>
                    <a href="#sponsors-section" class="flex flex-col items-center text-gray-500 hover:text-red-600 transition-colors duration-300">
                        <i class="fas fa-star text-xl mb-1"></i>
                        <span class="text-xs">Patrocinadores</span>
                    </a>
                    <a href="#cta" class="flex flex-col items-center text-gray-500 hover:text-red-600 transition-colors duration-300">
                        <i class="fas fa-envelope text-xl mb-1"></i>
                        <span class="text-xs">Contacto</span>
                    </a>
                </div>
            </nav>
        `;
    }
}