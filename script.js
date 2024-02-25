let limit = 15;
let offset = 0;
let loading = true;

let pokeURL = [];
let pokeData = [];
let pokeFilter = [];


async function init() {


    await loadPokemonURL(offset, limit);
    await loadPokeDetails(offset, limit);
    renderCard(pokeData);
}


function manageLoading() {
    let screen = document.getElementById('loadingScreen');


    if (loading) {
        screen.classList.remove('d-none')
    } else {
        setTimeout(() => {
            screen.classList.add('d-none')
          }, 1000);
       
    }
}

async function loadPokemonURL(start, end) {
    loading = true;
    manageLoading();

    let url = `https://pokeapi.co/api/v2/pokemon?limit=${end}&offset=${start}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let results = responseAsJson['results'];
    results.forEach(result => {

        pokeURL.push(result['url']);
    });
}


async function loadPokeDetails(offset, limit) {



    for (let i = offset; i < limit; i++) {
        let url = pokeURL[i];

        let response = await fetch(url);
        let responseAsJson = await response.json();
        pokeData.push(responseAsJson)

    }
    loading = false;
    manageLoading();
}

async function loadMore() {
    offset = limit + 1;
    limit += 16;
    await loadPokemonURL(offset, limit);
    await loadPokeDetails(offset, limit);
    renderCard(pokeData);
}


function renderCard(useData) {
    let container = document.getElementById('card-container');
    container.innerHTML = ''
    for (let index = 0; index < useData.length; index++) {

        let { types, bgColor, pfColor } = getTypes(useData, index);
        let htmlSnippet = renderTypes(types, pfColor);
        container.innerHTML += smallCardHTML(useData, index, htmlSnippet, bgColor, pfColor)

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

function getTypes(useData, index) {
    let types = useData[index]['types'];
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

function smallCardHTML(useData, index, htmlSnippet, bgColor, pfColor) {
    let html = /*html*/`
    <div class="card">
                <div class="card-inner ${bgColor}">
                    <div class="card-header">
                        <h2 id="name">${useData[index]['name']}</h2>
                        <div id="card-id">ID 000${useData[index]['order']}</div>
                    </div>
                    <div class="ability-container">
                       ${htmlSnippet}
                    </div>
                    <div class="image-container">
                        <img src="${useData[index]['sprites']['other']['home']['front_default']}"
                            alt="">
                    </div>
                </div>
               <div class="platform ${pfColor}"></div>

            </div>
`
    return html
}

// FILTER

function filterPokemon() {
    let inputName = document.getElementById('inputField').value;

    if (inputName.length > 2) {
        filterArray(inputName);
        renderCard(pokeFilter);
    } else {
        renderCard(pokeData);
    }
};

function resetInputField() {
    let field = document.getElementById('inputField');
    field.value = '';
    filterPokemon()
}


function filterArray(input) {
    pokeFilter = [];
    for (let index = 0; index < pokeData.length; index++) {
        let name = pokeData[index]['name'];
        let length = input.length;

        let subString = name.substring(0, length);
        if (subString == input)
            pokeFilter.push(pokeData[index])
    }
}