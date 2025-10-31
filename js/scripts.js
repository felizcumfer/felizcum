document.addEventListener('DOMContentLoaded', function() {

    const musica = document.getElementById('musica-fondo');
    let musicaIniciada = false;

    function activarSonidoInicial() {
        if (musica && !musicaIniciada) {
            musica.muted = false; 
            musica.play().catch(e => {
                console.error("Música bloqueada en la página 1:", e);
            });
            musicaIniciada = true;
        }
    }

    const btnStart = document.getElementById('btn-start');
    
    if (btnStart) {
        btnStart.addEventListener('click', function(e) {
            // Prevenimos el salto del ancla #
            e.preventDefault(); 
            
            // 1. Intentamos activar el sonido en ESTA página.
            // Esto "prepara" al navegador.
            activarSonidoInicial();

            // 2. Guardamos en la memoria del navegador que queremos música.
            localStorage.setItem('playMusic', 'true');
            
            // 3. Redirigimos a la nueva página.
            // !!! CAMBIA 'mural.html' por el nombre de tu otra vista !!!
            window.location.href = 'recuerdos.html'; 
        });
    }

    // --- Tu código del modal (No se toca) ---
    const btnOptions = document.getElementById('btn-options');
    const optionsModal = document.getElementById('options-modal');
    const closeModal = document.getElementById('close-modal');

    if (btnOptions && optionsModal && closeModal) {
        btnOptions.addEventListener('click', function() {
            optionsModal.classList.remove('oculto');
        });
        closeModal.addEventListener('click', function() {
            optionsModal.classList.add('oculto');
        });
        optionsModal.addEventListener('click', function(e) {
            if (e.target === optionsModal) {
                optionsModal.classList.add('oculto');
            }
        });
    }
});