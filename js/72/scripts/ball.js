const theCanvas = document.querySelector("#theCanvas");

const context = theCanvas.getContext('2d');
const addRandom = document.querySelector("#addRandom");
const addBall = document.querySelector("#addBall");
const colorPicker = document.querySelector("#colorPicker");
const range = document.querySelector("#size");
const clear = document.querySelector("#clear")
const checkbox = document.querySelector('#checkbox');
const addDvd = document.querySelector('#addDvd');




theCanvas.width = theCanvas.clientWidth;
theCanvas.height = theCanvas.clientHeight;

const logoImages = [];
for(let n = 1; n<= 7;n++){
    const img = new Image()
    img.src = `images/dvdlogo-0${n}.svg`
    logoImages.push(img)
}

let balls = [];
let logos = []

addRandom.addEventListener("click", () =>{
    new ball(Math.floor(Math.random() * 150), GetRandomrgbColor(), checkbox.checked)
});
addBall.addEventListener('click', () =>{new ball(Number(range.value), colorPicker.value, checkbox.value)});

addDvd.addEventListener('click', () =>{
    new dvdLogo(checkbox.checked)
})

clear.addEventListener('click', () =>{
    balls.length = 0;
    logos.length = 0;
})


function GetRandomrgbColor(){
    let r = GetrgbPart();
    let g = GetrgbPart();
    let b = GetrgbPart();
    return `rgb(${r}, ${g}, ${b})`;
}
function GetrgbPart(){
    return Math.floor(Math.random() * 256);
}
function game(timestamp) {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    balls.forEach (ball =>{
        ball.move(timestamp)
    });
    logos.forEach (logo =>{
        logo.move(timestamp);
    })
    


    requestAnimationFrame(game)
}
requestAnimationFrame(game)

class ball /*extends bouncer*/{
    speed = 200;
    lastTime = null;
    constructor(radius, color, change) {
        //super();
        
        balls.push(this)
        this.radius = radius;
        this.color = color;
        this.change = change;
        this.x = Math.random() * (theCanvas.width - radius * 2) + radius;
        this.y = Math.random() * (theCanvas.height - radius * 2) + radius;
        console.log(`made new ball radius ${this.radius}, color ${this.color}`)
    }
    dx = 1;
    dy = 2;
    move(timestamp) {


        if(this.lastTime === null){
            this.lastTime = timestamp;
        }
        const dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        this.x += this.dx * (dt * this.speed);
        this.y += this.dy * (dt * this.speed);
        if (this.x < (this.radius + 1) || (this.x + this.radius) >= theCanvas.width) {
            this.dx = -this.dx;
            if(this.change){
            this.color = GetRandomrgbColor();
            }
        }
        if (this.y < (this.radius + 1) || this.y + this.radius >= theCanvas.height) {
            this.dy = -this.dy;
            if(this.change){
            this.color = GetRandomrgbColor();
            }
        }
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();

    }
}

class dvdLogo /*extends bouncer*/{
    path = 'images/dvdlogo-01.svg'
    i = 0;
    dx = 1;
    dy = 2;
    speed = 200;
    lastTime = null;
    a = 0;
    /**
     *
     */
    constructor(change) {
       this.change = change;
         const img = new Image();
        img.src = this.path;
        this.img = logoImages[this.i];
        this.w = this.img.naturalWidth / 2;
        this.h = this.img.naturalHeight / 2;

        
        this.x = Math.random() * (theCanvas.width - this.w);
        this.y = Math.random() * (theCanvas.height - this.h);
        logos.push(this);
        
        

    }
    move(timestamp){
        if(this.lastTime === null){
            this.lastTime = timestamp;
        }
        const dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        


        let hit = false;
       this.x += this.dx * (dt * this.speed);
        this.y += this.dy * (dt * this.speed);
        if (this.x <= 0 || (this.x + this.w) >= theCanvas.width) {
            this.dx = -this.dx;
            hit = true;
        }
        if (this.y <= 0 || (this.y + this.h) >= theCanvas.height) {
            this.dy = -this.dy;
            hit = true;
        }
        if(hit){
            if(this.change){
                this.i = (this.i +1) % logoImages.length
            this.img = logoImages[this.i]    
            }
        }
        context.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
    
}

// class bouncer{
//     /**
//      *
//      */
//     constructor(change) {
//         this.change = change;
        
//     }
    
// }
