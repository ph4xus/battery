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
        document.getElementById('gameTitle').textContent = name1 + ' play now on maxwellstevenson.com';

        const keywords = 'gxme, gxmes, ' + name1 + ' unblxcked, ' + name1 + ' maxwellstevenson.com, Vafor, Vafor IT, Vafor IT Work, ' + name1;

        document.getElementById('game-iframe').focus();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../styles/style.css';
    
    document.head.appendChild(link);
    
    const html3 = `
    <header>
        <a class="title" href="/gxmes">Vafor</a>
        <nav>
            <!--
            <a href="#home">Home</a>
            <a href="#games">Games</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            -->
        </nav>
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
        <p>© 2025 Game Hub. All Rights Reserved.</p>
    </footer>
    `;

    const bodyTag = document.body;

    bodyTag.innerHTML += html3;
});
