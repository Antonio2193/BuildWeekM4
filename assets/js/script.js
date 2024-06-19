document.addEventListener("DOMContentLoaded", () => {
    pescaArtista();
});

function ultimoBrano(artistaIndex) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistaIndex}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            
        })
        .catch((err) => {
            console.log("errore: " + err);
        });
}

function pescaArtista() {
    // Genera un numero casuale tra 1 e 150
    const idRandom = Math.floor(Math.random() * 150) + 1;

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${idRandom}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            // Passiamo il nome dell'artista alla funzione ultimoBrano
            ultimoBrano(data.name);
        })
        .catch((err) => {
            console.log("errore: " + err);
        });
}
