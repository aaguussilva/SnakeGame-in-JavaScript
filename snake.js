const board_border = 'black';
const board_background = "white";
const snake_col = 'green';
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

let score = 0;

let food_x;
let food_y;
    
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
    drawFood();
    moveSnake();
    drawSnake();
    main();
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (snake[0].x === food_x && snake[0].y === food_y) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        // Generate new food location
        gen_food();
    }else {
        snake.pop();
    }
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

function drawFood() {
    snakeboard_ctx.fillStyle = 'red';
    snakeboard_ctx.strokestyle = 'darkgreen';
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
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

function random_food(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_food() {
    // Generate a random number the food x-coordinate
    food_x = random_food(0, snakeboard.width - 10);
    // Generate a random number for the food y-coordinate
    food_y = random_food(0, snakeboard.height - 10);
    // if the new food location is where the snake currently is, generate a new food location
    snake.forEach(has_snake_eaten_food);
}

function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
}


    
main();
gen_food();

document.addEventListener("keydown", change_direction);
