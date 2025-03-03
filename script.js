async function fetchGames() {
    const response = await fetch('/list.json');
    const games = await response.json();
    return games;
}

function renderLastPlayed() {
    const lastPlayed = JSON.parse(localStorage.getItem('lastPlayed')) || [];
    const container = document.getElementById('last-played-games');
    
    if (lastPlayed.length > 0) {
        renderGames(lastPlayed, 'last-played-games');
    } else {
        container.innerHTML = '<p>No games played yet.</p>';
    }
}

async function fetchTop10FolderNames() {
    const response = await fetch('/top10.json'); 
    const folderNames = await response.json();
    return folderNames;
}

function renderGames(games, containerId) {
    const container = document.getElementById(containerId);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    container.innerHTML = games.map(game => {
        const isFavorite = favorites.includes(game.name);
        return `  
            <div class="game-card">
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-game='${JSON.stringify(game)}'>
                    <i class="fas fa-star"></i>
                </button>
                <img src="https://ph4xus.github.io${game.imgsrc}" alt="${game.name}">
                <h3>${game.name}</h3>
                <a href="/gxmes/${game.foldername}" class="play-link" data-game='${JSON.stringify(game)}'>Play Now</a>
            </div>
        `;
    }).join('');

    container.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', () => toggleFavorite(button));
    });

    container.querySelectorAll('.play-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const game = JSON.parse(link.dataset.game);
            updateLastPlayed(game);
            window.location.href = link.href;
        });
    });
}

async function loadTop10() {
    const games = await fetchGames();
    const top10FolderNames = await fetchTop10FolderNames();
    const top10Games = games.filter(game => top10FolderNames.includes(game.foldername));
    renderGames(top10Games, 'top-10-games');
}

async function loadAllGames() {
    const games = await fetchGames();
    renderGames(games, 'all-games-grid');
}

function toggleFavorite(button) {
    const game = JSON.parse(button.dataset.game);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.includes(game.name);

    if (isFavorite) {
        favorites = favorites.filter(fav => fav !== game.name);
        button.classList.remove('active');
    } else {
        favorites.push(game.name);
        button.classList.add('active');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesDisplay(); // Only update what's needed
}

function updateFavoritesDisplay() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesSection = document.getElementById('Favorites');
    const favoritesContainer = document.getElementById('favorites');

    if (favorites.length > 0) {
        favoritesSection.style.display = 'block';
        fetchGames().then(games => {
            const favoriteGames = games.filter(game => favorites.includes(game.name));
            renderGames(favoriteGames, 'favorites');
        });
    } else {
        favoritesSection.style.display = 'block'; // Keep section visible
        favoritesContainer.innerHTML = `
            <div class="favorites-empty">
                <h3>Your Favorites Are Waiting!</h3>
                <p>Tap the <i class="fas fa-star"></i> to save your best games here</p>
            </div>
        `;
    }
}

function updateLastPlayed(game) {
    let lastPlayed = JSON.parse(localStorage.getItem('lastPlayed')) || [];
    lastPlayed = lastPlayed.filter(item => item.name !== game.name); // Remove if already exists
    lastPlayed.unshift(game); // Add to beginning
    lastPlayed = lastPlayed.slice(0, 5); // Limit to 5 recent games
    localStorage.setItem('lastPlayed', JSON.stringify(lastPlayed));
    renderLastPlayed();
}

// Initial load
Promise.all([
    loadTop10(),
    loadAllGames(),
    updateFavoritesDisplay(), // Use the new function instead of loadFavorites
    renderLastPlayed()
]).catch(error => console.error('Error during initial load:', error));

// Navigation
document.querySelectorAll('.side-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.getAttribute('data-category');
        console.log(`Filter by: ${category}`);
    });
});
