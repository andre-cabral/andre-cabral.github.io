//cardsData
//decksList
//heroesData

const createAllCardsList = () => {
    for(let i=0; i<cardsData.length; i++){
        let div = document.createElement('div');
        //div.id = `${type}-${list[i].name.replace(' ', '_')}`;
        //div.classList = `chain__line${' '+lineClass}${i%2 ? ' chain__line--even' : ''}${i == list.length - 1 ? ' chain__line--last' : ''}`;
        div.innerHTML = 
        `
            <img class="card" src="${cardsData[i].frontImage.PT}" />
        `;
        document.getElementById('main').appendChild(div);
    }
    for(let i=0; i<heroesData.length; i++){
        let div = document.createElement('div');
        //div.id = `${type}-${list[i].name.replace(' ', '_')}`;
        //div.classList = `chain__line${' '+lineClass}${i%2 ? ' chain__line--even' : ''}${i == list.length - 1 ? ' chain__line--last' : ''}`;
        div.innerHTML = 
        `
            <img class="card" src="${heroesData[i].heroCard.backImage}" />
            <img class="card" src="${heroesData[i].heroCard.frontImage.PT}" />
            <img class="card" src="${heroesData[i].ultimateCard.frontImage.PT}" />
        `;
        document.getElementById('main').appendChild(div);
    }
}

const orderHeroesByName = (a, b) => {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
}

const getLocalImage = (url) => {
    return 'images' + url.slice(
        url.lastIndexOf('/'),
        url.length
    );
}

const getCharactersList = () => {
    let charactersList = [];
    for(let i=0; i<heroesData.length; i++){
        if(charactersList.indexOf(heroesData[i]) == -1) {
            charactersList.push(heroesData[i]);
        }
    }
    return charactersList;
}

const getCharacterByName = (hero) => {
    for(let i=0; i<heroesData.length; i++){
        if(hero == heroesData[i].title) {
            return heroesData[i];
        }
    }
    return {};
}

/*
const getCharactersList = () => {
    let charactersList = [];
    for(let i=0; i<decksList.length; i++){
        if(charactersList.indexOf(decksList[i].hero) == -1) {
            charactersList.push(decksList[i].hero);
        }
    }
    return charactersList;
}
*/

const getCardByName = (card) => {
    for(let i=0; i<cardsData.length; i++){
        if(cardsData[i].title.toLowerCase() == card.toLowerCase()) {
            return cardsData[i];
        }
    }
    for(let i=0; i<heroesData.length; i++){
        if(heroesData[i].ultimateCard.title.toLowerCase() == card.toLowerCase()) {
            return heroesData[i].ultimateCard;
        }
    }
    
    return {};
}

const isUltimateCard = (card) => {
    for(let i=0; i<heroesData.length; i++){
        if(heroesData[i].ultimateCard.title.toLowerCase() == card.toLowerCase()) {
            return true;
        }
    }
    
    return false;
}

const getCardsByCharacter = (character) => {
    let cards = [];
    for(let i=0; i<decksList.length; i++){
        if(decksList[i].hero == character){
            cards.push(decksList[i]);
        }
    }
    return cards;
}






let heroSelected = {};

const refreshCards = () => {
    document.getElementById('cards').innerHTML = "";

    const cardList = getCardsByCharacter(heroSelected.title);
    
    for(let i=0; i<cardList.length; i++){
        let img = document.createElement('img');
        img.classList = 'card';
        img.src = getLocalImage(getCardByName(cardList[i].name).frontImage.PT);
        
        document.getElementById('cards').appendChild(img);
    }
    
}

const createHeroesList = (list, id, type = '', lineClass = '') => {
    for(let i=0; i<list.length; i++){
        let div = document.createElement('div');
        div.id = `${type}-${list[i].title.replace(' ', '_')}`;
        div.classList = `chain__line${' '+lineClass}${i%2 ? ' chain__line--even' : ''}${i == list.length - 1 ? ' chain__line--last' : ''}`;
        div.innerHTML = 
        `
        <div class="chain__content chain__content--big-text chain__content--last"><p class="chain__text">${list[i].title}</p></div>
        `;
        
        document.getElementById(id).appendChild(div);
    }
}

const selectItem = (chosenElement, type, list) => {
    document.querySelectorAll(`.${type}-line`).forEach((element) => {
        element.classList.remove('chain__line--selected');
    });
    chosenElement.classList.add('chain__line--selected');

    for(let i=0; i<list.length; i++) {
        if(list[i].title.replace(' ', '_') == chosenElement.id.replace(type+'-', '')){
            return list[i];
        }
    }
    return {};
}

const chooseHero = (heroLine) => {
    heroSelected = selectItem(heroLine, 'hero', heroesData);
    refreshCards();
}

const addClick = (elementClass, clickFunction) => {
    document.querySelectorAll(`.${elementClass}`).forEach((element) => {
        element.addEventListener('click', () => {clickFunction(element)});
    });
}

const init = () => {
    createHeroesList(heroesData.sort(orderHeroesByName), 'chain-heroes', 'hero', 'hero-line');
    addClick('hero-line', chooseHero);
}


