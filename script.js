document.addEventListener('DOMContentLoaded', () => {

    // --- Konfigurasi dan Inisialisasi Particles.js ---

    // Konfigurasi 1: Partikel Tersebar (tanpa garis)
    const configScattered = {
        "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#555555" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true }, "size": { "value": 3, "random": true }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out" } },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } } } },
        "retina_detect": true
    };

    // Konfigurasi 2: Partikel Terhubung (dengan garis)
    const configConnected = {
        "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#555555" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.1, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out" } },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "resize": true } },
        "retina_detect": true
    };

    // Inisialisasi kedua kanvas
    particlesJS('particles-scattered', configScattered);
    particlesJS('particles-connected', configConnected);


    // --- Logika Animasi Scroll ---
    const elementsToReveal = document.querySelectorAll('.reveal');
    const formSection = document.getElementById('form-section');
    const connectedCanvas = document.getElementById('particles-connected');
    let hasConnected = false;

    const observerOptions = {
        root: null,
        threshold: 0.25, // Picu saat 25% elemen terlihat
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Jika user mencapai bagian form & belum pernah terhubung
                if (entry.target === formSection && !hasConnected) {
                    connectedCanvas.style.opacity = 1; // Munculkan lapisan partikel terhubung
                    hasConnected = true; // Tandai agar tidak terpicu lagi
                }
            }
        });
    }, observerOptions);

    elementsToReveal.forEach(element => {
        observer.observe(element);
    });

    // --- Logika Form ---
    const form = document.getElementById('collective-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const button = form.querySelector('button');
        button.textContent = 'Terima Kasih, Suara Anda Tercatat!';
        button.style.backgroundColor = '#28a745';
        button.style.cursor = 'default';
        
        form.querySelectorAll('input').forEach(input => {
            input.disabled = true;
            input.style.backgroundColor = "#222";
        });
    });

    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    let isMusicPlaying = false;
    music.volume = 0.3; // Atur volume awal (misal: 30%)

    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            music.pause();
            musicToggle.classList.remove('playing');
        } else {
            music.play();
            musicToggle.classList.add('playing');
        }
        isMusicPlaying = !isMusicPlaying;
    });

});