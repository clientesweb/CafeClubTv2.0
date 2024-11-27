export default function BottomNav() {
    const bottomNav = document.getElementById('bottom-nav');

    if (bottomNav) {
        const navItems = [
            { id: 'playlists', icon: 'fa-solid fa-list', label: 'Playlists', color: 'red' },
            { id: 'shorts', icon: 'fa-solid fa-video', label: 'Shorts', color: 'blue' },
            { id: 'sponsors', icon: 'fa-solid fa-handshake', label: 'Sponsors', color: 'purple' },
            { id: 'channel', icon: 'fa-solid fa-tv', label: 'Canal', color: 'orange' },
            { id: 'contact', icon: 'fa-solid fa-envelope', label: 'Contacto', color: 'pink' }
        ];

        bottomNav.innerHTML = `
            <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
                <div class="max-w-screen-xl mx-auto px-4">
                    <ul class="flex justify-around items-center py-2">
                        ${navItems.map(item => `
                            <li class="relative group">
                                <a href="#${item.id}" class="flex flex-col items-center p-2 transition-all duration-300">
                                    <span class="relative z-10">
                                        <i class="${item.icon} text-2xl mb-1 transition-transform duration-300 group-hover:scale-125"></i>
                                        <span class="absolute -top-1 -right-1 h-3 w-3 bg-${item.color}-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    </span>
                                    <span class="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">${item.label}</span>
                                    <span class="absolute inset-0 bg-${item.color}-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 z-0"></span>
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </nav>
        `;

        const links = bottomNav.querySelectorAll('a');
        let activeLink = null;

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

                if (activeLink) {
                    activeLink.classList.remove('active');
                }
                link.classList.add('active');
                activeLink = link;
            });
        });

        const sections = navItems.map(item => item.id);
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.7
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (activeLink) {
                        activeLink.classList.remove('active');
                    }
                    const newActiveLink = bottomNav.querySelector(`a[href="#${id}"]`);
                    if (newActiveLink) {
                        newActiveLink.classList.add('active');
                        activeLink = newActiveLink;
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) observer.observe(element);
        });

        // Añadir estilos dinámicos
        const style = document.createElement('style');
        style.textContent = `
            #bottom-nav a.active i {
                transform: translateY(-8px) scale(1.25);
            }
            #bottom-nav a.active .text-xs {
                opacity: 1;
            }
            #bottom-nav a.active span.absolute {
                transform: scale(1);
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            #bottom-nav a.active i {
                animation: pulse 2s infinite;
            }
        `;
        document.head.appendChild(style);
    }
}