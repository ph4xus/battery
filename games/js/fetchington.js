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
        `;

        const styleContent = `
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            header {
                background: #333;
                color: #fff;
                padding: 10px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            header h1 {
                margin: 0;
            }
            nav a {
                color: #fff;
                text-decoration: none;
                margin-left: 20px;
            }
            nav a:hover {
                text-decoration: underline;
            }
            .content-container {
                padding: 20px;
            }
            .fullscreen-strip {
                position: absolute;
                top: 10px;
                right: 10px;
            }
            .fullscreen-btn {
                background: none;
                border: none;
                color: #333;
                font-size: 20px;
                cursor: pointer;
                outline: none;
            }
            .game-info {
                margin-top: 20px;
            }
            footer {
                background: #333;
                color: #fff;
                text-align: center;
                padding: 10px 0;
                position: fixed;
                bottom: 0;
                width: 100%;
            }
            #loadingScreen {
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: rgba(255, 255, 255, 0.8);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .spinner {
                border: 16px solid #f3f3f3;
                border-radius: 50%;
                border-top: 16px solid #3498db;
                width: 120px;
                height: 120px;
                animation: spin 2s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;

        const loadingScreenContent = `
            <div id="loadingScreen">
                <div class="spinner"></div>
            </div>
        `;

        document.addEventListener("DOMContentLoaded", function() {
            document.head.innerHTML += headContent;
            
            const styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.innerText = styleContent;
            document.head.appendChild(styleSheet);

            document.body.innerHTML += loadingScreenContent;
            document.body.innerHTML += htmlContent;
        });

        async function fetchData(index) {
            try {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    // Show the loading screen
                    loadingScreen.style.display = 'flex';
                }

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

                // Hide the loading screen after content is loaded
                if (loadingScreen) {
                    loadingScreen.style.display = 'none';
                }
            } catch (error) {
                console.error('Fetch error:', error);
                // Hide the loading screen in case of error
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.style.display = 'none';
                }
            }
        }
