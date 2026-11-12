import './style.css'


import grass0 from './assets/grass_0.png';
import grass1 from './assets/grass_1.png';
import applePng from './assets/apple.png';
import headRight from './assets/head_right.png';
import headLeft from './assets/head_left.png';
import headUp from './assets/head_up.png';
import headDown from './assets/head_down.png';
import tailRight from './assets/tail_right.png'
import tailLeft from './assets/tail_left.png'
import tailUp from './assets/tail_up.png';
import tailDown from './assets/tail_down.png'


import bodyHor from './assets/body_horizontal.png'
import bodyVer from './assets/body_vertical.png'
import bodyTR from './assets/body_topright.png'
import bodyTL from './assets/body_topleft.png'
import bodyBR from './assets/body_bottomright.png'
import bodyBL from './assets/body_bottomleft.png'

const theCanvas = document.getElementById("theCanvas");
const context = theCanvas.getContext("2d");
const popup = document.querySelector('#popup');
const popupText = document.querySelector('#popupText')
const background = document.querySelector('#background');


const SNAKE_SIZE = 40;
let speed = 250;
let snakeDirection = 'ArrowRight';
const snakeHeads = [];
const snakeBodies = [];
const snakeTails = []
const snakeSquares = [];
const bufferedInputs = [];

let gameOver = false;
const emptySquares = new Set();
let apple;
const appleImg = new Image()
let isPaused = false;
loadSnakeHeads();
loadSnakeBodies();
loadSnakeTails();
loadAppleImg();

function sizeCanvas() {
  theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
  theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
  // theCanvas.width = 4  * SNAKE_SIZE;
  // theCanvas.height = 4* SNAKE_SIZE
  console.log(`the canvas size width: ${theCanvas.width}, height: ${theCanvas.height}`)
}
sizeCanvas();
window.addEventListener("resize", sizeCanvas);
let snakeHead = snakeHeads[0];

let x = SNAKE_SIZE * 2;
let y = 0;
//let direction = 'ArrowRight';
let score = 0;
loadBackground()
fillEmptySquares();

snakeSquares.unshift(new snakeSquare(x - (SNAKE_SIZE * 2), y, snakeTails[1]));
emptySquares.delete(`${x - (SNAKE_SIZE * 2)}y${y}`);
snakeSquares.unshift(new snakeSquare(x - SNAKE_SIZE, y, snakeBodies[0]));
emptySquares.delete(`${x - SNAKE_SIZE}y${y}`);
snakeSquares.unshift(new snakeSquare(x, y, snakeHead));
emptySquares.delete(`${x}y${y}`);
apple = addApple();
context.drawImage(appleImg, apple.x, apple.y);
console.log(snakeSquares);
const delay = ms => new Promise(res => setTimeout(res, ms));
await delay(1000)
snakeSquares.forEach(square => {
  context.drawImage(square.img, square.x, square.y)
  console.log('drawing at x: ' + square.x + ' y: ' + square.y);
})




function loadBackground() {
  let img0;
  let k = true;
  for (let i = 0; i < theCanvas.width / SNAKE_SIZE; i++) {

    img0 = k;
    k = !k
    for (let j = 0; j < theCanvas.height / SNAKE_SIZE; j++) {
      const img = document.createElement('img');
      if (img0) {
        img.src = grass0
      }
      else {
        img.src = grass1;
      }
      img0 = !img0
      img.style.position = 'absolute';
      img.style.left = `${i * SNAKE_SIZE}px`;
      img.style.top = `${j * SNAKE_SIZE}px`;
      img.style.zIndex = '0'
      background.appendChild(img);
    }
  }


}

function fillEmptySquares() {
  for (let i = 0; i < theCanvas.width / SNAKE_SIZE; i++) {
    for (let j = 0; j < theCanvas.height / SNAKE_SIZE; j++) {
      emptySquares.add(`${i}y${j}`);
    }
  }
}

