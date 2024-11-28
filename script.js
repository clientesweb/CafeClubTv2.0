document.addEventListener('DOMContentLoaded', () => {
    // Hero carousel
    const heroCarousel = document.getElementById('hero-carousel');
    const heroSlides = heroCarousel.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let startX;
    let isDragging = false;

    function showSlide(index) {
        heroCarousel.style.transform = `translateX(-${index * 100}%)`;
        heroDots.forEach((dot, i) => {
            dot.classList.toggle('opacity-100', i === index);
            dot.classList.toggle('opacity-50', i !== index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % heroSlides.length);
    }

    function prevSlide() {
        showSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
    }

    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    heroCarousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    heroCarousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            isDragging = false;
        }
    });

    heroCarousel.addEventListener('touchend', () => {
        isDragging = false;
    });

    setInterval(nextSlide, 5000);

    // YouTube API integration
    const livePlaylistId = 'PLZ_v3bWMqpjEYZDAFLI-0GuAH4BpA5PiL';
    const shortsPlaylistId = 'PLZ_v3bWMqpjFa0xI11mahmOCxPk_1TK2s';
    const apiKey = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0';
    let player;

    function onYouTubeIframeAPIReady() {
        loadPlaylist();
        loadShorts();
    }

    function loadPlaylist() {
        fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${livePlaylistId}&key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const mainVideoContainer = document.getElementById('main-video');
                const playlistContainer = document.getElementById('video-playlist');

                // Cargar el video principal
                const mainVideoId = data.items[0].snippet.resourceId.videoId;
                player = new YT.Player('main-video', {
                    height: '100%',
                    width: '100%',
                    videoId: mainVideoId,
                    playerVars: {
                        autoplay: 0,
                        controls: 1,
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0
                    }
                });

                // Cargar la lista de reproducción
                playlistContainer.innerHTML = ''; // Limpiar el contenedor
                data.items.forEach((item, index) => {
                    const videoId = item.snippet.resourceId.videoId;
                    const thumbnailUrl = item.snippet.thumbnails.medium.url;
                    const title = item.snippet.title;

                    const videoElement = document.createElement('div');
                    videoElement.classList.add('playlist-video');
                    videoElement.innerHTML = `
                        <img src="${thumbnailUrl}" alt="${title}">
                        <p>${title}</p>
                    `;
                    videoElement.addEventListener('click', () => {
                        player.loadVideoById(videoId);
                    });

                    playlistContainer.appendChild(videoElement);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    function loadShorts() {
        fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${shortsPlaylistId}&key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const shortsContainer = document.getElementById('shorts-container');
                
                // Ordenar los items por fecha de publicación (más reciente primero)
                const sortedItems = data.items.sort((a, b) => {
                    return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt);
                });

                // Tomar solo los 5 más recientes
                const recentShorts = sortedItems.slice(0, 5);

                shortsContainer.innerHTML = ''; // Limpiar el contenedor
                recentShorts.forEach((item) => {
                    const videoId = item.snippet.resourceId.videoId;

                    const shortElement = document.createElement('div');
                    shortElement.classList.add('short-video');
                    shortElement.innerHTML = `
                        <div class="short-wrapper">
                            <iframe 
                                src="https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&mute=1&loop=1&playlist=${videoId}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                            ></iframe>
                        </div>
                    `;

                    shortsContainer.appendChild(shortElement);
                });

                // Inicializar el carrusel de Shorts
                initShortsCarousel();
            })
            .catch(error => console.error('Error:', error));
    }

    function initShortsCarousel() {
        const shortsContainer = document.getElementById('shorts-container');
        const shorts = shortsContainer.querySelectorAll('.short-video');
        let currentShortIndex = 0;

        function showShort(index) {
            shorts.forEach((short, i) => {
                short.style.transform = `translateX(${100 * (i - index)}%)`;
            });
        }

        function nextShort() {
            currentShortIndex = (currentShortIndex + 1) % shorts.length;
            showShort(currentShortIndex);
        }

        function prevShort() {
            currentShortIndex = (currentShortIndex - 1 + shorts.length) % shorts.length;
            showShort(currentShortIndex);
        }

        // Navegación con botones
        document.getElementById('prev-short').addEventListener('click', prevShort);
        document.getElementById('next-short').addEventListener('click', nextShort);

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevShort();
            if (e.key === 'ArrowRight') nextShort();
        });

        // Mostrar el primer short
        showShort(currentShortIndex);
    }

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    // Sponsors slider
    const sponsorsSlider = document.querySelector('#sponsors-slider .flex');
    let sponsorIndex = 0;

    function moveSponsors() {
        sponsorIndex = (sponsorIndex + 1) % 4; // 4 es el número total de patrocinadores
        sponsorsSlider.style.transform = `translateX(-${sponsorIndex * 25}%)`;
    }

    setInterval(moveSponsors, 3000); // Cambia cada 3 segundos

    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});