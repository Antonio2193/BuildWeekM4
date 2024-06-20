document.addEventListener("DOMContentLoaded", () => {
  pescaArtista();
  buonasera();
});

function pescaArtista() {
  const idRandom = Math.floor(Math.random() * 150) + 1;

  fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${idRandom}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      ultimoBrano(data.name);
    })
    .catch((err) => {
      console.log("errore: " + err);
    });
}

function getArtista() {
  const idRandom = Math.floor(Math.random() * 150) + 1;

  return fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${idRandom}`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("errore: " + err);
    });
}

function ultimoBrano(artistaIndex) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistaIndex}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const canzoneRandom = Math.floor(Math.random() * 25);
      data.data.forEach((element, i) => {
        if (i === canzoneRandom) {
          let contenitoreArtista = document.getElementById("last-song");
          contenitoreArtista.innerHTML = `<img src="${element.album.cover_medium}" alt="Cover Album">
                                                  <div class="first-song-wrapper d-flex flex-column  px-3">
                                                    <p class="">${element.album.title}</p>
                                                    <h1 class="">${element.title_short}</h1>
                                                    <p class="song-subtitle">Ascolta l'ultimo singolo di ${element.artist.name}</p>
                                                    <div class="btn-wrapper d-flex align-items-center gap-20">
                                                        <a href="#" class="playIco fa-solid fa-circle-play "></a>
                                                        <a href="#" class="btn btn-outline-light rounded-pill">Salva</a>
                                                        <a href="#"><i class="bi bi-three-dots"></i></a>
                                                    </div>
                                                  </div>
                                                  <label class="absolute">Metti il crack</label>`;
        }
      });
    })
    .catch((err) => {
      console.log("errore: " + err);
    });
}

async function buonasera() {
  const albumRandom = document.getElementById('random-album');
  albumRandom.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    try {
      const artist = await getArtista();
      console.log(`Artista ${i + 1}: ${artist.name} (ID: ${artist.id})`); 
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist.name}`);
      const data = await response.json();

      if (data.data.length > 0) {
        // Seleziona un elemento casuale dall'array data.data
        const randomIndex = Math.floor(Math.random() * data.data.length);
        const element = data.data[randomIndex];

        console.log(`Album ${i + 1}: ${element.album.title} (Artist: ${element.artist.name})`);

        albumRandom.innerHTML += `<div class="album d-flex p-0">
                    <img src=${element.album.cover_medium} alt="Cover Album">
                    <p>${element.album.title}</p>
                  </div>`;
      }
    } catch (err) {
      console.log("errore: " + err);
    }
  }
}
