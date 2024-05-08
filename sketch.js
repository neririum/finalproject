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
  let theBlocks = new FallingBlocks(windowWidth/7*2, 0);
  blocks.push(theBlocks);
}

function draw() {
  backGround();
  blocks.move();
  blocks.display();
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
    this.width = windowWidth/7;
    this.height = 20;
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

  move() {
    this.y += this.dy;
    
  }
}
