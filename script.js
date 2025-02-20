// Fetch games from list.json
async function fetchGames() {
    const response = await fetch('/list.json');
    const games = await response.json();
    return games;
}

// Render games in a section
function renderGames(games, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = games.map(game => `
        <div class="game-card">
            <img src="${game.imgsrc}" alt="${game.name}">
            <h3>${game.name}</h3>
            <a href="/gxmes/${game.foldername}">Play Now</a>
        </div>
    `).join('');
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