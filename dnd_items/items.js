$('#charismaRoll').focus(function(){
    $('#charismaRoll')[0].value = '';
});

$('#allItems').click(function(){
    var itemsFound = [];
    for (var i=0; i<100; i++) {
        itemsFound.push(getItemByTableAndNumber('A', i));
        itemsFound.push(getItemByTableAndNumber('B', i));
        itemsFound.push(getItemByTableAndNumber('C', i));
        itemsFound.push(getItemByTableAndNumber('D', i));
        itemsFound.push(getItemByTableAndNumber('E', i));
        itemsFound.push(getItemByTableAndNumber('F', i));
        itemsFound.push(getItemByTableAndNumber('G', i));
        itemsFound.push(getItemByTableAndNumber('H', i));
        itemsFound.push(getItemByTableAndNumber('I', i));
    }
    createItemsHtml(itemsFound);
});

$('#rollItems').click(function(){
    var itemsFound = rollItem($('#charismaRoll')[0].value, ($('#natural20')[0].checked));
    createItemsHtml(itemsFound);
});

function createItemsHtml(itemsFound, debug=false) {
    var itemsFoundShortName = [];
    var itemsFoundFullName = [];
    var itemExtraData = [];

    for(var i=0; i< itemsFound.length; i++) {
        if(itemsFound[i].shortName != undefined) {
            itemsFoundShortName.push(itemsFound[i].shortName);
            itemsFoundFullName.push(itemsFound[i].fullName);
            itemExtraData.push('');
        } else {
            itemsFoundShortName.push(itemsFound[i][0].shortName);
            itemsFoundFullName.push(itemsFound[i][0].fullName);
            itemExtraData.push(itemsFound[i][1]);
        }
    }

    itemList.forEach(function(element) {
        for(var i=0; i< itemsFound.length; i++) {
            if( itemsFoundFullName[i].indexOf(element.name.toUpperCase()) > -1 ) {
                itemsFound[i] = {...element, fullName: itemsFoundFullName[i], extraData: itemExtraData[i]};
            }
        }
    });

    $('#rollItems').css('display', 'none');

    itemsFound.forEach(function(item){
        if(item.name != undefined) {
            var extraData = '';
            if (item.extraData != undefined && item.extraData != '') {
                extraData = 
                '<p>' +
                    '<strong>Roll: </strong>'+
                    JSON.stringify(item.extraData)
                        .replace(/\,/g, '')
                        .replace(/\[/g, '')
                        .replace(/\]/g, '')
                        .replace(/\{/g, '')
                        .replace(/\"number\"\:\"/g, '')
                        .replace(/\"item\"\:\"/g, ': ')
                        .replace(/\"/g, '')
                        .replace(/\}/g, '\n');
                '</p>'
            }
            $('#items').append(
                '<div class="item">' +
                    '<p>' +
                        '<strong>name: </strong>'+
                        item.fullName +
                    '</p>' +
                    extraData.replace(/\n/g, '<br />') +
                    '<p>' +
                        '<strong>price: </strong>'+
                        item.price.replace(/\n/g, '<br />') +
                    '</p>' +
                    '<p>' +
                        '<strong>type: </strong>'+
                        item.type +
                    '</p>' +
                    '<p>' +
                        '<strong>description: </strong>'+
                        item.description.replace(/\n/g, '<br />') +
                    '</p>' +
                '</div>'
            );
        } else {
            $('#items').append(
                '<div class="item">' +
                    '<p>' +
                        '<strong>name: </strong>'+
                        item.fullName +
                    '</p>' +
                    '<br />'+
                '</div>'
            );
        }
    });
}

function d100Roll() {
    return Math.floor(Math.random() * Math.floor(100));
}

function rollItem (charismaRoll, isNatural20 = false, charLevel = 7) {
    var item = [];

    if ( charLevel <= 4) {
        if (charismaRoll <= 10) {
            item = [];
        }

        if (!isNatural20) {
            if (charismaRoll >= 11 && charismaRoll <= 13) {
                var extraItems = (charismaRoll % 11);
                item = [
                    getItemByTableAndNumber ("A", d100Roll()),
                    getItemByTableAndNumber ("A", d100Roll()),
                    getItemByTableAndNumber ("A", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("A", d100Roll()));
                }
            }

            if (charismaRoll >= 14 && charismaRoll <= 16) {
                var extraItems = (charismaRoll % 14);
                item = [
                    getItemByTableAndNumber ("B", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++) {
                    item.push(getItemByTableAndNumber ("B", d100Roll()));
                }
            }

            if (charismaRoll >= 17 && charismaRoll <= 19) {
                var extraItems = (charismaRoll % 17);
                item = [
                    getItemByTableAndNumber ("C", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++) {
                    item.push(getItemByTableAndNumber ("C", d100Roll()));
                }
            }

            if (charismaRoll >= 20 && charismaRoll <= 21) {
                var extraItems = (charismaRoll % 20);
                item = [
                    getItemByTableAndNumber ("F", d100Roll()),
                    getItemByTableAndNumber ("F", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++) {
                    item.push(getItemByTableAndNumber ("F", d100Roll()));
                }
            }

            if (charismaRoll >= 22) {
                item = [getItemByTableAndNumber ("G", d100Roll())];
            }
        } else {
            item = [getItemByTableAndNumber ("G", d100Roll()), getItemByTableAndNumber ("G", d100Roll())];
        }
    }

    if ( charLevel >= 5 && charLevel <= 10 ) {
        if (charismaRoll <= 10) {
            item = [];
        }

        if (!isNatural20) {
            if (charismaRoll >= 11 && charismaRoll <= 12) {
                var extraItems = (charismaRoll % 11);
                item = [
                    getItemByTableAndNumber ("A", d100Roll()),
                    getItemByTableAndNumber ("A", d100Roll()),
                    getItemByTableAndNumber ("A", d100Roll()),
                    getItemByTableAndNumber ("A", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("A", d100Roll()))
                }
            }

            if (charismaRoll >= 13 && charismaRoll <= 14) {
                var extraItems = (charismaRoll % 13);
                item = [
                    getItemByTableAndNumber ("B", d100Roll()),
                    getItemByTableAndNumber ("B", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("B", d100Roll()));
                }
            }

            if (charismaRoll >= 15 && charismaRoll <= 16) {
                var extraItems = (charismaRoll % 15);
                item = [
                    getItemByTableAndNumber ("C", d100Roll()),
                    getItemByTableAndNumber ("C", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("C", d100Roll()));
                }
            }

            if (charismaRoll >= 17 && charismaRoll <= 18) {
                var extraItems = (charismaRoll % 17);
                item = [
                    getItemByTableAndNumber ("F", d100Roll()),
                    getItemByTableAndNumber ("F", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("F", d100Roll()));
                }
            }

            if (charismaRoll >= 19 && charismaRoll <= 20) {
                var extraItems = (charismaRoll % 19);
                item = [
                    getItemByTableAndNumber ("G", d100Roll()),
                    getItemByTableAndNumber ("G", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("G", d100Roll()));
                }
            }

            if (charismaRoll >= 21 && charismaRoll <= 22) {
                item = [getItemByTableAndNumber ("D", d100Roll())];
            }

            if (charismaRoll >= 23) {
                item = [getItemByTableAndNumber ("H", d100Roll())];
            }
        } else {
            item = [getItemByTableAndNumber ("H", d100Roll()), getItemByTableAndNumber ("H", d100Roll())];
        }
    }

    if ( charLevel >= 11 && charLevel <= 16 ) {
        if (charismaRoll <= 10) {
            item = "none";
        }

        if (!isNatural20) {
            if (charismaRoll >= 11 && charismaRoll <= 12) {
                item = [getItemByTableAndNumber ("A", d100Roll()), getItemByTableAndNumber ("B", d100Roll())];

                var extraItems = (charismaRoll % 11);
                var extraItems2 = (charismaRoll % 11);
                item = [
                    getItemByTableAndNumber ("A", d100Roll()),
                    getItemByTableAndNumber ("A", d100Roll()),
                    getItemByTableAndNumber ("B", d100Roll()),
                    getItemByTableAndNumber ("B", d100Roll()),
                    getItemByTableAndNumber ("B", d100Roll()),
                    getItemByTableAndNumber ("B", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("A", d100Roll()));
                }
                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("B", d100Roll()));
                }             
            }

            if (charismaRoll >= 13 && charismaRoll <= 14) {
                var extraItems = (charismaRoll % 13);
                item = [
                    getItemByTableAndNumber ("C", d100Roll()),
                    getItemByTableAndNumber ("C", d100Roll()),
                    getItemByTableAndNumber ("C", d100Roll()),
                    getItemByTableAndNumber ("C", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("C", d100Roll()));
                }
            }

            if (charismaRoll >= 15 && charismaRoll <= 16) {
                var extraItems = (charismaRoll % 15);
                item = [
                    getItemByTableAndNumber ("F", d100Roll()),
                    getItemByTableAndNumber ("G", d100Roll()),
                    getItemByTableAndNumber ("G", d100Roll()),
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("G", d100Roll()));
                }
            }

            if (charismaRoll >= 17 && charismaRoll <= 18) {
                var extraItems = (charismaRoll % 17);
                item = [
                    getItemByTableAndNumber ("D", d100Roll()),
                    getItemByTableAndNumber ("D", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("D", d100Roll()));
                }
            }

            if (charismaRoll >= 19 && charismaRoll <= 20) {
                var extraItems = (charismaRoll % 19);
                item = [
                    getItemByTableAndNumber ("H", d100Roll()),
                    getItemByTableAndNumber ("H", d100Roll()),
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("H", d100Roll()));
                }
            }

            if (charismaRoll >= 21 && charismaRoll <= 22) {
                item = [getItemByTableAndNumber ("E", d100Roll())];
            }

            if (charismaRoll >= 23) {
                item = [getItemByTableAndNumber ("I", d100Roll())];
            }
        } else {
            item = [getItemByTableAndNumber ("I", d100Roll()), getItemByTableAndNumber ("I", d100Roll())];
        }
    }

    if ( charLevel >= 17 ) {
        if (charismaRoll <= 10) {
            item = "none";
        }

        if (!isNatural20) {
            if (charismaRoll >= 11 && charismaRoll <= 12) {
                var extraItems = (charismaRoll % 11);
                item = [
                    getItemByTableAndNumber ("C", d100Roll()),
                    getItemByTableAndNumber ("C", d100Roll()),
                    getItemByTableAndNumber ("C", d100Roll()),
                    getItemByTableAndNumber ("C", d100Roll()),
                    getItemByTableAndNumber ("C", d100Roll()),
                    getItemByTableAndNumber ("C", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("C", d100Roll()));
                }
            }

            if (charismaRoll >= 13 && charismaRoll <= 14) {
                var extraItems = (charismaRoll % 13);
                item = [
                    getItemByTableAndNumber ("G", d100Roll()),
                    getItemByTableAndNumber ("G", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("G", d100Roll()));
                }
            }

            if (charismaRoll >= 15 && charismaRoll <= 16) {
                var extraItems = (charismaRoll % 15);
                item = [
                    getItemByTableAndNumber ("D", d100Roll()),
                    getItemByTableAndNumber ("D", d100Roll()),
                    getItemByTableAndNumber ("D", d100Roll()),
                    getItemByTableAndNumber ("D", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("D", d100Roll()));
                }
            }

            if (charismaRoll >= 17 && charismaRoll <= 18) {
                var extraItems = (charismaRoll % 17);
                item = [
                    getItemByTableAndNumber ("H", d100Roll()),
                    getItemByTableAndNumber ("H", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("H", d100Roll()));
                }
            }

            if (charismaRoll >= 19 && charismaRoll <= 20) {
                var extraItems = (charismaRoll % 19);
                item = [
                    getItemByTableAndNumber ("E", d100Roll()),
                    getItemByTableAndNumber ("E", d100Roll()),
                    getItemByTableAndNumber ("E", d100Roll()),
                    getItemByTableAndNumber ("E", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("E", d100Roll()));
                }
            }

            if (charismaRoll >= 21) {
                var extraItems = (charismaRoll % 21);
                item = [
                    getItemByTableAndNumber ("I", d100Roll()),
                    getItemByTableAndNumber ("I", d100Roll())
                ];

                for (var i=0; i <= extraItems; i++){
                    item.push(getItemByTableAndNumber ("I", d100Roll()));
                }
            }
        } else {
            var extraItems = (charismaRoll % 21);
                item = [
                    getItemByTableAndNumber ("I", d100Roll()),
                    getItemByTableAndNumber ("I", d100Roll()),
                    getItemByTableAndNumber ("I", d100Roll()),
                    getItemByTableAndNumber ("I", d100Roll()),
                    getItemByTableAndNumber ("I", d100Roll()),
                    getItemByTableAndNumber ("I", d100Roll()),
                    getItemByTableAndNumber ("I", d100Roll()),
                    getItemByTableAndNumber ("I", d100Roll())
                ];
        }
    }

    return item;
}


function getItemByTableAndNumber(tableLetter, number) {
    var tableToUse = tables[tableLetter];
    var item = "Item not found";

    tableToUse.forEach(function(element) {
        if (element.number == number) {
            item = element.item;
        }

        if (element.number.indexOf('-') > -1) {
            var startEnd = element.number.split('-');
            for (var i = startEnd[0]; i <= startEnd[1]; i++){
                if(i == number){
                    item = element.item;
                }
            }
        }
    });

    if (typeof item == "string") {
        return {shortName: item.toUpperCase().split(/[,(]+/)[0], fullName: item.toUpperCase()};
    }

    if(typeof item[0] == "string"){
        return [{shortName: item[0].toUpperCase().split(/[,(]+/), fullName: item[0].toUpperCase()}, item[1]];
    }

    return item.split(/[,(]+/);
}