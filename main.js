class Character {
    constructor(id, name, status, species, origin, location, gender, image, episode) {
        this.id = id
        this.name = name;
        this.status = status;
        this.species = species;
        this.origin = origin;
        this.location = location;
        this.gender = gender;
        this.image = image;
        this.episode = episode;
    }
}

const urlCharacters = 'https://rickandmortyapi.com/api/character/';
let personajes = [];
const nameHTML = document.getElementById("name-filter")
const genderHTML = document.getElementById("gender-filter")
const statusHTML = document.getElementById("status-filter")

async function getEpisodeName(episodeUrl) {
    try {
        const response = await fetch(episodeUrl);
        const data = await response.json();
        return data.name;
    } catch (error) {
        console.error('Error obteniendo episodio:', error);
        return 'Unknown';
    }
}

nameHTML.addEventListener('keyup', function (event) {
    if(event.key == 'Enter'){
        const nameToFilter = nameHTML.value.trim();
        if (nameToFilter) {
            filterPerNameStatusGender();
        }
    }
});
statusHTML.addEventListener('change', function () {
    filterPerNameStatusGender(); // Aplicar los filtros cuando se cambie el estado
});
genderHTML.addEventListener('change', function () {
    filterPerNameStatusGender(); // Aplicar los filtros cuando se cambie el estado
});
async function filterPerNameStatusGender() {
    const nameToFilter = nameHTML.value.trim();
    const statusToFilter = statusHTML.value;
    const genderToFilter = genderHTML.value;

    let characterNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 826) + 1);
    console.log(characterNumbers)
    try {
        let url = `${urlCharacters}?`;
        
        if (nameToFilter) {
            url += `name=${nameToFilter}`;
        }
        if (statusToFilter) {
            url += `&status=${statusToFilter}`;
        }
        if (genderToFilter) {
            url += `&gender=${genderToFilter}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
            console.log(data.results)
            updateHTML(data.results); // Mostrar los personajes filtrados
        }
        localStorage.setItem('personajes', JSON.stringify(data.results));
    } catch (error) {
        console.error('Error al obtener los personajes:', error);
    }
    
}
function updateHTML(personajes) {
    index = 0
    const characterContainer = document.getElementById('contenedor-personajes');
    characterContainer.innerHTML = '';

    personajes.forEach(personaje => {
        const characterCard = `
           <div class="display-informacion">
            <div class="contenedor-imagen">
                <img src="${personaje.image}" alt="" class="imagen-informacion">
            </div>
            <div class="contenedor-datos">
                <a href="pages/pagina_personaje.html?id=${index++}">
                    <h2 class="nombre-personaje">${personaje.name}</h2>
                </a>
                <div class="estado-personaje">
                    <span class="punto-estado-${personaje.status}"></span>
                    <span class="texto-estado-personaje">${personaje.status} - ${personaje.species}</span>
                </div>
                
                <span class="subtitulo-personaje">Last known location:</span>
                <span class="texto-personaje">${personaje.location.name}</span>

                <span class="subtitulo-personaje">First seen in:</span>
                <span class="texto-personaje">${personaje.origin.name}</span>
            </div>
        </div>
        `;
        characterContainer.innerHTML += characterCard;
    });
}
// Llamar a la función para obtener y mostrar los personajes
let index=0
filterPerNameStatusGender()
