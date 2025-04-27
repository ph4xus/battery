document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
});

const tabs = document.querySelectorAll('.side-nav ul li a');
const sections = document.querySelectorAll('section');

function hideAllSections() {
    sections.forEach(section => {
        section.style.display = 'none';
    });
}

function showSection(id) {
    hideAllSections();
    const section = document.getElementById(id);
    if (section) {
        section.style.display = 'block';
    }
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.parentElement.id; 

        if (tabId === 'home') {
            hideAllSections();
            Array.from(sections).slice(0, 4).forEach(section => {
                section.style.display = 'block';
            });
        } else if (tabId === 'all-games') {
            showSection('all-games2');
        }
    });
});

Array.from(sections).slice(0, 4).forEach(section => {
    section.style.display = 'block';
});
document.getElementById('all-games2').style.display = 'none';
