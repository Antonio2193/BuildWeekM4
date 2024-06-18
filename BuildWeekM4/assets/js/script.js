document.addEventListener("DOMContentLoaded", () => {
    ultimoBrano()
    fetch('https://striveschool-api.herokuapp.com/api/deezer/artist/300')
        .then((response)=>{
            response.json().then((data)=>{
                console.log(data)
            })
        })
});

let artista = ['Iron Maiden', 'Metallica', 'Dream Theater', 'Pink Floyd', 'Queen', 'Gianni Celeste', 'Squallor']
let artistaRandom = (Math.round((Math.random()*artista.length)));
let artistaIndex = artista[artistaRandom]


function ultimoBrano(){
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistaIndex}`)
        .then((response)=>{
            response.json().then((data)=>{
            });
        }) 
        
    .catch((err)=>{console.log("errore"+ err);});
    }

    




