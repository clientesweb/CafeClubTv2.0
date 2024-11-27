export default function Header() {
  // Función para verificar si la app es instalable
  function checkInstallable() {
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    const isInstagram = /Instagram/.test(navigator.userAgent);
    return !isInstalled && !isInstagram;
  }

  // Función para crear el banner superior
  function createTopBanner() {
    const banner = document.createElement('div');
    banner.className = 'bg-[#8B0000] text-white py-2 px-4';
    banner.innerHTML = `
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">¡Descubre nuestra nueva programación! 🎉</span>
          <button class="bg-transparent hover:bg-white/20 text-white font-semibold hover:text-white py-1 px-2 border border-white hover:border-transparent rounded text-xs">
            Ver ahora
          </button>
        </div>
        <button class="text-white/80 hover:text-white" aria-label="Cerrar banner">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    `;
    document.body.insertBefore(banner, document.body.firstChild);

    // Evento para cerrar el banner
    banner.querySelector('button[aria-label="Cerrar banner"]').addEventListener('click', () => {
      banner.remove();
    });
  }

  // Función para crear los iconos de redes sociales
  function createSocialIcons() {
    return `
      <div class="flex items-center gap-4">
        <a href="#" class="text-gray-600 hover:text-[#8B0000] transition-colors" aria-label="Síguenos en Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        </a>
        <a href="#" class="text-gray-600 hover:text-[#8B0000] transition-colors" aria-label="Síguenos en Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9zM9.5 8h5" />
          </svg>
        </a>
        <a href="#" class="text-gray-600 hover:text-[#8B0000] transition-colors" aria-label="Síguenos en Twitter">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
        </a>
        <a href="#" class="text-gray-600 hover:text-[#8B0000] transition-colors" aria-label="Síguenos en Youtube">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </a>
      </div>
    `;
  }

  // Crear el banner superior
  createTopBanner();

  // Obtener el elemento header
  const header = document.getElementById('header');

  // Verificar si la app es instalable
  const isInstallable = checkInstallable();

  // Crear el contenido del header
  header.innerHTML = `
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div class="container mx-auto">
        <div class="flex items-center justify-between py-4">
          ${createSocialIcons()}
          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img src="https://www.cafeclubtv.com/images/logi.svg" alt="Logo de Cafe Club Tv" class="h-24 w-24 transition-transform duration-300 hover:scale-105">
          </div>
          ${isInstallable ? `
            <button id="install-button" class="bg-gradient-to-r from-[#8B0000] to-red-600 text-white rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 hover:from-[#700000] hover:to-red-700 shadow-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Instalar App
            </button>
          ` : ''}
        </div>
      </div>
    </header>
  `;

  // Manejar la instalación de la app
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