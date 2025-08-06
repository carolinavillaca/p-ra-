document.addEventListener('DOMContentLoaded', () => {
    //carrossel 1
    const slides = document.querySelectorAll('.hero-carousel .slide');
    const prevBtn = document.querySelector('.hero-carousel .prev');
    const nextBtn = document.querySelector('.hero-carousel .next');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }
        slides[currentIndex].classList.add('active');
    }

    if (slides.length > 0) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });
        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });
        setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000);
        showSlide(currentIndex);
    }

    //botões de humor
    const moodBtns = document.querySelectorAll('.mood-btn');
    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            moodBtns.forEach(otherBtn => otherBtn.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    //api
    const API_KEY = ''; 

    const categories = {
        hero:     { query: 'lançamentos filmes 2024 trailer oficial', limit: 5 },
        continueWatching: { query: 'trailer filmes de comédia dublado', limit: 10, elementId: 'continue-watching' },
        sitcoms:  { query: 'Friends episódio',               limit: 10, elementId: 'sitcoms' },
        romance:  { query: 'comédia romântica trailer',              limit: 10, elementId: 'romance' },
        animation:{ query: 'Moranguinho trailer',                    limit: 10, elementId: 'animation' }
    };

    async function fetchYouTubeTrailers(query, maxResults = 10) {
        if (!API_KEY || API_KEY === 'SUA_CHAVE_AQUI') {
            alert('Chave da API não encontrada. Verifique o script.js e atualize o navegador (Ctrl+Shift+R).');
            console.warn('Chave da API ausente ou inválida.');
            return [];
        }
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${API_KEY}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro na API do YouTube:', errorData);
                document.querySelector('main').innerHTML = `
                    <h2 style="text-align: center; padding: 50px;">
                        Não foi possível carregar os vídeos. Verifique o console (F12) para mais detalhes.
                    </h2>`;
                return [];
            }
            const data = await response.json();
            return data.items
                .filter(item => item.snippet?.thumbnails?.high)
                .map(item => ({
                    videoId: item.id.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnailUrl: item.snippet.thumbnails.high.url
                }));
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            return [];
        }
    }

    function populateShelf(shelfId, videos) {
    const shelf = document.querySelector(`#${shelfId} .movie-list`);
    if (!shelf) return;
    shelf.innerHTML = '';
    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${video.thumbnailUrl}" alt="${video.title}">
            <div class="card-overlay">
                <button class="btn-play">Assista agora</button>
            </div>
        `;
        card.addEventListener('click', () => {
            window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank');
        });
        shelf.appendChild(card);
    });
    }

    // Exemplo de uso: populateHeroCarousel(heroData);
    const carouselImagesContainer = document.querySelector('.carousel-images');
    /*const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');*/
    const heroTitle = document.getElementById('hero-title');
    const heroDescription = document.getElementById('hero-description');
    let heroVideos = [];
    let carouselIndex = 0;
    let autoSlideInterval;

    function updateCarousel() {
        if (!heroVideos.length) return;
        const offset = -carouselIndex * 100;
        carouselImagesContainer.style.transform = `translateX(${offset}%)`;
        const currentVideo = heroVideos[carouselIndex];
        heroTitle.textContent = currentVideo.title;
        heroDescription.textContent = currentVideo.description;
    }

    function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % heroVideos.length;
        updateCarousel();
    }, 5000);
}

    function populateHeroCarousel() {
    heroVideos = [
        {
            videoId: 'CK-g0OqzQHQ',
            title: 'Para Todos os Garotos que Já Amei',
            description: 'A vida de Lara Jean vira um caos quando suas cartas de amor secretas são enviadas aos destinatários.',
            thumbnailUrl: 'https://img.youtube.com/vi/CK-g0OqzQHQ/hqdefault.jpg'
        },
        {
            videoId: '22w7z_lT6YM',
            title: 'Como Treinar o Seu Dragão (Live Action)',
            description: 'Um jovem Viking faz amizade com um dragão e muda para sempre a guerra entre seu povo e as criaturas.',
            thumbnailUrl: 'https://img.youtube.com/vi/22w7z_lT6YM/hqdefault.jpg'
        },
        {
            videoId: 'uE7qjQlfoRs',
            title: '10 Coisas que Eu Odeio em Você',
            description: 'Para poder sair com um garoto, Bianca precisa que sua irmã mais velha e mal-humorada, Kat, namore primeiro. A solução é pagar ao bad boy Patrick para conquistá-la.',
            thumbnailUrl: 'https://img.youtube.com/vi/uE7qjQlfoRs/hqdefault.jpg'
        },
        {
            videoId: 'SUO8B47XtGY',
            title: 'Pretty Little Liars',
            description: 'Após a morte de sua amiga, quatro garotas são perseguidas por "A", uma figura anônima que sabe de todos os seus segredos e os usa para chantageá-las.',
            thumbnailUrl: 'https://img.youtube.com/vi/SUO8B47XtGY/hqdefault.jpg'
        }
    ];
    carouselImagesContainer.innerHTML = '';
    heroVideos.forEach((video, idx) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `<img src="${video.thumbnailUrl}" alt="${video.title}">`;
        item.addEventListener('click', () => {
            window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank');
        });
        carouselImagesContainer.appendChild(item);
    });

    currentIndex = 0;
    updateCarousel();
    startAutoSlide();
}

    // Inicializa a página
    async function initializePage() {
        const heroData = await fetchYouTubeTrailers(categories.hero.query, categories.hero.limit);
        populateHeroCarousel(heroData);

        for (const key in categories) {
            if (key !== 'hero') {
                const { query, limit, elementId } = categories[key];
                const videos = await fetchYouTubeTrailers(query, limit);
                populateShelf(elementId, videos);
            }
        }
    }
    initializePage();

    //barra de pesquisa
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    if (searchForm) {
        searchForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (!query) return;
            const resultsSectionId = "search-results";
            let resultsSection = document.getElementById(resultsSectionId);
            if (!resultsSection) {
                resultsSection = document.createElement("section");
                resultsSection.id = resultsSectionId;
                resultsSection.className = "content-shelf";
                resultsSection.innerHTML = `<h2>Resultados para "${query}"</h2><div class="movie-list"></div>`;
                document.querySelector("main").insertBefore(resultsSection, document.querySelector(".ajuda-suporte"));
            } else {
                resultsSection.querySelector("h2").textContent = `Resultados para "${query}"`;
            }
            const videos = await fetchYouTubeTrailers(query, 12);
            const movieList = resultsSection.querySelector(".movie-list");
            movieList.innerHTML = "";
            videos.forEach(video => {
                const card = document.createElement("div");
                card.className = "movie-card";
                card.innerHTML = `<img src="${video.thumbnailUrl}" alt="${video.title}">`;
                card.addEventListener("click", () => {
                    window.open("https://www.youtube.com/watch?v=" + video.videoId, "_blank");
                });
                movieList.appendChild(card);
            });
            resultsSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    //esconder botões
    const btnAssine = document.querySelector('.btn-subscribe');
    const btnLogin = document.querySelector('.btn-login');
    if (localStorage.getItem('userLogged') === 'true') {
        if (btnAssine) btnAssine.style.display = 'none';
        if (btnLogin) btnLogin.style.display = 'none';
    }
    /*const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            localStorage.removeItem('userName');
            window.location.reload();
        });
    }*/
});

