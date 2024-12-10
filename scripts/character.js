const characterDescriptElement = document.getElementById("character-descript");
const characterInfoElement = document.getElementById("character-info-box");
// Función para extraer parámetros de la URL
const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"),
  };
};

const createInfoList = (character) => {
  const infoList = document.createElement("ul");
  infoList.classList.add("character-info-list");

  const speciesItem = document.createElement("li");
  speciesItem.innerHTML = `<strong>SPECIES:</strong> ${character.species}`;

  const typeItem = document.createElement("li");
  typeItem.innerHTML = `<strong>TYPE:</strong> ${character.type || "N/A"}`;

  const genderItem = document.createElement("li");
  genderItem.innerHTML = `<strong>GENDER:</strong> ${character.gender}`;

  const locationItem = document.createElement("li");
  locationItem.innerHTML = `<strong>LOCATION:</strong> ${character.location.name}`;

  infoList.appendChild(speciesItem);
  infoList.appendChild(typeItem);
  infoList.appendChild(genderItem);
  infoList.appendChild(locationItem);
  return infoList;
};

const createCharacterDescription = (character) => {
  const nameContainer = document.createElement("div");
  nameContainer.classList.add("character-name");
  const characterName = document.createElement("h1");
  characterName.textContent = character.name;
  nameContainer.appendChild(characterName);

  const infoList = createInfoList(character);

  characterDescriptElement.appendChild(nameContainer);
  characterDescriptElement.appendChild(infoList);
};

const createStatusInfo = (character) => {
  const statusInfo = document.createElement("div");
  statusInfo.classList.add("subinfo");
  let statusClass = "";
  if (character.status === "Alive") {
    statusClass = "alive";
  } else if (character.status === "Dead") {
    statusClass = "dead";
  } else {
    statusClass = "unknown";
  }
  statusInfo.innerHTML = `<div class="character-subinfo-box-title">STATUS:</div>
                            <div class="character-subinfo-box-desc character-status">
                            <span class="status-icon ${statusClass}"></span>
                            <span>${character.status}</span>
                            </div>`;
  return statusInfo;
};

const createFirstSeenInfo = (firstseen) => {
  const firstSeenInfo = document.createElement("div");
  firstSeenInfo.classList.add("subinfo");
  firstSeenInfo.innerHTML = `<div class="character-subinfo-box-title">FIRST SEEN IN:</div>
                                <div class="character-subinfo-box-desc">${firstseen}</div>`;
  return firstSeenInfo;
};

const createCharacterInfoBox = (character, firstseen) => {
  const characterInfoBox = document.createElement("div");
  characterInfoBox.classList.add("character-info-box");

  const boxCharacter = document.createElement("div");
  boxCharacter.classList.add("box-character");

  const boxCharacterName = document.createElement("div");
  boxCharacterName.classList.add("box-character-name");
  boxCharacterName.textContent = character.name;

  const boxCharacterImg = document.createElement("div");
  boxCharacterImg.classList.add("box-character-img");

  const characterImage = document.createElement("img");
  characterImage.src = character.image;

  boxCharacterImg.appendChild(characterImage);
  boxCharacter.appendChild(boxCharacterName);
  boxCharacter.appendChild(boxCharacterImg);

  /*subinfo*/
  const characterSubinfoBox = document.createElement("div");
  characterSubinfoBox.classList.add("character-subinfo-box");

  const statusInfo = createStatusInfo(character);

  const firstSeenInfo = createFirstSeenInfo(firstseen);

  characterSubinfoBox.appendChild(statusInfo);
  characterSubinfoBox.appendChild(firstSeenInfo);

  characterInfoElement.appendChild(boxCharacter);
  characterInfoElement.appendChild(characterSubinfoBox);

  return characterInfoBox;
};

const loadCharacterDescription = async () => {
  try {
    characterInfoElement.innerHTML = "";
    characterDescriptElement.innerHTML = "";
    const { id } = getQueryParams();
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const character = await response.json();
    const firstSeenResponse = await fetch(character.episode[0]);
    const firstSeenData = await firstSeenResponse.json();

    createCharacterDescription(character, firstSeenData.name);
    createCharacterInfoBox(character, firstSeenData.name);
  } catch (error) {
    console.error(error);
  }
};

window.onload = loadCharacterDescription;
