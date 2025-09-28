document.addEventListener('DOMContentLoaded', () => {

    // --- Konfigurasi dan Inisialisasi Particles.js ---
    const configScattered = {
        "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#555555" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true }, "size": { "value": 3, "random": true }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out" } },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } } } },
        "retina_detect": true
    };

    const configConnected = {
        "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#555555" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.1, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out" } },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "resize": true } },
        "retina_detect": true
    };

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
    // (Kode ini sudah benar, hanya perlu memastikan tidak ada duplikat)
    const form = document.getElementById('collective-form');
    if (form) { // Pemeriksaan tambahan untuk memastikan form ada
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            // Logika ini hanya relevan jika Anda menggunakan form HTML, bukan link Google Form
        });
    }
    

    // --- LOGIKA MUSIK YANG ROBUST ---
    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const TARGET_VOLUME = 0.3;
    let isMusicPlaying = false;
    let fadeInterval;

    const fadeIn = () => {
        clearInterval(fadeInterval);
        music.volume = 0;
        music.play();
        let currentVolume = 0;
        fadeInterval = setInterval(() => {
            if (currentVolume < TARGET_VOLUME - 0.01) {
                currentVolume += 0.01;
                music.volume = currentVolume;
            } else {
                music.volume = TARGET_VOLUME;
                clearInterval(fadeInterval);
            }
        }, 50);
    };

    const fadeOut = () => {
        clearInterval(fadeInterval);
        let currentVolume = music.volume;
        fadeInterval = setInterval(() => {
            if (currentVolume > 0.01) {
                currentVolume -= 0.01;
                music.volume = currentVolume;
            } else {
                music.pause();
                music.volume = 0;
                clearInterval(fadeInterval);
            }
        }, 50);
    };

    const toggleMusic = () => {
        isMusicPlaying = !isMusicPlaying;
        if (isMusicPlaying) {
            fadeIn();
            musicToggle.classList.add('playing');
        } else {
            fadeOut();
            musicToggle.classList.remove('playing');
        }
    };
    
    const tryAutoplay = async () => {
        try {
            await music.play();
            isMusicPlaying = true;
            musicToggle.classList.add('playing');
            console.log('AAmbasig');
            fadeIn();
        } catch (error) {
            console.log('Autoplay diblokir oleh browser. Menunggu interaksi pengguna.');
            isMusicPlaying = false;
            musicToggle.classList.remove('playing');
        }
    };

    musicToggle.addEventListener('click', toggleMusic);
    
    tryAutoplay();

});