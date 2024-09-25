const API_URL = 'https://rickandmortyapi.com/api/character';

const section = document.querySelector('section');
const reloader = document.querySelector('.logo-rickandmorty-nav');
const filterInput = document.getElementById('filterCharacter');


async function showCharacters(characters) {
    section.innerHTML = '';
    
    characters.forEach(async (character) => {
        const episodeResponse = await fetch(character.episode[0]);
        const episodeInfo = await episodeResponse.json();

        const article = document.createRange().createContextualFragment(`
            <article>
                <div class="card-image">
                    <img src="${character.image}" alt="${character.name}">
                </div>
                <div class="card-info">
                    <div class="card-info-name">
                        <a href="../pages/character/hepatitisa.html">${character.name}</a>
                    </div>
                    <div class="card-info-life">
                        <span class="card-info-life-status-icon ${character.status.toLowerCase()}"></span>
                        ${character.status} - ${character.species}
                    </div>
                    <div class="card-info-location">
                        Last known location:
                        <a href="#">${character.location.name}</a>
                    </div>
                    <div class="card-info-firstseen">
                        First seen in:
                        <a href="#">${episodeInfo.name}</a>
                    </div>
                </div>
            </article>
        `);
        section.appendChild(article);
    });
}

async function getCharactersRandomly() {
    try {
        let arrayRandomIdCharacter = [];
        for (let i = 1; i < 7; i++) {
            let randomIdCharacter = Math.floor(Math.random()*827);
            arrayRandomIdCharacter.push(randomIdCharacter);
        }
        let urlCharacter = `${API_URL}/${arrayRandomIdCharacter.join(",")}`;
        const response = await fetch(urlCharacter);
        const characters = await response.json();
        showCharacters(characters);
    } catch (error) {
        console.log("Couldn't fetch characters.", error.message);
    }
};



async function showPageNumber(url) {
    // Carga de página con articles desde la paginación
    try {
        const response = await fetch(url);
        const characters = await response.json();
        showCharacters(characters.results);
    }
    catch (error) {
        console.log("Couldn't fetch characters.", error.message);
    }
};

async function paginationForFilteredCharacters(filteredQuantity, urlWithFilters) {
    const paginationNumber = document.getElementById('pagination');
    paginationNumber.innerHTML = '';

    for (let i = 1; i <= filteredQuantity.pages; i++) {
        let urlWithFiltersAndPagination = `${urlWithFilters}&page=${i}`;
        paginationNumber.innerHTML += `
            <button 
                class="page-number" 
                onclick="showPageNumber('${urlWithFiltersAndPagination}')">
                    ${i}
            </button>
        `;        
    }
};

async function getFilteredCharacters(filterSearch) {
    try {
        let urlWithFilters = `${API_URL}/?`;
        if (filterSearch !== "") urlWithFilters += `name=${filterSearch.toLowerCase()}`;

        const response = await fetch(urlWithFilters);
        const characters = await response.json();

        let filteredCharacters = characters.results;
        let filteredQuantity = characters.info;

        if (filteredCharacters) {
            showCharacters(filteredCharacters);
            paginationForFilteredCharacters(filteredQuantity, urlWithFilters);
        }
        else {
            console.log("Sorry, we couldn't find any character.");
        }
    }
    catch (error) {
        console.log(`Couldn't fetch characters.`, error);
    }
};

filterInput.addEventListener("keypress", (evt) => {
    if (evt.key === "Enter") {
        evt.preventDefault();
        getFilteredCharacters(filterInput.value);
    }
})

reloader.addEventListener('click', () => {
    getCharactersRandomly();
})

getCharactersRandomly();






