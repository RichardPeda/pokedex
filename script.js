let limit = 10;
let offset = 0;


let pokeURL = [];
let pokeData = [];


async function init() {

    await loadPokemonURL();
    await loadPokeDetails();
    renderCard();
}





async function loadPokemonURL() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let results = responseAsJson['results'];
    results.forEach(result => {

        pokeURL.push(result['url']);
    });


}


async function loadPokeDetails() {

    for (let i = 0; i < pokeURL.length; i++) {
        let url = pokeURL[i];

        let response = await fetch(url);
        let responseAsJson = await response.json();

        pokeData.push(responseAsJson)

    }
    console.log(pokeData)
}


function renderCard() {
    let container = document.getElementById('card-container');
    container.innerHTML = ''
    for (let index = 0; index < pokeData.length; index++) {
        container.innerHTML += smallCardHTML(index)

    }


}

function smallCardHTML(index) {
    let html = /*html*/`
    <div class="card">
                <div class="card-inner">
                    <div class="card-header">
                        <h2 id="name">${pokeData[index]['name']}</h2>
                        <div id="card-id">ID 000${pokeData[index]['order']}</div>
                    </div>
                    <div class="ability-container">
                        <div class="ability primary">${pokeData[index]['types'][0]['type']['name']}</div>
                        <div class="ability secondary">${pokeData[index]['types'][1]['type']['name']}</div>
                    </div>
                    <div class="image-container">
                        <img src="${pokeData[index]['sprites']['other']['home']['front_default']}"
                            alt="">
                    </div>
                </div>
               <div class="platform"></div>

            </div>
`
    return html
}