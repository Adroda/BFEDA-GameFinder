const searchApi = async (value) => {
    const response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${value}`
    );
    var data = await response.json();
    return data;
};

const search = document.querySelector('.search__box');
const searchUl = document.querySelector('.search__list');
const cardList = document.querySelector('.cardList');
const lastSearchesBtn = document.querySelector('.lastSearchesBtn');
let dropdown = {};
const lastSearches = [];

const addLastSearches = (game) => {
    if (lastSearches.length === 2) {
        lastSearches.pop();
    }
    lastSearches.unshift(game);
};

search.addEventListener('input', async () => {
    if (search.value !== '') {
        //TODO preguntar aca como hago para q cuando borro muy rapido al final lo ponga en blanco igual
        const searchProm = await searchApi(search.value);
        const searchList = searchProm.results;
        searchUl.innerHTML = '';
        var listItem;
        searchList.forEach((element) => {
            listItem = `
            <li class="list__item">${element.name}</li>
            <hr />`;
            document
                .querySelector('.search__list')
                .insertAdjacentHTML('beforeend', listItem);
        });
        dropdown = document.querySelectorAll('.list__item');
        dropdown.forEach((element) => {
            element.addEventListener('click', async () => {
                const searchedGame = await searchApi(element.textContent);
                addLastSearches(searchedGame.results[0]);
                let card = generateCard(searchedGame.results[0]);
                cardList.innerHTML = '';
                cardList.insertAdjacentHTML('beforeend', card);
            });
        });
        //console.log(dropdown);
    } else {
        searchUl.innerHTML = '';
    }
});

search.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        cardList.innerHTML = '';
        searchUl.innerHTML = '';
        var card;
        const games = await searchApi(search.value);
        addLastSearches(games.results[0]);
        games.results.forEach((element) => {
            //TODO las imagenes de los juegos son todas distintas me rompen todas las cards
            card = generateCard(element);
            cardList.insertAdjacentHTML('beforeend', card);
        });
    }
});

lastSearchesBtn.addEventListener('click', () => {
    cardList.innerHTML = '';
    var card;
    lastSearches.forEach((element) => {
        card = generateCard(element);
        cardList.insertAdjacentHTML('beforeend', card);
    });
});
