document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO CARROSSEL DE DESTAQUE ---
    const slides = document.querySelectorAll('.hero-carousel .slide');
    const prevBtn = document.querySelector('.hero-carousel .prev');
    const nextBtn = document.querySelector('.hero-carousel .next');
    let currentIndex = 0;

    function showSlide(index) {
        // Esconde todos os slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Garante que o índice seja cíclico
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }

        // Mostra o slide correto
        slides[currentIndex].classList.add('active');
    }

    if (slides.length > 0) {
        // Event listeners para os botões
        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });

        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });

        // Troca automática de slide (opcional)
        setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000); // Muda a cada 5 segundos

        // Mostra o primeiro slide ao carregar
        showSlide(currentIndex);
    }


    // --- LÓGICA DOS BOTÕES DE HUMOR ---
    const moodBtns = document.querySelectorAll('.mood-btn');

    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            moodBtns.forEach(otherBtn => otherBtn.classList.remove('active'));
            // Adiciona a classe 'active' apenas no botão clicado
            btn.classList.add('active');
        });
    });
});