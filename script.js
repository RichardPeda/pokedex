let limit = 15;
let offset = 0;
let loading = false;

let pokeURL = [];
let pokeData = [];
let pokeFilter = [];
let filtered = false;

async function init() {

    await loadPokemonURL(offset, limit);
    await loadPokeDetails(offset, limit);
    
}


function manageLoading() {
    let screen = document.getElementById('loadingScreen');

    if (loading) {
        screen.classList.remove('d-none')
    } else {
        screen.classList.add('d-none') //minimum time showing loading screen
        // setTimeout(() => {
            
        // }, 1000);

    }
}

async function loadPokemonURL(start, end) {
    loading = false;
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
        renderCard(pokeData);
        loading = false;

    }
    
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

        let { types, bgColor, pfColor } = getTypes(useData[index]);
        let htmlSnippet = renderTypes(types, pfColor);
        container.innerHTML += smallCardHTML(useData, index, htmlSnippet, bgColor, pfColor)
    }
}


function getTypes(useData, index) {

    let types = useData['types'];
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

// FILTER

function filterPokemon() {
    let inputName = document.getElementById('inputField').value;

    if (inputName.length > 0) {
        inputName = inputName[0].toLowerCase() + inputName.slice(1);
    }

    if (inputName.length > 2) {
        filterArray(inputName);
        if (pokeFilter.length > 0) {
            renderCard(pokeFilter);
            filtered = true;
        }

    } else {
        renderCard(pokeData);
        filtered = false;
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

let detailScreen = document.getElementById('detailScreen')
detailScreen.addEventListener("click", e => {
    let target = e.target;

    if (target == detailScreen) {
        detailScreen.classList.add('d-none')
        document.querySelector('body').classList.remove('stop-scrolling')
    }

})

function renderDetailCard(index) {
    
    let useData = filtered ? pokeFilter[index] : pokeData[index];

    let stats = useData['stats']
    let bases = []
    let barHTMLSnippet = ''
    for (let i = 0; i < stats.length; i++) {
        let base = stats[i]['base_stat'];
        let name = stats[i]['stat']['name']
        bases.push(base)
        barHTMLSnippet += statHTMLsnippet(base, name)
    }
    let { types, bgColor, pfColor } = getTypes(useData, index);
    let typesHTMLsnippet = renderTypes(types, pfColor);

    let container = document.getElementById('detailScreen')
    container.classList.remove('d-none')
    document.querySelector('body').classList.add('stop-scrolling')

    container.innerHTML = ''
    container.innerHTML = detailCardHTML(index, useData, bgColor, barHTMLSnippet, typesHTMLsnippet);

    barAnimate(bases)
}



function barAnimate(bases) {
    let bars = document.querySelectorAll('.progress');

    bars.forEach((bar, index) => {
        progressAnimation(bar, bases[index], barColors[index])
    });
}

// Progress Bar Animation

function progressAnimation(bar, value, color) {

    let durationAnimation = 1000;
    let progress = bar.querySelector('.progress-bar')
    progress.style.backgroundColor = `${color}`

    let text = bar.querySelector('.progress-amount')
    let valueStart = 0;
    let valueEnd = value;
    let duration = durationAnimation / valueEnd;
    let myintervall = setInterval(() => {

        valueStart = counter(valueStart, valueEnd)
        text.textContent = `${valueStart}`
        progress.style.width = `${valueStart - 10}%`
        text.style.left = `${valueStart - 20}%`

        if (valueStart >= valueEnd) {
            clearInterval(myintervall)
        }
    }, duration);

}

function counter(start, end) {
    if (start < end) {
        start += 1;
    }
    return start
}

function nextCardRight(index) {

    let data = filtered ? pokeFilter : pokeData;

    index += 1;
    if (index == data.length) {
        index = 0;
    }
    renderDetailCard(index)
}

function nextCardLeft(index) {
   
    let data = filtered ? pokeFilter : pokeData;

    index -= 1;
    if (index < 0) {
        index = data.length - 1;
    }
    renderDetailCard(index)
}