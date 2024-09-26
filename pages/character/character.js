const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get('id');
console.log(`The ID is: ${id}`);

const characters = JSON.parse(localStorage.getItem('characters'));

if (id && characters) {
    const character = characters[id];
    const characterTitle = document.querySelector('h2');
    const characterArticle = document.querySelector('article');
    
    characterTitle.textContent = character.name;
    
    characterArticle.innerHTML = `
        <div class="card-image">
            <img src="${character.image}" alt="${character.name}">
        </div>
        <div class="card-info">
            <div class="card-info-life">
                <span class="card-info-life-status-icon ${character.status.toLowerCase()}"></span>
                ${character.status} - ${character.species}
            </div>
            <div class="card-info-location">
                Origin:
                <a href="#">${character.origin.name}</a>
            </div>
            <div class="card-info-firstseen">
                First seen in:
                <a href="#">${character.location.name}</a>
            </div>
            <div class="card-info-definition">
                Description:
                <p>
                    Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon for Cartoon Network's nighttime programming block Adult Swim. The series follows the misadventures of Rick Sanchez, a cynical mad scientist, and his good-hearted but fretful grandson Morty Smith, who split their time between domestic life and interdimensional adventures that take place across an infinite number of realities, often traveling to other planets and dimensions through portals and on Rick's flying saucer. The general concept of Rick and Morty relies on two conflicting scenarios: domestic family drama and a misanthropic grandfather dragging his grandson into hijinks.
                </p>
            </div>
        </div>
    `;
}