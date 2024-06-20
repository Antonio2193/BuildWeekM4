const Url = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const UrlSong = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const fetchQuery = async (query) => {
  const album = await fetch(`${Url}${query}`);
  const {
    id,
    title,
    cover_xl,
    duration,
    artist,
    release_date,
    tracks: { data },
  } = await album.json();
  const divSopra = document.querySelector(".sopra");
  divSopra.innerHTML += `
  <div class="foto-album">
    <img src="${cover_xl}" alt="Foto Album" style="width: 200px; height: 200px;" />
  </div>
  <div class="ms-4">
    <p class="scritta-album fw-bold m-0">ALBUM</p>
    <p class="titolo-album fw-bold m-0 mb-2">${title}</p>
    <div class="d-flex align-items-end">
      <div class="foto-artista">
        <img src="${
          artist.picture_xl
        }" alt="Logo Artista" class="rounded-circle me-2" style="width: 25px; height: 25px"/>
      </div>
      <div class="scritta-album d-flex align-items-end">
        <p class="m-0 fw-bold">${artist.name}</p>
        <i class="bi bi-dot"></i>
        <p class="m-0">${release_date.slice(0, 4)}</p>
        <i class="bi bi-dot"></i> 
        <p class="m-0 fw-bold">
          ${data.length} brani, 
          <span> 
            ${Math.floor(duration / 60)} min 
            ${duration - [Math.floor(duration / 60) * 60]} sec.
          </span>
        </p> 
      </div>
    </div>
  </div>
            `;
  return data;
};

const album = async () => {
  const canzoni = await fetchQuery("6893935");
  console.log(canzoni);
  const divSotto = document.querySelector(".elenco");
  for (let i = 0; i < canzoni.length; i++) {
    const singoli = canzoni[i];
    divSotto.innerHTML += `
    <div class="canzoni row p-0 align-items-center m-0 mb-3 pe-4" 
      onclick="canzoniSingole('${singoli.title}','${singoli.artist.name}')">
      <div class="col-1 p-0 text-center">${i + 1}</div>
      <div class="col-5 p-0 text-start">
        <span class="fw-bold text-white">${singoli.title}</span>
        <br>
        ${singoli.artist.name}
      </div>
      <div class="col-3 p-0 text-end" >${singoli.rank}</div>
      <div class="col-3 p-0 text-end">
      ${Math.floor(singoli.duration / 60)}:${singoli.duration - Math.floor(singoli.duration / 60) * 60}
    </div>
    `;
  }
};

const canzoniSingole = async (title, name) => {
  const song = await fetch(`${UrlSong}${title}${name}`);
  const { data } = await song.json();
  console.log(data);
  const primaCanzone = data[0];
  const canzoneSingola = document.querySelector(".singoli");
  canzoneSingola.innerHTML = `
  <div class="col-6">
    <img src="${primaCanzone.album.cover_xl}" alt="Foto album" style="width: 60px; height: 60px"/>
  </div>
  <div class="col-6">
    <span class="fw-bold">${primaCanzone.title} </span>
    <br>
    <span>${primaCanzone.artist.name}</span>
  </div>
  `;
};

window.onload = async () => {
  await album();
};

/* da scommentare quando si unisce alla */

/* window.onload = async () => {
  let url = new URLSearchParams(location.search);
  let id = url.get("id");
  if (!id) {
    window.location.assign("./homepage.html");
  }
  await album(id);
}; */