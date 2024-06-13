// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bg;
let startBG;
let endBG;
let levelBG;
let infoScreen;
//let animatedBG;
let blocks = [];
let spawnBlocks;
let spawnBlocks5;
let spawnBlocks2;
let spawnBlocks3;
let spawnBlocks4;
let lastSpawned = 0;
let missRate = 0;
let hitRate = 0;
let screenState ="startScreen";
let gameMusic;
let musicTimer = 3000;
let myButton;
//151200;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //animatedBG.hide();
}

function draw() {
  startGame();
  
} 

function startGame() {
  if (screenState === "startScreen") {
    startBackGround();
  }
  else if (screenState === "gameScreen") {
    gameBackGround();
    spawnTiles();

  }
  else if (screenState === "endScreen") {
    endBackGround();
  }
  else if (screenState === "levelScreen"){
    levelBackground();
    
  };
  
}

function spawnTiles() {
  spawnBlocks = random(500, 2000);
  spawnBlocks2 = random(500, 2000);
  spawnBlocks3 = random(500, 2000);
  spawnBlocks4 = random(500, 2000);
  spawnBlocks5 = random(500, 2000);

  if (millis() > lastSpawned + spawnBlocks) {
    lastSpawned = millis();
    let theBlocks = new FallingBlocks(windowWidth/7*1+5, 0);
    blocks.push(theBlocks);
  }
  
  if (millis() > lastSpawned + spawnBlocks2) {
    lastSpawned = millis();
    let blockTwo = new FallingBlocks(windowWidth/7*2+5, 0);
    blocks.push(blockTwo);
  }
  
  if (millis() > lastSpawned + spawnBlocks3) {
    lastSpawned = millis();
    let blockThree = new FallingBlocks(windowWidth/7*3+5, 0);
    blocks.push(blockThree);
  }
  
  if (millis() > lastSpawned + spawnBlocks4) {
    lastSpawned = millis();
    let blockFour = new FallingBlocks(windowWidth/7*4+5, 0);
    blocks.push(blockFour);
  }
  
  if (millis() > lastSpawned + spawnBlocks5) {
    lastSpawned = millis();
    let blockFive = new FallingBlocks(windowWidth/7*5+5, 0);
    blocks.push(blockFive);
  }
  for (let theTiles of blocks) {
    if(theTiles.outsideScreen()) {
      let index = blocks.indexOf(theTiles);
      blocks.splice(index, 1);
      missRate++;
      //This is what is causing the flickering 
    }
    else {
      theTiles.update();
      theTiles.display();
    }
  }

}

function preload() {
  bg = loadImage("cityScape.jpg");
  startBG = loadImage("startScreen.png");
  endBG = loadImage("endScreen.png");
  levelBG = loadImage("frame.jpg");
  gameMusic = loadSound("Creepy-Nuts.mp3");
  //animatedBG = createVideo("screen-record.mp4");
  infoScreen = loadImage("info-screen.png");
}

function gameBackGround() { //background of game
  image(bg, 0, 0, windowWidth, windowHeight);
  drawingContext.shadowBlur = 15; //should make the tiles glow
  drawingContext.shadowColor= color("black");
  stroke("blue");
  strokeWeight(windowWidth/130);
  line(windowWidth/7, windowHeight/5*4, windowWidth/7*6, windowHeight/5*4);
  stroke("blue");
  strokeWeight(windowWidth/130);
  for (let n = 1; n < 7; n++) {
    line(windowWidth/7*n, 0, windowWidth/7*n, windowHeight);
  }
}

function startBackGround() {
  image(startBG, 0, 0, windowWidth, windowHeight);
  textSize(50);
  textAlign(CENTER, CENTER);
  fill("white");
  text("Rhythm Game", width/2, height/3);
  text("Click Anywhere to START", width/2, height/2);
}

// function showAnimateBG() {
//   if (screenState === "gameScreen") {
    
//     animatedBG.play();
//     // animatedBG.loop();
//     let img = animatedBG.get();
//     image(img, 0, 0);
//     animatedBG.size(width, height);
//     animatedBG.showControls();
//   }
// }

function endBackGround() {
  image(endBG, 0, 0, windowWidth, windowHeight);
  let hitText = hitRate;
  let missText = missRate;
  textSize(30);
  textAlign(CENTER, CENTER);
  fill("white");
  text("Hit Rate: " + hitText + "   Miss Rate: " + missText, width/2, height/2);
}

