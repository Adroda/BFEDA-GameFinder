const search = document.querySelector('.search__box');
const searchUl = document.querySelector('.search__list');
const cardList = document.querySelector('.cardList');
const lastSearchesBtn = document.querySelector('.lastSearchesBtn');
let dropdown = {};
const lastSearches = [];

const searchApi = async (value) => {
    const response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${value}`
    );
    var data = await response.json();
    return data;
};

const addToLastSearches = (game) => {
    if (lastSearches.length === 2) {
        lastSearches.pop();
    }
    lastSearches.unshift(game);
};

const debounce = (fn, wait) => {
    let timeout;

    return (...args) => {
        const later = () => {
            clearTimeout(timeout);
            fn(...args);
        };

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);
    };
};

search.addEventListener(
    'input',
    debounce(async () => {
        if (search.value !== '') {
            const searchRes = await searchApi(search.value);
            const searchList = searchRes.results;
            searchUl.innerHTML = '';
            var listItem;
            searchList.slice(0, 4).forEach((element) => {
                listItem = `<li class="list__item">${element.name}</li>`;
                document
                    .querySelector('.search__list')
                    .insertAdjacentHTML('beforeend', listItem);
            });
            dropdown = document.querySelectorAll('.list__item');
            dropdown.forEach((element, index) => {
                element.addEventListener('click', async () => {
                    const searchedGame = await searchApi(element.textContent);
                    addToLastSearches(searchedGame.results[0]);
                    let card = generateCard(searchedGame.results[0], index);
                    cardList.innerHTML = '';
                    cardList.insertAdjacentHTML('beforeend', card);
                });
            });
        } else {
            searchUl.innerHTML = '';
        }
    }, 100)
);

search.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        cardList.innerHTML = '';
        searchUl.innerHTML = '';
        var card;
        const games = await searchApi(search.value);
        addLastSearches(games.results[0]);
        games.results.forEach((element, index) => {
            card = generateCard(element, index);
            cardList.insertAdjacentHTML('beforeend', card);
        });
    }
});

lastSearchesBtn.addEventListener('click', () => {
    cardList.innerHTML = '';
    var card;
    lastSearches.forEach((element, index) => {
        card = generateCard(element, index);
        cardList.insertAdjacentHTML('beforeend', card);
    });
});
