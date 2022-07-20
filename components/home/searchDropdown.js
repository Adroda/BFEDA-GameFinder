const search = document.querySelector('.search__box');
const searchUl = document.querySelector('.search__list');
const search__list = document.querySelector('.search__list');
const lastSearchesBtn = document.querySelector('.lastSearchesBtn');
const overlay = document.querySelector('.overlay');
let dropdown = {};
const lastSearches = [];

const searchApi = async (value) => {
    const response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${value}`
    );
    var data = await response.json();
    return data;
};
const platformApi = async (id) => {
    const response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&parent_platforms=${id}`
    );
    var data = await response.json();
    console.log(data.results);
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
                search__list.insertAdjacentHTML('beforeend', listItem);
            });
            dropdown = document.querySelectorAll('.list__item');
            dropdown.forEach((element, index) => {
                element.addEventListener('click', async () => {
                    const searchedGame = await searchApi(element.textContent);
                    addToLastSearches(searchedGame.results[0]);
                    let card = generateCard(searchedGame.results[0], index);
                    cardList.innerHTML = '';
                    cardList.insertAdjacentHTML('beforeend', card);
                    searchUl.classList.add('hide');
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
        let card;
        let games;
        gamePage = 1;
        if (search.value.toLowerCase() === 'pc') {
            games = await platformApi(1);
        } else if (search.value.toLowerCase() === 'playstation') {
            games = await platformApi(2);
        } else if (search.value.toLowerCase() === 'xbox') {
            games = await platformApi(3);
        } else if (search.value.toLowerCase() === 'nintendo') {
            games = await platformApi(7);
        } else {
            games = await searchApi(search.value);
        }
        console.log(games.results);
        addToLastSearches(games.results[0]);
        games.results.forEach(async (element, index) => {
            card = await generateCard(element, index);
            cardList.insertAdjacentHTML('beforeend', card);
        });
    }
});

search.addEventListener('focus', () => {
    overlay.classList.remove('hide');
    searchUl.classList.remove('hide');
});

search.addEventListener('blur', () => {
    overlay.classList.add('hide');
    searchUl.classList.add('hide');
});

overlay.addEventListener('click', () => {
    searchUl.classList.add('hide');
});

lastSearchesBtn.addEventListener('click', () => {
    cardList.innerHTML = '';
    var card;
    lastSearches.forEach((element, index) => {
        card = generateCard(element, index);
        cardList.insertAdjacentHTML('beforeend', card);
    });
});
