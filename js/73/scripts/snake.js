const theCanvas = document.getElementById("theCanvas");
const context = theCanvas.getContext("2d");
const popup = document.querySelector('#popup');


const SNAKE_SIZE = 40;
const speed = 250;
let snakeDirection = 'ArrowRight';
const snakeHeads = [];
const snakeBodies = [];
const snakeTails = []
const snakeSquares = [];

let gameOver = false;
const emptySquares = new Set();
let apple;
const appleImg = new Image()
let isPaused = false;
loadSnakeHeads();
loadSnakeBodies();
loadSnakeTails();
loadAppleImg()

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

let x = SNAKE_SIZE;
let y = 0;
let direction = 'ArrowRight';
let score = 0;

fillEmptySquares()

snakeSquares.unshift(new snakeSquare(x - (SNAKE_SIZE * 2), y, snakeTails[0]));
emptySquares.delete(`${x - (SNAKE_SIZE * 2)}y${y}`);
snakeSquares.unshift(new snakeSquare(x - SNAKE_SIZE, y, snakeBodies[0]));
emptySquares.delete(`${x - SNAKE_SIZE}y${y}`);
snakeSquares.unshift(new snakeSquare(x, y, snakeHead));
emptySquares.delete(`${x}y${y}`);
apple = addApple();
context.drawImage(appleImg, apple.x, apple.y)



function fillEmptySquares() {
    for (let i = 0; i < theCanvas.width / SNAKE_SIZE; i++) {
        for (let j = 0; j < theCanvas.height / SNAKE_SIZE; j++) {
            emptySquares.add(`${j}y${i}`);
        }
    }
}

function loadAppleImg() {
    appleImg.src = 'assets/apple.png'
}
function loadSnakeHeads() {

    const i1 = new Image()
    i1.src = 'assets/head_right.png'
    const i2 = new Image()
    i2.src = 'assets/head_left.png'
    const i3 = new Image()
    i3.src = 'assets/head_up.png'
    const i4 = new Image();
    i4.src = 'assets/head_down.png'
    snakeHeads.push(i1, i2, i3, i4);
}
function loadSnakeTails() {

    const i1 = new Image()
    i1.src = 'assets/tail_right.png'
    const i2 = new Image()
    i2.src = 'assets/tail_left.png'
    const i3 = new Image()
    i3.src = 'assets/tail_up.png'
    const i4 = new Image();
    i4.src = 'assets/tail_down.png'
    snakeTails.push(i1, i2, i3, i4);
}
function loadSnakeBodies() {

    const i1 = new Image()
    i1.src = 'assets/body_horizontal.png'
    const i2 = new Image()
    i2.src = 'assets/body_vertical.png'
    const i3 = new Image()
    i3.src = 'assets/body_topright.png'
    const i4 = new Image();
    i4.src = 'assets/body_topleft.png'
    const i5 = new Image()
    i5.src = 'assets/body_bottomright.png'
    const i6 = new Image();
    i6.src = 'assets/body_bottomleft.png'
    snakeBodies.push(i1, i2, i3, i4, i5, i6);


}
const interval = setInterval(function () {
    if (!isPaused) {
        //console.log(isPaused)
        context.clearRect(0, 0, theCanvas.width, theCanvas.height);
        switch (direction) {
            case 'ArrowUp':
                y -= SNAKE_SIZE;
                break;
            case 'ArrowDown':
                y += SNAKE_SIZE
                break;
            case 'ArrowLeft':
                x -= SNAKE_SIZE;
                break;
            case 'ArrowRight':
                x += SNAKE_SIZE;
                break;

        }
        snakeSquares.unshift(new snakeSquare(x, y, snakeHead));
        emptySquares.delete(`${x / SNAKE_SIZE}y${y / SNAKE_SIZE}`);
        console.log('removing x: ' + x / SNAKE_SIZE + ' y: ' + y / SNAKE_SIZE);
        //snakeSquares[1].img = snakeBodies[0];

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
        if(apple.x === x & apple.y === y){
                    score += 5;
            apple = addApple();
        }
                    if(!apple){
                return;
            }
        context.drawImage(appleImg, apple.x, apple.y)
        if( calculateSelfHit(snakeSquares[0]) | calculateWallHil(snakeSquares[0])){
            gameOver = true;
            clearInterval(interval);
            popup.textContent = `gameover! your score is ${score}`
            popup.style.visiblity = 'visible'
            console.log(`gameover! your score is ${score}`)

        }
        //add renove interval and popup
        snakeDirection = direction;
        //context.drawImage(snakeHead, x, y);
        context.fillStyle = "green";
        context.font = "32px Cursive";
        const scoreText = `score: ${score}`;
        const metrics = context.measureText(scoreText);
        context.fillText(scoreText, (theCanvas.width - metrics.width) - 10, 36);
    }
}, speed)


window.addEventListener("keydown", e => {
    console.log(e.key)
    if (e.key === ' ') {
        isPaused = !isPaused
        return
    }
    if (((snakeDirection === 'ArrowRight' || snakeDirection === 'ArrowLeft') && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) ||
        ((snakeDirection === 'ArrowDown' || snakeDirection === 'ArrowUp') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft'))) {
        direction = e.key;

        switch (direction) {
            case 'ArrowRight':
                snakeHead = snakeHeads[0];
                break;
            case 'ArrowLeft':
                snakeHead = snakeHeads[1];
                break;
            case 'ArrowUp':
                snakeHead = snakeHeads[2];
                break;
            case 'ArrowDown':
                snakeHead = snakeHeads[3];
                break;
        }
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
            return true;
        }
    }
    return false;
}

function calculateWallHil(head){
    //console.log(`head.x: ${head.x} head.y: ${head.y} canvas.width ${theCanvas.width} canvas.height ${theCanvas.height}`)
    if(head.x >= theCanvas.width | head.x < 0 | head.y >= theCanvas.height | head.y < 0){
        return true;
    }
}
function addApple() {
    let appleSquare;
    if(emptySquares.size === 0){
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
    return { x: parseInt(coords[1]) * SNAKE_SIZE, y: parseInt(coords[0]) * SNAKE_SIZE }



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