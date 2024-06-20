const Url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const ricerca = async (query) => {
  const song = await fetch(`${Url}${query}`);
  const { data } = await song.json();
  return data;
};

const music = async (name) => {
  console.log(name);
  const searchMusic = await ricerca(name);
  /* console.log(searchMusic); */
  if (name) {
    const divArtista = document.querySelector(".artista");
    divArtista.innerHTML += `
      <div class="text-center">
        <img src="${searchMusic[0].artist.picture_xl}" alt="Foto artista" class="foto" />
        <h6 class="mt-3 fw-bold">${searchMusic[0].artist.name}</h6>
      </div>
      `;

    searchMusic.forEach((singolaSearch) => {
      const divAlbum = document.querySelector(".album");
      divAlbum.innerHTML += `
        <div class="card album-cards d-flex flex-row justify-content-between" style="width: 20rem; height: 6rem;" onclick="songId(${singolaSearch.album.id})">
            <img src="${singolaSearch.album.cover_xl}" class="card-img-top foto-canzone" alt="Foto album>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fs-6 fw-bold ">${singolaSearch.album.title}</h5>          
            <a href="./artist.html?id=${singolaSearch.artist.id}"class="card-text">${singolaSearch.artist.name}</a>
          </div>
        </div>
        `;

      const divCanzoni = document.querySelector(".canzoni");
      divCanzoni.innerHTML += `
        <div class="card album-cards justify-content-between text-center" style="width: 16rem; height: 20rem;">
            <img src="${singolaSearch.album.cover_xl}" class="card-img-top" alt="Foto album>
          <div class="card-body">
            <h5 class="card-title fs-6 fw-bold ">${singolaSearch.album.title}</h5>          
            <a href="./artist.html?id=${singolaSearch.artist.id}"class="card-text">${singolaSearch.artist.name}</a>
          </div>
        </div>
        `;
    });
  }
};

function songId(id) {
  id.onclick = location.assign(`./album.html?id=${id}`);
}

const valoreInput = async () => {
  const input = document.getElementById("cerca");
  const content = input.value;
  window.localStorage.clear();
  /* localStorage.setItem("Text input", content); */

  await music(content);
};

window.onload = async () => {
  const searchHistory = localStorage.getItem("Text input");
  await music(searchHistory);
};