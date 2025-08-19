const navTabs = document.getElementById('nav-tabs');
const tabContents = document.getElementById('tab-contents');
let games = [];
let categorySections = {};

// Default sections that should show on Home
const defaultSections = ['Favorites', 'last-played', 'top-10', 'last-10'];

// Hide all sections
function hideAllSections() {
    const sections = document.querySelectorAll('#tab-contents section');
    sections.forEach(section => section.style.display = 'none');
}

// Show a section by ID
function showSection(id) {
    hideAllSections();
    const section = document.getElementById(id);
    if (section) section.style.display = 'block';
}

// Create a category section and tab
function createCategorySection(category) {
    if (categorySections[category]) return;

    // Create tab
    const li = document.createElement('li');
    li.id = category.toLowerCase();
    li.innerHTML = `<a>${category}</a>`;
    navTabs.insertBefore(li, document.getElementById('all-games')); 

    // Create section
    const section = document.createElement('section');
    section.id = `${category.toLowerCase()}-games`;
    section.className = 'tab-content';
    section.innerHTML = `
        <h2>${category} Games</h2>
        <div class="games-grid"></div>
    `;
    tabContents.appendChild(section);
    categorySections[category] = section;

    // Hide section initially
    section.style.display = 'none';

    // Add click listener
    li.querySelector('a').addEventListener('click', () => {
        showSection(`${category.toLowerCase()}-games`);
    });
}

// Populate games in a section
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

// Fetch JSON and initialize
fetch('json/list.json')
    .then(res => res.json())
    .then(data => {
        games = data;

        // Create category sections dynamically
        const categories = [...new Set(games.map(g => g.category))];
        categories.forEach(category => {
            createCategorySection(category);
            const catGames = games.filter(g => g.category === category);
            populateGames(`${category.toLowerCase()}-games`, catGames);
        });

        // Populate All Games
        populateGames('all-games-grid', games);

        // Show only default sections on page load
        hideAllSections();
        defaultSections.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.style.display = 'block';
        });
    });

// Handle clicks for Home and All Games
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
    } else if (tabId === 'all-games') {
        showSection('all-games2');
    }
});
