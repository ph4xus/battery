const navTabs = document.getElementById('nav-tabs');
const tabs = navTabs.querySelectorAll('li a'); // existing static tabs
const tabContents = document.getElementById('tab-contents');
let games = [];
let categorySections = {};

// Hide all sections
function hideAllSections() {
    const sections = document.querySelectorAll('#tab-contents section');
    sections.forEach(section => section.style.display = 'none');
}

// Show section by ID
function showSection(id) {
    hideAllSections();
    const section = document.getElementById(id);
    if (section) section.style.display = 'block';
}

// Create a section for a category
function createCategorySection(category) {
    if (categorySections[category]) return;

    // Add tab to nav
    const li = document.createElement('li');
    li.id = category.toLowerCase();
    li.innerHTML = `<a>${category}</a>`;
    navTabs.insertBefore(li, document.getElementById('all-games')); // insert before All Games

    // Add section
    const section = document.createElement('section');
    section.id = `${category.toLowerCase()}-games`;
    section.className = 'tab-content';
    section.innerHTML = `
        <h2>${category} Games</h2>
        <div class="games-grid"></div>
    `;
    tabContents.appendChild(section);
    categorySections[category] = section;

    // Add click listener to new tab
    li.querySelector('a').addEventListener('click', () => {
        showSection(`${category.toLowerCase()}-games`);
    });
}

// Populate a section with games
function populateGames(sectionId, gamesList) {
    const section = document.getElementById(sectionId);
    const grid = section.querySelector('.games-grid');
    grid.innerHTML = '';

    gamesList.forEach(game => {
        const gameHTML = `
            <div class="game-card">
                <a href="${game.linksrc}">
                    <img src="${game.imgsrc}" alt="${game.name}" />
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

        // Dynamically create sections for each category
        const categories = [...new Set(games.map(g => g.category))];
        categories.forEach(category => {
            createCategorySection(category);
            const catGames = games.filter(g => g.category === category);
            populateGames(`${category.toLowerCase()}-games`, catGames);
        });

        // Populate All Games
        populateGames('all-games-grid', games);

        // Show first 4 default sections
        Array.from(document.querySelectorAll('#tab-contents section')).slice(0, 4).forEach(s => s.style.display = 'block');
    });

// Static tab click handlers
navTabs.addEventListener('click', e => {
    if (e.target.tagName !== 'A') return;
    const parentLi = e.target.parentElement;
    const tabId = parentLi.id || e.target.textContent.trim().toLowerCase();

    if (tabId === 'home') {
        hideAllSections();
        Array.from(document.querySelectorAll('#tab-contents section')).slice(0, 4).forEach(section => section.style.display = 'block');
    } else if (tabId === 'all-games') {
        showSection('all-games2');
    }
});
