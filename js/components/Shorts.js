export default async function Shorts() {
    const shorts = document.getElementById('shorts');

    shorts.innerHTML = `
        <section class="my-12">
            <h2 class="text-2xl font-bold mb-6 text-center">Shorts</h2>
            <div class="flex overflow-x-auto space-x-4 pb-4" id="shorts-container">
                <div class="flex-none w-48 h-80 bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"></div>
                <div class="flex-none w-48 h-80 bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"></div>
                <div class="flex-none w-48 h-80 bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"></div>
            </div>
        </section>
    `;

    const API_KEY = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0'; // Reemplaza esto con tu clave API
    const PLAYLIST_ID = 'PLZ_v3bWMqpjFa0xI11mahmOCxPk_1TK2s'; // Reemplaza esto con la ID de tu playlist

    try {
        // Obtener todos los elementos de la playlist (puedes ajustar maxResults si tienes más de 50 elementos)
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${API_KEY}`);

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        const shortsContainer = document.getElementById('shorts-container');
        const shortsData = data.items;

        // Verificar si hay shorts en la playlist
        if (!shortsData || shortsData.length === 0) {
            shortsContainer.innerHTML = '<p class="text-center text-gray-600">No shorts found in this playlist.</p>';
            return;
        }

        // Ordenar shorts por fecha de publicación (más reciente primero)
        const latestShorts = shortsData.sort((a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)).slice(0, 5);

        shortsContainer.innerHTML = latestShorts.map(short => `
            <div class="flex-none w-48 h-80 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 duration-300">
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
        console.error('Error fetching the playlist:', error);
        const shortsContainer = document.getElementById('shorts-container');
        shortsContainer.innerHTML = '<p class="text-center text-red-600">Error fetching the shorts. Please try again later.</p>';
    }
}