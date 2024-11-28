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

    // Touch events for mobile
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

    // Auto advance slides
    setInterval(nextSlide, 5000);

    // YouTube API integration
    const livePlaylistId = 'PLZ_v3bWMqpjEYZDAFLI-0GuAH4BpA5PiL';
    const shortsPlaylistId = 'PLZ_v3bWMqpjFa0xI11mahmOCxPk_1TK2s';
    const apiKey = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0';
    let player;

    // Cargar la API de YouTube
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
        loadPlaylist();
        loadShorts();
    };

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
                    },
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                });

                // Cargar la lista de reproducción
                playlistContainer.innerHTML = '';
                data.items.forEach((item, index) => {
                    const videoId = item.snippet.resourceId.videoId;
                    const thumbnailUrl = item.snippet.thumbnails.medium.url;
                    const title = item.snippet.title;

                    const videoElement = document.createElement('div');
                    videoElement.classList.add('playlist-video', 'cursor-pointer', 'hover:opacity-75', 'transition-opacity');
                    videoElement.innerHTML = `
                        <div class="relative">
                            <img src="${thumbnailUrl}" alt="${title}" class="w-full rounded-lg">
                            <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p class="mt-2 text-sm font-medium line-clamp-2">${title}</p>
                    `;
                    videoElement.addEventListener('click', () => {
                        player.loadVideoById(videoId);
                    });

                    playlistContainer.appendChild(videoElement);
                });
            })
            .catch(error => console.error('Error loading playlist:', error));
    }

    function loadShorts() {
        fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${shortsPlaylistId}&key=${apiKey}&order=date`)
            .then(response => response.json())
            .then(data => {
                const shortsContainer = document.getElementById('shorts-container');
                shortsContainer.innerHTML = '';

                // Crear contenedor para el carrusel de shorts
                const shortsWrapper = document.createElement('div');
                shortsWrapper.classList.add('shorts-wrapper', 'flex', 'gap-4', 'overflow-x-auto', 'pb-4');
                
                data.items.forEach((item) => {
                    const videoId = item.snippet.resourceId.videoId;
                    const thumbnailUrl = item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium.url;
                    const title = item.snippet.title;

                    const shortElement = document.createElement('div');
                    shortElement.classList.add('short-video', 'flex-shrink-0', 'w-[200px]');
                    shortElement.innerHTML = `
                        <div class="relative aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer">
                            <img src="${thumbnailUrl}" alt="${title}" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <p class="mt-2 text-sm font-medium line-clamp-2">${title}</p>
                    `;

                    shortElement.addEventListener('click', () => {
                        openShortInModal(videoId);
                    });

                    shortsWrapper.appendChild(shortElement);
                });

                shortsContainer.appendChild(shortsWrapper);
            })
            .catch(error => console.error('Error loading shorts:', error));
    }

    // Modal para reproducir shorts
    function openShortInModal(videoId) {
        const modal = document.createElement('div');
        modal.classList.add('fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center', 'bg-black', 'bg-opacity-75');
        
        modal.innerHTML = `
            <div class="relative w-full max-w-md mx-4 aspect-[9/16]">
                <div class="absolute top-4 right-4 z-10">
                    <button class="text-white hover:text-gray-300" id="close-modal">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <iframe
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
                    class="w-full h-full rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        modal.querySelector('#close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }
        });
    }

    // Player events
    function onPlayerReady(event) {
        // El reproductor está listo
        console.log('Player ready');
    }

    function onPlayerStateChange(event) {
        // Manejar cambios de estado del reproductor
        if (event.data === YT.PlayerState.ENDED) {
            // El video ha terminado
            console.log('Video ended');
        }
    }

    // Sponsors slider
    const sponsorsSlider = document.querySelector('#sponsors-slider .flex');
    let sponsorIndex = 0;

    function moveSponsors() {
        sponsorIndex = (sponsorIndex + 1) % 4;
        sponsorsSlider.style.transform = `translateX(-${sponsorIndex * 25}%)`;
    }

    setInterval(moveSponsors, 3000);

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