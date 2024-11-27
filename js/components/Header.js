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
    banner.className = 'bg-[#8B0000] text-white py-4 px-6';
    banner.innerHTML = `
      <div class="container mx-auto flex items-center justify-between">
        <div class="text-center">
          <p class="text-sm font-medium">¡Premia tu fidelidad, gana dinero en nuestra Ruleta!</p>
          <button class="mt-2 bg-transparent text-white border border-white hover:bg-white/20 hover:text-white rounded py-1 px-4 text-xs transition-all">
            Saber más
          </button>
        </div>
        <button class="ml-4 text-white/80 hover:text-white" aria-label="Cerrar banner">
          <i class="fas fa-times"></i>
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
      <div class="flex items-center gap-6">
        <a href="#" class="text-gray-600 hover:text-white transition-colors" aria-label="Síguenos en Facebook">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#" class="text-gray-600 hover:text-white transition-colors" aria-label="Síguenos en Instagram">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="#" class="text-gray-600 hover:text-white transition-colors" aria-label="Síguenos en Twitter">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#" class="text-gray-600 hover:text-white transition-colors" aria-label="Síguenos en Youtube">
          <i class="fab fa-youtube"></i>
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
          <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src="https://www.cafeclubtv.com/images/logi.svg" alt="Logo de Cafe Club Tv" class="h-20 w-20 transition-transform duration-300 hover:scale-110">
          </div>
          ${isInstallable ? `
            <button id="install-button" class="bg-gradient-to-r from-[#8B0000] to-red-600 text-white rounded-full px-8 py-2 text-sm font-medium transition-all duration-300 hover:from-[#700000] hover:to-red-700 shadow-lg flex items-center">
              <i class="fas fa-download mr-2"></i>
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