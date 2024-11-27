export default function Header() {
    const header = document.getElementById('header');

    function checkInstallable() {
        const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
        const isInstagram = /Instagram/.test(navigator.userAgent);
        return !isInstalled || isInstagram;
    }

    const isInstallable = checkInstallable();

    header.innerHTML = `
        <div class="bg-red-600 text-white py-2 text-center">
            <p>¡Bienvenido a Cafe Club TV! Disfruta de nuestro contenido exclusivo.</p>
        </div>
        <header class="bg-gray-200 bg-opacity-80 backdrop-blur-md text-gray-800 p-4 flex flex-col items-center justify-between shadow-md z-50">
            <div class="w-full flex justify-between items-center mb-4">
                <div class="social-icons flex space-x-4">
                    <a href="https://facebook.com/cafeclubtv" class="text-gray-600 hover:text-red-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        <span class="sr-only">Facebook</span>
                    </a>
                    <a href="https://instagram.com/cafeclubtv" class="text-gray-600 hover:text-red-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        <span class="sr-only">Instagram</span>
                    </a>
                    <a href="https://twitter.com/cafeclubtv" class="text-gray-600 hover:text-red-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                        <span class="sr-only">Twitter</span>
                    </a>
                </div>
                ${isInstallable ? `
                    <button id="install-button" class="bg-gradient-to-r from-red-800 via-red-600 to-red-500 text-white rounded-full px-6 py-2 text-sm font-medium transition-transform duration-200 hover:scale-105 shadow-lg flex items-center">
                        <i class="fas fa-download mr-2"></i> Instalar App
                    </button>
                ` : ''}
            </div>
            <div class="logo flex flex-col items-center space-y-2">
                <img src="https://www.cafeclubtv.com/images/logi.svg" alt="Logo de Cafe Club Tv" class="h-16 transition-transform duration-300 hover:scale-105">
                <span class="text-xl font-semibold">Cafe Club TV</span>
            </div>
        </header>
    `;

    if (isInstallable) {
        let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            const installButton = header.querySelector('#install-button');

            installButton.addEventListener('click', () => {
                installButton.style.display = 'none';
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('El usuario aceptó la instalación');
                    } else {
                        console.log('El usuario rechazó la instalación');
                    }
                    deferredPrompt = null;
                });
            });
        });
    }
}