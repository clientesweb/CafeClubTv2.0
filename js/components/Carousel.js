export default function Hero() {
    const hero = document.getElementById('hero');
    const images = [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1080&h=1920&q=80',
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1080&h=1920&q=80',
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1080&h=1920&q=80',
        'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1080&h=1920&q=80',
        'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1080&h=1920&q=80',
    ];

    let currentSlide = 0;

    hero.innerHTML = `
        <div class="absolute inset-0 z-0 flex transition-transform duration-1000 ease-in-out" id="slide-container">
            ${images.map((src, index) => `
                <img 
                    data-src="${src}" 
                    alt="Hero Image ${index + 1}" 
                    class="w-full h-full object-cover flex-shrink-0 lazy-load transition-opacity duration-1000 opacity-0"
                >
            `).join('')}
        </div>
    `;

    const slideContainer = hero.querySelector('#slide-container');
    const slides = hero.querySelectorAll('.lazy-load');

    function loadSlideImage(index) {
        const img = slides[index];
        if (!img.src) {
            img.src = img.getAttribute('data-src');
            img.onload = () => img.classList.add('opacity-100');
        }
    }

    function showSlide(index) {
        currentSlide = index;
        slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        loadSlideImage(currentSlide);
    }

    setInterval(() => {
        showSlide((currentSlide + 1) % images.length);
    }, 5000);

    loadSlideImage(0);

    function adjustHeight() {
        const headerHeight = document.getElementById('header').offsetHeight;
        hero.style.marginTop = `${headerHeight}px`;
        hero.style.height = `calc(100vh - ${headerHeight}px)`;
    }

    window.addEventListener('resize', adjustHeight);
    adjustHeight();
}