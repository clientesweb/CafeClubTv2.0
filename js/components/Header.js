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
    banner.className = 'bg-[#8B0000] text-white py-2 px-6';
    banner.innerHTML = `
      <div class="container mx-auto flex justify-center items-center">
        <!-- Mensaje y botón saber más centrados -->
        <div class="text-center">
          <p class="text-sm font-medium">¡Premia tu fidelidad, gana dinero en nuestra Ruleta!</p>
          <button class="bg-transparent text-white border border-white hover:bg-white/20 hover:text-white rounded py-1 px-4 text-xs transition-all">
            Saber más
          </button>
        </div>
      </div>
    `;
    document.body.insertBefore(banner, document.body.firstChild);

    // Evento para cerrar el banner
    banner.querySelector('button').addEventListener('click', () => {
      banner.remove();
    });
  }

  // Función para crear el contenido del header
  function createHeader() {
    const header = document.getElementById('header');
    const isInstallable = checkInstallable();

    // Crear el contenido del header
    header.innerHTML = `
      <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div class="container mx-auto flex items-center justify-between py-4">
          <!-- Botón Instalar App alineado a la izquierda -->
          ${isInstallable ? `
            <div class="flex justify-start w-1/4">
              <button id="install-button" class="bg-[#8B0000] text-white rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 hover:bg-[#700000]">
                Instalar App
              </button>
            </div>
          ` : ''}

          <!-- Logo centrado al medio -->
          <div class="flex justify-center w-1/2">
            <img src="https://www.cafeclubtv.com/images/logi.svg" alt="Logo de Cafe Club TV" class="h-16 w-16 transition-transform duration-300 hover:scale-105">
          </div>

          <!-- Iconos de redes sociales alineados a la derecha -->
          <div class="flex gap-6 text-gray-600 w-1/4 justify-end">
            <a href="#" class="hover:text-[#8B0000]" aria-label="Síguenos en Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="hover:text-[#8B0000]" aria-label="Síguenos en Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="hover:text-[#8B0000]" aria-label="Síguenos en Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="hover:text-[#8B0000]" aria-label="Síguenos en Youtube">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </header>
    `;
  }

  // Crear el banner superior y el header
  createTopBanner();
  createHeader();

  // Manejar la instalación de la app
  if (checkInstallable()) {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      const installButton = document.querySelector('#install-button');

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