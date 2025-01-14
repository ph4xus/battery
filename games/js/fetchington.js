document.addEventListener("DOMContentLoaded", function() {
    const htmlContent = `
        <header>
            <h1 style="cursor: pointer; padding-right:20px;" onclick="window.location.href = '/gxmes'">Vafor</h1>
            <nav>
                <a href="/gxmes">Gxmes</a>
                <a href="/about">About</a>
                <a href="/a">Apps</a>
            </nav>
        </header>

        <main>
            <div class="content-container">
                <iframe id="gameFrame" title="Game" scrolling="no"></iframe>

                <div class="fullscreen-strip">
                    <button class="fullscreen-btn" onclick="toggleFullscreen()">
                        <i class="fas fa-expand"></i> 
                    </button>
                </div>
            </div>
            <!-- Game Info Box -->
                <div class="game-info">
                    <h2 class="game-title" id="gameTitle">Loading Gxme...</h2>
                    <p class="game-keywords" id="gameKeywords">Tags: Loading...</p>
                </div>
        </main>

        <footer>
            <p>&copy; 2024 Vafor IT. All rights reserved. <a href="#">Privacy Policy</a></p>
        </footer>
    `;

    const headContent = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Vafor</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
        <link id="main-stylesheet" href="../styles/style.css" rel="stylesheet"/>
    `;

    document.head.innerHTML += headContent;    
});


async function fetchData(index) {
    try {
        document.body.innerHTML += htmlContent;
        const response = await fetch('/list.json');
        const data = await response.json();
        const item = data[index];
        const name1 = item.name;
        const src = item.linksrc;

        console.log("name", name1);
        console.log("src", src);

        const iframe = document.getElementById('gameFrame');    
        iframe.src = src;

        document.getElementById('gameTitle').textContent = name1 + ' play now on maxwellstevenson.com';

        const keywords = 'gxme, gxmes, ' + name1 + ' unblxcked, ' + name1 + ' maxwellstevenson.com, Vafor, Vafor IT, Vafor IT Work, ' + name1;
        document.getElementById('gameKeywords').textContent = 'Tags: ' + keywords;

        var savedTabName = localStorage.getItem('tabName');
        var savedTabImage = localStorage.getItem('tabImage');

        if (savedTabName) {
            document.title = savedTabName;
        } else {
            document.title = name1 + " - play now on maxwellstevenson.com";
        }

        if (savedTabImage) {
            var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = savedTabImage;
            document.getElementsByTagName('head')[0].appendChild(link);
        }

        document.getElementById('gameFrame').focus();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
