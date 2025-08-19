const navTabs = document.getElementById('nav-tabs');
const tabContents = document.getElementById('tab-contents');
let games = [];
let categorySections = {};

const defaultSections = ['favorites', 'last-played', 'top-10', 'last-10'];

function hideAllSections() {
    document.querySelectorAll('#tab-contents section').forEach(s => s.style.display = 'none');
}

function showSection(id) {
    hideAllSections();
    const section = document.getElementById(id);
    if (section) section.style.display = 'block';
}

function createCategorySection(category) {
    if (categorySections[category]) return;

    const li = document.createElement('li');
    li.id = category.toLowerCase();
    li.innerHTML = `<a>${category}</a>`;
    navTabs.insertBefore(li, document.getElementById('all-games'));

    const section = document.createElement('section');
    section.id = `${category.toLowerCase()}-games`;
    section.className = 'tab-content';
    section.innerHTML = `
        <h2>${category} Games</h2>
        <div class="games-grid"></div>
    `;
    tabContents.appendChild(section);
    categorySections[category] = section;

    section.style.display = 'none';
}

// Populate games into a section
function populateGames(sectionId, gamesList) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const grid = section.querySelector('.games-grid');
    grid.innerHTML = '';

    gamesList.forEach(game => {
        const isFavorite = favorites.includes(game.name);
        const gameHTML = `
            <div class="game-card">
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-game='${JSON.stringify(game)}'>
                    <i class="fas fa-star"></i>
                </button>
                <img src="https://ph4xus.github.io${game.imgsrc}" alt="${game.name}">
                <h3>${game.name}</h3>
                <a href="/gxmes/${game.foldername}" class="play-link" data-game='${JSON.stringify(game)}'>Play Now</a>
            </div>
        `;
        grid.innerHTML += gameHTML;
    });
}

// Fetch games and initialize
fetch('json/list.json')
    .then(res => res.json())
    .then(data => {
        games = data;

        // Create category sections
        const categories = [...new Set(games.map(g => g.category))];
        categories.forEach(category => {
            createCategorySection(category);
            const catGames = games.filter(g => g.category === category);
            populateGames(`${category.toLowerCase()}-games`, catGames);
        });

        // Populate all games
        populateGames('all-games-grid', games);

        // Create and populate Favorites section (only for home page)
        const favoritesSection = document.getElementById('favorites');
        if (favoritesSection) {
            const favoriteGames = games.filter(g => {
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                return favorites.includes(g.name);
            });
            populateGames('favorites', favoriteGames);
        }

        // Show default sections on home
        hideAllSections();
        defaultSections.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.style.display = 'block';
        });
    });

// Toggle favorite button
function toggleFavorite(button) {
    const game = JSON.parse(button.dataset.game);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(game.name)) {
        favorites = favorites.filter(fav => fav !== game.name);
        button.classList.remove('active');
    } else {
        favorites.push(game.name);
        button.classList.add('active');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Update Favorites section if on home page
    const favoritesSection = document.getElementById('favorites');
    if (favoritesSection && favoritesSection.style.display !== 'none') {
        const favoriteGames = games.filter(g => favorites.includes(g.name));
        populateGames('favorites', favoriteGames);
    }
}

// Event listener for favorite buttons
document.addEventListener('click', e => {
    const btn = e.target.closest('.favorite-btn');
    if (btn) toggleFavorite(btn);
});

// Tab navigation
navTabs.addEventListener('click', e => {
    if (e.target.tagName !== 'A') return;

    const tabText = e.target.textContent.trim().toLowerCase();
    const tabId = e.target.parentElement.id || tabText;

    if (tabId === 'home') {
        hideAllSections();
        defaultSections.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.style.display = 'block';
        });
    } else if (tabId === 'all-games') {
        showSection('all-games2');
    } else if (categorySections[tabId.charAt(0).toUpperCase() + tabId.slice(1)]) {
        showSection(`${tabId}-games`);
    }
});
