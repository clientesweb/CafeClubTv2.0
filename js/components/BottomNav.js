export default function BottomNav() {
    const bottomNav = document.getElementById('bottom-nav');

    // Verificar si el elemento existe antes de proceder
    if (bottomNav) {
        const navItems = [
            { id: 'playlists', icon: 'home', label: 'Inicio', notificationColor: 'red' },
            { id: 'features', icon: 'calendar', label: 'Eventos' },
            { id: 'shorts-section', icon: 'tag', label: 'Ofertas', notificationColor: 'green' },
            { id: 'sponsors-section', icon: 'users', label: 'Patrocinadores' },
            { id: 'cta', icon: 'mail', label: 'Contacto', notificationColor: 'blue' }
        ];

        bottomNav.innerHTML = `
            <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 transition-all duration-300 ease-in-out">
                <div class="max-w-screen-xl mx-auto px-4">
                    <ul class="flex justify-around items-center py-2">
                        ${navItems.map(item => `
                            <li>
                                <a href="#${item.id}" class="group flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition-all duration-300">
                                    <span class="relative">
                                        <i data-feather="${item.icon}" class="h-6 w-6 mb-1 transition-transform duration-300 group-hover:scale-110"></i>
                                        ${item.notificationColor ? `
                                            <span class="absolute -top-1 -right-1 h-3 w-3 bg-${item.notificationColor}-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                        ` : ''}
                                    </span>
                                    <span class="text-xs font-medium">${item.label}</span>
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </nav>
        `;

        // Inicializar los iconos de Feather
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

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
        const sections = navItems.map(item => item.id);
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