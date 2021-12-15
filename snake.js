const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

// keys codes

// arrows
const LEFT_KEY_ARROW = 37;
const RIGHT_KEY_ARROW = 39;
const UP_KEY_ARROW = 38;
const DOWN_KEY_ARROW = 40;

//letters
const LEFT_KEY_A = 65;
const RIGHT_KEY_D = 68;
const UP_KEY_W = 87;
const DOWN_KEY_S = 83;
    
let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
]

let dx = 10;
let dy = 0;


// Get the canvas element
const snakeboard = document.getElementById("snakeboard");
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext("2d");
console.log(snakeboard_ctx)
// Start game

// main function called repeatedly to keep the game running
function main() {
    if(hasCollision()) return;
    setTimeout(onTick,100)
}

function onTick() {
    clearCanvas();
    moveSnake();
    drawSnake();
    main();
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}



// draw a border around the canvas
function clearCanvas() {
    //  Select the colour to fill the drawing
    snakeboard_ctx.fillStyle = board_background;
    //  Select the colour for the border of the canvas
    snakeboard_ctx.strokestyle = board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    // Draw a "border" around the entire canvas
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake() {
    // Draw each part
    snake.forEach(drawSnakePart)
}

// Draw one snake part
function drawSnakePart(snakePart) {

    // Set the colour of the snake part
    snakeboard_ctx.fillStyle = snake_col;
    // Set the border colour of the snake part
    snakeboard_ctx.strokestyle = snake_border;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    // Draw a border around the snake part
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function hasCollision(){
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }  
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function change_direction(event) {
    const keyName = event.keyCode;

    if ((keyName == UP_KEY_ARROW || keyName == UP_KEY_W) && dy != 10) {
        dx = 0;
        dy = -10;
    }
    if ((keyName == DOWN_KEY_ARROW || keyName == DOWN_KEY_S) && dy != -10) {
        dx = 0;
        dy = 10;
    }
    if ((keyName == LEFT_KEY_ARROW || keyName == LEFT_KEY_A) && dx != 10) {
        dx = -10;
        dy = 0;
    }
    if ((keyName == RIGHT_KEY_ARROW || keyName == RIGHT_KEY_D) && dx != -10) {
        dx = 10;
        dy = 0;
    }
}

    
main();

document.addEventListener("keydown", change_direction);