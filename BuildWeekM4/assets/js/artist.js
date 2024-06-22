const params = new URLSearchParams(location.search)
let id = params.get('id')
let nome = ''

document.addEventListener('DOMContentLoaded', () =>{
    artist()
} )

const Url = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const UrlSong = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";


function artist(){
    fetch(Url + id)
    .then((response) => {
        return response.json();
      })
      .then(data => {
        nome = data.name
        const divSopra = document.querySelector(".sopra");
  divSopra.innerHTML += `
  <div class="foto-album">
    <img src="${data.picture_medium}" alt="Foto Artista" style="width: 200px; height: 200px;" />
  </div>
  <div class="ms-4">
    <p class="titolo-album fw-bold m-0 mb-2">${data.name}</p>
    <div class="d-flex align-items-end">
      <div class="scritta-album d-flex align-items-end">
        <i class="bi bi-dot"></i>
        <p class="m-0 me-5">Numero Album ${data.nb_album}</p>
        <i class="bi bi-dot"></i>
        <p class="m-0">Numero Fan ${data.nb_fan}</p>
          
      </div>
    </div>
  </div>`
    song(nome)   
})
    
}
function song(nome){
    fetch(UrlSong + nome)
    .then((response) => {
        return response.json()
    })
    .then((data) =>{
        let canzoni= data.data
        const divSotto = document.querySelector(".elenco");
        canzoni.forEach((element, i)  => {
        divSotto.innerHTML += `
      <div class="canzoni row p-0 align-items-center m-0 mb-3 pe-4">
      <div class="col-1 p-0 text-center">${i + 1}</div>
      <div class="col-5 p-0 text-start">
        <span class="fw-bold text-white">${element.title}</span>
        <br>
        ${element.artist.name}
      </div>
      <div class="col-3 p-0 text-end" >${element.rank}</div>
      <div class="col-3 p-0 text-end">
      ${Math.floor(element.duration / 60)}:${element.duration - Math.floor(element.duration / 60) * 60}
    </div>
    `;
            
        });
    })


}



