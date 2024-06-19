document.addEventListener("DOMContentLoaded", () => {
  pescaArtista();
});

function pescaArtista() {
    // Genera un numero casuale tra 1 e 150
    const idRandom = Math.floor(Math.random() * 150) + 1;
  
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${idRandom}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Passiamo il nome dell'artista alla funzione ultimoBrano
        ultimoBrano(data.name);
        buonasera(data.name);
      })
      .catch((err) => {
        console.log("errore: " + err);
      });
  }

function ultimoBrano(artistaIndex) {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistaIndex}`
  )
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
                                                    <p class="song-subtitle">Ascolta l\'ultimo singolo di ${element.artist.name}</p>
                                                    <div class="btn-wrapper d-flex align-items-center gap-20">
                                                        <a href="#" class="playIco fa-solid fa-circle-play "></a>
                                                        <a href="#" class="btn btn-outline-light rounded-pill">Salva</a>
                                                        <a href="#"><i class="bi bi-three-dots"></i></a>
                                                    </div>
                                                  </div>
                                                  <label class="absolute">Metti il crack</label>`
                                                  ;
        }
      });
    })
    .catch((err) => {
      console.log("errore: " + err);
    });
}

function buonasera(artistaIndex) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistaIndex}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.data.forEach((element, i) =>{
                if (i < 6) {
                    let albumRandom = document.getElementById('random-album')
                    albumRandom.innerHTML += `<div class="album d-flex p-0">
                <img src=${element.album.cover_medium} alt="Cover Album">
                <p>${element.album.title}</p>
              </div>`
                }
            })
        })
        .catch((err) => {
            console.log("errore: " + err);
        });
    }
