async function fetchData(index) {
    try {
        const response = await fetch('/list.json');
        const data = await response.json();
        const item = data[index];
        const name1 = item.name;
        const imgsrc = item.imgsrc;
        const src = item.linksrc;

        console.log("name", name1);
        console.log("src", src);

        const iframe = document.getElementById('game-iframe');    
        iframe.src = src;
        const image = document.getElementById('bottomimage');
        image.src = imgsrc; 
        document.getElementById('gameTitle').textContent = 'Play ' + name1 + ' on maxwellstevenson.com';
        document.title = 'Play ' + name1 + ' on maxwellstevenson.com';
        const imgSrc = imgsrc; document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'icon', href: imgSrc, id: 'faviconLink' }));
        const keywords = 'gxme, gxmes, ' + name1 + ' unblxcked, ' + name1 + ' maxwellstevenson.com, Vafor, Vafor IT, ' + name1 + ', ' + name1 + ' ' + 'school' + ', github gxmes, github ' + name1;
        var meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = 'Play ' + name1 + ' on maxwellstevenson.com';
        document.getElementsByTagName('head')[0].appendChild(meta);

    
        const keywordsArray = keywords.split(', ');

        const keywordsDiv = document.querySelector('.keywords');

        keywordsDiv.innerHTML = '<h3>Keywords:</h3>';

        keywordsArray.forEach(keyword => {
            const span = document.createElement('span');
            span.textContent = keyword;
            keywordsDiv.appendChild(span);
        });

        document.getElementById('game-iframe').focus();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // Fetch Font Awesome CSS
    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
    document.head.appendChild(link2);

    // Create the HTML structure
    const bodyTag = document.body;
    bodyTag.innerHTML = `
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: "Heebo", sans-serif;
            }

            html, body {
                height: 100%;
                margin: 0;
                display: flex;
                flex-direction: column;
                background-color: #2d2d2d;
                color: #eaeaea;
            }

            header {
                background-color: #3e3e3e;
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            header .title {
                color: #eaeaea;
                padding: 10px 20px;
                text-decoration: none;
                font-weight: 600;
                font-size: 1.1rem;
                transition: color 0.3s;
            }

            header .title:hover {
                color: #b7e1c0;
            }

            .content {
                flex: 1 0 auto;
                padding: 20px;
                text-align: center;
                display: flex;
                flex-direction: column;
                min-height: 0;
            }

            .game-info {
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .game-info h2 {
                color: #b7e1c0;
                margin-bottom: 10px;
                text-align: left;
                flex: 1;
            }

            .game-iframe {
                width: 80%;
                height: 70vh;
                border: none;
                border-radius: 10px 10px 0 0;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
                margin: 0 auto;
                display: block;
            }

            .fullscreen-strip {
                width: 80%;
                background-color: #555;
                padding: 5px 20px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                border-radius: 0 0 10px 10px;
                margin: 0 auto 20px;
                margin-top: -5px;
            }

            .fullscreen-btn {
                font-size: 1.5em;
                background: none;
                border: none;
                color: #fff;
                cursor: pointer;
                padding: 5px;
                transition: background 0.3s ease;
            }

            .fullscreen-btn:hover {
                background-color: #444;
            }

            .recommended-games {
                width: 80%;
                margin: 0 auto 20px;
                background-color: #3e3e3e;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
            }

            .recommended-games h3 {
                color: #b7e1c0;
                margin-bottom: 15px;
            }

            .games-list {
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
            }

            .game-card {
                background-color: #444;
                border-radius: 10px;
                overflow: hidden;
                width: calc(20% - 12px);
                text-align: center;
                transition: transform 0.3s ease;
            }
            .game-card a {
                text-decoration: none;
            }

            .game-card:hover {
                transform: scale(1.05);
            }

            .game-card img {
                width: 100%;
                object-fit: cover;
                height:200px;
            }

            .game-card p {
                padding: 10px;
                font-size: 0.9rem;
                color: #eaeaea;
            }

            .keywords-section {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                background-color: #3e3e3e;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
                width: 80%;
                margin: 0 auto;
            }

            .keywords {
                width: 362px;
                text-align: left;
                display: flex;
                flex-wrap: wrap;
            }

            .keywords h3 {
                width: 100%;
                color: #b7e1c0;
                margin-bottom: 10px;
            }

            .keywords span {
                display: inline-block;
                background-color: #444;
                color: #eaeaea;
                padding: 5px 10px;
                margin: 5px;
                border-radius: 20px;
                font-size: 0.9rem;
                transition: background-color 0.3s, transform 0.2s;
            }

            .keywords span:hover {
                background-color: #b7e1c0;
                color: #1a1a1a;
                transform: scale(1.1);
            }

            .game-image {
                flex: 1;
                text-align: right;
            }

            .game-image img {
                width: 200px;
                height: 200px;
                border-radius: 10px;
            }

            footer {
                background-color: #1a1a1a;
                text-align: center;
                padding: 15px;
                color: #eaeaea;
            }

            footer a {
                color: #b7e1c0;
                text-decoration: none;
            }

            footer a:hover {
                color: #a0d1a4;
            }
        </style>
        <header>
            <a class="title" href="/gxmes">Vafor</a>
        </header>
        <div class="content">
            <div class="game-info">
                <h2 id="gameTitle">Loading...</h2>
            </div>
            <iframe id="game-iframe" class="game-iframe" src=""></iframe>
            <div class="fullscreen-strip">
                <button class="fullscreen-btn" onclick="toggleFullscreen()">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
            <div class="recommended-games">
                <h3>Recommended Games</h3>
                <div class="games-list" id="recommendedGames"></div>
            </div>
            <div class="keywords-section">
                <div class="keywords">
                    <h3>Keywords:</h3>
                    <span>loading..</span>
                </div>
                <div class="game-image">
                    <img id="bottomimage">
                </div>
            </div>
        </div>
        <footer>
            <p>© 2025 Vafor IT. All Rights Reserved.</p>
        </footer>
    `;

    async function fetchRecommendedGames() {
        try {
            const response = await fetch('/list.json');
            const data = await response.json();
            const recommendedGamesContainer = document.getElementById('recommendedGames');
            recommendedGamesContainer.innerHTML = ''; 

            const shuffledGames = data.sort(() => 0.5 - Math.random()).slice(0, 5);

            shuffledGames.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.className = 'game-card';
                gameCard.innerHTML = `
                    <a href="/gxmes/${game.foldername}">
                    <img src="https://ph4xus.github.io/${game.imgsrc}" alt="${game.name}">
                    <p>${game.name}</p>
                    </a>
                `;
                recommendedGamesContainer.appendChild(gameCard);
            });
        } catch (error) {
            console.error('Error fetching recommended games:', error);
        }
    }

    

    function toggleFullscreen() {
        const iframe = document.getElementById('game-iframe');
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
    }

    fetchRecommendedGames();
});
