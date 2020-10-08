const canvasEl = document.getElementById("canvas");
const context = canvasEl.getContext("2d");

const flappyBirdSheet = new Image();
flappyBirdSheet.src = "./img/FlappyBird.png";
let landOffset = 0;
let lines = [];
let sign = 1;

// create random line
function createRandomLine() {
    let distance = 300;
    if (lines.length) distance = lines[lines.length - 1].x;

    let top = 0;
    // let sig = Math.random() > 0.5 ? -1 : 1;
    sign = -sign;
    if (lines.length) top = lines[lines.length - 1].top + sign * Math.floor(Math.random() * 30 + 30)
    else top = Math.floor(Math.random() * 100 + 100)
    return {
        // top: Math.floor(Math.random() * 200 + 100), // random tu 100 -> 300
        top: top,
        h: Math.floor(Math.random() * 20 + 80), // random tu 100 -> 120
        x: lines.length ? Math.floor(Math.random() * 30 + 50) + distance + 90 : distance,
        scored: false // chua duoc tinh diem
    }
}

// draw line
function drawLine(line) {
    context.drawImage(flappyBirdSheet,
        56, 323, 26, 160,
        line.x, 0, 26, line.top);

    context.drawImage(flappyBirdSheet,
        84, 323, 26, 160,
        line.x, line.top + line.h, 26, 400 - line.top - line.h);
}

function updateLine() {
    let newLines = [];
    lines.forEach(line => {
        line.x -= 2;
        if (line.x > -26) newLines.push(line);
    })

    lines = newLines;
    if (newLines.length < 5) lines.push(createRandomLine());
}

// === push random line for game ===
lines.push(createRandomLine());
lines.push(createRandomLine());
lines.push(createRandomLine());
lines.push(createRandomLine());

let birdCells = [
    { "x": 115, "y": 381, "width": 17, "height": 12 },
    { "x": 115, "y": 407, "width": 17, "height": 12 },
    { "x": 115, "y": 433, "width": 17, "height": 12 },
]

//=== create bird ===
let flappyBird = new Sprite(70, 200, 34, 24);
flappyBird.painter = new SpriteSheetPainter(flappyBirdSheet, 6, birdCells);
flappyBird.direction = 1,

    // === add behaviors for bird ===
    flappyBird.behaviors.push({
        exec: (sprite) => {
            sprite.painter.update();
        }
    })

// Push behaviors for bird
flappyBird.behaviors.push({
    exec: (sprite) => {
        sprite.y += sprite.direction * 3;
    }
})

// === Draw Background ===
function drawBackground() {
    // background city
    context.drawImage(flappyBirdSheet, 0, 0, 144, 256, 0, 0, 288, 512);

    // background land
    context.save();
    context.translate(landOffset, 0);
    context.drawImage(flappyBirdSheet, 292, 0, 168, 56, 0, 512 - 112, 336, 112);
    context.restore();
}

//48 = 336 - 288
function updateLandOffset() {
    if (landOffset > -46) landOffset = landOffset - 2;
    else landOffset = 0;
}

// === scoring function ===
let score = 0;
function calScore() {
    for (let i = 0; i < lines.length; i++) {
        if (flappyBird.x > lines[i].x + 26) {
            if (!lines[i].scored) {
                score++;
                lines[i].scored = true
            }
        }
        else break;
    }
}

// === create game over ===
let gameOver = false;
function checkGameOver() {
    // check reach top or bottom - cham dinh hoac cham day
    if (flappyBird.y <= 0 || flappyBird.y >= 380) gameOver = true;

    // check reach a line
    for (let i = 0; i < lines.length; i++) {
        if(lines[i].x > flappyBird.x + flappyBird.w) break;

        if ((flappyBird.x + flappyBird.w >= lines[i].x && flappyBird.x <= lines[i].x + 26) &&
            (flappyBird.y <= lines[i].top || flappyBird.y + flappyBird.h >= lines[i].top + lines[i].h)) {
            gameOver = true;
            break;
        }
    }
}

function clear() {
    context.clearRect(0, 0, 288, 512);
}

// === handler font ===
context.font = "30px serif"
context.fillStyle = "red"

function draw() {
    drawBackground();
    lines.forEach(drawLine);
    flappyBird.paint(context);
    context.fillText(score, 130, 30); // Vẽ ra điểm khi chơi game
}

function update() {
    updateLandOffset();
    updateLine();
    flappyBird.exec();
}

function gameLoop() {
    clear();
    draw();
    update();
    calScore();
    checkGameOver();
    if(gameOver) {
        context.fillText('Game Over', 100, 250);
    }

    if(!gameOver) requestAnimationFrame(gameLoop);
}

//=== load game on browser ===
flappyBirdSheet.onload = () => {
    gameLoop();
};

document.onkeydown = (e) => {
    if (e.code = "Space") {
        flappyBird.direction = -1;
    }
}

document.onkeyup = (e) => {
    if (e.code = "Space") {
        flappyBird.direction = 1;
    }
}