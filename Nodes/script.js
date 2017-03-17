var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var WIDTH = 1200, HEIGHT = 800;
var synth = new Tone.SimpleSynth().toMaster();

var notes = ['A4','B4','C#4','D4','E4','F#4','G#4','A5','B5','C#5'];
var number;
var colors = ['#99B898','#FECEAB','#FF847C','#E84A5F','#2A363B']
var nodesArray =[]

function Node(){
	this.id;
	this.status = 0;
	this.type =''
	this.x = Math.random() * (canvas.width - 20);
	this.y = Math.random() * (canvas.height - 20);
	this.width = 10;
	this.height = 10;
	this.color = ''
	this.note=''
	this.strokeWidth = 1;
	this.jitterSpeed = 10
	this.strokeColor = '#fecea8'
	
	


	this.draw = function(){
		ctx.beginPath();				
		ctx.rect(this.x,this.y,this.width,this.height);
		ctx.lineWidth = this.strokeWidth;
		ctx.fillStyle = this.color;
		ctx.fill();	
		ctx.closePath()
	}
	this.movement = function(){
		this.x += (Math.random() *  this.jitterSpeed * 2 ) - this.jitterSpeed;
		this.y += (Math.random() *  this.jitterSpeed * 2 ) - this.jitterSpeed;
	}
	this.getX = function(){
		return this.x;
	}
	this.getY = function(){
		return this.y;
	}
	this.setID = function(id){
		this.id = id;
	}
	this.setNote =function(note){
		this.note = note;
	}
	this.getNote = function(){
		return this.note;
	}
	this.processCharacter = function(type){
		this.character = type;
	}

	this.bounds = function(){
		if(this.x < 0){
			this.x = 0
		}
		if(this.x > WIDTH -this.width){
			this.x = WIDTH - this.width
		}
		if(this.y < 0){
			this.y = 0
		}
		if(this.y > HEIGHT - this.width){
			this.y = HEIGHT - this.height;
		}
	}

}



var grd = ctx.createLinearGradient(900,0,0,0);
grd.addColorStop(0,"red");
grd.addColorStop(1,"blue");

function playerInteraction(){
	for(var i = 0; i < nodesArray.length-1; i++){
       var node_a = nodesArray[i];
       for (var j=i+1; j<nodesArray.length; j++){
           var node_b = nodesArray[j];
           if((node_b.x < node_a.x + 100 && node_b.x > node_a.x - 100) &&
           	   node_b.y < node_a.y + 100 && node_b.y > node_a.y - 100){	

           		node_b.jitterSpeed = 20;
           		node_b.type = 'leader'

           		//ON NODES
           		node_a.color = 'yellow'
           		// node_a.color = 'black'

           		node_a.jitterSpeed = 2; 	
           		node_a.type = 'follower'

           		ctx.beginPath();
           		ctx.moveTo(node_a.x,node_a.y);
				ctx.lineTo(node_b.x,node_b.y);

				//NODE EDGES
				ctx.strokeStyle = grd
				ctx.stroke();	
				ctx.closePath()

				//MAIN NODE EDGES
				ctx.strokeStyle = 'white'
           }else{
           		//MAIN NODE 
           		node_b.color = 'white'

           		node_b.jitterSpeed = 20;
           		node_b.type = 'leader'

           		//NODES
           		node_a.color = grd
           		// node_a.color = 'black'
           		

           		node_a.jitterSpeed = 10;
           		node_a.type = 'none'
           }

       }
       if(node_a.type == 'follower'){
   			ctx.beginPath();
       		ctx.moveTo(node_b.x,node_b.y);
			ctx.lineTo(node_a.x,node_a.y);
			ctx.stroke();
			ctx.closePath();
			synth.triggerAttackRelease(node_a.note, "16n")
   		}
	}	
}






function duel(){
	var rand1 = Math.floor((Math.random() * 10) + 1);
	var rand2 = Math.floor((Math.random() * 10) + 1);
	if(rand1 > rand2){
		return true
	}
	else if(rand2 > rand1){
		return false
	}
	else if(rand2 == rand1){
		return false
	}

}


function rectCollision(rect1,rect2){
	if(rect1.getX() < rect2.getX() + rect2.width &&
    rect1.getX() + rect1.width > rect2.getX() &&
    rect1.getY() < rect2.getY() + rect2.height &&
    rect1.height + rect1.getY() > rect2.getY()){
		return true;
    }
}

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id === nameKey) {
            return myArray[i];
        }
    }
}

for(var i =0;i<100;i++){
	nodesArray[i] = new Node();
	nodesArray[i].setID(i)
	var item = notes[Math.floor(Math.random()*notes.length)];
	nodesArray[i].setNote(item)
}

function update(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(var i=0;i<nodesArray.length;i++){
		nodesArray[i].draw();
		nodesArray[i].movement();
		nodesArray[i].bounds();
	}
	playerInteraction();

}

setInterval(update,10);
