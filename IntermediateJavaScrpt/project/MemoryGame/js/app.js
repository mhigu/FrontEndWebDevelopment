const cards = [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor", 
    "fa fa-bolt", 
    "fa fa-cube", 
    "fa fa-leaf", 
    "fa fa-bicycle", 
    "fa fa-bomb", 
    "fa fa-diamond", 
    "fa fa-paper-plane-o", 
    "fa fa-anchor", 
    "fa fa-bolt", 
    "fa fa-cube", 
    "fa fa-leaf", 
    "fa fa-bicycle", 
    "fa fa-bomb"];

let selectionList = [];
let correctList = [];
let counter = 0;
let win = 0;
const starHTML = '<li><i class="fa fa-star"></i></li>';

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function initializeCardHTML(){
    selectionList = [];
    correctList = [];
    counter = 0;
    win = 0;

    let shuffledCards = shuffle(cards);
    const deckTag = $(".deck");
    const starsTag = $(".stars");
    deckTag.empty();
    starsTag.empty();
    for (let card of cards){
        deckTag.append(`<li class="card">\n    <i class="${card}">`);
    }
    $(".moves").text(counter);
    $(".stars").append(starHTML.repeat(3));
}

function isCorrect(cardList){
    let card1Class = cardList[0].children().attr("class");
    let card2Class = cardList[1].children().attr("class");
    return card1Class == card2Class;
}

function handleCorrect(card1, card2){
    card1.removeClass("open show").addClass("match animation-correct");
    card2.removeClass("open show").addClass("match animation-correct");
    correctList.push(card1.children().attr("class"));
    win += 1;
}

function handleIncorrect(card1, card2){
    card1.removeClass("open show").addClass("unmatch animation-unmatch");
    card2.removeClass("open show").addClass("unmatch animation-unmatch");
    setTimeout(function() {
        card1.removeClass().addClass("card");
    }, 1000);
    setTimeout(function() {
        card2.removeClass().addClass("card");
    }, 1000);
}

function updateCount(count){
    $(".moves").text(count);
}

function updateStarts(starCount){
    $(".stars").empty().append(starHTML.repeat(starCount));
}

function checkStars(count){
    if(count > 21 && count < 30){
        updateStarts(2);
    } else if(count >= 30){
        updateStarts(1);
    }
}

function checkCorrectList(clsAttr){
    return correctList.includes(clsAttr);
}

function isSameItem(item){
    if (selectionList.length === 1 && (selectionList[0].index() === item.index())){
        return true;
    }

    if (correctList.includes(item.children().attr("class"))){
        return true;
    }
}

function checkWin(){
    if (win === 8){
        createModal();
    }
}

function createModal(){
    let modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ["overlay", "button", "escape"],
        closeLabel: "Close",
        cssClass: ["custom-class-1", "custom-class-2"],
    });
    
    modal.setContent(`Congratulations! You won!\nWith ${$(".moves").text()} moves. You got ${$(".fa-star").size()} stars.`);
    modal.addFooterBtn("Play again!", "tingle-btn tingle-btn--primary", function() {
        // here goes some logic
        initializeCardHTML();
        modal.close();
    });
    
    // open modal
    modal.open();
    
}

$(initializeCardHTML());

$(document).on("click", ".restart", initializeCardHTML);

$(document).on("click", ".card", function(){

    let selectedItem = $(this);
    
    if (isSameItem(selectedItem)){
        return;
    }

    selectionList.push(selectedItem);
    selectedItem.addClass("open show");
    counter += 1;
    updateCount(counter);
    
    if (selectionList.length ===2){
        if (isCorrect(selectionList)){
            handleCorrect(selectionList[0], selectionList[1]);
        } else {
            handleIncorrect(selectionList[0], selectionList[1]);
        }
        selectionList = [];
    }

    checkStars(counter);
    checkWin();
});