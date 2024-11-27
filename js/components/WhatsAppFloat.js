export default function WhatsAppFloat() {
    const whatsappFloat = document.getElementById('whatsapp-float');

    if (whatsappFloat) {
        whatsappFloat.innerHTML = `
            <div class="fixed bottom-20 right-6 z-50">
                <button id="open-whatsapp-modal" class="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors">
                    <i class="fab fa-whatsapp text-2xl"></i>
                </button>
            </div>
            <div id="whatsapp-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 hidden">
                <div id="whatsapp-modal-content" class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                    <h2 class="text-2xl font-bold mb-4 text-green-600">Chatea con CaféClubTV en WhatsApp</h2>
                    <textarea 
                        id="whatsapp-message"
                        placeholder="Escribe tu mensaje aquí..."
                        class="w-full p-2 border border-gray-300 rounded mb-4 h-32 resize-none"
                    ></textarea>
                    <div class="flex justify-end space-x-2">
                        <button id="close-whatsapp-modal" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">Cancelar</button>
                        <button id="send-whatsapp-message" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">Enviar mensaje</button>
                    </div>
                </div>
            </div>
        `;

        const openModalButton = document.getElementById('open-whatsapp-modal');
        const closeModalButton = document.getElementById('close-whatsapp-modal');
        const sendMessageButton = document.getElementById('send-whatsapp-message');
        const modal = document.getElementById('whatsapp-modal');
        const modalContent = document.getElementById('whatsapp-modal-content');
        const messageTextarea = document.getElementById('whatsapp-message');

        // Abrir el modal
        openModalButton.addEventListener('click', () => {
            modal.classList.remove('hidden');
            messageTextarea.focus(); // Lleva el foco al textarea cuando se abre el modal
        });

        // Cerrar el modal
        closeModalButton.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // Cerrar el modal al hacer clic fuera del contenido
        modal.addEventListener('click', (e) => {
            if (!modalContent.contains(e.target)) {
                modal.classList.add('hidden');
            }
        });

        // Enviar el mensaje a WhatsApp
        sendMessageButton.addEventListener('click', () => {
            const message = messageTextarea.value.trim();
            if (message) {
                const phoneNumber = '+593978606269'; // Número de teléfono de destino
                const encodedMessage = encodeURIComponent(message);
                window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
                messageTextarea.value = ''; // Limpiar el campo de mensaje
                modal.classList.add('hidden');
            } else {
                alert('Por favor, escribe un mensaje antes de enviar.');
            }
        });
    }
}