function levelBackground() {
  image(levelBG, 0, 0, windowWidth, windowHeight);
  rectMode(CENTER);
  fill("white");
  rect(windowWidth/4, windowHeight/2, windowWidth/5, windowHeight/4);
  textSize(30);
  textAlign(CENTER, CENTER);
  fill("black");
  text("NORMAL", windowWidth/4, windowHeight/2);
  fill("gray");
  rect(windowWidth/4*3, windowHeight/2, windowWidth/5, windowHeight/4);
  textSize(30);
  textAlign(CENTER, CENTER);
  fill("black");
  text("HARD", windowWidth/4*3, windowHeight/2);


  //info button
  let buttonWidth = windowWidth/20;
  let buttonHeight = windowHeight/20;
  myButton = new Clickable();     //Create button
  myButton.locate(buttonWidth, buttonHeight); //Position Button
  myButton.resize(50, 50);
  myButton.color = color("white");
  myButton.text = "info";
  myButton.textColor = color("black");
  myButton.textSize = 10;
  myButton.onPress = function(){  //When myButton is pressed
    infoPopUp();
  }
  myButton.draw();
  myButton.onHover = function(){
    myButton.color = color("gray");
  }
  
}

function infoPopUp() {
  imageMode(CENTER);
  image(infoScreen, windowWidth/2, windowHeight/2, windowWidth/2, windowHeight/2);
  textSize(30);
  textAlign(CENTER, CENTER);
  fill("black");
  text("Press key 'a' 's' 'd' f' 'g' to delete the tiles!", windowWidth/2, windowHeight/2);
  text("Press the keys when tiles are on the line!", windowWidth/2, windowHeight/2.5);
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
      // textSize(30);
      // textAlign(CENTER, CENTER);
      // fill("white");
      // text("off line", width/2, height/2);
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

function resetGame() {
  // if (millis() > musicTimer) {
  //   screenState = "endScreen";
  //   musicTimer += millis();
  // }
  for (let i = blocks.length - 1; i >= 0; i--) {
    if(blocks[i].onScreen()) {
      blocks.splice(i, 1);
    }
    missRate = 0;
    hitRate = 0;
  }
}

function mouseClicked() {
  if (screenState === "startScreen") {
    screenState = "levelScreen";
  }
  if (screenState === "levelScreen") {
    if(mouseX > windowWidth/4-windowWidth/10 && mouseX < windowWidth/4+windowWidth/10) {
      if (mouseY > windowHeight/2-windowHeight/8 && mouseY < windowHeight/2+windowHeight/8) {
        screenState = "gameScreen";
        gameMusic.play();
        resetGame();
      }
    }
  }
  else if (screenState === "endScreen") {
    screenState = "startScreen";
  }
  else if (screenState === "gameScreen") {
    screenState = "endScreen";
    gameMusic.stop();
  }
  
}

function keyPressed() { //pressed keys to delete tile over line
  if (key === "a") {
    for (let i = blocks.length - 1; i >= 0; i--) {
      if (blocks[i].onLine()) {
        blocks.splice(i,1);
        hitRate++;
      }
    }

    console.log("pressed a");
  }
  else if (key === "s") {
    for (let i = blocks.length - 1; i >= 0; i--) {
      if (blocks[i].onLine()) {
        blocks.splice(i,1);
        hitRate++;
      }
    }
    console.log("pressed s");
  }
  else if (key === "d") {
    for (let i = blocks.length - 1; i >= 0; i--) {
      if (blocks[i].onLine()) {
        blocks.splice(i,1);
        hitRate++;
      }
    }
    console.log("pressed d");
  }
  else if (key === "f") {
    for (let i = blocks.length - 1; i >= 0; i--) {
      if (blocks[i].onLine()) {
        blocks.splice(i,1);
        hitRate++;
      }
    }
    console.log("pressed f");
  }
  else if (key === "g") {
    for (let i = blocks.length - 1; i >= 0; i--) {
      if (blocks[i].onLine()) {
        blocks.splice(i,1);
        hitRate++;
      }
    }
    console.log("pressed g");
  }
}



//FOR LATER

// if (millis() > lastSpawned + spawnBlocks) {
//   for (let column = 1; column <= 5; column++) {
//     let theBlocks = new FallingBlocks((windowWidth/7*column)+5, 0);
//     blocks.push(theBlocks);
//     lastSpawned = millis();
//     randomized(); // put this into a class/function to randomized where it spawn
//   }
// }

// if (millis() > lastSpawned + spawnBlocks) {
//   lastSpawned = millis();
//   let theBlocks = new FallingBlocks((windowWidth/7*1)+5, 0);
//   let blockTwo = new FallingBlocks((windowWidth/7*2)+5, 0);
//   let blockThree = new FallingBlocks((windowWidth/7*3)+5, 0);
//   let blockFour = new FallingBlocks((windowWidth/7*4)+5, 0);
//   let blockFive = new FallingBlocks((windowWidth/7*5)+5, 0);
//   blocks.push(theBlocks);
//   blocks.push(blockTwo);
//   blocks.push(blockThree);
//   blocks.push(blockFour);
//   blocks.push(blockFive);
// }

