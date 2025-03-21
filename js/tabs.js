const all = document.querySelectorAll('section');
const HomePage = Array.from(all).slice(0, 4);

const allgames = document.querySelectorAll('section')[4];

function hide() {
    HomePage.forEach(section => {
        section.style.display = 'none';
      });
}

