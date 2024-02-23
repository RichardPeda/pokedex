let limit = 3;
let offset = 0;

let pokeNames = [];
let pokeURL = [];
let pokeData = [];
let Pokemoves = [];
let moves = [];
let move = [];
let myarray = [];
let length = [];

async function loadPokemonURL() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let results = responseAsJson['results'];
    results.forEach(result => {

        pokeData.push(result);
    });

    pokeData.forEach(data => {
        pokeURL.push(data['url'])

    })
    // console.log(pokeData)
    loadPokeDetails()
}


async function loadPokeDetails() {
    for (let i = 0; i < pokeData.length; i++) {
        let url = pokeData[i]['url'];
        let response = await fetch(url);
        let responseAsJson = await response.json();
        // console.log(responseAsJson)
        moves.push(responseAsJson['moves'])

        for (let j = 0; j < moves.length; j++) {
            let tempMove = moves[j];
            myarray = [];
            for (let k = 0; k < tempMove.length; k++) {
              
                

                const e = tempMove[k]['move']['name'];
                
                myarray.push(e)
                
            }
            pokeData[i].moves = (myarray);
        }

    }



}