const malls = [
    "Phoenix Marketcity Kurla",
    "R City Mall Ghatkopar",
    "High Street Phoenix, Lower Parel",
    "Infiniti Mall Andheri",
    "Korum Mall Thane",
    "Inorbit Mall Malad",
    "Oberoi Mall Goregaon",
    "Grovel's 101, Kandivali",
    "Atria Mall, Worli",
    "Infiniti Mall, Malad"
];

const searchIcon = document.getElementById('search-icon');
const searchBarContainer = document.getElementById('search-bar-container');
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const clearBtn = document.getElementById('clear-btn');
const noResultsMsg = document.getElementById('no-results-msg');
const suggestionsList = document.getElementById('suggestions-list');

// Toggle search bar
searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    const isVisible = searchBarContainer.style.display === 'block';
    searchBarContainer.style.display = isVisible ? 'none' : 'block';
    searchInput.value = '';
    suggestionsList.style.display = 'none';
    filterMalls();
    if (!isVisible) searchInput.focus();
});

// Clear input
clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    suggestionsList.style.display = 'none';
    filterMalls();
    searchInput.focus();
});

// Filter cards grid
function filterMalls() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.card');
    let anyVisible = false;

    cards.forEach(card => {
        const cardText = card.innerText.toLowerCase();
        if (cardText.includes(query)) {
            card.style.display = '';
            anyVisible = true;
        } else {
            card.style.display = 'none';
        }
    });

    noResultsMsg.style.display = anyVisible ? 'none' : 'block';
}

// Autocomplete suggestions
function showSuggestions(input) {
    const query = input.trim().toLowerCase();
    suggestionsList.innerHTML = '';
    if (!query) {
        suggestionsList.style.display = 'none';
        return;
    }

    const matches = malls.filter(mall => mall.toLowerCase().includes(query));
    matches.forEach(match => {
        const li = document.createElement('li');
        li.className = 'list-group-item list-group-item-action';
        li.textContent = match;
        li.addEventListener('click', () => {
            searchInput.value = match;
            suggestionsList.style.display = 'none';
            triggerRedirect(match);
        });
        suggestionsList.appendChild(li);
    });

    suggestionsList.style.display = matches.length ? 'block' : 'none';
}

// Handle input
searchInput.addEventListener('input', () => {
    showSuggestions(searchInput.value);
});

// Submit or Enter press
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    triggerRedirect(query);
});

// Redirection
function triggerRedirect(query) {
    const cards = document.querySelectorAll('.card');
    const lowerQuery = query.toLowerCase();
    let matched = false;

    cards.forEach(card => {
        const link = card.querySelector('a');
        const mallName = link.innerText.trim().toLowerCase();
        if (mallName === lowerQuery) {
            matched = true;
            window.location.href = link.href;
        }
    });

    if (!matched) {
        filterMalls(); // fallback
    }
}

// Scroll navbar style
$(function () {
    $(window).scroll(function () {
        $('nav').toggleClass('navbar-scroll', $(this).scrollTop() > 0);
    });
});
