document.addEventListener("DOMContentLoaded", () => {
  pescaArtista();
  buonasera();
  dailyMix();
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
      let contenitoreArtista = document.getElementById("first-song");
      contenitoreArtista.innerHTML = ''
      data.data.forEach((element, i) => {
        if (i === canzoneRandom) {
          
          contenitoreArtista.innerHTML = `<a href="./album.html?id=${element.album.id}"><img src="${element.album.cover_medium}" alt="Cover Album"></a>
                                                  <div class="first-song-wrapper d-flex flex-column  px-3">

                                                    <a href="./album.html?id=${element.album.id}"<p>${element.album.title}</p>
                                                    <h1>${element.title_short}</h1>
                                                    <p class="song-subtitle">${element.artist.name}/i</p>

                                                    <p class="">${element.album.title}</p>
                                                    <h1 class="">${element.title_short}</h1>
                                                    <p class="song-subtitle">${element.artist.name}</p>

                                                    <p class="song-subtitle">Ascolta l'ultimo singolo di ${element.artist.name}</p>
                                                    <div class="btn-wrapper d-flex align-items-center gap-20">
                                                        <a href="#" class="btn rounded-pill px-4 text-dark bg-spotify"><small>Play</small></a>
                                                        <a href="#" class="btn rounded-pill border px-4 text-white"><small>Salva</small></a>
                                                        <a href="#"><i class="bi bi-three-dots text-white"></i></a>
                                                    </div>
                                                  </div>
                                                  <label class="absolute py-1 px-3 bg-black rounded-2 fs-6 ">Metti il crack</label>`;
        }
      });
    })
    .catch((err) => {
      console.log("errore: " + err);
    });
}

async function buonasera() {
  const albumRandom = document.getElementById('six-album-wrapper');
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

        albumRandom.innerHTML += `<div class="album d-flex p-0 mb-2 rounded-1 align-items-center col overflow-hidden">
                    <img src=${element.album.cover_medium} width="50" alt="Cover Album" class="me-2">
                    <p class="m-0 ps-2">${element.album.title}</p>
                  </div>`;
      }
    } catch (err) {
      console.log("errore: " + err);
    }
  }
}




async function dailyMix() {
  const albumRandom = document.getElementById('generi-box-wrapper');
  albumRandom.innerHTML = '';
  for (let i = 0; i < 5; i++) {
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

        albumRandom.innerHTML += ` <div id ="generi-box" class="col">
                    <img src=${element.album.cover_medium} width="100" alt="Cover Album">
                    <p class="title">${element.album.title}</p>
                    <p class="">${element.artist.name}</p>
                  </div>`;
      }
    } catch (err) {
      console.log("errore: " + err);
    }
  }
}