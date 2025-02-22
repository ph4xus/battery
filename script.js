// Fetch games from list.json
async function fetchGames() {
    const response = await fetch('/list.json');
    const games = await response.json();
    return games;
}

// Render games in a section
function renderGames(games, containerId) {
    const container = document.getElementById(containerId);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    container.innerHTML = games.map(game => {
        const isFavorite = favorites.some(fav => fav.name === game.name);
        return `  
            <div class="game-card" role="link" tabindex="0" onclick="window.location.href='/gxmes/${game.foldername}'">
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-game='${JSON.stringify(game)}'>
                    <i class="fas fa-star"></i>
                </button>
                <img src="https://ph4xus.github.io/${game.imgsrc}" alt="${game.name}">
                <h3>${game.name}</h3>
                <a href="/gxmes/${game.foldername}">Play Now</a>
            </div>
        `;
    }).join('');

    // Add event listeners to favorite buttons
    container.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', () => toggleFavorite(button));
    });
}

// Toggle a game as favorite
function toggleFavorite(button) {
    const game = JSON.parse(button.dataset.game);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const isFavorite = favorites.some(fav => fav.name === game.name);
    if (isFavorite) {
        // Remove from favorites
        favorites = favorites.filter(fav => fav.name !== game.name);
        button.classList.remove('active');
    } else {
        // Add to favorites
        favorites.push(game);
        button.classList.add('active');
    }

    // Update local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadAllGames(); // Refresh the favorites section
    loadFavorites(); //refresh the all games section
    loadTop10(); //refresh top 10
}

// Load favorite games from local storage
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesSection = document.getElementById('Favorites');
    const favoritesContainer = document.getElementById('favorites');

    if (favorites.length > 0) {
        // Display the favorites section
        favoritesSection.style.display = 'block';
        // Render favorite games
        renderGames(favorites, 'favorites');
    } else {
        // Hide the favorites section if there are no favorites
        favoritesSection.style.display = 'none';
    }
}

// Load top 10 games
async function loadTop10() {
    const games = await fetchGames();
    const top10 = games.slice(0, 10); // Assuming the first 10 are top games
    renderGames(top10, 'top-10-games');
}

// Load all games
async function loadAllGames() {
    const games = await fetchGames();
    renderGames(games, 'all-games-grid');
}

// Initialize the site
async function init() {
    await loadTop10();
    await loadAllGames();
    loadFavorites();
}

// Event listeners for side navigation
document.querySelectorAll('.side-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.getAttribute('data-category');
        // Filter games by category (if needed)
        console.log(`Filter by: ${category}`);
    });
});

// Initialize the site
init();
