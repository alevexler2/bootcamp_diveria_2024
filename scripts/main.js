const listCardsContainerElement = document.getElementById(
  "list-cards-container"
);
const btnShowOthers = document.getElementById("btn-show-others");

const createCharacterImage = (imageSrc, name) => {
  return `
    <div class="col-sm-3 col-md-4">
      <img
        src="${imageSrc}"
        class="object-fit-cover img-fluid rounded-start h-100"
        alt="${name}"
      />
    </div>
  `;
};

const createCharacterName = (name, id) => {
  return `
    <div class="character-name">
      <a class="character-name-link" href="/pages/character.html?id=${id}">${name}</a>
    </div>
  `;
};

const createCharacterStatus = (status, species) => {
  let statusClass = "";
  if (status === "Alive") {
    statusClass = "alive";
  } else if (status === "Dead") {
    statusClass = "dead";
  } else {
    statusClass = "unknown";
  }

  return `
    <div class="character-status">
      <span class="status-icon ${statusClass}"></span>
      <span class="status-type">${status} - ${species}</span>
    </div>
  `;
};

const createCharacterLocation = (locationName) => {
  return `
    <div class="character-last-location">
      <span class="row info-title">Last known location:</span>
      <a class="row info-link">${locationName}</a>
    </div>
  `;
};

const createCharacterFirstSeen = (episode) => {
  return `
    <div class="character-first-seen">
      <span class="row info-title">First seen in:</span>
      <a class="row info-link">${episode}</a>
    </div>
  `;
};

const createCharacterCard = (character, firstSeen) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add(
    "card-container",
    "col-sm-12",
    "col-md-12",
    "col-lg-6",
    "mb-3"
  );
  cardElement.innerHTML = `
    <div class="card mx-4 mx-sm-1 mx-md-1 mx-lg-1">
      <div class="row g-0">
        ${createCharacterImage(character.image, character.name)}
        <div class="col-sm-9 col-md-8">
          <div class="card-body">
            ${createCharacterName(character.name, character.id)}
            ${createCharacterStatus(character.status, character.species)}
            ${createCharacterLocation(character.location.name)}
            ${createCharacterFirstSeen(firstSeen)} 
          </div>
        </div>
      </div>
    </div>
  `;

  return cardElement;
};

const loadListCards = async () => {
  try {
    let idCharacters = [];
    for (let i = 1; i <= 10; i++) {
      idCharacters.push(Math.floor(Math.random() * 826) + 1);
    }
    let strUrl = "https://rickandmortyapi.com/api/character/";
    strUrl += idCharacters.join(",");
    const response = await fetch(strUrl);
    const data = await response.json();

    listCardsContainerElement.innerHTML = "";

    data.forEach(async (item) => {
      const episodeResponse = await fetch(item.episode[0]);
      const episodeData = await episodeResponse.json();

      const cardElement = createCharacterCard(item, episodeData.name);
      listCardsContainerElement.appendChild(cardElement);
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

btnShowOthers.addEventListener("click", (event) => {
  loadListCards();
});

window.onload = loadListCards;
