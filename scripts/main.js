const listCardsContainerElement = document.getElementById(
  "list-cards-container"
);
const btnShowOthers = document.getElementById("btn-show-others");
const inputSearch = document.getElementById("input-search");
const filterRadioButtonsStatus =
  document.getElementsByName("inlineRadioOptions");
const filterRadioButtonsGender = document.getElementsByName(
  "dropdownRadioGender"
);
const btnSearch = document.getElementById("btn-search");

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

const loadListCardsContainer = async (data) => {
  listCardsContainerElement.innerHTML = "";

  data.forEach(async (item) => {
    const episodeResponse = await fetch(item.episode[0]);
    const episodeData = await episodeResponse.json();

    const cardElement = createCharacterCard(item, episodeData.name);
    listCardsContainerElement.appendChild(cardElement);
  });
};

const loadListCardsRandom = async () => {
  // para la primera cargar y btn carga de 10 personajes aleatorios
  try {
    let idCharacters = [];
    for (let i = 1; i <= 10; i++) {
      idCharacters.push(Math.floor(Math.random() * 826) + 1);
    }
    let strUrl = "https://rickandmortyapi.com/api/character/";
    strUrl += idCharacters.join(",");
    const response = await fetch(strUrl);
    const data = await response.json();

    loadListCardsContainer(data);
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

const loadPage = async (url) => {
  if (!url) return;
  try {
    const response = await fetch(url);
    const data = await response.json();

    loadListCardsContainer(data.results);
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

const createPagination = (info, strUrlFilter) => {
  const paginationElement = document.querySelector(".pagination");
  paginationElement.innerHTML = "";

  for (let i = 1; i <= info.pages; i++) {
    paginationElement.innerHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="loadPage('${strUrlFilter}&page=${i}')">${i}</a>
      </li>
    `;
  }
};

const loadListCardsWithFilter = async (
  filterStatus,
  filterName,
  filterGender
) => {
  try {
    let strUrlFilter = "https://rickandmortyapi.com/api/character/?";
    if (filterName !== "") strUrlFilter += "name=" + filterName.toLowerCase();
    if (filterStatus.toLowerCase() !== "")
      if (filterStatus.toLowerCase() !== "all")
        strUrlFilter += "&status=" + filterStatus.toLowerCase();
    if (filterGender.toLowerCase() !== "")
      if (filterGender.toLowerCase() !== "all")
        strUrlFilter += "&gender=" + filterGender.toLowerCase();
    const response = await fetch(strUrlFilter);
    const data = await response.json();

    let filteredData = data.results;

    if (filteredData && filteredData.length > 0) {
      loadListCardsContainer(filteredData);
      createPagination(data.info, strUrlFilter);
    } else {
      alert("No characters found with the selected filter");
    }
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

btnShowOthers.addEventListener("click", (event) => {
  loadListCardsRandom();
});

btnSearch.addEventListener("click", (event) => {
  let selectedStatus = "all";
  filterRadioButtonsStatus.forEach((button) => {
    if (button.checked) {
      if (button.id === "inlineRadio1") {
        selectedStatus = "Alive";
      } else if (button.id === "inlineRadio2") {
        selectedStatus = "Dead";
      } else if (button.id === "inlineRadio3") {
        selectedStatus = "Unknown";
      }
    }
  });
  selectedGender = "all";
  filterRadioButtonsGender.forEach((button) => {
    if (button.checked) {
      if (button.id === "dropdownRadioFemale") {
        selectedGender = "female";
      } else if (button.id === "dropdownRadioMale") {
        selectedGender = "male";
      } else if (button.id === "dropdownRadioGenderless") {
        selectedGender = "genderless";
      } else if (button.id === "dropdownRadioUnknown") {
        selectedGender = "unknown";
      }
    }
  });
  loadListCardsWithFilter(selectedStatus, inputSearch.value, selectedGender);
});

window.onload = loadListCardsRandom;
