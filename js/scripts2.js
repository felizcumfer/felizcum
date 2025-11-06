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
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                    overlay.classList.add('hidden');
                }, 300);
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
    
    const finalButton = document.getElementById('final-button');
    const openedCards = new Set();
    const totalCards = memoryCards.length;

    function openModal(card) {
        const imgSrc = card.getAttribute('data-img-src');
        const text = card.getAttribute('data-text');
        zoomedImg.src = imgSrc;
        zoomedText.textContent = text;
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('visible');
        document.body.style.overflow = '';
    }

    memoryCards.forEach(card => {
        card.addEventListener('click', () => {
            if (!musicaActivada) { 
                return; 
            }
            
            const cardId = card.getAttribute('data-img-src');
            openedCards.add(cardId);
            
            if (openedCards.size === totalCards) {
                finalButton.classList.add('unlocked');
                finalButton.textContent = '¡Nivel Final!';
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

    function lanzarGlobos() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;

        (function frame() {
            if (Date.now() > animationEnd) return;

            confetti({
                particleCount: 2,
                startVelocity: 30,
                angle: 90,
                spread: 360,
                origin: { x: 0.5, y: 1.2 },
                gravity: -0.1,
                ticks: 200,
                scalar: 1.5,
                colors: ['#f7b733', '#e03f3f', '#4a4a8f', '#ffffff']
            });

            requestAnimationFrame(frame);
        }());
    }

    function mostrarMensajeGrande() {
        lanzarGlobos();

        Swal.fire({
            title: '¡¡FELIZ CUMP MAFE!!',
            html: '¡Nivel 20 Desbloqueado!',
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false,
            backdrop: false,
            customClass: {
                popup: 'swal-popup-game',
                title: 'swal-title-game',
                htmlContainer: 'swal-content-game',
            },
            showClass: {
                popup: 'swal2-show',
                icon: 'swal2-icon-show'
            },
            hideClass: {
                popup: 'swal2-hide',
                icon: 'swal2-icon-hide'
            }
        });
    }

    finalButton.addEventListener('click', () => {
        if (finalButton.classList.contains('unlocked')) {
            
            Swal.fire({
                title: '¡Tesoro Desbloqueado!',
                text: 'Feliz Nivel 20, Mafer. Eres una persona increíble. Gracias por cada nivel, cada desvelo y cada risa. Significa mucho para mí. - Tobi ❤️',
                imageUrl: 'resources/tovis.jpeg',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Foto de Tobi',
                confirmButtonText: 'TQM ❤️',
                customClass: {
                    popup: 'swal-popup-game',
                    title: 'swal-title-game',
                    htmlContainer: 'swal-content-game',
                    image: 'swal-image-game',
                    confirmButton: 'swal-button-game',
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    mostrarMensajeGrande();
                }
            });

        }
    });

});