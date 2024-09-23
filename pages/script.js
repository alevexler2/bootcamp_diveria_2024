const API_URL = 'https://rickandmortyapi.com/api/character';

const reloader = document.querySelector('.logo-rickandmorty-nav');


async function getSixCharacters() {
    for (let i = 1; i < 7; i++) {
        
        const randomCharacter = Math.floor(Math.random()*827); // 826 personajes
    
        async function getCharacter(callback) {
            await fetch(`${API_URL}/${randomCharacter}`)
                .then(response => response.json())
                .then(data => callback(data))
                .catch(error => error.message);
        } 
    
        const section = document.querySelector('section');
        section.innerHTML = '';

        getCharacter(character => {          
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
                            <a href="#">${character.origin.name}</a>
                        </div>
                    </div>
                </article>
            `);
                
            section.appendChild(article);
        })
    }
}

reloader.addEventListener('click', () => {
    getSixCharacters();
})

getSixCharacters();






