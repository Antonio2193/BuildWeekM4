const Url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const ricerca = async (query) => {
  try {
    const response = await fetch(`${Url}${query}`);
    if (!response.ok) throw new Error("Errore nel fetch dei dati");
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Errore:", error);
  }
};

const createCard = (imgSrc, title, artistName, artistId, isAlbum) => {
  const card = `
    <div class="card album-cards ${isAlbum ? 'justify-content-between text-center' : 'd-flex flex-row justify-content-between'}" style="width: ${isAlbum ? '16rem; height: 20rem;' : '20rem; height: 6rem;'}" ${isAlbum ? '' : `onclick="songId(${artistId})"`}>
      <img src="${imgSrc}" class="card-img-top ${isAlbum ? '' : 'foto-canzone'}" alt="Foto album">
      <div class="card-body ${isAlbum ? '' : 'd-flex flex-column'}">
        <h5 class="card-title fs-6 fw-bold ">${title}</h5>          
        <a href="./artist.html?id=${artistId}" class="card-text">${artistName}</a>
      </div>
    </div>`;
  return card;
};

const music = async (name) => {
  console.log(name);
  const searchMusic = await ricerca(name);
  if (name && searchMusic && searchMusic.length > 0) {
    const divArtista = document.querySelector(".artista");
    divArtista.innerHTML = `
      <div class="text-center">
        <img src="${searchMusic[0].artist.picture_xl}" alt="Foto artista" class="foto" />
        <h6 class="mt-3 fw-bold">${searchMusic[0].artist.name}</h6>
      </div>`;

    const divAlbum = document.querySelector(".album");
    const divCanzoni = document.querySelector(".canzoni");
    divAlbum.innerHTML = '';
    divCanzoni.innerHTML = '';

    searchMusic.forEach((singolaSearch) => {
      divAlbum.innerHTML += createCard(singolaSearch.album.cover_xl, singolaSearch.album.title, singolaSearch.artist.name, singolaSearch.artist.id, false);
      divCanzoni.innerHTML += createCard(singolaSearch.album.cover_xl, singolaSearch.album.title, singolaSearch.artist.name, singolaSearch.artist.id, true);
    });
  }
};

const songId = (id) => {
  location.assign(`./album.html?id=${id}`);
};

const valoreInput = async () => {
  const input = document.getElementById("cerca");
  const content = input.value;
  window.localStorage.clear();
  await music(content);
};

window.onload = async () => {
  const searchHistory = localStorage.getItem("Text input");
  if (searchHistory) await music(searchHistory);
};
