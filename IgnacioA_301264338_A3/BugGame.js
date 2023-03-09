// Ignacio Arce Castro
// 301264338
// Assignment 3 
// Client-Side Web Development
// COMP125-005

const MainTitle = document.createElement("h1");
MainTitle.textContent = "Bug Smasher The Game";
document.body.appendChild(MainTitle);

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "bgLeaf.png";

// ladybug image
var ladybugReady = false;
const ladybugImage = document.createElement('img');
ladybugImage.src = "LadyBug.png";
ladybugReady = true;

// Game objects
var ladybug = {};
var Score = 0;

// Reset the game when the player catches a ladybug
var reset = function () {
	// Throw the ladybug somewhere on the screen randomly
  ladybug.x = 32 + (Math.random() * (canvas.width - 64));
  ladybug.y = 32 + (Math.random() * (canvas.height - 64));      
};

//Move Randomly in the area
let movementInterval = 2000;
const decrementInterval = 200;

let intervalId;
let isIntervalRunning = false;

let startInterval = function () {    
  if(!isIntervalRunning && movementInterval > 0){        
    intervalId = setInterval(() => {        
      ladybug.x = 32 + (Math.random() * (canvas.width - 64));
      ladybug.y = 32 + (Math.random() * (canvas.height - 64));             
    }, movementInterval);
    isIntervalRunning = true;    
  }
  else if(isIntervalRunning){    
    movementInterval-=decrementInterval;
    clearInterval(intervalId);
    isIntervalRunning = false;    
    startInterval();
  }
  else{
    alert('Congratulations, You Won!');
  }
}

// Click on LadyBug
canvas.addEventListener('click', function(e) {
  // Get the coordinates of the click relative to the canvas
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;

  if (ladybug.x < x && ladybug.y < y && ladybug.x + 32 > x && ladybug.y +32 > y){
    startInterval();
		++Score;
		reset();
  }
});


// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (ladybugReady) {
		ctx.drawImage(ladybugImage, ladybug.x, ladybug.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "23px Verdana";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + Score, 20, 20);
};

// The main game loop
var main = function () {
	var now = Date.now();	
	render();
	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();

const resetScore = document.createElement("button");
resetScore.textContent = "Reset Score";
resetScore.addEventListener("click", function(){
  Score = 0;
});

const resetSpeed = document.createElement("button");
resetSpeed.textContent = "Reset Speed";
resetSpeed.addEventListener("click", function(){
  movementInterval = 4000;
  isIntervalRunning = true;
  startInterval();
});

const buttons = document.createElement('div');
buttons.appendChild(resetScore);
buttons.appendChild(resetSpeed);

document.body.appendChild(buttons);




