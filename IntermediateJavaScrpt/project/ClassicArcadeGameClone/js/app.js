// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x; // x axis of enemy
    this.y = y; // y axis of enemy
    this.speed = speed; // spped of eneymy

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

/**
 * @description Update the enemy's position, required method for game
 * @param dt a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var yAxis = [72, 154, 236];
    // select row randomly from yAxis(the player will be somewhere).
    if (this.x > 490){
        this.y = yAxis.sort(function() { return 0.5 - Math.random();}).pop();
    }
    this.x = (this.x + (this.speed * dt))%550;
    this.handleCollision(player, this);
    
};

/**
 * @description This function handle collision.
 * 1. check collision happened.
 * 2. if true, return player to first position.
 * 3. and increment/update lose counter.
 * @param p player object
 * @param e enemy object
 */
Enemy.prototype.handleCollision = function(p, e) {
    var margin = 20;
    if (p.y===e.y && (p.x-margin < e.x && e.x < p.x)){
        p.x = 200;
        p.y = 400;
        p.lose += 1;
        $(".lose-counter").text(p.lose);
    }
};

/**
 * @description Draw the enemy on the screen, required method for game.
 */ 
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    this.x = 200; // x axis of player
    this.y = 400; // y axis of player
    this.sprite = 'images/char-boy.png';
    this.win = 0; // win count
    this.lose = 0;  // lose count
};

// This class requires an update(), render() and
/**
 * @description This function do nothing special. Just stay same position.
 */
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

/**
 * @description Draw the player on the screen, required method for game
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description a handleInput() method. 
 * @param direction ['left', 'up', 'right', 'down']
 */
Player.prototype.handleInput = function(direction) {

    if (direction==='left' && this.x>0){
        this.x += -100;
    } else if (direction==='up' && this.y>-10){
        this.y += -82;
        this.refresh(this.x, this.y);
    } else if (direction==='right' && this.x<400){
        this.x += 100;
    } else if (direction==='down' && this.y<400){
        this.y += 82;
    } 
};

/**
 * @description if player reach water refresh player position.
 * @param px player x position
 * @param py player y position
 */
Player.prototype.refresh = function(px, py){
    if (py<31){
        this.x = 200;
        this.y = 400;
        this.win += 1;
        $(".win-counter").text(this.win);
    }
};

// Now instantiate your objects.
var enemy1 = new Enemy(0, 72, 300);
var enemy2 = new Enemy(0, 72, 500);
var enemy3 = new Enemy(0, 154, 100);
var enemy4 = new Enemy(0, 154, 50);
var enemy5 = new Enemy(0, 236, 400);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
// var allEnemies = [enemy1];
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
