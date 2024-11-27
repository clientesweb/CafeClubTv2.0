export default function Counters() {
    const counters = document.getElementById('counters');
    
    // Inicialización de los contadores con valores más grandes
    let counts = {
        visitas: 75920,
        descargas: 1430,
        interacciones: 43420
    };

    // Función para actualizar los contadores en el DOM
    function updateCounters() {
        counters.innerHTML = `
            <section class="my-12 p-6 bg-gradient-to-r from-red-600 to-red-800 bg-opacity-80 rounded-xl shadow-lg">
                <div class="flex flex-wrap justify-center gap-6">
                    ${Object.entries(counts).map(([key, value]) => `
                        <div class="counter-card flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl max-w-[250px] w-full">
                            <i class="fas fa-${key === 'visitas' ? 'eye' : key === 'descargas' ? 'download' : 'comments'} text-3xl text-white mb-4 p-3 bg-red-600 rounded-full"></i>
                            <div class="text-3xl font-semibold text-gray-800">${value.toLocaleString()}</div>
                            <div class="text-sm text-gray-500 capitalize">${key}</div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }

    // Llamada inicial para mostrar los contadores
    updateCounters();

    // Función para incrementar los contadores con una animación suave
    function animateCounters() {
        const countersToAnimate = document.querySelectorAll('.text-3xl');
        countersToAnimate.forEach(counter => {
            let targetValue = parseInt(counter.innerText.replace(/,/g, ''));
            let currentValue = 0;
            const increment = Math.ceil(targetValue / 100); // Incremento suave
            const interval = setInterval(() => {
                if (currentValue < targetValue) {
                    currentValue += increment;
                    counter.innerText = currentValue.toLocaleString();
                } else {
                    clearInterval(interval);
                }
            }, 30);  // Cada 30ms aumenta un valor
        });
    }

    // Intervalo para actualizar los contadores cada 5 segundos
    setInterval(() => {
        // Actualización aleatoria de los contadores
        counts = {
            visitas: counts.visitas + Math.floor(Math.random() * 100),
            descargas: counts.descargas + Math.floor(Math.random() * 50),
            interacciones: counts.interacciones + Math.floor(Math.random() * 150)
        };
        updateCounters();
        animateCounters();  // Llamar la función de animación
    }, 5000);

    // Llamar a la animación inicial al cargar los contadores
    animateCounters();
}