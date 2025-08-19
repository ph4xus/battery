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

function populateGames(sectionId, gamesList) {
    const section = document.getElementById(sectionId);
    const grid = section.querySelector('.games-grid');
    grid.innerHTML = '';

    gamesList.forEach(game => {
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
