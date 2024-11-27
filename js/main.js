import Header from './components/Header.js';
import Carousel from './components/Carousel.js';
import Playlists from './components/Playlists.js';
import Shorts from './components/Shorts.js';
import Sponsors from './components/Sponsors.js';
import Counters from './components/Counters.js';
import Footer from './components/Footer.js';
import WhatsAppFloat from './components/WhatsAppFloat.js';
import BottomNav from './components/BottomNav.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar los componentes
    Header();
    Carousel();
    Playlists();
    Shorts();
    Sponsors();
    Counters();
    Footer();
    WhatsAppFloat();
    BottomNav();

    // Manejo del preloader
    const preloader = document.getElementById('preloader');

    // Simula la carga (puedes reemplazar esto con tu lógica de carga)
    setTimeout(() => {
        // Oculta el preloader una vez que el contenido está cargado
        preloader.style.display = 'none';
    }, 2000); // Ajusta el tiempo según tus necesidades
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registrado con éxito:', registration.scope);
            }).catch((error) => {
                console.log('Fallo en el registro del Service Worker:', error);
            });
    });
}
if ('windowControlsOverlay' in navigator) {
    const overlayHeight = navigator.windowControlsOverlay.getTitlebarAreaRect().height;
    document.documentElement.style.setProperty('--window-controls-overlay-height', `${overlayHeight}px`);

    navigator.windowControlsOverlay.addEventListener('geometrychange', () => {
        const newOverlayHeight = navigator.windowControlsOverlay.getTitlebarAreaRect().height;
        document.documentElement.style.setProperty('--window-controls-overlay-height', `${newOverlayHeight}px`);
    });
}