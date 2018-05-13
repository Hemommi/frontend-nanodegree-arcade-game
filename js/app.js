// Enemies our player must avoid
var Enemy = function(positionX, positionY,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
        this.x = positionX;
        this.y = positionY;
        this.speed = speed;
        this.pointX = positionX;
        this.pointY = positionY;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

//Audio.
 var audio = new Audio('media/crashing.wav');

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x = this.x +(this.speed*dt);

    //Move all Enemies
    if (this.x >= 505){
        this.move();
    }
   
    // Collision detected
    if(player.x > this.x - 75 && 
       player.x < this.x + 75 &&
       player.y > this.y - 25 && 
       player.y < this.y + 25){
            audio.play();
            if(player.isAlive === true){
                player.isAlive = false;
                player.sprite = 'images/char-horn-girl-dead.png';
                setTimeout(function(){                                                            
                    restartGame();       
                },2000); 
            };
        };  
};

//Restart game/alert.
function restartGame(){
    swal("Try again!")
    .then((value) => {
        player.x = 200;
        player.y = 400; 
        player.sprite = 'images/char-horn-girl.png';
        player.isAlive = true;
      });
};

// Move all Enemies
Enemy.prototype.move = function(pointX, pointY){
    this.x = this.pointX;
    this.y = this.pointY;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
    this.isAlive = true;
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(){
    if(this.y < 0){ 
        setTimeout(function(){
            finishGame();
        },1000)
        setTimeout(function(){
            player.x = 200;
            player.y = 400; 
        },1000)
        };
};

function finishGame(){
    swal("You win!")
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction){
    if(player.isAlive === true){
        if (direction === 'right' && this.x < 400)
            this.x = this.x + 100;
        else if (direction === 'left' && this.x > 0)
            this.x = this.x - 100;
        else if (direction === 'up' && this.y > 0)
            this.y = this.y - 82.5;
        else if (direction === 'down' && this.y < 400)
            this.y = this.y + 82.5;
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(0,60,200);
var enemy2 = new Enemy(-150,60,200);
var enemy3 = new Enemy(-60,145,60);
var enemy4 = new Enemy(-300,145,60);
var enemy5 = new Enemy(-200,230,300);
var enemy6 = new Enemy(-400,230,300);

var allEnemies = [
    enemy1,
    enemy2,
    enemy3,
    enemy4,
    enemy5,
    enemy6
];

var player =  new Player(200,400);

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