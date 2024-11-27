export default function BottomNav() {
    const bottomNav = document.getElementById('bottom-nav');

    if (bottomNav) {
        const navItems = [
            { id: 'playlists', icon: 'fa-solid fa-list', label: 'Playlists' },
            { id: 'shorts', icon: 'fa-solid fa-video', label: 'Shorts' },
            { id: 'sponsors', icon: 'fa-solid fa-handshake', label: 'Sponsors' },
            { id: 'channel', icon: 'fa-solid fa-tv', label: 'Canal' },
            { id: 'contact', icon: 'fa-solid fa-envelope', label: 'Contacto' }
        ];

        bottomNav.innerHTML = `
            <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-40">
                <ul class="flex justify-around items-center py-2">
                    ${navItems.map(item => `
                        <li>
                            <a href="#${item.id}" class="flex flex-col items-center text-gray-600 hover:text-[#B22222] transition-colors">
                                <i class="${item.icon} text-2xl mb-1"></i>
                                <span class="text-xs font-medium">${item.label}</span>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </nav>
        `;

        const style = document.createElement('style');
        style.textContent = `
            nav {
                font-family: 'Helvetica Neue', Arial, sans-serif;
            }

            nav a {
                transition: color 0.3s ease-in-out;
            }

            nav a:hover {
                color: #B22222;
            }

            nav i {
                transition: transform 0.3s ease-in-out;
            }

            nav a:hover i {
                transform: scale(1.2);
            }
        `;
        document.head.appendChild(style);

        // Event listener para navegación
        const links = bottomNav.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
}