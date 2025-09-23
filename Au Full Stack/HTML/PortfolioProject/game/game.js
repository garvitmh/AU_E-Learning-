const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const playerImg = new Image();
playerImg.src = 'man.png'; // Add your man running image here

const roadImg = new Image();
roadImg.src = 'road.png'; // Add road background image here

let player = {
    x: 100,
    y: 250,
    width: 50,
    height: 80,
    dy: 0,
    gravity: 0.8,
    jumpPower: -15,
    isJumping: false
};

let obstacles = [];
let gameSpeed = 5;
let score = 0;
let gameOver = false;
let roadX = 0;

function createObstacle() {
    let height = Math.random() * 40 + 20;
    obstacles.push({
        x: canvas.width,
        y: canvas.height - height - 30,
        width: 30,
        height: height
    });
}

function handleObstacles() {
    if (Math.random() < 0.02) createObstacle();

    for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.x -= gameSpeed;

        // Draw obstacle as simple block
        ctx.fillStyle = 'green';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        // Collision detection
        if (
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.height > obs.y
        ) {
            gameOver = true;
        }

        if (obs.x + obs.width < 0) {
            obstacles.splice(i, 1);
            score++;
            i--;
        }
    }
}

function updatePlayer() {
    player.dy += player.gravity;
    player.y += player.dy;

    if (player.y + player.height > canvas.height - 30) {  // 30 px road height
        player.y = canvas.height - player.height - 30;
        player.dy = 0;
        player.isJumping = false;
    }

    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

function displayScore() {
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

function drawRoad() {
    roadX -= gameSpeed;
    if (roadX <= -canvas.width) roadX = 0;

    ctx.drawImage(roadImg, roadX, canvas.height - 30, canvas.width, 30);
    ctx.drawImage(roadImg, roadX + canvas.width, canvas.height - 30, canvas.width, 30);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRoad();
    updatePlayer();
    handleObstacles();
    displayScore();

    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = 'black';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over!', canvas.width / 2 - 120, canvas.height / 2);
    }
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && !player.isJumping) {
        player.dy = player.jumpPower;
        player.isJumping = true;
    }
});

// Ensure images are loaded before starting
playerImg.onload = () => {
    roadImg.onload = () => {
        gameLoop();
    };
};
