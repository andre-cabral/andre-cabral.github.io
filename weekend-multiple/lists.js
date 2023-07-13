//Lists creation start
const chainListGenresElement = (element) => {
    if(element.nameFantasy && element.nameSciFi) {
        return `
            <div class="chain__content chain__content--name genre genre--generic">${element.name}</div>
            <div class="chain__content chain__content--name genre genre--fantasy genre--hidden">${element.nameFantasy}</div>
            <div class="chain__content chain__content--name genre genre--scifi genre--hidden">${element.nameSciFi}</div>
        `;
    }
    return `<div class="chain__content chain__content--name">${element.name}</div>`;
}

const createChainList = (list, id, type = '', lineClass = '') => {
    for(let i=0; i<list.length; i++){
        let div = document.createElement('div');
        div.id = `${type}-${list[i].name.replace(' ', '_')}`;
        div.classList = `chain__line${' '+lineClass}${i%2 ? ' chain__line--even' : ''}${i == list.length - 1 ? ' chain__line--last' : ''}`;
        div.innerHTML = 
        `
            ${chainListGenresElement(list[i])}
            <div class="chain__content"><p class="chain__text">${list[i].ability1}</p></div>
            <div class="chain__content"><p class="chain__text">${list[i].ability2}</p></div>
            <div class="chain__content"><p class="chain__text">${list[i].ability3}</p></div>
            <div class="chain__content chain__content--last"><p class="chain__text">${list[i].ability4}</p></div>
        `;
        document.getElementById(id).appendChild(div);
    }
}

const createArmourList = () => {
    for(let i=0; i<armours.length; i++){
        let div = document.createElement('div');
        div.id = `armour-${armours[i].name.replace(' ', '_')}`;
        div.classList = `chain__line armour-line${i%2 ? ' chain__line--even' : ''}${i == armours.length - 1 ? ' chain__line--last' : ''}`;
        div.innerHTML = 
        `
            <div class="chain__content chain__content--name">${armours[i].name}</div>
            <div class="chain__content chain__content--armour"><p class="chain__text">${armours[i].actions}</p></div>
            <div class="chain__content chain__content--armour"><p class="chain__text">${armours[i].reaction}</p></div>
            <div class="chain__content chain__content--armour chain__content--last"><p class="chain__text">${armours[i].armourSave}</p></div>
        `;
        document.getElementById('chain-armour').appendChild(div);
    }
}

const createWeaponList = (list, id, type = '', lineClass = '') => {
    for(let i=0; i<list.length; i++){
        let div = document.createElement('div');
        div.id = `${type}-${list[i].name.replace(' ', '_')}`;
        div.classList = `chain__line${' '+lineClass}${i%2 ? ' chain__line--even' : ''}${i == list.length - 1 ? ' chain__line--last' : ''}`;
        div.innerHTML = 
        `
        <div class="chain__content chain__content--weapon genre genre--generic"><p class="chain__text">${list[i].name}</p></div>
        <div class="chain__content chain__content--weapon genre genre--fantasy genre--hidden"><p class="chain__text">${list[i].nameFantasy}</p></div>
        <div class="chain__content chain__content--weapon genre genre--scifi genre--hidden"><p class="chain__text">${list[i].nameSciFi}</p></div>
        <div class="chain__content chain__content--weapon chain__content--big-text"><p class="chain__text">${list[i].action}</p></div>
        <div class="chain__content chain__content--weapon chain__content--big-text"><p class="chain__text">${list[i].range}</p></div>
        <div class="chain__content chain__content--weapon chain__content--big-text"><p class="chain__text">${list[i].attacks}</p></div>
        <div class="chain__content chain__content--weapon chain__content--big-text"><p class="chain__text">${list[i].power}</p></div>
        <div class="chain__content chain__content--weapon chain__content--big-text"><p class="chain__text">${list[i].damage}</p></div>
        <div class="chain__content chain__content--weapon chain__content--last"><p class="chain__text">${list[i].rolesConditionsText}</p></div>
        `;
        document.getElementById(id).appendChild(div);
    }
}