function loadAppleImg() {
  appleImg.src = applePng;
}
function loadSnakeHeads() {

  const i1 = new Image();
  i1.src = headRight;
  const i2 = new Image();
  i2.src = headLeft;
  const i3 = new Image();
  i3.src = headUp;
  const i4 = new Image();
  i4.src = headDown
  snakeHeads.push(i1, i2, i3, i4);
}
function loadSnakeTails() {

  const i1 = new Image();
  i1.src = tailRight;
  const i2 = new Image();
  i2.src = tailLeft;
  const i3 = new Image();
  i3.src = tailUp;
  const i4 = new Image();
  i4.src = tailDown;
  snakeTails.push(i1, i2, i3, i4);
}
function loadSnakeBodies() {

  const i1 = new Image();
  i1.src = bodyHor;
  const i2 = new Image();
  i2.src = bodyVer;
  const i3 = new Image();
  i3.src = bodyTR;
  const i4 = new Image();
  i4.src = bodyTL;
  const i5 = new Image();
  i5.src = bodyBR;
  const i6 = new Image();
  i6.src = bodyBL;
  snakeBodies.push(i1, i2, i3, i4, i5, i6);


}
const intervalF = function () {
  if (!isPaused) {
    //console.log(isPaused)
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    if (bufferedInputs.length >= 1) {
      snakeDirection = bufferedInputs.shift()
    }
    switch (snakeDirection) {
      case 'ArrowUp':
        y -= SNAKE_SIZE;
        snakeHead = snakeHeads[2]
        break;
      case 'ArrowDown':
        y += SNAKE_SIZE
        snakeHead = snakeHeads[3]
        break;
      case 'ArrowLeft':
        x -= SNAKE_SIZE;
        snakeHead = snakeHeads[1]
        break;
      case 'ArrowRight':
        x += SNAKE_SIZE;
        snakeHead = snakeHeads[0]
        break;

    }
    snakeSquares.unshift(new snakeSquare(x, y, snakeHead));
    emptySquares.delete(`${x / SNAKE_SIZE}y${y / SNAKE_SIZE}`);
    console.log('removing x: ' + x / SNAKE_SIZE + ' y: ' + y / SNAKE_SIZE);

    if (!(apple.x === x & apple.y === y)) {
      const tail = snakeSquares.pop();
      //if(!(tail.x / SNAKE_SIZE < 0 | tail.y /SNAKE_SIZE < 0)){
      emptySquares.add(`${tail.x / SNAKE_SIZE}y${tail.y / SNAKE_SIZE}`)
      console.log('removing x: ' + tail.x / SNAKE_SIZE + ' y: ' + tail.y / SNAKE_SIZE)
      // }


    }

    calculate2ndimg(snakeSquares[0], snakeSquares[1], snakeSquares[2]);
    //snakeSquares[snakeSquares.length-1].img = snakeTails[1];
    calculatetailimg(snakeSquares[snakeSquares.length - 2], snakeSquares[snakeSquares.length - 1])
    snakeSquares.forEach(square => {
      context.drawImage(square.img, square.x, square.y)
    })
    if (apple.x === x & apple.y === y) {
      score += 5;
      if (score % 50 === 0) {
        if (speed > 50) {
          speed = speed / .9
          clearInterval(interval)
          interval = setInterval(intervalF, speed);
        }
      }
      apple = addApple();
    }
    if (!apple) {
      return;
    }
    context.drawImage(appleImg, apple.x, apple.y)

    
    //snakeDirection = direction;
    //context.drawImage(snakeHead, x, y);
    context.fillStyle = "blue";
    context.font = "32px Cursive";
    const scoreText = `score: ${score}`;
    const metrics = context.measureText(scoreText);
    context.fillText(scoreText, (theCanvas.width - metrics.width) - 10, 36);
    if (calculateSelfHit(snakeSquares[0]) | calculateWallHil(snakeSquares[0])) {
      gameOver = true;
      clearInterval(interval);
      popupText.textContent = `gameover! your score is ${score}`
      popup.style.visibility = 'visible'
      popup.style.zIndex = '1000'
      console.log(`gameover! your score is ${score}`)

    }
  }
}
let interval = setInterval(intervalF, speed)

function DrawGame() {
  console.log('draewing game');
  snakeSquares.forEach(square => {
    context.drawImage(square.img, square.x, square.y)
  });
  context.drawImage(appleImg, apple.x, apple.y);
  context.fillStyle = "green";
  context.font = "32px Cursive";
  const scoreText = `score: ${score}`;
  const metrics = context.measureText(scoreText);
  context.fillText(scoreText, (theCanvas.width - metrics.width) - 10, 36);
  //requestAnimationFrame(DrawGame)
}

//requestAnimationFrame(DrawGame);

