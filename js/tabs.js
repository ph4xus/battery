const navTabs = document.getElementById('nav-tabs');
const tabs = navTabs.querySelectorAll('li a'); 
const tabContents = document.getElementById('tab-contents');
let games = [];
let categorySections = {};

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

    li.querySelector('a').addEventListener('click', () => {
        showSection(`${category.toLowerCase()}-games`);
    });
}

function populateGames(sectionId, gamesList) {
    const section = document.getElementById(sectionId);
    const grid = section.querySelector('.games-grid');
    grid.innerHTML = '';

    gamesList.forEach(game => {
        const gameHTML = `
            <div class="game-card">
                <a href="${game.linksrc}">
                    <img src="https://ph4xus.github.io${game.imgsrc}" alt="${game.name}" />
                    <p>${game.name}</p>
                </a>
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

            categorySections[category].style.display = 'none';
        });

        populateGames('all-games-grid', games);

        const defaultSections = ['Favorites', 'last-played', 'top-10', 'last-10'];
        defaultSections.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.style.display = 'block';
        });
    });