const toggleTab = (tab) => {
    let chain = document.getElementById(tab.id.replace('tab', 'chain'));
    
    if(chain.classList.contains('chain--opened')) {
        tab.classList.remove('tab--opened');
        chain.classList.remove('chain--opened');
    } else {
        tab.classList.add('tab--opened');
        chain.classList.add('chain--opened');
    }
}
//Lists creation end

//Selections start
let currentCharacterIndex = 0;
const maxAbilities = 6;
let extraTokensTotal = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let extraTokensUsed = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let tokensSpent = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let roleSelected = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
let roleLevel = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
let skillSelected = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
let skillLevel = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
let armourSelected = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
let weaponRangedFirst = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
let weaponRangedSelected = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
let canUseWeaponRanged = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
let weaponCloseCombatSelected = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
let canUseWeaponCloseCombat = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
let nameSelected = ['','','','','','','','','','','','','','','','','','','',''];
let genreSelectedValue = ['','','','','','','','','','','','','','','','','','','',''];

const selectItem = (chosenElement, type, list) => {
    document.querySelectorAll(`.${type}-line`).forEach((element) => {
        element.classList.remove('chain__line--selected');
    });
    chosenElement.classList.add('chain__line--selected');

    for(let i=0; i<list.length; i++) {
        if(list[i].name.replace(' ', '_') == chosenElement.id.replace(type+'-', '')){
            return list[i];
        }
    }
    return {};
}

const getItemByName = (name, list) => {
    for(let i=0; i<list.length; i++) {
        if(list[i].name == name){
            return list[i];
        }
    }
    return {};
}

const refreshHeader = () => {
    if(roleSelected[currentCharacterIndex][`name${genreSelectedValue[currentCharacterIndex]}`]) {
        document.getElementById('role').innerHTML = roleSelected[currentCharacterIndex][`name${genreSelectedValue[currentCharacterIndex]}`] + ` - Level ${roleLevel[currentCharacterIndex]}`;
    } else {
        document.getElementById('role').innerHTML = '';
    }

    if(skillSelected[currentCharacterIndex].name) {
        document.getElementById('skill').innerHTML = skillSelected[currentCharacterIndex].name + ` - Level ${skillLevel[currentCharacterIndex]}`;
    } else {
        document.getElementById('skill').innerHTML = '';
    }

    if(armourSelected[currentCharacterIndex].name) {
        document.getElementById('armour-name').innerHTML = `${armourSelected[currentCharacterIndex].name} (${armourSelected[currentCharacterIndex].armourSave})`;
    } else {
        document.getElementById('armour-name').innerHTML = '';
    }
}

const refreshArmour = () => {
    if(armourSelected[currentCharacterIndex].actions) {
        document.getElementById('actions').innerHTML = armourSelected[currentCharacterIndex].actions;
        document.getElementById('reaction').innerHTML = armourSelected[currentCharacterIndex].reaction;
        document.getElementById('armour').innerHTML = armourSelected[currentCharacterIndex].armourSave;
    } else {
        document.getElementById('actions').innerHTML = '';
        document.getElementById('reaction').innerHTML = '';
        document.getElementById('armour').innerHTML = '';
    }
}

const canUseWeapon = (weaponConditions) => {
    let hasRole = false;
    const noRole = weaponConditions.roles.length == 0
    let hasSkill = false;
    const noSkill =  weaponConditions.skills.length == 0;
    let hasArmour = false;
    const noArmour = weaponConditions.armour.length == 0

    weaponConditions.roles.forEach((name) => {
        if(name == roleSelected[currentCharacterIndex].name) {
            hasRole = true;
        }
    });
    weaponConditions.skills.forEach((name) => {
        if(name == skillSelected[currentCharacterIndex].name) {
            hasSkill = true;
        }
    });
    weaponConditions.armour.forEach((name) => {
        if(name == armourSelected[currentCharacterIndex].name) {
            hasArmour = true;
        }
    });

    if(weaponConditions.type == 'or') {
        return hasRole || hasSkill || hasArmour;
    }

    return (hasRole || noRole) && (hasSkill || noSkill) && (hasArmour || noArmour);
}

