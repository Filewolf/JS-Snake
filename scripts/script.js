const canvas = document.getElementById('game-board');
const context = canvas.getContext('2d');

//scores
const scoreBlock = document.querySelector('.game__score .score-value');
let score = 0;
scoreBlock.innerHTML = score;

//config
const CELL_SIZE = 20;
const FOOD_RADIUS = CELL_SIZE * 2/5; // radius of food circle
const SNAKE_SPEED = 10; // snake moves ten times per second

const snake = {
    x: canvas.width / 2,
    y: canvas.width / 2,
    vx: CELL_SIZE, // horizontal velocity
    vy: 0, // vertical velocity
    body: [],
    maxBody: 3 
};

let food = getRandomFoodPosition();

//other variables
let lastRenderTime = 0;
let gameOver = false;

//main function
function gameLoop(currentTime) {
    if (gameOver) {
        if ( confirm(`Game over! Your score: ${score}. Do you want to try again?`) ) {
            window.location.reload();
        }

        return;
    }

    window.requestAnimationFrame(gameLoop);
    
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    context.clearRect(0, 0, canvas.width, canvas.height);

    spawnFood();
    spawnSnake();
}

// call main function
window.requestAnimationFrame(gameLoop); 

// other functions
function spawnSnake() {
    snake.x += snake.vx;
    snake.y += snake.vy;

    outsideCanvas();

    snake.body.unshift({ x: snake.x, y: snake.y });

    if (snake.body.length > snake.maxBody) {
        snake.body.pop();
    }

    snake.body.forEach((elem, index) => {
        if (index === 0) {
            context.fillStyle = '#FAC505'; //color of head
        } else {
            context.fillStyle = '#B68F03'; //color of body
        }
        context.fillRect( elem.x, elem.y, CELL_SIZE, CELL_SIZE );
    });

    if (selfСollision()) gameOver = true;

    if (onSnake(food)) {
        snake.maxBody++;
        incScore();
        food = getRandomFoodPosition();
    }
}

function onSnake(obj, { ignoreHead = false } = {}) {
    return snake.body.some((elem, index) => {
        if (index === 0 && ignoreHead) return false;
        return comparePositions(elem, obj);
    });
}

function selfСollision() {
    return onSnake(snake.body[0], { ignoreHead: true });
}

function outsideCanvas() {
    if (snake.x < 0) {
        snake.x = canvas.width - CELL_SIZE;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - CELL_SIZE;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }
}

function spawnFood() {
    context.beginPath();
    context.fillStyle = '#c2003d';
    context.arc( food.x + (CELL_SIZE / 2), food.y + (CELL_SIZE / 2), FOOD_RADIUS, 0, 2 * Math.PI );
    context.fill();
}
 
function getRandomFoodPosition() {
    let newPos;

    while (newPos == null || onSnake(newPos)) {
        newPos = randomCanvasPosition();
    }

    return newPos;
}

function comparePositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function incScore() {
    score++;
    scoreBlock.innerHTML = score;
}

function getRandomNum(min, max) {
    return Math.floor( Math.random() * (max - min) + min );
}

function randomCanvasPosition() {
    return { 
        x: getRandomNum(0, canvas.width / CELL_SIZE) * CELL_SIZE,
        y: getRandomNum(0, canvas.height / CELL_SIZE) * CELL_SIZE
    };
}

// Keyboard listener
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'ArrowUp':
            if (snake.vy > 0) break;
        
            snake.vx = 0;
            snake.vy = -CELL_SIZE;
            break;
        case 'ArrowDown':
            if (snake.vy < 0) break;

            snake.vx = 0;
            snake.vy = CELL_SIZE;
            break;
        case 'ArrowLeft':
            if (snake.vx > 0) break;

            snake.vx = -CELL_SIZE;
            snake.vy = 0;
            break;
        case 'ArrowRight':
            if (snake.vx < 0) break;

            snake.vx = CELL_SIZE;
            snake.vy = 0;
            break;
    }
});

