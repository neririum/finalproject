// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bg;
let blocks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let theBlocks = new FallingBlocks((windowWidth/7*1)+5, 0);
  blocks.push(theBlocks);
}

function draw() {
  backGround();

  for (let theBlock of blocks) {
    theBlock.update();
    theBlock.display();
  }
}

function preload() {
  bg = loadImage("background.jpg");
}

function backGround() {
  image(bg, 0, 0, windowWidth, windowHeight);
  stroke("blue");
  strokeWeight(10);
  line(windowWidth/7, windowHeight/5*4, windowWidth/7*6, windowHeight/5*4);
  for (let n = 1; n < 7; n++) {
    line(windowWidth/7*n, 0, windowWidth/7*n, windowHeight);
  }
}

class FallingBlocks {
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
}

function keyPressed() {
  if (key === 'a') {

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

function onTheLine(x, y) {
  //Is a rectangle on the line
  let rectAreaDistance = dist(x, y, x, 70); //distance of length of blocks
}