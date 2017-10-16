 const cards = [ // Definition of cards class(html class).
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
let timer = 0;
let timerID;
const starHTML = '<li><i class="fa fa-star"></i></li>';

/**
 * @description Shuffling value order of element in array.
 * @param {Array[Any]} array 
 */
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

/**
 * @description Updating time.
 */
function updateTime(){
    $(".elapsed-time").text(timer++);
}

/**
 * @description Start count-up timer.
 */
function startTimer(){
    timerID = setInterval(updateTime, 1000);
}

/**
 * @description Stop updating time.
 */
function stopTimer(){
    clearInterval(timerID);
}

/**
 * @description Initialize HTML for game.  This function is also used in `refresh` button.
 */
function initializeCardHTML(){
    selectionList = [];
    correctList = [];
    counter = 0;
    timer = 0;
    win = 0;

    startTimer();

    let shuffledCards = shuffle(cards);
    const deckTag = $(".deck");
    const starsTag = $(".stars");
    const timerTag = $(".elapsed-time");
    deckTag.empty();
    starsTag.empty();
    timerTag.text(timer);
    for (let card of cards){
        deckTag.append(`<li class="card">\n    <i class="${card}">`);
    }
    $(".moves").text(counter);  // reset move
    $(".stars").append(starHTML.repeat(3));  // reset star
}

/**
 * @description This function check the selections are correct or not using ther children class(like fa-xxx and fa-xxx).
 * @param {Array[HTMLElement]} cardList 
 */
function isCorrect(cardList){
    let card1Class = cardList[0].children().attr("class");
    let card2Class = cardList[1].children().attr("class");
    return card1Class == card2Class;
}

/**
 * @description Update HTML class for correct selection.
 * @param {HTMLElement} card1 
 * @param {HTMLElement} card2 
 */
function handleCorrect(card1, card2){
    card1.removeClass("open show").addClass("match animation-correct");
    card2.removeClass("open show").addClass("match animation-correct");
    correctList.push(card1.children().attr("class"));
    win += 1;
}

/**
 * @description Update HTML class for incorrect selection.
 * There is two step.
 * 1. incorrect animation.
 * 2. make it back to priginal class. 
 * @param {HTMLElement} card1 
 * @param {HTMLElement} card2 
 */
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

/**
 * @description Update moves count.
 * @param {Number} count 
 */
function updateCount(count){
    $(".moves").text(count);
}

/**
 * @description Update star count.
 * @param {Number} starCount 
 */
function updateStarts(starCount){
    $(".stars").empty().append(starHTML.repeat(starCount));
}

/**
 * @description Check star criteria and update it if it's necessary.
 * @param {Number} count 
 */
function checkStars(count){
    if(count > 21 && count < 30){
        updateStarts(2);
    } else if(count >= 30){
        updateStarts(1);
    }
}

/**
 * @description Check selected item is already exist in answered list.
 * @param {HTMLClassAttr} clsAttr 
 */
function checkCorrectList(clsAttr){
    return correctList.includes(clsAttr);
}

/**
 * @description Check selected item is same as itself.
 * @param {HTMLElement} item 
 */
function isSameItem(item){
    if (selectionList.length === 1 && (selectionList[0].index() === item.index())){
        return true;
    }

    if (correctList.includes(item.children().attr("class"))){
        return true;
    }
}

/**
 * @description Check player win the game or not.
 */
function checkWin(){
    if (win === 8){
        stopTimer();
        createModal();
    }
}

/**
 * @description Create modal when player won the game.
 */
function createModal(){
    // initialize modal
    let modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ["overlay", "button", "escape"],
        closeLabel: "Close",
        cssClass: ["custom-class-1", "custom-class-2"],
    });
    
    modal.setContent(`Congratulations! You won!\n
    With ${$(".moves").text()} moves and ${$(".elapsed-time").text()} seconds. 
    You got ${$(".fa-star").size()} stars.`);
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
    
    if (selectionList.length ===2){
        counter += 1;
        updateCount(counter);
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