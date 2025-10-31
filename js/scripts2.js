document.addEventListener('DOMContentLoaded', function() {
    
    const musica = document.getElementById('musica-fondo');
    const overlay = document.getElementById('activar-sonido-overlay');
    let musicaActivada = false;

    function iniciarMusica(event) {
        if (musica && !musicaActivada) {
            if(event) event.stopPropagation(); 

            musica.muted = false;
            musica.play().catch(e => {
                console.error("Error al reproducir (tras clic):", e);
            });
            
            musicaActivada = true; 
            localStorage.removeItem('playMusic'); 
            
            if (overlay) {
                overlay.style.opacity = '0'; // Animación de fade-out
                setTimeout(() => {
                    overlay.style.display = 'none';
                    overlay.classList.add('hidden'); // Para la visibilidad permanente
                }, 300); // Coincide con la duración de la transición
            }
            
            document.body.removeEventListener('click', iniciarMusica, true);
        }
    }

    document.body.addEventListener('click', iniciarMusica, true); 

    const memoryCards = document.querySelectorAll('.memory-card');
    const modal = document.getElementById('timeline-modal');
    const closeModalBtn = document.getElementById('timeline-close');
    const zoomedImg = document.getElementById('zoomed-img');
    const zoomedText = document.getElementById('zoomed-text');

    function openModal(card) {
        const imgSrc = card.getAttribute('data-img-src');
        const text = card.getAttribute('data-text');
        zoomedImg.src = imgSrc;
        zoomedText.textContent = text;
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
    }

    function closeModal() {
        modal.classList.remove('visible');
        document.body.style.overflow = ''; // Habilitar scroll de fondo
    }

    memoryCards.forEach(card => {
        card.addEventListener('click', () => {
            if (!musicaActivada) { 
                return; 
            }
            openModal(card);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

});