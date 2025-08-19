const navTabs = document.getElementById('nav-tabs');
const tabContents = document.getElementById('tab-contents');
let games = [];
let categorySections = {};

const defaultSections = ['Favorites', 'last-played', 'top-10', 'last-10'];

function hideAllSections() {
    const sections = document.querySelectorAll('#tab-contents section');
    sections.forEach(section => section.style.display = 'none');
}

function showSection(id) {
    hideAllSections();
    const section = document.getElementById(id);
    if (section) section.style.display = 'block';
}

function createCategorySection(category) {
    if (categorySections[category]) return;

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

    const li = document.createElement('li');
    li.id = category.toLowerCase();
    li.innerHTML = `<a>${category}</a>`;
    navTabs.insertBefore(li, document.getElementById('all-games'));

    li.querySelector('a').addEventListener('click', () => {
        showSection(`${category.toLowerCase()}-games`);
    });
}

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

    if (sectionId === 'Favorites' || !defaultSections.includes(sectionId)) {
        const favBtns = section.querySelectorAll('.favorite-btn');
        favBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                onlyforstar(this);

                if (sectionId === 'Favorites') {
                    diffrentname();
                }   
            });
        });
    }
}

fetch('json/list.json')
    .then(res => res.json())
    .then(data => {
        games = data;

        const categories = [...new Set(games.map(g => g.category))];
        categories.forEach(category => {
            createCategorySection(category);
            const catGames = games.filter(g => g.category === category);
            populateGames(`${category.toLowerCase()}-games`, catGames);
        });

        populateGames('all-games-grid', games);

        hideAllSections();
        defaultSections.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.style.display = 'block';
        });
    });

navTabs.addEventListener('click', e => {
    if (e.target.tagName !== 'A') return;

    const parentLi = e.target.parentElement;
    const tabId = parentLi.id || e.target.textContent.trim().toLowerCase();

    if (tabId === 'home') {
        hideAllSections();
        defaultSections.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.style.display = 'block';
        });
        diffrentname();
    } else if (tabId === 'all-games') {
        showSection('all-games');
    } else if (categorySections[tabId]) {
        showSection(`${tabId}-games`);
    }
});
function onlyforstar(button) {
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
}
function diffrentname() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteGames = games.filter(g => favorites.includes(g.name));
    const favoritesContainer = document.getElementById('favorites');

    if (favoriteGames.length === 0) {
        favoritesContainer.innerHTML = `<p>No favorites yet, hit the star to add some!</p>`;
    } else {
        populateGames('Favorites', favoriteGames);
    }
}