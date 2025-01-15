document.addEventListener("DOMContentLoaded", function() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './styles/style.css';
    
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
            <h2>Awesome Game</h2>
        </div>
        <iframe id="game-iframe" class="game-iframe" src="https://example.com/embedded-game"></iframe>
        <div class="fullscreen-strip">
            <button class="fullscreen-btn" onclick="toggleFullscreen()">
                <i class="fas fa-expand"></i>
            </button>
        </div>
        <div class="keywords-section">
            <div class="keywords">
                <h3>Keywords:</h3>
                <span>game</span>
                <span>online game</span>
                <span>game hub</span>
                <span>play game</span>
                <span>embedded game</span>
                <span>fun</span>
                <span>multiplayer</span>
                <span>strategy</span>
            </div>
            <div class="game-image">
                <img src="https://ph4xus.github.io/assets/img/1v1.webp">
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
