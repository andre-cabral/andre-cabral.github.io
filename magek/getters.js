const addZerosToNumber = (number) => {
    if (number < 10) {
        return `00${number}`;
    }
    if (number < 100) {
        return `0${number}`;
    }
    return number;
};

const getAbilityById = (id) => {
    let ability;
    abilities?.['SpecialAbilityTypes']?.forEach( (element) => {
        if(element?.['SpecialAbilityTypeKey'] === id) {
            ability = element;
        }
    });

    return ability;
};

const compareModelFigureNumber = (a, b) => {
    return a?.['Model.FigureNumber'] - b?.['Model.FigureNumber'];
};

const getModelsByExpansionName = (expansionName) => {
    return dials?.['Models']?.filter(
        (element) => {
            return element?.['Model.ExpansionName'] === expansionName
        }
    ).sort(compareModelFigureNumber)
};

const getExpansionById = (id) => {
    let expansion;
    expansions?.['Expansions']?.forEach( (element) => {
        if(element?.['ExpansionId'] === id) {
            expansion = element
        }
    })

    return expansion;
};

const getExpansionByName = (name) => {
    let expansion;
    expansions?.['Expansions']?.forEach( (element) => {
        if(element?.['ExpansionName'] === name) {
            expansion = element
        }
    })

    return expansion;
};

const getExpansionByShortName = (shortName) => {
    let expansion;
    expansions?.['Expansions']?.forEach( (element) => {
        if(element?.['ShortName'] === shortName) {
            expansion = element
        }
    })

    return expansion;
};

const getExpansionShortNameById = (id) => {
    return getExpansionById(id)?.['ShortName'];
};

const getExpansionShortNameByExpansionName = (name) => {
    return getExpansionByName(name)?.['ShortName'];
};

const getGeneratedCodeByModel = (model) => {
    const expansionName = model?.['Model.ExpansionName'];
    const expansionShortName = getExpansionShortNameByExpansionName(expansionName);

    const figureNumber = model?.['Model.FigureNumber'];

    return `${expansionShortName}-${figureNumber}`
}

const getModelByGeneratedCode = (generatedCode) => {
    const [expansionShortName, figureNumber] = generatedCode.split('-');

    const expansionName = getExpansionByShortName(expansionShortName)?.['ExpansionName'];
    const models = getModelsByExpansionName(expansionName);
    
    let model;
    models?.forEach( (element) => {
        if (element?.['Model.FigureNumber'].toString() === figureNumber.toString()) {
            model = element
        }
    });

    return model;
}

const getImageByGeneratedCode = (generatedCode) => {
    if(generatedCode.indexOf('dg') > -1) {
        return `dg/${generatedCode}.jpg`;
    }

    const [expansionShortName, figureNumber] = generatedCode.split('-');

    return `mkpics/${expansionShortName}${addZerosToNumber(figureNumber)}.jpg`
}

const abilityTest = getAbilityById(90);
console.log(abilityTest);

const modelsByExpansionNameTest = getModelsByExpansionName('Lancers');
console.log(modelsByExpansionNameTest);

const expansionByIdTest = getExpansionById(2);
console.log(expansionByIdTest);

const expansionByNameTest = getExpansionByName('Whirlwind');
console.log(expansionByNameTest);

const expansionByShortName = getExpansionByShortName('m');
console.log(expansionByShortName);

const expansionShortNameByIdTest = getExpansionShortNameById(7);
console.log(expansionShortNameByIdTest);

const expansionShortNameByExpansionNameTest = getExpansionShortNameByExpansionName('Unlimited');
console.log(expansionShortNameByExpansionNameTest);

const getGeneratedCodeByModelTest = getGeneratedCodeByModel(dials?.['Models']?.[15]);
console.log(getGeneratedCodeByModelTest);

const getModelByGeneratedCodeTest = getModelByGeneratedCode('s-25');
console.log(getModelByGeneratedCodeTest);

const getModelByGeneratedCodeTest2 = getModelByGeneratedCode(getGeneratedCodeByModelTest);
console.log(getModelByGeneratedCodeTest2);

const getImageByGeneratedCodeTest = getImageByGeneratedCode('s-25')
console.log(getImageByGeneratedCodeTest);

const getImageByGeneratedCodeTest2 = getImageByGeneratedCode('dg-25')
console.log(getImageByGeneratedCodeTest2);