
function typeHTMLsnippet(type, pfColor) {
    let html = '';
    html = /*html*/`
         <div class="ability ${pfColor}">${type}</div>
    `
    return html
}

function smallCardHTML(useData, index, htmlSnippet, bgColor, pfColor) {
    let name = useData[index]['name'][0].toUpperCase() + useData[index]['name'].slice(1);
    let html = /*html*/`
    <div onclick="renderDetailCard(${index})" class="card">
                <div class="card-inner ${bgColor}">
                    <div class="card-header">
                        <h2 id="name">${name}</h2>
                        <div id="card-id"># ${useData[index]['order']}</div>
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

function statHTMLsnippet(base, name) {
    name = name[0].toUpperCase() + name.slice(1); //First letter to Uppercase
    let html = ''
    html = /*html*/`
        <div class="statistics">
                    <p>${name}</p>
                    <div class="progress">
                        <div class="progress-bar"></div>
                        <div class="progress-amount">${base}</div>
                    </div>
                </div>
    `
    return html
}

function detailCardHTML(index, useData, bgColor, barHTMLSnippet, typesHTMLsnippet) {
    let name = useData['name'][0].toUpperCase() + useData['name'].slice(1);
    let html = /*html*/`
     <div id="detailCard-border">
        <div class="detailCard-inner ${bgColor}">
            <div class="detailCard-top">
                <h2 id="name">${name}</h2>
                <div id="detailCard-id"># ${useData['order']}</div>
                <img onclick="nextCardRight(${index})" class="next-button right" src="./img/arrow-right.svg">
                        <img onclick="nextCardLeft(${index})" class="next-button left" src="./img/arrow-left.svg">
                <div class="ability-container">
                    ${typesHTMLsnippet}
                </div>
                <img class="big-char-img" src="${useData['sprites']['other']['home']['front_default']}" alt="">
            </div>
            <div class="detailCard-bottom">
                ${barHTMLSnippet}
            </div>
        </div>
    </div>        
    `
    return html
}