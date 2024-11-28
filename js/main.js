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
    let player;

    function onYouTubeIframeAPIReady() {
        loadPlaylist();
        loadShorts();
    }

    function loadPlaylist() {
        fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${livePlaylistId}&key=AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0`)
            .then(response => response.json())
            .then(data => {
                const mainVideoContainer = document.getElementById('main-video');
                const playlistContainer = document.getElementById('video-playlist');

                // Cargar el video principal
                const mainVideoId = data.items[0].snippet.resourceId.videoId;
                player = new YT.Player('main-video', {
                    height: '360',
                    width: '640',
                    videoId: mainVideoId,
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
        fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${shortsPlaylistId}&key=YOUR_API_KEY`)
            .then(response => response.json())
            .then(data => {
                const shortsContainer = document.getElementById('shorts-container');

                shortsContainer.innerHTML = ''; // Limpiar el contenedor
                data.items.forEach((item) => {
                    const videoId = item.snippet.resourceId.videoId;
                    const thumbnailUrl = item.snippet.thumbnails.medium.url;
                    const title = item.snippet.title;

                    const shortElement = document.createElement('div');
                    shortElement.classList.add('short-video');
                    shortElement.innerHTML = `
                        <img src="${thumbnailUrl}" alt="${title}">
                        <p>${title}</p>
                    `;
                    shortElement.addEventListener('click', () => {
                        window.open(`https://www.youtube.com/shorts/${videoId}`, '_blank');
                    });

                    shortsContainer.appendChild(shortElement);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

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

