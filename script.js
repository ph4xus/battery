async function fetchGames() {
    const response = await fetch('/list.json');
    const games = await response.json();
    return games;
}

function renderGames(games, containerId) {
    const container = document.getElementById(containerId);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    container.innerHTML = games.map(game => {
        const isFavorite = favorites.some(fav => fav.name === game.name);
        return `  
            <div class="game-card">
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-game='${JSON.stringify(game)}'>
                    <i class="fas fa-star"></i>
                </button>
                <img src="https://ph4xus.github.io/${game.imgsrc}" alt="${game.name}">
                <h3>${game.name}</h3>
                <a href="/gxmes/${game.foldername}">Play Now</a>
            </div>
        `;
    }).join('');

    container.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', () => toggleFavorite(button));
    });
}

function toggleFavorite(button) {
    const game = JSON.parse(button.dataset.game);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const isFavorite = favorites.some(fav => fav.name === game.name);
    if (isFavorite) {
        favorites = favorites.filter(fav => fav.name !== game.name);
        button.classList.remove('active');
    } else {
        favorites.push(game);
        button.classList.add('active');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadAllGames(); 
    loadFavorites(); 
    loadTop10(); 
}

// Load favorite games from local storage
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesSection = document.getElementById('Favorites');
    const favoritesContainer = document.getElementById('favorites');

    if (favorites.length > 0) {
        favoritesSection.style.display = 'block';
        renderGames(favorites, 'favorites');
    } else {
        favoritesSection.style.display = 'none';
    }
}

async function loadTop10() {
    const games = await fetchGames();
    const top10 = games.slice(0, 10); 
    renderGames(top10, 'top-10-games');
}

async function loadAllGames() {
    const games = await fetchGames();
    renderGames(games, 'all-games-grid');
}



document.querySelectorAll('.side-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.getAttribute('data-category');
        console.log(`Filter by: ${category}`);
    });
});

loadTop10();
loadAllGames();
loadFavorites();
