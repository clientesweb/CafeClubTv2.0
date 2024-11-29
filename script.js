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

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('main-video', {
            height: '360',
            width: '640',
            videoId: 'VIDEO_ID',
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
            const response = await fetch('URL_TO_YOUR_PLAYLIST_API');
            const videos = await response.json();
            renderPlaylist(videos);
        } catch (error) {
            console.error('Error loading playlist:', error);
        }
    }

    function renderPlaylist(videos) {
        videoPlaylist.innerHTML = videos.map((video, index) => `
            <div class="video-item cursor-pointer p-2 hover:bg-gray-700" data-video-id="${video.id}">
                <img src="${video.thumbnail}" alt="${video.title}" class="w-full h-auto mb-2">
                <p class="text-sm">${video.title}</p>
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
            const response = await fetch('URL_TO_YOUR_SHORTS_API');
            const shorts = await response.json();
            renderShorts(shorts);
        } catch (error) {
            console.error('Error loading shorts:', error);
        }
    }

    function renderShorts(shorts) {
        shortsContainer.innerHTML = shorts.map(short => `
            <div class="short-item flex-shrink-0 w-64 h-96 bg-black relative overflow-hidden snap-start">
                <video src="${short.videoUrl}" class="w-full h-full object-cover" loop muted></video>
                <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <p class="text-white text-sm">${short.title}</p>
                </div>
            </div>
        `).join('');

        shortsContainer.addEventListener('click', (e) => {
            const shortItem = e.target.closest('.short-item');
            if (shortItem) {
                const video = shortItem.querySelector('video');
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        });
    }

    loadShorts();
});

