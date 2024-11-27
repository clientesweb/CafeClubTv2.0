export default function BottomNav() {
    const bottomNav = document.getElementById('bottom-nav');

    // Verificar si el elemento existe antes de proceder
    if (bottomNav) {
        bottomNav.innerHTML = `
            <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 transition-all duration-300 ease-in-out">
                <div class="max-w-screen-xl mx-auto px-4">
                    <ul class="flex justify-around items-center py-2">
                        <li>
                            <a href="#playlists" class="group flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition-all duration-300">
                                <span class="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span class="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                </span>
                                <span class="text-xs font-medium">Inicio</span>
                            </a>
                        </li>
                        <li>
                            <a href="#features" class="group flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition-all duration-300">
                                <span class="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <span class="text-xs font-medium">Eventos</span>
                            </a>
                        </li>
                        <li>
                            <a href="#shorts-section" class="group flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition-all duration-300">
                                <span class="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span class="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                </span>
                                <span class="text-xs font-medium">Ofertas</span>
                            </a>
                        </li>
                        <li>
                            <a href="#sponsors-section" class="group flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition-all duration-300">
                                <span class="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </span>
                                <span class="text-xs font-medium">Patrocinadores</span>
                            </a>
                        </li>
                        <li>
                            <a href="#cta" class="group flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition-all duration-300">
                                <span class="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span class="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                </span>
                                <span class="text-xs font-medium">Contacto</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        `;

        // Añadir efecto de desplazamiento suave
        const links = bottomNav.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Añadir efecto de resaltado activo
        const sections = ['playlists', 'features', 'shorts-section', 'sponsors-section', 'cta'];
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        current = section;
                    }
                }
            });

            links.forEach(link => {
                link.classList.remove('text-red-600');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('text-red-600');
                }
            });
        });

        // Añadir efecto de ocultamiento al desplazar hacia abajo
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                bottomNav.style.transform = 'translateY(100%)';
            } else {
                bottomNav.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    }
}