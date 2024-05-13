// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bg;
let blocks = [];
let spawnBlocks;
// let spawnBlocks5;
// let spawnBlocks2;
// let spawnBlocks3;
// let spawnBlocks4;
let lastSpawned = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBlocks = random(500, 2000);
}

function draw() {
  backGround();
  if (millis() > lastSpawned + spawnBlocks) {
    for (let column = 1; column <= 5; column++) {
      let theBlocks = new FallingBlocks((windowWidth/7*column)+5, 0);
      blocks.push(theBlocks);
      lastSpawned = millis();
      spawnBlocks = random(500, 2000); // put this into a class/function to randomized where it spawn
    }
  }
  // spawnBlocks2 = random(500, 2000);
  // spawnBlocks3 = random(500, 2000);
  // spawnBlocks4 = random(500, 2000);
  // spawnBlocks5 = random(500, 2000);

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

  if (millis() > lastSpawned + spawnBlocks) {
    lastSpawned = millis();
    let theBlocks = new FallingBlocks((windowWidth/7*1)+5, 0);
    blocks.push(theBlocks);
  }

  // if (millis() > lastSpawned + spawnBlocks2) {
  //   lastSpawned = millis();
  //   let blockTwo = new FallingBlocks((windowWidth/7*2)+5, 0);
  //   blocks.push(blockTwo);
  // }

  // if (millis() > lastSpawned + spawnBlocks3) {
  //   lastSpawned = millis();
  //   let blockThree = new FallingBlocks((windowWidth/7*3)+5, 0);
  //   blocks.push(blockThree);
  // }

  // if (millis() > lastSpawned + spawnBlocks4) {
  //   lastSpawned = millis();
  //   let blockFour = new FallingBlocks((windowWidth/7*4)+5, 0);
  //   blocks.push(blockFour);
  // }

  // if (millis() > lastSpawned + spawnBlocks5) {
  //   lastSpawned = millis();
  //   let blockFive = new FallingBlocks((windowWidth/7*5)+5, 0);
  //   blocks.push(blockFive);
  // }

  for (let theBlock of blocks) {
    theBlock.update();
    theBlock.display();
  }
  // for (let blockTwo of blocks) {
  //   blockTwo.update();
  //   blockTwo.display();
  // }
  // for (let blockThree of blocks) {
  //   blockThree.update();
  //   blockThree.display();
  // }
  // for (let blockFour of blocks) {
  //   blockFour.update();
  //   blockFour.display();
  // }
  // for (let blockFive of blocks) {
  //   blockFive.update();
  //   blockFive.display();
  // }
}

function preload() {
  bg = loadImage("background.jpg");
}

function backGround() { //background of game
  image(bg, 0, 0, windowWidth, windowHeight);
  stroke("blue");
  strokeWeight(10);
  line(windowWidth/7, windowHeight/5*4, windowWidth/7*6, windowHeight/5*4);
  for (let n = 1; n < 7; n++) {
    line(windowWidth/7*n, 0, windowWidth/7*n, windowHeight);
  }
}

class FallingBlocks { //'Notes' falling over line
  constructor(x, y) {
    this.speed = random(5);
    this.width = windowWidth/7-10;
    this.height = 70;
    this.x = x;
    this.y = y;
    this.dy = 5;
    this.color = color("white");
  }

  display() {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.move();
  }

  move() {
    this.y += this.dy;
  }

  spawn() {

  }
}

function keyPressed() {
  if (key === 'a') {
    // for (let i = blocks.length - 1; i >= 0; i--) {
    //   if (onTheLine(windowWidth/7, windowHeight/5*4, blocks[i])){
    //     blocks.splice(i,1);
    //   }
    // }
    console.log("pressed a");
  }
  else if (key === 's') {
    console.log("pressed s");
  }
  else if (key === 'd') {
    console.log("pressed d");
  }
  else if (key === 'f') {
    console.log("pressed f");
  }
  else if (key === 'g') {
    console.log("pressed g");
  }
}

// function onTheLine(x, y, theLine) {
//   //Is a rectangle on the line
//   let rectAreaDistance = dist(x, y, x, 70); //distance of length of blocks
//   let linePoint = theLine; 
//   if (rectAreaDistance )
// }