const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameRunning = false;
let money = 0;
let distance = 0;
let gameSpeed = 2;
let frameCount = 0;

const chicken = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 80,
    width: 30,
    height: 30,
    speed: 5,
    color: '#FFD700'
};

let obstacles = [];
let coins = [];
let roadLines = [];

function initRoadLines() {
    for (let i = 0; i < 10; i++) {
        roadLines.push({
            y: i * 80
        });
    }
}

function drawChicken() {
    ctx.fillStyle = chicken.color;
    ctx.fillRect(chicken.x, chicken.y, chicken.width, chicken.height);
    
    ctx.fillStyle = '#FF6347';
    ctx.fillRect(chicken.x + 8, chicken.y - 5, 6, 6);
    ctx.fillRect(chicken.x + 16, chicken.y - 5, 6, 6);
    
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.moveTo(chicken.x + 15, chicken.y + 25);
    ctx.lineTo(chicken.x + 10, chicken.y + 35);
    ctx.lineTo(chicken.x + 20, chicken.y + 35);
    ctx.closePath();
    ctx.fill();
}

function drawRoad() {
    ctx.fillStyle = '#404040';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 3;
    roadLines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 2, line.y);
        ctx.lineTo(canvas.width / 2 + 2, line.y + 40);
        ctx.stroke();
    });
    
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, 0, 30, canvas.height);
    ctx.fillRect(canvas.width - 30, 0, 30, canvas.height);
}

function updateRoadLines() {
    roadLines.forEach(line => {
        line.y += gameSpeed;
        if (line.y > canvas.height) {
            line.y = -80;
        }
    });
}

function createObstacle() {
    const types = ['car', 'truck'];
    const type = types[Math.floor(Math.random() * types.length)];
    const lane = Math.floor(Math.random() * 3);
    
    obstacles.push({
        x: 40 + lane * 110,
        y: -50,
        width: type === 'car' ? 40 : 50,
        height: type === 'car' ? 60 : 80,
        type: type,
        color: type === 'car' ? '#FF4444' : '#8B4513'
    });
}

function createCoin() {
    const lane = Math.floor(Math.random() * 3);
    coins.push({
        x: 50 + lane * 110,
        y: -30,
        width: 20,
        height: 20,
        value: 10
    });
}

function drawObstacles() {
    obstacles.forEach(obs => {
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        
        ctx.fillStyle = '#333';
        if (obs.type === 'car') {
            ctx.fillRect(obs.x + 5, obs.y + 10, 10, 10);
            ctx.fillRect(obs.x + 25, obs.y + 10, 10, 10);
        } else {
            ctx.fillRect(obs.x + 5, obs.y + 15, 12, 12);
            ctx.fillRect(obs.x + 33, obs.y + 15, 12, 12);
        }
    });
}

function drawCoins() {
    coins.forEach(coin => {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(coin.x + coin.width / 2, coin.y + coin.height / 2, coin.width / 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFA500';
        ctx.font = '12px Arial';
        ctx.fillText('$', coin.x + 6, coin.y + 15);
    });
}

function updateObstacles() {
    obstacles.forEach((obs, index) => {
        obs.y += gameSpeed + 1;
        if (obs.y > canvas.height) {
            obstacles.splice(index, 1);
        }
    });
}

function updateCoins() {
    coins.forEach((coin, index) => {
        coin.y += gameSpeed;
        if (coin.y > canvas.height) {
            coins.splice(index, 1);
        }
    });
}

function checkCollision() {
    for (let obs of obstacles) {
        if (chicken.x < obs.x + obs.width &&
            chicken.x + chicken.width > obs.x &&
            chicken.y < obs.y + obs.height &&
            chicken.y + chicken.height > obs.y) {
            return true;
        }
    }
    return false;
}

function checkCoinCollection() {
    coins.forEach((coin, index) => {
        if (chicken.x < coin.x + coin.width &&
            chicken.x + chicken.width > coin.x &&
            chicken.y < coin.y + coin.height &&
            chicken.y + chicken.height > coin.y) {
            money += coin.value;
            coins.splice(index, 1);
            updateScore();
        }
    });
}

function updateScore() {
    document.getElementById('money').textContent = money;
    document.getElementById('distance').textContent = Math.floor(distance);
}

function gameOver() {
    gameRunning = false;
    document.getElementById('finalMoney').textContent = money;
    document.getElementById('finalDistance').textContent = Math.floor(distance);
    document.getElementById('gameOver').classList.remove('hidden');
}

function gameLoop() {
    if (!gameRunning) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawRoad();
    updateRoadLines();
    drawChicken();
    drawObstacles();
    drawCoins();
    
    updateObstacles();
    updateCoins();
    
    if (checkCollision()) {
        gameOver();
        return;
    }
    
    checkCoinCollection();
    
    frameCount++;
    if (frameCount % 100 === 0) {
        createObstacle();
    }
    if (frameCount % 150 === 0) {
        createCoin();
    }
    
    distance += 0.05;
    if (frameCount % 500 === 0) {
        gameSpeed += 0.3;
    }
    
    updateScore();
    requestAnimationFrame(gameLoop);
}

const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    if (keys['ArrowLeft'] && chicken.x > 35) {
        chicken.x -= chicken.speed;
    }
    if (keys['ArrowRight'] && chicken.x < canvas.width - chicken.width - 35) {
        chicken.x += chicken.speed;
    }
    if (keys['ArrowUp'] && chicken.y > 0) {
        chicken.y -= chicken.speed;
    }
    if (keys['ArrowDown'] && chicken.y < canvas.height - chicken.height) {
        chicken.y += chicken.speed;
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

document.getElementById('restartBtn').addEventListener('click', () => {
    document.getElementById('gameOver').classList.add('hidden');
    money = 0;
    distance = 0;
    gameSpeed = 2;
    frameCount = 0;
    obstacles = [];
    coins = [];
    chicken.x = canvas.width / 2 - 15;
    chicken.y = canvas.height - 80;
    updateScore();
    startGame();
});

function startGame() {
    gameRunning = true;
    initRoadLines();
    gameLoop();
}

startGame();
