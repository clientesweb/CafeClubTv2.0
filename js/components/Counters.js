export default function Counters() {
    const counters = document.getElementById('counters');
    
    // Inicialización de los contadores con valores más grandes
    let counts = {
        visitas: 75920,   // Aumentamos el valor para mostrar un número más grande
        descargas: 630,  // Aumentamos el valor de las descargas
        interacciones: 43420  // Aumentamos las interacciones
    };

    // Función para actualizar los contadores en el DOM
    function updateCounters() {
        counters.innerHTML = `
            <section class="my-12 bg-gradient-to-r from-red-600 to-red-800 bg-opacity-70 p-8 rounded-xl shadow-2xl">
                <div class="flex justify-around flex-wrap gap-6">
                    ${Object.entries(counts).map(([key, value]) => `
                        <div class="text-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                            <i class="fas fa-${key === 'visitas' ? 'eye' : key === 'descargas' ? 'download' : 'comments'} text-4xl text-white mb-2 p-2 bg-red-600 rounded-full"></i>
                            <div class="text-4xl font-bold text-gray-800">${value.toLocaleString()}</div>
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
        const countersToAnimate = document.querySelectorAll('.text-4xl');
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