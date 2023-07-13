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
const maxAbilities = 6;
let extraTokensTotal = 0;
let extraTokensUsed = 0;
let tokensSpent = 0;
let roleSelected = {};
let roleLevel = 1;
let skillSelected = {};
let skillLevel = 1;
let armourSelected = {};
let weaponRangedFirst = true;
let weaponRangedSelected = {};
let canUseWeaponRanged = true;
let weaponCloseCombatSelected = {};
let canUseWeaponCloseCombat = true;
let nameSelected = '';
let genreSelectedValue = '';

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
    if(roleSelected[`name${genreSelectedValue}`]) {
        document.getElementById('role').innerHTML = roleSelected[`name${genreSelectedValue}`] + ` - Level ${roleLevel}`;
    }

    if(skillSelected.name) {
        document.getElementById('skill').innerHTML = skillSelected.name + ` - Level ${skillLevel}`;
    }

    if(armourSelected.name) {
        document.getElementById('armour-name').innerHTML = `${armourSelected.name} (${armourSelected.armourSave})`;
    }
}

const refreshArmour = () => {
    if(armourSelected.actions) {
        document.getElementById('actions').innerHTML = armourSelected.actions;
        document.getElementById('reaction').innerHTML = armourSelected.reaction;
        document.getElementById('armour').innerHTML = armourSelected.armourSave;
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
        if(name == roleSelected.name) {
            hasRole = true;
        }
    });
    weaponConditions.skills.forEach((name) => {
        if(name == skillSelected.name) {
            hasSkill = true;
        }
    });
    weaponConditions.armour.forEach((name) => {
        if(name == armourSelected.name) {
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
    if(weaponRangedSelected.name) {
        if(canUseWeapon(weaponRangedSelected.conditions)) {
            document.getElementById(`weapons-line-${weaponRangedFirst ? '1' : '2'}`).classList.remove('table__line--invalid');
        } else {
            document.getElementById(`weapons-line-${weaponRangedFirst ? '1' : '2'}`).classList.add('table__line--invalid');
        }
        document.getElementById(`weapons-name-${weaponRangedFirst ? '1' : '2'}`).innerHTML = weaponRangedSelected[`name${genreSelectedValue}`];
        document.getElementById(`weapons-action-${weaponRangedFirst ? '1' : '2'}`).innerHTML = weaponRangedSelected.action;
        document.getElementById(`weapons-range-${weaponRangedFirst ? '1' : '2'}`).innerHTML = weaponRangedSelected.range;
        document.getElementById(`weapons-attacks-${weaponRangedFirst ? '1' : '2'}`).innerHTML = weaponRangedSelected.attacks;
        document.getElementById(`weapons-power-${weaponRangedFirst ? '1' : '2'}`).innerHTML = weaponRangedSelected.power;
        document.getElementById(`weapons-damage-${weaponRangedFirst ? '1' : '2'}`).innerHTML = weaponRangedSelected.damage;
    }
    if(weaponCloseCombatSelected.name) {
        if(canUseWeapon(weaponCloseCombatSelected.conditions)) {
            document.getElementById(`weapons-line-${weaponRangedFirst ? '2' : '1'}`).classList.remove('table__line--invalid');
        } else {
            document.getElementById(`weapons-line-${weaponRangedFirst ? '2' : '1'}`).classList.add('table__line--invalid');
        }
        document.getElementById(`weapons-name-${weaponRangedFirst ? '2' : '1'}`).innerHTML = weaponCloseCombatSelected[`name${genreSelectedValue}`];
        document.getElementById(`weapons-action-${weaponRangedFirst ? '2' : '1'}`).innerHTML = weaponCloseCombatSelected.action;
        document.getElementById(`weapons-range-${weaponRangedFirst ? '2' : '1'}`).innerHTML = weaponCloseCombatSelected.range;
        document.getElementById(`weapons-attacks-${weaponRangedFirst ? '2' : '1'}`).innerHTML = weaponCloseCombatSelected.attacks;
        document.getElementById(`weapons-power-${weaponRangedFirst ? '2' : '1'}`).innerHTML = weaponCloseCombatSelected.power;
        document.getElementById(`weapons-damage-${weaponRangedFirst ? '2' : '1'}`).innerHTML = weaponCloseCombatSelected.damage;
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
    let abilityNumber = 1;

    if(roleSelected.ability1) {
        for(let i=0; i<roleLevel; i++){
            if(abilityNumber <= maxAbilities){
                document.getElementById(`ability-${abilityNumber}`).innerHTML = roleSelected[`ability${i+1}`];
                abilityNumber++;
            }
        }
    }

    if(skillSelected.ability1) {
        for(let i=0; i<skillLevel; i++){
            if(abilityNumber <= maxAbilities){
                document.getElementById(`ability-${abilityNumber}`).innerHTML = skillSelected[`ability${i+1}`];
                abilityNumber++;
            }
        }
    }
}

const refreshCard = () => {
    refreshHeader();
    refreshArmour();
    refreshWeapons();
    refreshWeaponsList();
    refreshCardAbilities();
}

const chooseRole = (roleLine) => {
    roleSelected = selectItem(roleLine, 'role', roles);
    refreshCard();
}

const chooseSkill = (skillLine) => {
    skillSelected = selectItem(skillLine, 'skill', skills);
    refreshCard();
}

const chooseArmour = (armourLine) => {
    armourSelected = selectItem(armourLine, 'armour', armours);
    refreshCard();
}

const chooseWeaponRanged = (weaponRangedLine) => {
    weaponRangedSelected = selectItem(weaponRangedLine, 'weapon-ranged', weaponsRanged);
    refreshCard();
}

const chooseWeaponClose = (weaponCloseLine) => {
    weaponCloseCombatSelected = selectItem(weaponCloseLine, 'weapon-close', weaponsCloseCombat);
    refreshCard();
}

const chooseName = (name) => {
    nameSelected = name.value;
    document.getElementById('name').innerHTML = nameSelected;
}

const chooseGenre = (genre) => {
    genreSelectedValue = genre.value;
    document.querySelectorAll('.genre').forEach((element) => {
        element.classList.add('genre--hidden');
    });

    document.querySelectorAll(`.genre--${genreSelectedValue.toLowerCase() || 'generic'}`).forEach((element) => {
        element.classList.remove('genre--hidden');
    });

    refreshCard();
}

const chooseWeaponFirst = (weaponFirst) => {
    weaponRangedFirst = weaponFirst.value == 'ranged';
    clearWeapons();
    refreshCard();
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

    refreshWeaponsList();
}
init();