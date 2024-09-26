document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");
    const nextPageBtn = document.getElementById("next-page-btn");
    const searchBtn = document.getElementById("search-btn");
    const nameInput = document.getElementById("character-name");
    const statusSelect = document.getElementById("character-status");
    const genderSelect = document.getElementById("character-gender");
    const loadingSpinner = document.getElementById("loading-spinner");

    let nextPageUrl = null;

    loadingSpinner.style.display = "block";

    function generateCard(character) {
        return `
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${character.image}" class="card-img" alt="${character.name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${character.name}</h5>
                                <p class="card-text">
                                    <span class="status-${character.status.toLowerCase()}">${character.status} - ${character.species}</span>
                                </p>
                                <p class="card-text">
                                    Last known location:<br>
                                    <a href="#">${character.location.name}</a>
                                </p>
                                <p class="card-text">
                                    First seen in:<br>
                                    <a href="#">${character.origin.name}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function fetchCharacters(url) {
        loadingSpinner.style.display = "block";
        cardContainer.style.display = "none";
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const characters = data.results.slice(0, 6);
                cardContainer.innerHTML = "";
                characters.forEach(character => {
                    const cardHTML = generateCard(character);
                    cardContainer.innerHTML += cardHTML;
                });
                nextPageUrl = data.info.next;
                nextPageBtn.disabled = !nextPageUrl;
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            })
            .finally(() => {
                loadingSpinner.style.display = "none";
                cardContainer.style.display = "flex";
            });
    }

    function buildApiUrl() {
        const baseUrl = 'https://rickandmortyapi.com/api/character/';
        const name = nameInput.value.trim();
        const status = statusSelect.value;
        const gender = genderSelect.value;

        let url = `${baseUrl}?`;
        if (name) url += `name=${name}&`;
        if (status) url += `status=${status}&`;
        if (gender) url += `gender=${gender}`;

        return url;
    }

    searchBtn.addEventListener("click", () => {
        const apiUrl = buildApiUrl();
        fetchCharacters(apiUrl); 
    });

    nextPageBtn.addEventListener("click", () => {
        if (nextPageUrl) {
            fetchCharacters(nextPageUrl);
        }
    });

    fetchCharacters('https://rickandmortyapi.com/api/character');
});
