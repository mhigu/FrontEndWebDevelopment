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

$(initializeCardHTML());

function isCorrect(cardList){
    let card1Class = cardList[0].children().attr("class");
    let card2Class = cardList[1].children().attr("class");
    return card1Class == card2Class;
}

function handleCorrect(card1, card2){
    card1.removeClass("open show").addClass("match animation-correct");
    card2.removeClass("open show").addClass("match animation-correct");
    correctList.push(card1.children().attr("class"));
    console.log(correctList);
    win += 1;
}

function handleIncorrect(card1, card2){
    card1.removeClass("open show").addClass("unmatch animation-unmatch");
    card2.removeClass("open show").addClass("unmatch animation-unmatch");
    card1.delay(600).queue(function(){
        $(this).removeClass("unmatch animation-unmatch");
    });
    card2.delay(600).queue(function(){
        $(this).removeClass("unmatch animation-unmatch");
    });
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

function checkWinOrLose(){
    var modalInstance = $.remodal.lookup[$('[data-remodal-id=notice]').data('remodal')];
    modalInstance.open();
    modalInstance.close();
}

function checkCorrectList(clsAttr){
    return correctList.includes(clsAttr);
}

function main(selection){
    counter += 1;
    selectionList.push(selection);
    selection.addClass("open show");

    if (selectionList.length ===2){
        if (isCorrect(selectionList)){
            handleCorrect(selectionList[0], selectionList[1]);
        } else {
            handleIncorrect(selectionList[0], selectionList[1]);
        }
        selectionList = [];
    }

    // $(".moves").text(counter);
    updateCount(counter);
    checkStars(counter);
    checkWinOrLose();
}

$(document).on("click", ".card", function(){

    let selectedItem = $(this);
    if (checkCorrectList(selectedItem.children().attr("class"))){
        return;
    }
    if (selectionList.length === 1){
        if (selectionList[0].index() === selectedItem.index()){
            return;
        } else {
            main(selectedItem);
        }
    } else {
        main(selectedItem);
    }
});

$(document).on("click", ".restart", initializeCardHTML);
