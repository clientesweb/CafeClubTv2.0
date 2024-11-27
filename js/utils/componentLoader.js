function loadComponent(name) {
    return fetch(`/js/components/${name}.js`)
        .then(response => response.text())
        .then(text => {
            const script = document.createElement('script');
            script.textContent = text;
            document.head.appendChild(script);
        });
}

// Cargar todos los componentes
['Header', 'ImageCarousel', 'PlaylistSlider', 'ShortsSection', 'SponsorsSection', 'CountersSection', 'WhatsAppFloat', 'BottomNav', 'Footer'].forEach(loadComponent);