window.addEventListener("keydown", e => {
  console.log(e.key)
  if (e.key === ' ') {
    isPaused = !isPaused
    return
  }
  if (bufferedInputs.length >= 2) {
    return;
  }
  let prevDir;
  if (bufferedInputs.length >= 1) {
    prevDir = bufferedInputs[0];
  }
  else {
    console.log('no buffered');
    prevDir = snakeDirection
  }
  if (((prevDir === 'ArrowRight' || prevDir === 'ArrowLeft') && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) ||
    ((prevDir === 'ArrowDown' || prevDir === 'ArrowUp') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft'))) {
    bufferedInputs.push(e.key)
    //direction = e.key;

    // switch (e.key) {
    //     case 'ArrowRight':
    //         snakeHead = snakeHeads[0];
    //         break;
    //     case 'ArrowLeft':
    //         snakeHead = snakeHeads[1];
    //         break;
    //     case 'ArrowUp':
    //         snakeHead = snakeHeads[2];
    //         break;
    //     case 'ArrowDown':
    //         snakeHead = snakeHeads[3];
    //         break;
    // }
    //console.log(snakeHead.src)
  }
  else {
    console.log("Invalid key pressed");
  }
})

function snakeSquare(x, y, img) {
  return {
    x: x,
    y: y,
    img: img

  }
}
function calculate2ndimg(head, second, third) {
  if (head.x === third.x) {
    second.img = snakeBodies[1]
  }
  else if (head.y === third.y) {
    second.img = snakeBodies[0];
  }

  else if (second.y * 2 < head.y + third.y & second.x * 2 > head.x + third.x) {

    second.img = snakeBodies[5];
  }
  else if (second.y * 2 < head.y + third.y & second.x * 2 < head.x + third.x) {
    second.img = snakeBodies[4];
  }
  else if (second.y * 2 > head.y + third.y & second.x * 2 > head.x + third.x) {
    second.img = snakeBodies[3];

  }
  else if (second.y * 2 > head.y + third.y & second.x * 2 < head.x + third.x) {
    second.img = snakeBodies[2];

  }
  else {
    throw new Error('somethings wrong by calculate2ndimg')
  }
}
function calculatetailimg(second2last, tail) {
  if (second2last.x === tail.x) {
    if (second2last.y > tail.y) {
      tail.img = snakeTails[2];
    }
    else {
      tail.img = snakeTails[3];
    }
  }
  else if (second2last.x > tail.x) {
    tail.img = snakeTails[1];
  }
  else {
    tail.img = snakeTails[0];

  }
}
function calculateSelfHit(head) {
  //console.log(head.x + ' ' + head.y)
  for (let i = 1; i < snakeSquares.length; i++) {
    //console.log(`head.x: ${head.x} head.y: ${head.y} i.x: ${snakeSquares[i].x} i.y: ${snakeSquares[i].y}`)
    if (head.x === snakeSquares[i].x & head.y === snakeSquares[i].y) {
      console.log('you hit yourself ');
      return true;
    }
  }
  return false;
}

function calculateWallHil(head) {
  //console.log(`head.x: ${head.x} head.y: ${head.y} canvas.width ${theCanvas.width} canvas.height ${theCanvas.height}`)
  if (head.x >= theCanvas.width | head.x < 0 | head.y >= theCanvas.height | head.y < 0) {
    return true;
  }
}
function addApple() {
  let appleSquare;
  if (emptySquares.size === 0) {
    clearInterval(interval);
    console.log(`you won!!`)
    return false;
  }

  const temp = Array.from(emptySquares);
  //console.log(temp)
  appleSquare = temp[Math.floor(Math.random() * (temp.length))];
  const coords = appleSquare.split('y');
  console.log(coords[0] + " " + coords[1])
  if ((parseInt(coords[0]) === undefined) | (parseInt(coords[1]) === undefined)) {
    throw new Error(`$ this ${coords[0]} or this ${coords[1]} is not a number`)
  }
  const a = { x: parseInt(coords[0]) * SNAKE_SIZE, y: parseInt(coords[1]) * SNAKE_SIZE };
  console.log(a);
  return a;



  //     let good = true;
  //     for (let i = 0; i < snakeSquares.length; i++) {
  //         if (appleX === snakeSquares[i].x & appleY === snakeSquares[i].y) {
  //             good = false;
  //             break;
  //         }

  //     }
  //     if (good) {
  //         break;
  //     }
  // }
  // return 

}