var canvas = document.getElementById("myCanvas");
var snd = document.getElementById('track');
var snd1 = document.getElementById('track1');
var ctx = canvas.getContext("2d");
var wordWidth = 75;
var wordHeight = 20;
var wordPadding = 30;
var offSetTop = 25;
var offSetLeft = 80;
var col = 11;
var row = 24;
var spaceBar = false
var rightKey = false
var isPaused = true;
var clean = []
var wordArr = []
//Store text from program into code
var code = document.documentElement.innerHTML
//Create 2d array of object,Words 
var wordObj = new Array
for (i=0;i<col;i++) {
  wordObj[i]=new Array();
  for (j=0;j<row;j++) {
    wordObj[i][j]= new Words()
  }
}
//Remove all characters but letters
code = code.replace(/[^a-zA-Z]/g, ' ');

//Divide words in string by spaces and store words in array
var wordArr = code.split(" ");

//Remove every word less than 3 char long except i and store it in new array
for(var i =0;i<wordArr.length;i++){
  var test = wordArr[i]
  test.toString();
  if(test.length > 3 || test == "i")
    clean.push(test)
}
var wordArr = Array.from(clean);


// wordArr = wordArr.filter(function(str) {
// 	console.log(str)
// 	return /\S/.test(str);
// });



//Return random word from wordArr 
function randomWord(){
  var word = wordArr[Math.floor(Math.random()*wordArr.length)];
  return word
}


function poemCreator(){
  //Generate random number from 0 up to what is in col or in row
  var randomnumber=Math.floor(Math.random()*col)
  var randomnumber1=Math.floor(Math.random()*row)

  //if space bar is press delete element from any random place in 2d array.
  if(spaceBar){
    for(var i=0;i<col;i++){
      for(var j=0;j<row;j++){
        //store 2d array in obj variable
        var obj = wordObj[randomnumber][randomnumber1]
        obj.status = 0
        //Output square every time text is selected randomly to be deleted. If there is no text do nothing. 
        ctx.beginPath();
        ctx.rect(obj.x, obj.y, 10, 10);
        ctx.fillStyle = "white";
        ctx.fill();	
      }
    }
  }


}

//Words "Class"
function Words(){
  this.status = 1
  this.draw = function(){
    //clear screen every x time(milliseconds)

    //itterate through 2d array and output text on screen
    for(var i=0;i<col;i++){
      for(var j=0;j<row;j++){
        if(wordObj[i][j].status == 1){
          //Position text in row and col with margins set in all directions 
          var wordX = (i*(wordWidth + wordPadding)) + offSetLeft;
          var wordY = (j*(wordHeight + wordPadding))+ offSetTop;
          wordObj[i][j].x = wordX
          wordObj[i][j].y = wordY
          //Output text and set text properties
          ctx.font = "20px Helvetica";
          ctx.fillStyle = "lightgreen";
          ctx.textAlign= "center"
          ctx.fillText(randomWord() ,wordObj[i][j].x ,wordObj[i][j].y);	
        }
      }
    }
  }
}

//Call methods 
words = new Words()
function update(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  words.draw()
  poemCreator()
}


//Key handler for spacebar
function keyDownHandler(e) {
  if(e.keyCode == 32) {
    spaceBar = true;
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 32) {
    spaceBar = false;
  }
}

//Pause, play set interval 
var t = window.setInterval(function() {
  if(!isPaused) {
    update()
  }
}, 10);

//Key handlers for left and right arrow
$('body').keyup(function(e){
   if(e.keyCode == 37){
        isPaused = true;
      snd.pause()
      snd.currentTime = 0
      snd1.play()
   }
   if(e.keyCode == 39){
        isPaused = false;	
    snd.play()
    snd1.currentTime = 0
    snd1.pause()
   }
});

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, true);
