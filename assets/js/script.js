function getParentFolder() {
    return window.location.origin; 
}

let link2 = getParentFolder(); 

document.addEventListener('DOMContentLoaded', function () {
    const loadingText = document.getElementById('loadingText');
    
    fetch('../list.json')
        .then(response => response.json())
        .then(data => {
            const gxmeGrid = document.querySelector('.gxme-grid');

            data.forEach(gxme => {
                let gxmeLink = document.createElement('a');
                gxmeLink.href = link2 + "/gxmes/" + gxme.foldername; 
                gxmeLink.target = '_self'; 
                gxmeLink.style.textDecoration = 'none'; 
                gxmeLink.style.color = 'inherit'; 

                let gxmeCard = document.createElement('div');
                gxmeCard.classList.add('gxme-card');
                gxmeCard.style.cursor = 'pointer';

                let img = document.createElement('img');
                img.src = "https://ph4xus.github.io" + gxme.imgsrc; 
                img.alt = gxme.name;
                img.style.width = '100px';
                img.style.height = '100px';

                let h3 = document.createElement('h3');
                h3.textContent = gxme.name; 

                gxmeCard.appendChild(img);
                gxmeCard.appendChild(h3);
                gxmeLink.appendChild(gxmeCard);
                gxmeGrid.appendChild(gxmeLink);
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
        const gxmeGrid = document.querySelectorAll('.gxme-grid a'); 

        loadingText.style.display = 'block';

        gxmeGrid.forEach(link => { 
            const h3 = link.querySelector('h3');

            if (h3 && h3.textContent.toLowerCase().includes(query)) { 
                link.style.display = '';
            } else {
                link.style.display = 'none';
            }
        });

        loadingText.style.display = 'none';
    }

    searchInput.addEventListener('input', searchgxmes);

    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModal");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
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

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
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
