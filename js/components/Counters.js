export default function Counters() {
    const counters = document.getElementById('counters');
    
    // Inicialización de los contadores
    let counts = {
        visitas: 7592,
        descargas: 143,
        interacciones: 4342
    };

    // Función para actualizar los contadores en el DOM
    function updateCounters() {
        counters.innerHTML = `
            <section class="my-12 bg-gray-200 bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-lg">
                <div class="flex justify-around flex-wrap">
                    ${Object.entries(counts).map(([key, value]) => `
                        <div class="text-center p-4">
                            <i class="fas fa-${key === 'visitas' ? 'eye' : key === 'descargas' ? 'download' : 'comments'} text-4xl text-red-800 mb-2"></i>
                            <div class="text-3xl font-bold">${value.toLocaleString()}</div>
                            <div class="text-sm text-gray-600 capitalize">${key}</div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }

    // Llamada inicial para mostrar los contadores
    updateCounters();

    // Intervalo para actualizar los contadores cada 5 segundos
    setInterval(() => {
        // Actualización aleatoria de los contadores
        counts = {
            visitas: counts.visitas + Math.floor(Math.random() * 3),
            descargas: counts.descargas + Math.floor(Math.random() * 2),
            interacciones: counts.interacciones + Math.floor(Math.random() * 5)
        };
        updateCounters();
    }, 5000);
}