const clearWeapons = () => {
    document.querySelectorAll('.table__weapon').forEach((element) => {
        element.classList.remove('table__line--invalid');
    });
    document.querySelectorAll('.table__content--weapon').forEach((element) => {
        element.innerHTML = '';
    });
}

const refreshWeapons = () => {
    if(weaponRangedSelected[currentCharacterIndex].name) {
        if(canUseWeapon(weaponRangedSelected[currentCharacterIndex].conditions)) {
            document.getElementById(`weapons-line-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).classList.remove('table__line--invalid');
        } else {
            document.getElementById(`weapons-line-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).classList.add('table__line--invalid');
        }
        document.getElementById(`weapons-name-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).innerHTML = weaponRangedSelected[currentCharacterIndex][`name${genreSelectedValue[currentCharacterIndex]}`];
        document.getElementById(`weapons-action-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).innerHTML = weaponRangedSelected[currentCharacterIndex].action;
        document.getElementById(`weapons-range-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).innerHTML = weaponRangedSelected[currentCharacterIndex].range;
        document.getElementById(`weapons-attacks-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).innerHTML = weaponRangedSelected[currentCharacterIndex].attacks;
        document.getElementById(`weapons-power-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).innerHTML = weaponRangedSelected[currentCharacterIndex].power;
        document.getElementById(`weapons-damage-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).innerHTML = weaponRangedSelected[currentCharacterIndex].damage;
    } else {
        document.getElementById(`weapons-line-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).classList.remove('table__line--invalid');
        
        document.getElementById(`weapons-name-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).innerHTML = '';
        document.getElementById(`weapons-action-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).innerHTML = '';
        document.getElementById(`weapons-range-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).innerHTML = '';
        document.getElementById(`weapons-attacks-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).innerHTML = '';
        document.getElementById(`weapons-power-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).innerHTML = '';
        document.getElementById(`weapons-damage-${weaponRangedFirst[currentCharacterIndex] ? '1' : '2'}`).innerHTML = '';
    }

    if(weaponCloseCombatSelected[currentCharacterIndex].name) {
        if(canUseWeapon(weaponCloseCombatSelected[currentCharacterIndex].conditions)) {
            document.getElementById(`weapons-line-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).classList.remove('table__line--invalid');
        } else {
            document.getElementById(`weapons-line-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).classList.add('table__line--invalid');
        }
        document.getElementById(`weapons-name-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).innerHTML = weaponCloseCombatSelected[currentCharacterIndex][`name${genreSelectedValue[currentCharacterIndex]}`];
        document.getElementById(`weapons-action-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).innerHTML = weaponCloseCombatSelected[currentCharacterIndex].action;
        document.getElementById(`weapons-range-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).innerHTML = weaponCloseCombatSelected[currentCharacterIndex].range;
        document.getElementById(`weapons-attacks-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).innerHTML = weaponCloseCombatSelected[currentCharacterIndex].attacks;
        document.getElementById(`weapons-power-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).innerHTML = weaponCloseCombatSelected[currentCharacterIndex].power;
        document.getElementById(`weapons-damage-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).innerHTML = weaponCloseCombatSelected[currentCharacterIndex].damage;
    } else {
        document.getElementById(`weapons-line-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).classList.remove('table__line--invalid');
        
        document.getElementById(`weapons-name-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).innerHTML = '';
        document.getElementById(`weapons-action-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).innerHTML = '';
        document.getElementById(`weapons-range-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).innerHTML = '';
        document.getElementById(`weapons-attacks-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).innerHTML = '';
        document.getElementById(`weapons-power-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).innerHTML = '';
        document.getElementById(`weapons-damage-${weaponRangedFirst[currentCharacterIndex] ? '2' : '1'}`).innerHTML = '';
    }
}

