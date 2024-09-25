const params = new URLSearchParams(window.location.search);
const characterId = params.get('id');

const personajes = JSON.parse(localStorage.getItem('personajes'));

if (personajes && characterId) {
    const personaje = personajes[characterId];

    const characterDetail = document.getElementById('tarjeta-informacion-personaje');
    const characterTitleName = document.getElementById('titulo-nombre-personaje');

    characterTitleName.innerText = personaje.name
    characterDetail.innerHTML = `
                <img src="${personaje.image}" class="card-img-top" alt="${personaje.name}">
                      <div class="card-body">
                        <h5 class="card-title text-center">${personaje.name}</h5>
                        <p class="card-text text-center">Información biográfica.</p>
                      </div>
                
                      <!-- Tabla de información -->
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Especie:</strong> ${personaje.species}</li>
                        <li class="list-group-item"><strong>Género:</strong> ${personaje.gender}</li>
                        <li class="list-group-item"><strong>Estado:</strong> ${personaje.status}</li>
                        <li class="list-group-item"><strong>Planeta Origen:</strong> ${personaje.origin.name}</li>
                        <li class="list-group-item"><strong>Edad:</strong> 14 años</li>
                        <li class="list-group-item"><strong>Primera aparición:</strong> ${personaje.location.name}</li>
                        <li class="list-group-item"><strong>Ocupación:</strong> Unknown</li>
                      </ul>
            `;
    
}