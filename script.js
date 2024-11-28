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

    // Auto advance slides
    const slideInterval = setInterval(nextSlide, 5000);

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
        const mainVideoContainer = document.getElementById('main-video');
        const playlistContainer = document.getElementById('video-playlist');
        
        // Mostrar estado de carga
        playlistContainer.innerHTML = '<div class="text-white text-center py-4">Cargando playlist...</div>';

        fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${livePlaylistId}&key=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(data => {
                if (!data.items || data.items.length === 0) {
                    playlistContainer.innerHTML = '<div class="text-white text-center py-4">No hay videos disponibles</div>';
                    return;
                }

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
                        'onStateChange': onPlayerStateChange,
                        'onError': onPlayerError
                    }
                });

                // Cargar la lista de reproducción
                playlistContainer.innerHTML = '';
                data.items.forEach((item, index) => {
                    const videoId = item.snippet.resourceId.videoId;
                    const thumbnailUrl = item.snippet.thumbnails.medium.url;
                    const title = item.snippet.title;

                    const videoElement = document.createElement('div');
                    videoElement.className = 'playlist-video group cursor-pointer p-2 rounded hover:bg-white/10 transition-colors';
                    videoElement.innerHTML = `
                        <div class="flex gap-3">
                            <div class="relative flex-shrink-0">
                                <img src="${thumbnailUrl}" alt="${title}" class="w-32 rounded-lg">
                                <div class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="flex-grow">
                                <h3 class="text-sm font-medium line-clamp-2 text-white">${title}</h3>
                            </div>
                        </div>
                    `;
                    videoElement.addEventListener('click', () => {
                        player.loadVideoById(videoId);
                    });

                    playlistContainer.appendChild(videoElement);
                });
            })
            .catch(error => {
                console.error('Error loading playlist:', error);
                playlistContainer.innerHTML = `
                    <div class="text-red-500 text-center py-4">
                        Error al cargar la playlist. Por favor, intenta de nuevo más tarde.
                    </div>
                `;
            });
    }

    function loadShorts() {
        const shortsContainer = document.getElementById('shorts-container');
        
        // Mostrar estado de carga
        shortsContainer.innerHTML = '<div class="col-span-full text-center py-4">Cargando shorts...</div>';
        
        fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${shortsPlaylistId}&key=${apiKey}&order=date`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(data => {
                if (!data.items || data.items.length === 0) {
                    shortsContainer.innerHTML = '<div class="col-span-full text-center py-4">No hay shorts disponibles</div>';
                    return;
                }

                shortsContainer.innerHTML = '';
                
                data.items.forEach((item) => {
                    const videoId = item.snippet.resourceId.videoId;
                    const thumbnailUrl = item.snippet.thumbnails.maxres?.url || 
                                       item.snippet.thumbnails.standard?.url || 
                                       item.snippet.thumbnails.high?.url || 
                                       item.snippet.thumbnails.medium.url;
                    const title = item.snippet.title;

                    const shortElement = document.createElement('div');
                    shortElement.className = 'short-video relative aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300';
                    shortElement.innerHTML = `
                        <img 
                            src="${thumbnailUrl}" 
                            alt="${title}" 
                            class="w-full h-full object-cover"
                            loading="lazy"
                        >
                        <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                            <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <svg class="w-12 h-12 text-white mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </div>
                            <h3 class="text-white text-sm font-medium line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                ${title}
                            </h3>
                        </div>
                    `;

                    shortElement.addEventListener('click', () => {
                        const modal = document.getElementById('shorts-modal');
                        const playerContainer = document.getElementById('shorts-player-container');
                        
                        playerContainer.innerHTML = `
                            <iframe
                                src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
                                class="w-full h-full rounded-xl"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                        `;
                        
                        modal.classList.remove('hidden');
                        modal.classList.add('flex');
                        document.body.style.overflow = 'hidden';
                    });

                    shortsContainer.appendChild(shortElement);
                });
            })
            .catch(error => {
                console.error('Error loading shorts:', error);
                shortsContainer.innerHTML = `
                    <div class="col-span-full text-center py-4 text-red-600">
                        Error al cargar los shorts. Por favor, intenta de nuevo más tarde.
                    </div>
                `;
                addReloadButton();
            });
    }

    // Player events
    function onPlayerReady(event) {
        console.log('Player ready');
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            console.log('Video ended');
            // Opcional: reproducir siguiente video
            const nextVideo = document.querySelector('.playlist-video:nth-child(2)');
            if (nextVideo) {
                nextVideo.click();
            }
        }
    }

    function onPlayerError(event) {
        console.error('Player error:', event.data);
        const mainVideoContainer = document.getElementById('main-video');
        mainVideoContainer.innerHTML = `
            <div class="flex items-center justify-center h-full bg-black text-white">
                <p>Error al cargar el video. Por favor, intenta con otro video.</p>
            </div>
        `;
    }

    // Modal events
    const modal = document.getElementById('shorts-modal');
    const closeButton = document.getElementById('close-modal');
    
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    function closeModal() {
        const modal = document.getElementById('shorts-modal');
        const playerContainer = document.getElementById('shorts-player-container');
        if (playerContainer) {
            playerContainer.innerHTML = '';
        }
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
    }

    // Sponsors slider
    const sponsorsSlider = document.querySelector('#sponsors-slider .flex');
    let sponsorIndex = 0;

    function moveSponsors() {
        if (sponsorsSlider) {
            sponsorIndex = (sponsorIndex + 1) % 4;
            sponsorsSlider.style.transform = `translateX(-${sponsorIndex * 25}%)`;
        }
    }

    const sponsorsInterval = setInterval(moveSponsors, 3000);

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
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Función auxiliar para recargar shorts
    function addReloadButton() {
        const shortsContainer = document.getElementById('shorts-container');
        const reloadButton = document.createElement('button');
        reloadButton.className = 'col-span-full mx-auto mt-4 bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white font-bold py-2 px-4 rounded';
        reloadButton.textContent = 'Recargar Shorts';
        reloadButton.onclick = loadShorts;
        shortsContainer.appendChild(reloadButton);
    }

    // Cleanup function
    return () => {
        clearInterval(slideInterval);
        clearInterval(sponsorsInterval);
        if (player && player.destroy) {
            player.destroy();
        }
    };
});