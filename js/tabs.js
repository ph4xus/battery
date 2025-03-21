const all = document.querySelectorAll('section');
const HomePage = Array.from(all).slice(0, 4);

const allgames = document.querySelectorAll('section')[4];

function hide_main() {
    HomePage.forEach(section => {
        section.style.display = 'none';
      });
}

function hide_allgames() {
  allgames.style.display = 'none';
}

function display_main() {
  HomePage.forEach(section => {
      section.style.display = 'block';
    });
}

function display_allgames() {
  allgames.style.display = 'block';
}