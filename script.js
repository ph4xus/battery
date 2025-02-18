function getParentFolder() {
    return window.location.origin;
}

let link2 = getParentFolder();

document.addEventListener('DOMContentLoaded', function () {
    const loadingText = document.getElementById('loadingText');

    fetch('../list.json')
        .then(response => response.json())
        .then(data => {
            const tab1 = document.getElementById('tab1');
            const tab2 = document.getElementById('tab2');

            data.forEach((gxme, index) => {
                let gxmeLink = document.createElement('a');
                gxmeLink.href = link2 + "/gxmes/" + gxme.foldername;
                gxmeLink.target = '_self';
                gxmeLink.style.textDecoration = 'none';
                gxmeLink.style.color = 'inherit';

                let gxmeCard = document.createElement('div');
                gxmeCard.classList.add('gxme-card');
                gxmeCard.style.cursor = 'pointer';

                let img = document.createElement('img');
                img.src = gxme.imgsrc;
                img.alt = gxme.name;
                img.style.width = '100px';
                img.style.height = '100px';

                let h3 = document.createElement('h3');
                h3.textContent = gxme.name;

                gxmeCard.appendChild(img);
                gxmeCard.appendChild(h3);
                gxmeLink.appendChild(gxmeCard);

                if (index < 50) {
                    tab1.appendChild(gxmeLink);
                } else {
                    tab2.appendChild(gxmeLink);
                }
            });

            loadingText.style.display = 'none';
        })
        .catch(error => {
            console.error('Error loading the list.json:', error);
            loadingText.textContent = 'Failed to load gxmes. Please try again later.';
        });

    const searchInput = document.getElementById('search');

    function searchgxmes() {
        const query = searchInput.value.toLowerCase();
        const gxmeLinks = document.querySelectorAll('.gxme-card');

        loadingText.style.display = 'block';

        gxmeLinks.forEach(link => {
            const h3 = link.querySelector('h3');

            if (h3 && h3.textContent.toLowerCase().includes(query)) {
                link.parentElement.style.display = '';
            } else {
                link.parentElement.style.display = 'none';
            }
        });

        loadingText.style.display = 'none';
    }

    searchInput.addEventListener('input', searchgxmes);

    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModal");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
        var currentUrl = window.location.href;
        if (currentUrl.includes("ph4xus.github.io")) {
            document.getElementById("link1").classList.add("current");
        } else if (currentUrl.includes("phexus.bitbucket.io")) {
            document.getElementById("link2").classList.add("current");
        } else if (currentUrl.includes("maxwellstevenson.com")) {
            document.getElementById("link3").classList.add("current");
        } else if (currentUrl.includes("class44x.github.io")) {
            document.getElementById("link4").classList.add("current");
        }
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

function randombutton() {
    const links = document.querySelectorAll('section.gxme-grid a');
    if (links.length === 0) {
        alert("No gxmes available to play.");
        return;
    }
    const randomIndex = Math.floor(Math.random() * links.length);
    const randomLink = links[randomIndex];
    randomLink.click();
}

function showTab(tabIndex) {
    var tabContents = document.getElementsByClassName('tab-content');
    var tabButtons = document.querySelectorAll('.tab-buttons button');
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
        tabButtons[i].classList.remove('active');
    }
    tabContents[tabIndex].classList.add('active');
    tabButtons[tabIndex].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
    showTab(0); // Show first tab by default
});
