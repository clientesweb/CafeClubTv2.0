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
    function loadYouTubeAPI() {
        return new Promise((resolve, reject) => {
            if (window.YT) {
                resolve(window.YT);
                return;
            }

            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                resolve(window.YT);
            };

            tag.onerror = () => {
                reject(new Error('Error al cargar la API de YouTube'));
            };
        });
    }

    async function initializeYouTube() {
        try {
            await loadYouTubeAPI();
            await Promise.all([loadPlaylist(), loadShorts()]);
        } catch (error) {
            console.error('Error inicializando YouTube:', error);
        }
    }

    async function loadPlaylist() {
        const mainVideoContainer = document.getElementById('main-video');
        const playlistContainer = document.getElementById('video-playlist');
        
        if (!playlistContainer) return;

        playlistContainer.innerHTML = `
            <div class="text-center py-4">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p class="text-white">Cargando playlist...</p>
            </div>
        `;

        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${livePlaylistId}&key=${apiKey}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.items?.length) {
                throw new Error('No se encontraron videos');
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
            data.items.forEach((item) => {
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
        } catch (error) {
            console.error('Error cargando playlist:', error);
            playlistContainer.innerHTML = `
                <div class="text-center py-4">
                    <div class="text-red-500 mb-2">
                        <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p class="text-white mb-4">Error al cargar la playlist</p>
                    <button onclick="loadPlaylist()" class="bg-white text-[var(--primary-color)] px-4 py-2 rounded hover:bg-gray-100 transition-colors">
                        Reintentar
                    </button>
                </div>
            `;
        }
    }

    async function loadShorts() {
        const shortsContainer = document.getElementById('shorts-container');
        
        if (!shortsContainer) return;

        shortsContainer.innerHTML = `
            <div class="col-span-full text-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)] mx-auto mb-2"></div>
                <p>Cargando shorts...</p>
            </div>
        `;

        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${shortsPlaylistId}&key=${apiKey}&order=date`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.items?.length) {
                throw new Error('No se encontraron shorts');
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
                    openShortModal(videoId);
                });

                shortsContainer.appendChild(shortElement);
            });
        } catch (error) {
            console.error('Error cargando shorts:', error);
            shortsContainer.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                        <div class="text-red-600 mb-4">
                            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">Error al cargar los shorts</h3>
                        <p class="text-gray-600 mb-4">Lo sentimos, no pudimos cargar los shorts en este momento.</p>
                        <button 
                            onclick="loadShorts()"
                            class="bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white font-bold py-2 px-4 rounded transition-colors">
                            <i class="fas fa-redo mr-2"></i>Intentar de nuevo
                        </button>
                    </div>
                </div>
            `;
        }
    }

    function openShortModal(videoId) {
        const modal = document.getElementById('shorts-modal');
        const playerContainer = document.getElementById('shorts-player-container');
        
        if (!modal || !playerContainer) return;

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
    }

    function closeShortModal() {
        const modal = document.getElementById('shorts-modal');
        const playerContainer = document.getElementById('shorts-player-container');
        
        if (!modal || !playerContainer) return;

        playerContainer.innerHTML = '';
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
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