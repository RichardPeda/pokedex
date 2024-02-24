let limit = 3;
let offset = 0;


let pokeURL = [];
let pokeData = [];
let Pokemoves = [];
let moves = [];
// let move = [];
let myarray = [];
let length = [];

async function loadPokemonURL() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let results = responseAsJson['results'];
    results.forEach(result => {

        pokeURL.push(result['url']);
    });

    loadPokeDetails()
}


async function loadPokeDetails() {
    // pokeData.forEach(data => {
    //     pokeURL.push(data['url'])
    // })

    for (let i = 0; i < pokeURL.length; i++) {
        let url = pokeURL[i];
        
        let response = await fetch(url);
        let responseAsJson = await response.json();

pokeData.push(responseAsJson)

        console.log(responseAsJson)
    // let results = responseAsJson['results'];
    }


        // console.log(responseAsJson)
        // moves.push(responseAsJson['moves'])

        // pokeData[i].id = getID(responseAsJson)
        // pokeData[i].types = getTypes(responseAsJson)
        // pokeData[i].abilities = getAbilities(responseAsJson)
        // pokeData[i].sprite = getSprites(responseAsJson)

        // for (let j = 0; j < moves.length; j++) {
        //     let move = moves[j];
        //     myarray = [];
        //     for (let k = 0; k < move.length; k++) {
        //         let element = move[k]['move']['name'];
        //         myarray.push(element)
        //     }
        //     pokeData[i].moves = (myarray);
        // }
    
}
// function getID(dataSet) {
//     return dataSet['id']
// }


// function getTypes(dataSet) {
//     let types = dataSet['types'];
//     let array = []
//     types.forEach(type => {
//         array.push(type['type']['name'])
//     });
//     return array
// }

// function getAbilities(dataSet) {
//     let abilities = dataSet['abilities'];
//     let array = []
//     abilities.forEach(ability => {
//         array.push(ability['ability']['name'])
//     });
//     return array
// }

// function getSprites(dataSet, i) {
//     let sprite = dataSet['sprites']['front_default']
//     return sprite;
// }

function renderCard() {
    let container = document.getElementById('card-container');
    container.innerHTML = ``
}