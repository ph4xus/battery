const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('q')?.toLowerCase() || '';

const resultsContainer = document.getElementById('search-results');

if (searchQuery) {
    fetch('../json/list.json')
        .then(response => response.json())
        .then(data => {
            const matches = data.filter(game => game.name.toLowerCase().includes(searchQuery));

            if (matches.length > 0) {
                matches.forEach(game => {
                    const card = document.createElement('div');
                    card.classList.add('game-card');
                    card.innerHTML = `
                        <img src="https://ph4xus.github.io${game.imgsrc}" alt="${game.name}">
                        <h3>${game.name}</h3>
                        <a href="${game.linksrc}">Play Now</a>
                    `;
                    resultsContainer.appendChild(card);
                });
            } else {
                resultsContainer.innerHTML = `<p>No games found matching "${searchQuery}".</p>`;
            }
        })
        .catch(error => {
            console.error('Error loading game list:', error);
            resultsContainer.innerHTML = `<p>Failed to load games.</p>`;
        });
} else {
    alert("No search query provided")
    window.location.replace("/");

}
