const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let speed = .5;

let tileCount = 30;
let tileSize = canvas.width / tileCount - 1;
let headX = 15;
let headY = 15;

let xVel = 0;
let yVel = 0;

function runGame(){
    clearScreen();
    drawSnake();
    setTimeout(runGame, 1000/speed);
}

function clearScreen(){
    ctx.fillStyle="#A8E40A"
    ctx.fillRect(0,0,canvas.width,canvas.height)
}

function drawSnake(){
    ctx.fillStyle="darkslategray"
    ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize)
    ctx.fillStyle="lightslategray"

}

document.body.addEventListener("keydown", keyDown);

function keyDown(event){
    if (event.keycode == 38){
        
    }
}

runGame();