let falseResults = 0;
let trueResults = 0;
let allCards = [];
$('.pdeck-block table tbody tr').each((index, item) => {
    console.log(index)
    let cardName = '';
    let cardPrice = '';
    $(item).children('.deck-card').children('.dk-link-mobile').each((indexCard, itemCard) => {
        cardName = itemCard.text
    })
    $(item).children('.deck-price').children('font').each((indexCard, itemCard) => {
        if(indexCard === 0) {
            cardPrice = itemCard.textContent
        }
    })
    console.log(cardName)
    console.log(cardName !== '')
    console.log(cardPrice)
    console.log(cardPrice !== '')

    if(cardName !== '' && cardPrice !== '') {
        trueResults++
        allCards.push({cardName, cardPrice})
    } else {
        falseResults++
    }
    
})
console.log('true = ', trueResults);
console.log('false = ', falseResults);
console.log(allCards.sort((a,b) => a.cardName > b.cardName ? 1 : -1))

allCards.sort((a,b) => a.cardName > b.cardName ? 1 : -1).forEach((item) => {
    console.log(item)
})