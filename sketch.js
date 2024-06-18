// Rhymth game
// jessica


//Medias
let bg;
let startBG;
let endBG;
let levelBG;
let infoScreen;
let gameMusic;
let button;

//Spawn Blocks
let lineOne = [];
let lineTwo = [];
let lineThree = [];
let lineFour = [];
let lineFive = [];
let spawnBlocks;
let spawnBlocks5;
let spawnBlocks2;
let spawnBlocks3;
let spawnBlocks4;

// Screen Misc.
let lastSpawned = 0;
let missRate = 0;
let hitRate = 0;
let screenState ="startScreen";

//Music
let musicTimer;
let gameStart = 0;

//Clickable
let myButton;
let popUpState = "false";
let normalButton;
let restartButton;


function preload() { //preload stuff
  bg = loadImage("cityScape.jpg");
  startBG = loadImage("startScreen.png");
  endBG = loadImage("endScreen.png");
  levelBG = loadImage("frame.jpg");
  gameMusic = loadSound("Creepy-Nuts.mp3");
  //animatedBG = createVideo("screen-record.mp4");
  infoScreen = loadImage("info-screen.png");
  button = loadImage("info-button.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);


  //button info
  let buttonWidth = windowWidth/20;
  let buttonHeight = windowHeight/20;
  myButton = new Clickable();     //Create button
  myButton.cornerRadius = 360;
  myButton.locate(buttonWidth, buttonHeight); //Position Button
  myButton.resize(50,50);
  myButton.text = "";
  myButton.fitImage = true;
  myButton.imageScale = 1.1;
  myButton.image = button;
  myButton.onPress = function(){  //When myButton is pressed
    if (popUpState === "false") {
      popUpState = "true";
    }
    else {
      popUpState = "false";
    }
  };

  let normalLocate = windowWidth/4-windowWidth/10;
  let normalLocate2 = windowHeight/2-windowHeight/8;
  normalButton = new Clickable();
  normalButton.cornerRadius = 10;
  normalButton.textScaled = true;
  normalButton.text = "Normal";
  normalButton.locate(normalLocate, normalLocate2);
  normalButton.resize(windowWidth/5, windowHeight/4);
  normalButton.onOutside = function () {
    this.color = "#FFFFFF";
  };
  normalButton.onHover = function () {
    this.color = "#00A6FB";
  };
  normalButton.onPress = function () {
    screenState === "gameScreen";
    gameMusic.play();
    resetGame();
  };

  let startLocate = windowWidth/2-windowWidth/10;
  let startLocate2 = windowHeight/2+windowHeight/8;
  restartButton = new Clickable();
  restartButton.cornerRadius = 10;
  restartButton.textScaled = true;
  restartButton.text = "Restart";
  restartButton.locate(startLocate, startLocate2);
  restartButton.resize(windowWidth/5, windowHeight/4);
  restartButton.onOutside = function () {
    this.color = "#FFFFFF";
  };
  restartButton.onHover = function () {
    this.color = "#00A6FB";
  };
  restartButton.onPress = function () {
    screenState = "startScreen";
    
  };
}

function draw() {
  startGame();

} 


// function endGame() {
//   let musicTimer = 151200;
//   if (millis() > gameStart + musicTimer) {
//     gameStart = millis();
//     screenState = "endScreen";
//   }
// }


function startGame() { //Different Screens
  if (screenState === "startScreen") {
    startBackGround();
  }
  else if (screenState === "gameScreen") {
    gameBackGround();
    spawnTiles();
    let musicTimer = 151200;
    if (millis() > gameStart + musicTimer) {
      gameStart = millis();
      screenState = "endScreen";
      console.log("here");
    }
  }
  else if (screenState === "endScreen") {
    endBackGround();
  }
  else if (screenState === "levelScreen"){
    levelBackground();
    infoPopUp();
  }
  
}

function resetGame() { // start new game
  missRate = 0;
  hitRate = 0;
  for (let i = lineOne.length - 1; i >= 0; i--) {
    if(lineOne[i].onScreen()) {
      lineOne.splice(i, 1);
    }
  }
  for (let i = lineTwo.length - 1; i >= 0; i--) {
    if(lineTwo[i].onScreen()) {
      lineTwo.splice(i, 1);
    }
  }
  for (let i = lineThree.length - 1; i >= 0; i--) {
    if(lineThree[i].onScreen()) {
      lineThree.splice(i, 1);
    }
  }
  for (let i = lineFour.length - 1; i >= 0; i--) {
    if(lineFour[i].onScreen()) {
      lineFour.splice(i, 1);
    }
  }
  for (let i = lineFive.length - 1; i >= 0; i--) {
    if(lineFive[i].onScreen()) {
      lineFive.splice(i, 1);
    }
  }
}

function spawnTiles() {
  //Radomized when to spawn blocks
  spawnBlocks = random(500, 2000);
  spawnBlocks2 = random(500, 2000);
  spawnBlocks3 = random(500, 2000);
  spawnBlocks4 = random(500, 2000);
  spawnBlocks5 = random(500, 2000);

  //Spawning blocks
  if (millis() > lastSpawned + spawnBlocks) {
    lastSpawned = millis();
    let theBlocks = new FallingBlocks(windowWidth/7*1+5, 0);
    lineOne.push(theBlocks);
  }
  
  if (millis() > lastSpawned + spawnBlocks2) {
    lastSpawned = millis();
    let blockTwo = new FallingBlocks(windowWidth/7*2+5, 0);
    lineTwo.push(blockTwo);
  }
  
  if (millis() > lastSpawned + spawnBlocks3) {
    lastSpawned = millis();
    let blockThree = new FallingBlocks(windowWidth/7*3+5, 0);
    lineThree.push(blockThree);
  }
  
  if (millis() > lastSpawned + spawnBlocks4) {
    lastSpawned = millis();
    let blockFour = new FallingBlocks(windowWidth/7*4+5, 0);
    lineFour.push(blockFour);
  }
  
  if (millis() > lastSpawned + spawnBlocks5) {
    lastSpawned = millis();
    let blockFive = new FallingBlocks(windowWidth/7*5+5, 0);
    lineFive.push(blockFive);
  }

  //Deleting and updating tiles
  for (let i = lineOne.length - 1; i >= 0; i--) {
    if (lineOne[i].outsideScreen()) {
      lineOne.splice(i,1);
      missRate++;
    }
    else {
      for (let tileOne of lineOne) {
        tileOne.update();
        tileOne.display();
      }
    }
  }

  for (let i = lineTwo.length - 1; i >= 0; i--) {
    if (lineTwo[i].outsideScreen()) {
      lineTwo.splice(i,1);
      missRate++;
    }
    else {
      for (let tileTwo of lineTwo) {
        tileTwo.update();
        tileTwo.display();
      }
    }
  }

  for (let i = lineThree.length - 1; i >= 0; i--) {
    if (lineThree[i].outsideScreen()) {
      lineThree.splice(i,1);
      missRate++;
    }
    else {
      for (let tileThree of lineThree) {
        tileThree.update();
        tileThree.display();
      }
    }
  }

  for (let i = lineFour.length - 1; i >= 0; i--) {
    if (lineFour[i].outsideScreen()) {
      lineFour.splice(i,1);
      missRate++;
    }
    else {
      for (let tileFour of lineFour) {
        tileFour.update();
        tileFour.display();
      }
    }
  }

  for (let i = lineFive.length - 1; i >= 0; i--) {
    if (lineFive[i].outsideScreen()) {
      lineFive.splice(i,1);
      missRate++;
    }
    else {
      for (let tileFive of lineFive) {
        tileFive.update();
        tileFive.display();
      }
    }
  }

  
}

function gameBackGround() { //game background
  image(bg, 0, 0, windowWidth, windowHeight);
  drawingContext.shadowBlur = 15; 
  drawingContext.shadowColor= color("black");
  stroke("blue");
  strokeWeight(windowWidth/130);
  line(windowWidth/7, windowHeight/5*4, windowWidth/7*6, windowHeight/5*4);
  stroke("blue");
  strokeWeight(windowWidth/130);
  for (let n = 1; n < 7; n++) {
    line(windowWidth/7*n, 0, windowWidth/7*n, windowHeight);
  }
  scoreBoard();
}

function scoreBoard() {
  noStroke();
  textSize(windowWidth/40);
  textAlign(CENTER, CENTER);
  fill("blue");
  text("Hit: " + hitRate, width/11*10, height/8);
  text("Miss: " + missRate, width/11*10, height/8+40);
}

function startBackGround() { //Start background
  image(startBG, 0, 0, windowWidth, windowHeight);
  textSize(50);
  textAlign(CENTER, CENTER);
  fill("white");
  text("Rhythm Game", width/2, height/3);
  text("Click Anywhere to START", width/2, height/2);
}

function endBackGround() { //End Background
  image(endBG, 0, 0, windowWidth, windowHeight);
  let hitText = hitRate;
  let missText = missRate;
  textSize(30);
  textAlign(CENTER, CENTER);
  fill("white");
  text("Hit Rate: " + hitText + "   Miss Rate: " + missText, width/2, height/2);
  gameMusic.stop();
  restartButton.draw();
}

function levelBackground() { // Level and info Background
  image(levelBG, 0, 0, windowWidth, windowHeight);

  rectMode(CENTER);
  fill("gray");
  rect(windowWidth/4*3, windowHeight/2, windowWidth/5, windowHeight/4);
  textSize(30);
  textAlign(CENTER, CENTER);
  fill("black");
  text("HARD", windowWidth/4*3, windowHeight/2);
  
  //make the button fits ?????
  rectMode(CORNER);

  //info button
  myButton.draw();
  normalButton.draw();
  
  
}

function infoPopUp() {  //How to play screen
  if (popUpState === "true") {
    
    image(infoScreen, windowWidth/4, windowHeight/4, windowWidth/2, windowHeight/2);
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(224, 118, 252);
    text("Press key 'a' 's' 'd' f' 'g' to delete the tiles!", windowWidth/2, windowHeight/2);
    text("Press the keys when tiles are on the line!", windowWidth/2, windowHeight/2.5);
  }
  
}

class FallingBlocks { //'Notes' falling over line
  constructor(x, y) {
    this.speed = random(5);
    this.width = windowWidth/7-windowWidth/130;
    this.height = windowHeight/10;
    this.x = x;
    this.y = y;
    this.dy = 5;
    this.color = color("white");
    this.glow = color("blue");
  }

  display() {
    noStroke();
    fill(this.color);
    drawingContext.shadowBlur = 32; //should make the tiles glow
    drawingContext.shadowColor= this.glow;
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
    
  }

  update() {
    this.move();
    this.outsideScreen();
    this.onLine();
    this.offLine();
    this.onScreen();
  }

  move() { //move tiles downward
    this.y += this.dy;
  }

  outsideScreen() {
    return this.y > windowHeight;
  }

  onLine() {
    if (this.y > windowHeight/5*4 - this.height && this.y <= windowHeight/5*4) {
      return true;
    }
    else {
      return false;
    }
  }

  offLine() {
    if (this.y > windowHeight/5*4 + windowWidth/130) {
      this.color = color(191, 219, 247);
      this.glow = color(2, 43, 58);
    }
  }

  onScreen() {
    if (this.y > 0) {
      return true;
    }
    else {
      return false;
    }
  }
}


function mouseClicked() {
  if (screenState === "startScreen") {
    screenState = "levelScreen";
  }
  
  else if (screenState === "gameScreen") {
    screenState = "endScreen";
    
  }
  
}

function keyPressed() { //pressed keys to delete tile over line
  if (key === "a") {
    for (let i = lineOne.length - 1; i >= 0; i--) {
      if (lineOne[i].onLine()) {
        lineOne.splice(i,1);
        hitRate++;
      }
    }

    console.log("pressed a");
  }
  else if (key === "s") {
    for (let i = lineTwo.length - 1; i >= 0; i--) {
      if (lineTwo[i].onLine()) {
        lineTwo.splice(i,1);
        hitRate++;
      }
    }
    console.log("pressed s");
  }
  else if (key === "d") {
    for (let i = lineThree.length - 1; i >= 0; i--) {
      if (lineThree[i].onLine()) {
        lineThree.splice(i,1);
        hitRate++;
      }
    }
    console.log("pressed d");
  }
  else if (key === "f") {
    for (let i = lineFour.length - 1; i >= 0; i--) {
      if (lineFour[i].onLine()) {
        lineFour.splice(i,1);
        hitRate++;
      }
    }
    console.log("pressed f");
  }
  else if (key === "g") {
    for (let i = lineFive.length - 1; i >= 0; i--) {
      if (lineFive[i].onLine()) {
        lineFive.splice(i,1);
        hitRate++;
      }
    }
    console.log("pressed g");
  }
}




