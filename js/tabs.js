const all = document.querySelectorAll('section');
const HomePage = Array.from(all).slice(0, 4);
const allgames = document.querySelectorAll('section')[4];
const allGamesLi = document.getElementById('all-games');
const mainLi = document.getElementById('home');


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

allGamesLi.addEventListener('click', function() {
  hide_main();
  display_allgames();
});

mainLi.addEventListener('click', function() {
  hide_allgames();
  display_main();
});