const changeInvalidWeaponsList = (element, type, list) => {
    const weaponName = element.id.replace(`weapon-${type}-`, '').replace('_', ' ');
    const weaponObject = getItemByName(weaponName, list);

    if(canUseWeapon(weaponObject.conditions)) {
        element.classList.remove('chain__line--invalid');
    } else {
        element.classList.add('chain__line--invalid');
    }
}

const refreshWeaponsList = () => {
    document.querySelectorAll('.weapon-ranged-line').forEach((element) => {
        changeInvalidWeaponsList(element, 'ranged', weaponsRanged);
    });
    document.querySelectorAll('.weapon-close-line').forEach((element) => {
        changeInvalidWeaponsList(element, 'close', weaponsCloseCombat);
    });
}

const refreshCardAbilities = () => {
    for(let i=0; i<maxAbilities; i++){ 
        document.getElementById(`ability-${i+1}`).innerHTML = '';
    }

    let abilityNumber = 1;
    if(roleSelected[currentCharacterIndex].ability1) {
        for(let i=0; i<roleLevel[currentCharacterIndex]; i++){
            if(abilityNumber <= maxAbilities){
                document.getElementById(`ability-${abilityNumber}`).innerHTML = roleSelected[currentCharacterIndex][`ability${i+1}`];
                abilityNumber++;
            }
        }
    }
    if(skillSelected[currentCharacterIndex].ability1) {
        for(let i=0; i<skillLevel[currentCharacterIndex]; i++){
            if(abilityNumber <= maxAbilities){
                document.getElementById(`ability-${abilityNumber}`).innerHTML = skillSelected[currentCharacterIndex][`ability${i+1}`];
                abilityNumber++;
            }
        }
    }
}

const refreshName = () => {
    document.getElementById('name').innerHTML = nameSelected[currentCharacterIndex];

    document.getElementById(`char-${currentCharacterIndex}`).innerHTML = `${currentCharacterIndex+1} - ${nameSelected[currentCharacterIndex]}`;
}

const refreshGenre = () => {
    document.querySelectorAll('.genre').forEach((element) => {
        element.classList.add('genre--hidden');
    });

    document.querySelectorAll(`.genre--${genreSelectedValue[currentCharacterIndex].toLowerCase() || 'generic'}`).forEach((element) => {
        element.classList.remove('genre--hidden');
    });
}

const refreshCard = () => {
    refreshHeader();
    refreshArmour();
    refreshWeapons();
    refreshWeaponsList();
    refreshCardAbilities();
    refreshName();
}

const chooseRole = (roleLine) => {
    roleSelected[currentCharacterIndex] = selectItem(roleLine, 'role', roles);
    refreshCard();
}

const chooseSkill = (skillLine) => {
    skillSelected[currentCharacterIndex] = selectItem(skillLine, 'skill', skills);
    refreshCard();
}

const chooseArmour = (armourLine) => {
    armourSelected[currentCharacterIndex] = selectItem(armourLine, 'armour', armours);
    refreshCard();
}

const chooseWeaponRanged = (weaponRangedLine) => {
    weaponRangedSelected[currentCharacterIndex] = selectItem(weaponRangedLine, 'weapon-ranged', weaponsRanged);
    refreshCard();
}

const chooseWeaponClose = (weaponCloseLine) => {
    weaponCloseCombatSelected[currentCharacterIndex] = selectItem(weaponCloseLine, 'weapon-close', weaponsCloseCombat);
    refreshCard();
}

const chooseName = (name) => {
    nameSelected[currentCharacterIndex] = name.value;
    document.getElementById('name').innerHTML = nameSelected[currentCharacterIndex];

    refreshCard();
}

const chooseGenre = (genre) => {
    genreSelectedValue[currentCharacterIndex] = genre.value;
    document.querySelectorAll('.genre').forEach((element) => {
        element.classList.add('genre--hidden');
    });

    document.querySelectorAll(`.genre--${genreSelectedValue[currentCharacterIndex].toLowerCase() || 'generic'}`).forEach((element) => {
        element.classList.remove('genre--hidden');
    });

    refreshCard();
}

