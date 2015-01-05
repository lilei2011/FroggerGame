
var topRow = 65;
var midRow = 150;
var bottom = 235;
var rowHeight = 85;
//y values of play and enemy should be multiples of rowHeight plus topRow. Y value of enemy can be
// 65, 150, 235. y value of player can be 65, 150, 235, 320, and 405. 



// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = getRandom(1,4);
    this.row = getRandom(0,3);
    this.x = 0; 
    this.y = this.row*rowHeight + topRow;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*50*dt;

    // reset the position of the enemy back to the left if the enemy moves out of the screen
    if(this.x >500)
    {
        this.reset(); 
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // console.log(this.x, this.y);
}

//this resets the enemy to left of the screen when it reaches the right side of the screen
Enemy.prototype.reset = function(){
    this.x = 0; 
    this.row = getRandom(0,3);
    this.y = this.row*rowHeight + topRow;
    this.speed = getRandom(1,4);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 405;
}

// this handles if the player reaches the water, it'll be reset to its original position
Player.prototype.update = function(dt) {
    if(this.y <= 50)
        this.reset();
    
}

//this method resets the player position to the original position
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 405;
}

//this prints out the player on the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   // console.log(this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if(key == 'left')
        this.x-=85;
    else if(key == 'right')
        this.x+=85;
    else if(key == 'up')
        this.y-=85;
    else if(key == 'down')
        this.y+=85;
    else return;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();

var allEnemies = [enemy1, enemy2, enemy3];


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

//helper function to generate random numbers between two values x and y
function getRandom(x, y)
{
    return Math.floor(Math.random() * (y - x)) + x;
}
