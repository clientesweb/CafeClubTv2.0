export default async function Shorts() {
    const shorts = document.getElementById('shorts');

    shorts.innerHTML = `
        <section class="my-12 px-4">
            <h2 class="text-3xl font-extrabold mb-6 text-center text-[#B22222]">Shorts</h2>
            <div class="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide" id="shorts-container">
                <!-- Espacios de carga inicial -->
                <div class="flex-none w-56 aspect-[9/16] bg-gray-300 rounded-lg shadow-lg animate-pulse"></div>
                <div class="flex-none w-56 aspect-[9/16] bg-gray-300 rounded-lg shadow-lg animate-pulse"></div>
                <div class="flex-none w-56 aspect-[9/16] bg-gray-300 rounded-lg shadow-lg animate-pulse"></div>
            </div>
        </section>
    `;

    const API_KEY = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0'; // Sustituye por tu clave API
    const PLAYLIST_ID = 'PLZ_v3bWMqpjFa0xI11mahmOCxPk_1TK2s'; // Sustituye por tu ID de playlist

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${API_KEY}`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        const shortsContainer = document.getElementById('shorts-container');
        const shortsData = data.items;

        if (!shortsData || shortsData.length === 0) {
            shortsContainer.innerHTML = '<p class="text-center text-gray-600">No se encontraron shorts en esta playlist.</p>';
            return;
        }

        // Selecciona los últimos 5 shorts e invierte su orden
        const latestShorts = shortsData.slice(-5).reverse();

        shortsContainer.innerHTML = latestShorts.map(short => `
            <div class="flex-none w-56 aspect-[9/16] rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl duration-300">
                <iframe
                    src="https://www.youtube.com/embed/${short.snippet.resourceId.videoId}"
                    title="${short.snippet.title}"
                    class="w-full h-full"
                    frameborder="0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching the shorts:', error);
        const shortsContainer = document.getElementById('shorts-container');
        shortsContainer.innerHTML = '<p class="text-center text-red-600">Error al cargar los shorts. Por favor, inténtalo de nuevo más tarde.</p>';
    }
}