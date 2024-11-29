'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const heroCarousel = document.getElementById('hero-carousel');
    const heroDots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;

    function showSlide(index) {
        heroCarousel.style.transform = `translateX(-${index * 100}%)`;
        heroDots.forEach((dot, i) => {
            dot.classList.toggle('opacity-100', i === index);
            dot.classList.toggle('opacity-50', i !== index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroDots.length;
        showSlide(currentSlide);
    }

    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    setInterval(nextSlide, 5000);

    const installButton = document.getElementById('installButton');
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installButton.style.display = 'block';
    });

    installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            deferredPrompt = null;
        }
    });

    const sponsorsSlider = document.getElementById('sponsors-slider');
    const prevSponsor = document.getElementById('prev-sponsor');
    const nextSponsor = document.getElementById('next-sponsor');
    let sponsorIndex = 0;

    function showSponsor(index) {
        sponsorsSlider.style.transform = `translateX(-${index * 100}%)`;
    }

    prevSponsor.addEventListener('click', () => {
        sponsorIndex = (sponsorIndex - 1 + 4) % 4;
        showSponsor(sponsorIndex);
    });

    nextSponsor.addEventListener('click', () => {
        sponsorIndex = (sponsorIndex + 1) % 4;
        showSponsor(sponsorIndex);
    });

    let player;
    const mainVideo = document.getElementById('main-video');
    const videoPlaylist = document.getElementById('video-playlist');
    const API_KEY = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0';
    const PLAYLIST_ID = 'PLZ_v3bWMqpjEYZDAFLI-0GuAH4BpA5PiL';
    const SHORTS_PLAYLIST_ID = 'PLZ_v3bWMqpjFa0xI11mahmOCxPk_1TK2s';

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('main-video', {
            height: '360',
            width: '640',
            playerVars: {
                listType: 'playlist',
                list: PLAYLIST_ID
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        loadPlaylist();
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            playNextVideo();
        }
    }

    async function loadPlaylist() {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`);
            const data = await response.json();
            renderPlaylist(data.items);
        } catch (error) {
            console.error('Error loading playlist:', error);
        }
    }

    function renderPlaylist(videos) {
        videoPlaylist.innerHTML = videos.map((item, index) => `
            <div class="video-item cursor-pointer p-2 hover:bg-gray-700" data-video-id="${item.snippet.resourceId.videoId}">
                <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}" class="w-full h-auto mb-2">
                <p class="text-sm">${item.snippet.title}</p>
            </div>
        `).join('');

        videoPlaylist.addEventListener('click', (e) => {
            const videoItem = e.target.closest('.video-item');
            if (videoItem) {
                const videoId = videoItem.dataset.videoId;
                player.loadVideoById(videoId);
            }
        });
    }

    function playNextVideo() {
        const currentVideo = videoPlaylist.querySelector('.playing');
        const nextVideo = currentVideo ? currentVideo.nextElementSibling : videoPlaylist.firstElementChild;
        if (nextVideo) {
            const videoId = nextVideo.dataset.videoId;
            player.loadVideoById(videoId);
            currentVideo?.classList.remove('playing');
            nextVideo.classList.add('playing');
        }
    }

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    const shortsContainer = document.getElementById('shorts-container');

    async function loadShorts() {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${SHORTS_PLAYLIST_ID}&key=${API_KEY}`);
            const data = await response.json();
            renderShorts(data.items);
        } catch (error) {
            console.error('Error loading shorts:', error);
        }
    }

    function renderShorts(shorts) {
        shortsContainer.innerHTML = shorts.map(item => `
            <div class="short-item flex-shrink-0 w-64 h-96 bg-black relative overflow-hidden snap-start">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/${item.snippet.resourceId.videoId}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                ></iframe>
                <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <p class="text-white text-sm">${item.snippet.title}</p>
                </div>
            </div>
        `).join('');
    }

    loadShorts();
});

