const searchApi = async (value) => {
    const response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${value}`
    );
    var data = await response.json();
    return data;
};

const search = document.querySelector('.search__box');
const searchUl = document.querySelector('.search__list');

search.addEventListener('input', async () => {
    console.log(search.value);
    if (search.value !== '') {
        //preguntar aca como hago para q cuando borro muy rapido al final lo ponga en blanco igual
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
    } else {
        searchUl.innerHTML = '';
    }
});
