let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let score = 0;
let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
];
let direction = 'RIGHT';
let food = {x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10};
let pause = false;
let swipeDirection = '';
let swipeThreshold = 50;
let swipeStartX, swipeStartY;

document.addEventListener('touchstart', (e) => {
    swipeStartX = e.changedTouches[0].clientX;
    swipeStartY = e.changedTouches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    let swipeEndX = e.changedTouches[0].clientX;
    let swipeEndY = e.changedTouches[0].clientY;
    let swipeDistanceX = swipeEndX - swipeStartX;
    let swipeDistanceY = swipeEndY - swipeStartY;
    if (Math.abs(swipeDistanceX) > swipeThreshold) {
        if (swipeDistanceX > 0) {
            swipeDirection = 'RIGHT';
        } else {
            swipeDirection = 'LEFT';
        }
    } else if (Math.abs(swipeDistanceY) > swipeThreshold) {
        if (swipeDistanceY > 0) {
            swipeDirection = 'DOWN';
        } else {
            swipeDirection = 'UP';
        }
    }
    changeDirection(swipeDirection);
});

document.getElementById('up-button').addEventListener('click', () => {
    changeDirection('UP');
});

document.getElementById('down-button').addEventListener('click', () => {
    changeDirection('DOWN');
});

document.getElementById('left-button').addEventListener('click', () => {
    changeDirection('LEFT');
});

document.getElementById('right-button').addEventListener('click', () => {
    changeDirection('RIGHT');
});

document.getElementById('pause-button').addEventListener('click', () => {
    pause = !pause;
});

function changeDirection(newDirection) {
    if (newDirection === 'UP' && direction !== 'DOWN') {
        direction = 'UP';
    } else if (newDirection === 'DOWN' && direction !== 'UP') {
        direction = 'DOWN';
    } else if (newDirection === 'LEFT' && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (newDirection === 'RIGHT' && direction !== 'LEFT') {
        direction = 'RIGHT';
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10, 24);
}

function update() {
    if (!pause) {
        let head = {x: snake[0].x, y: snake[0].y};
        if (direction === 'UP') {
            head.y -= 10;
        } else if (direction === 'DOWN') {
            head.y += 10;
        } else if (direction === 'LEFT') {
            head.x -= 10;
        } else if (direction === 'RIGHT') {
            head.x += 10;
        }
        snake.unshift(head);
        if (snake[0].x === food.x && snake[0].y === food.y) {
            score++;
            food = {x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10};
        } else {
            snake.pop();
        }
        if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height || checkCollision()) {
            alert(`Game Over! Final Score: ${score}`);
            score = 0;
            snake = [
                {x: 200, y: 200},
                {x: 190, y: 200},
                {x: 180, y: 200},
                {x: 170, y: 200},
                {x: 160, y: 200}
            ];
            direction = 'RIGHT';
            food = {x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10};
        }
    }
    draw();
    setTimeout(update, 100);
}

function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    return false;
}

update();