///////////// 
//////INDEX 2
/////////////
/*
.blue, .Liothan, .liothan {
    background-color:#6d9eeb;
}
.green, .Taulot, .taulot {
    background-color:#93c47d;
}
.purple, .Multi, .multi {
    background-color:#8e7cc3;
}
.red, .Kurumo, .kurumo {
    background-color:#e06666;
}
.yellow, .Nupten, .nupten {
    background-color:#ffd966;
}
*/
let heroSelected2 = [];

const removeItemOnce = (arr, value) => {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

const parseFactionName = (faction) => {
    switch(faction){
        case 'Kurumo' || 'kurumo':
            return 'kurumo';
        case 'Liothan' || 'liothan':
            return 'liothan';
        case 'Nupten' || 'nupten':
            return 'nupten';
        case 'Taulot' || 'taulot':
            return 'taulot';
        case 'Neutral' || 'neutral' || 'Null' || 'null' || null:
            return 'neutral';
    }
    if(faction.indexOf('/')) {
        return 'multi';
    }
}

const orderCardsByFactionAndTitlePt = (a, b) => {
    if( parseFactionName(a.faction) == 'multi' && 
        parseFactionName(b.faction) != 'multi'
    ) {
        return 1;
    }
    if( parseFactionName(a.faction) != 'multi' && 
        parseFactionName(b.faction) == 'multi'
    ) {
        return -1;
    }

    if( parseFactionName(a.faction) == 'neutral' && 
        parseFactionName(b.faction) != 'neutral'
    ) {
        return 1;
    }
    if( parseFactionName(a.faction) != 'neutral' && 
        parseFactionName(b.faction) == 'neutral'
    ) {
        return -1;
    }


    if (parseFactionName(a.faction) < parseFactionName(b.faction)) {
        return -1;
    }
    if (parseFactionName(a.faction) > parseFactionName(b.faction)) {
        return 1;
    }

    if (getCardByName(a.name).titlePt < getCardByName(b.name).titlePt) {
        return -1;
    }
    if (getCardByName(a.name).titlePt > getCardByName(b.name).titlePt) {
        return 1;
    }

    return 0;
}

const refreshCards2 = () => {
    document.getElementById('cards').innerHTML = 
    `
    <div class="chain__line chain__line--header">
        <div class="chain__header">
            <div class="chain__label chain__label--last">
                <div class="chain__content chain__content--big-text chain__content--last"><p class="chain__text">Heroes: ${heroSelected2.length}</p></div>
            </div>
        </div>
    </div>
    `;

    let cardList = [];

    for (let i=0; i<heroSelected2.length; i++) {
        cardList.push(...getCardsByCharacter(heroSelected2[i].title));
    }

    cardList = cardList.sort(orderCardsByFactionAndTitlePt);

    for(let i=0; i<cardList.length; i++){
        let div = document.createElement('div');
        div.classList = `chain__line ${parseFactionName(cardList[i].faction)}${isUltimateCard(cardList[i].name) ? ' chain__line--ultimate' : ''}${i == cardList.length - 1 ? ' chain__line--last' : ''}`;
        div.innerHTML = 
        `
        <div class="chain__content chain__content--big-text chain__content--last"><p class="chain__text">${getCardByName(cardList[i].name).titlePt}</p></div>
        `;
        
        document.getElementById('cards').appendChild(div);
    }
}
const createHeroesList2 = (list, id, type = '', lineClass = '') => {
    for(let i=0; i<list.length; i++){
        let div = document.createElement('div');
        div.id = `${type}-${list[i].title.replace(' ', '_')}`;
        div.classList = `chain__line${' '+lineClass}${i%2 ? ' chain__line--even' : ''}${i == list.length - 1 ? ' chain__line--last' : ''}`;
        div.innerHTML = 
        `
        <div class="chain__content chain__content--big-text chain__content--last">
            <p class="chain__text">${list[i].title}</p>
            <img class="card card--hidden" src="${getLocalImage(list[i].heroCard.backImage)}" />
        </div>
        `;
        
        document.getElementById(id).appendChild(div);
    }
}
const selectItem2 = (chosenElement, type, list) => {
    if(chosenElement.classList.contains('chain__line--selected')) {
        chosenElement.classList.remove('chain__line--selected');
    } else {
        chosenElement.classList.add('chain__line--selected');
    }

    for(let i=0; i<list.length; i++) {
        if(list[i].title.replace(' ', '_') == chosenElement.id.replace(type+'-', '')){
            return list[i];
        }
    }
    return {};
}
const chooseHero2 = (heroLine) => {
    const itemSelected = selectItem2(heroLine, 'hero', heroesData);

    if (heroSelected2.includes(itemSelected)) {
        removeItemOnce(heroSelected2, itemSelected);
    } else {
        heroSelected2.push(itemSelected);
    }

    refreshCards2();
}
const init2 = () => {
    createHeroesList2(heroesData.sort(orderHeroesByName), 'chain-heroes', 'hero', 'hero-line');
    addClick('hero-line', chooseHero2);
}