let limit = 30;
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

        let { types, bgColor, pfColor } = getTypes(index);


        let htmlSnippet = renderTypes(types, pfColor);
        container.innerHTML += smallCardHTML(index, htmlSnippet, bgColor, pfColor)

    }


}

function getBgColors(expr) {
    switch (expr) {
        case 'grass':
            return {
                bgColor: 'bg-green',
                pfColor: 'pf-green'
            }
            break;
        case 'fire':
            return {
                bgColor: 'bg-red',
                pfColor: 'pf-red'
            }
            break;
        case 'water':
            return {
                bgColor: 'bg-blue',
                pfColor: 'pf-blue'
            }
            break;
        case 'bug':
            return {
                bgColor: 'bg-deepred',
                pfColor: 'pf-deepred'
            }
            break;
        case 'normal':
            return {
                bgColor: 'bg-gray',
                pfColor: 'pf-gray'
            }
        case 'electric':
            return {
                bgColor: 'bg-yellow',
                pfColor: 'pf-yellow'
            }
        case 'poison':
            return {
                bgColor: 'bg-purple',
                pfColor: 'pf-purple'
            }
            case 'ground':
            return {
                bgColor: 'bg-brown',
                pfColor: 'pf-brown'
            }
        default:
            return {
                bgColor: 'bg-gray',
                pfColor: 'pf-gray'
            }
    }
}

function getTypes(index) {
    let types = pokeData[index]['types'];
    let typesArray = [];
    for (let index = 0; index < types.length; index++) {
        const name = types[index]['type']['name'];

        typesArray.push(name);
    }
    let { bgColor, pfColor } = getBgColors(typesArray[0]);

    return {
        types: typesArray,
        bgColor: bgColor,
        pfColor: pfColor
    }
}

function renderTypes(types, pfColor) {
    let html = '';
    for (let index = 0; index < types.length; index++) {
        const type = types[index];
        html += typeHTMLsnippet(type, pfColor)
    }
    return html
}

function typeHTMLsnippet(type, pfColor) {
    let html = '';
    html = /*html*/`
         <div class="ability ${pfColor}">${type}</div>
    `
    return html
}

function smallCardHTML(index, htmlSnippet, bgColor, pfColor) {
    let html = /*html*/`
    <div class="card">
                <div class="card-inner ${bgColor}">
                    <div class="card-header">
                        <h2 id="name">${pokeData[index]['name']}</h2>
                        <div id="card-id">ID 000${pokeData[index]['order']}</div>
                    </div>
                    <div class="ability-container">
                       ${htmlSnippet}
                    </div>
                    <div class="image-container">
                        <img src="${pokeData[index]['sprites']['other']['home']['front_default']}"
                            alt="">
                    </div>
                </div>
               <div class="platform ${pfColor}"></div>

            </div>
`
    return html
}