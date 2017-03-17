
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//create one of Tone's built-in synthesizers and connect it to the master output

var synth = new Tone.PolySynth(6, Tone.SimpleSynth, {
"oscillator" : {
  "partials" : [0, 2, 3, 4],
}
}).toMaster();
var synth2 = new Tone.DrumSynth().toMaster();


//play a middle c for the duration of an 8th note
var w = canvas.width;
var h = canvas.height;
var objArray = [];
var bulletArray = [];
function Circle(cx,cy,rotationRadius,rotationSpeed,color = 'rosybrown'){
  this.x = 0;
  this.y = 0;
  this.color = color;
  this.cx = cx;
  this.cy = cy;
  this.rotationRadius = rotationRadius
  this.rotationSpeed = rotationSpeed;
  this.angle = 2 * Math.PI / 180;
  this.degrees=0
  this.radius = 10
  this.draw = function(){

    ctx.fillStyle = color;
    ctx.strokeStyle = "lightgray";
      ctx.beginPath();
      ctx.arc(this.newX,this.newY,this.radius,0,2*Math.PI);
      ctx.fill();
  }
  this.rotate = function(){
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 0.2;
        ctx.arc(cx, cy, this.rotationRadius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.stroke();
        this.angle += rotationSpeed * Math.PI / 180;
        // calculate the new ball.x / ball.y
        this.newX = cx + this.rotationRadius * Math.cos(-this.angle);
        this.newY = cy + this.rotationRadius * Math.sin(-this.angle);
        this.degrees = this.angle * (180/Math.PI)
        if(this.degrees > 360){
          this.angle = 0
        }
  }
}

function Bullet(x,y){
  this.x = x
  this.y = y
  this.dx = 1
  this.s=0
  this.draw = function(){	
    ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.rect(this.x,this.y,0.5,this.s);
      ctx.fill();
      this.s+=0.2
  }
  this.move = function(){
    this.x+=this.dx
  }
  this.bounds = function(){
    if(this.x > w){
      synth2.triggerAttackRelease("A8", "8n");
      return true
    }
  }
}
function Star(num,num2){
  this.x = num;
  this.y = num2;
  this.draw = function(){
    ctx.fillStyle = '#DDEDFF';
      ctx.beginPath();
      ctx.rect(this.x,this.y,1,1);
      ctx.fill();
  }
  this.move = function(){
    this.y+=2
  }
  this.bounds = function(){
    if(this.y > h){
      this.y = 0
    }
  }
}
          //  (cx,cy,rotationRadius,rSpeed,color)
objArray[0] = new Circle(400,300,50,1.607*2,"#FFE9C2")
objArray[1] = new Circle(400,300,75,1.174*2,"#B29664")
objArray[2] = new Circle(400,300,100,1.000*2,"#41A689")
objArray[3] = new Circle(400,300,125,0.802*2,"#A62205")
objArray[4] = new Circle(400,300,150,0.434*2,"#D96704")
objArray[5] = new Circle(400,300,175,0.323*2,"#FFE0A9")
objArray[6] = new Circle(400,300,200,0.228*2,"#66A3D9")
objArray[7] = new Circle(400,300,225,0.182*2,"#223A59")
objArray[8] = new Circle(400,300,250,0.159*2,"rgb(245,222,179)")

function detect(){
  for(var i=0;i<objArray.length;i++){
    if(objArray[i].degrees > 355 && objArray[i].degrees <= 361){
        ctx.beginPath();
        ctx.arc(objArray[i].newX, objArray[i].newY, objArray[i].radius,0,2*Math.PI);
        ctx.fillStyle = "#DDEDFF";
        ctx.fill();
      if(i== 0){
        synth.triggerAttackRelease("A2", "2n");
        // bulletArray.push(new Bullet(objArray[0].newX,objArray[0].newY))
      }
      if(i==1)
        synth.triggerAttackRelease("B2", "2n");	
      if(i==2)
        synth.triggerAttackRelease("C#2", "2n");	
      if(i==3)
        synth.triggerAttackRelease("D3", "2n");
      if(i==4)
        synth.triggerAttackRelease("E3", "2n");
      if(i==5)
        synth.triggerAttackRelease("F#3", "2n");	
      if(i==6)
        synth.triggerAttackRelease("G#4", "2n");
      if(i==7)
        synth.triggerAttackRelease("A4", "2n");
      if(i==8)
        synth.triggerAttackRelease("B4", "2n");
    }
  }

}

var starArray = []
for(var i =0;i<150;i++){
  starArray.push(new Star( Math.floor((Math.random() * w) + 1), Math.floor((Math.random() * h) + 1)))
}

function update(){
  ctx.clearRect(0, 0, w, h);
  for (var i = 0; i < starArray.length; i++) {
    starArray[i].draw()
    starArray[i].move()
    starArray[i].bounds()
  };

  for(var i=0;i<objArray.length;i++){
    objArray[i].draw()
    objArray[i].rotate()
  }
  for(var i=0;i<bulletArray.length;i++){
    bulletArray[i].draw()
    bulletArray[i].move()
    if(bulletArray[i].bounds()){
      bulletArray.shift()
    }
  }
  detect()
}


setInterval(update,1000/60)