const chooseWeaponFirst = (weaponFirst) => {
    weaponRangedFirst[currentCharacterIndex] = weaponFirst.value == 'ranged';
    clearWeapons();
    refreshCard();
}

const chooseCharacter = (characterIndex) => {
    const newIndex = parseInt(characterIndex.value);
    currentCharacterIndex = newIndex;

    refreshCard();
}

const isEmptyCharacter = (characterIndex) => {
    return extraTokensTotal[characterIndex] === 0 &&
    extraTokensUsed[characterIndex] === 0 &&
    tokensSpent[characterIndex] === 0 &&
    !roleSelected[characterIndex].name &&
    roleLevel[characterIndex] === 1 &&
    !skillSelected[characterIndex]?.name &&
    skillLevel[characterIndex] === 1 &&
    !armourSelected[characterIndex]?.name &&
    weaponRangedFirst[characterIndex] === true &&
    !weaponRangedSelected[characterIndex]?.name &&
    canUseWeaponRanged[characterIndex] === true &&
    !weaponCloseCombatSelected[characterIndex]?.name &&
    canUseWeaponCloseCombat[characterIndex] === true &&
    nameSelected[characterIndex] === '' &&
    genreSelectedValue[characterIndex] === '';
}
//Selections end

const addClick = (elementClass, clickFunction) => {
    document.querySelectorAll(`.${elementClass}`).forEach((element) => {
        element.addEventListener('click', () => {clickFunction(element)});
    });
}

const addChange = (elementClass, changeFunction) => {
    document.querySelectorAll(`.${elementClass}`).forEach((element) => {
        element.addEventListener('change', () => {changeFunction(element)});
    });
}

const init = () => {
    createChainList(roles, 'chain-roles', 'role', 'role-line');
    createChainList(skills, 'chain-skills', 'skill', 'skill-line');
    createArmourList();
    
    createWeaponList(weaponsRanged, 'chain-ranged-weapon', 'weapon-ranged', 'weapon-ranged-line');
    createWeaponList(weaponsCloseCombat, 'chain-close-weapon', 'weapon-close', 'weapon-close-line');
    
    addClick('tab', toggleTab);
    addClick('role-line', chooseRole);
    addClick('skill-line', chooseSkill);
    addClick('armour-line', chooseArmour);
    addClick('weapon-ranged-line', chooseWeaponRanged);
    addClick('weapon-close-line', chooseWeaponClose);
    addChange('name-input', chooseName);
    addChange('genre-input', chooseGenre);
    addChange('weapon-first-input', chooseWeaponFirst);
    addChange('character__select', chooseCharacter);

    refreshWeaponsList();
}
init();

// TODO - Create a better save option
const save = () => {
    const saveString =`
    extraTokensTotal = ${JSON.stringify(extraTokensTotal)};
    extraTokensUsed = ${JSON.stringify(extraTokensUsed)};
    tokensSpent = ${JSON.stringify(tokensSpent)};
    roleSelected = ${JSON.stringify(roleSelected)};
    roleLevel = ${JSON.stringify(roleLevel)};
    skillSelected = ${JSON.stringify(skillSelected)};
    skillLevel = ${JSON.stringify(skillLevel)};
    armourSelected = ${JSON.stringify(armourSelected)};
    weaponRangedFirst = ${JSON.stringify(weaponRangedFirst)};
    weaponRangedSelected = ${JSON.stringify(weaponRangedSelected)};
    canUseWeaponRanged = ${JSON.stringify(canUseWeaponRanged)};
    weaponCloseCombatSelected = ${JSON.stringify(weaponCloseCombatSelected)};
    canUseWeaponCloseCombat = ${JSON.stringify(canUseWeaponCloseCombat)};
    nameSelected = ${JSON.stringify(nameSelected)};
    genreSelectedValue = ${JSON.stringify(genreSelectedValue)};
    refreshCard();
    `;

    console.log(saveString);
}

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}