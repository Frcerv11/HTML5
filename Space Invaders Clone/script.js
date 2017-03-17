var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var rightPressed = false;
var leftPressed = false;
var spacebarPressed = false;

//Enemy layout  
var rows = 4;
var columns = 9;
var gridWidth = 110;
var gridHeight = 50;
var gridPadding = 10;
var offSetTop = 80;
var offSetLeft = 70;

var randNum;
var gameOver = false;
var lastTime = 0;
var rate = 10;

//Objects
InvadersObj = new Invader;
PlayerObj = new Player;

var img = new Image();
var img1 = new Image();
var tune = document.createElement("AUDIO");
var sounds = ["soundpack/phasor.wav","soundpack/explosion.wav","soundpack/negative.wav"];


//Object array
var bullets = [];
var enemyInvaders = [];

//Populate enemy array and initialize enemy with x,y and id property
for (var i = 0; i < 24; i++) {
	var x = canvas.width/4 + (i % 8) * 90;
	var y = 30 + (i % 3) * 90;
	enemyInvaders.push(new Invader(x,y,i))
}


//ENEMY CLASS
function Invader(x,y,id){
	this.x = x ;
	this.y = y;
	this.width = 50;
	this.height = 50;
	this.fire = false;
	this.id = id;
	this.lastShootTime = 0; 
	this.shootRate = 400;
	this.alive = true;
	this.image = 'images/e1.png';
	//Render enemy on to the screen
	this.draw = function(){
		for (var i = 0; i < 24; i++) {
			if(enemyInvaders[i].alive == true){
				var object = enemyInvaders[i];
				this.image = object.image
				this.x = object.x;
				this.y = object.y;
			    ctx.drawImage(img1,object.x,object.y,object.width,object.height);
			    img1.src = enemyInvaders[i].image	
				ctx.beginPath();	
	        }
		}
	}
	//Move enemy left and right 
	this.move = function(){
		for (var i = 0; i < 24; i++) {
			if(randNum > 12){
				enemyInvaders[i].x++;
			}
			if(randNum < 12){
				enemyInvaders[i].x--;
			}
		}
	}
	//Enemy to wall collision detection
	this.collision = function(){
		for(var i = 0; i < 24; i++) {
			if(enemyInvaders[i].x < 0){
				for(var i = 0; i < 24; i++){
					enemyInvaders[i].x++;
				}
			}
		else if(enemyInvaders[i].x + 50  > canvas.width){
			for(var i = 0; i < 24; i++){
					enemyInvaders[i].x--;
				}
			}
		}
	}
	//Enemy shooting mechanics 
	this.shoot = function(){
		for (var i = 0; i < 24; i++) {
			if(enemyInvaders[i].alive == true){
				if(randNum == enemyInvaders[i].id){
					enemyInvaders[i].fire = true;
					//Control enemy fire rate
					var now = Date.now() ;
					if (now - this.lastShootTime  < this.shootRate)  return;
					this.lastShootTime = now;
					bullets.push(new Bullet(enemyInvaders[i].x,enemyInvaders[i].y,'enemy'))
				}
			}
		}
	}
}

//PLAYER CLASS
function Player(){
	//Player properties
	this.x = canvas.width/2; 
	this.y = canvas.height - 100;
	this.width = 99;
	this.height = 75;
	this.lastShootTime = 0;  
	this.shootRate = 450;
	this.alive = true;
	this.image = 'images/pShip.png';
	//Render player on to the screen
	this.draw = function(){
		if(this.alive){
			img.src = this.image;
			ctx.drawImage(img,this.x,this.y,this.width,this.height);	
			ctx.beginPath();										
		}	
	}
	//Control player movement with left and right arrow keys 
	this.move = function(){
		if(rightPressed){
			this.x+=5;
		}
		else if(leftPressed){
			this.x-=5;
		}
	}
	//Player to wall collision detection
	this.detection =function(){
		if(this.x < 0){
			this.x = 0;
		}
		else if(this.x + this.width  > canvas.width){
			this.x = canvas.width - this.width
		}
	}
	//Player shooting mechanics
	this.shoot = function(){
		if(spacebarPressed){
			if(this.alive){
				//Control players fire rate
				var now = Date.now();
				if (now - this.lastShootTime  < this.shootRate)  return;
				this.lastShootTime = now;
				tune.src = sounds[0]
				tune.play();
				bullets.push(new Bullet(this.x+this.width/2,this.y,'player'))
			}
			
		}
	}
}

//BULLET CLASS: takes in x position, y position and type (enemy or player)
function Bullet(x,y,type){
	this.x = x;
	this.y = y;
	this.width = 9;
	this.height = 54; 
	this.type = type;
	//Render bullet on to the screen and depending if it's called by an enemy 
	//or player it will appear differently (ie. blue bullet for player, red bullet for enemy)
	this.draw = function(){
		ctx.beginPath();
		if(this.type == 'enemy'){
			ctx.beginPath();	
			img.src = 'images/eLaser.png'
			ctx.drawImage(img,this.x,this.y,this.width,this.height);
			ctx.closePath();
		}
		else{
			ctx.beginPath();	
			img.src = 'images/pLaser.png'
			ctx.drawImage(img,this.x,this.y,this.width,this.height);
			ctx.closePath();		
		}
        ctx.fill();
        ctx.closePath();
	}
	//Bullet movement. Bullet moves up or down depending if it's called by an enemy or player. 
	this.move = function(){
		if(this.type == 'enemy'){
			this.y += 5;
		}
		else if(this.type == 'player'){
			this.y -= 5;
		}
	}
}

//Collision detection
function collide(rect1,rect2){
	if (rect1.x < rect2.x + rect2.width &&
	   rect1.x + rect1.width > rect2.x &&
	   rect1.y < rect2.y + rect2.height &&
	   rect1.height + rect1.y > rect2.y) {
	   return true;
	}
}

//If player bullet collides with enemy, delete enemy. If enemy bullet collides with player, remove player.
function resolve(){
	for(var i = 0; i < 24; i++) {
		for(var j=0;j<bullets.length;j++){
			if(collide(bullets[j],enemyInvaders[i]) && bullets[j].type == "player" ){
				var index = enemyInvaders[i]
				bullets.splice(j,1)
				index.alive = false;
				index.y=canvas.height;
				tune.src = sounds[1]
				tune.play();
			}
			if(collide(bullets[j],PlayerObj) && bullets[j].type == "enemy" ){
				PlayerObj.alive = false;
				tune.src = sounds[2]
				tune.play();
				gameOver = true;
			}
		}
	}
}

function update(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if(!gameOver){
		InvadersObj.draw();
		InvadersObj.move();
		InvadersObj.collision();
		InvadersObj.shoot();
		PlayerObj.draw();
		PlayerObj.move();
		PlayerObj.detection();
		PlayerObj.shoot();
		resolve();
		for(var i=0;i<bullets.length;i++){
			bullets[i].draw();
			bullets[i].move();
			if(bullets[i].y > canvas.height){
				bullets.splice(i, 1);
			}
			if(bullets[i].y < 0){
				bullets.splice(i, 1);
			}
		}
	}
    

}

//Key handlers
function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
	else if(e.keyCode == 32){
		spacebarPressed = true;
	}
}
function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
	else if(e.keyCode == 32){
		spacebarPressed = false;
	}
}

//Returns random value every half a second. Used for enemy movement. 
setInterval(function(){   
	randNum = Math.floor(Math.random() * (24 - 1)) + 1;
}, 500);

//Event listners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Game loop
var myVar = setInterval(function(){ update() }, 10);