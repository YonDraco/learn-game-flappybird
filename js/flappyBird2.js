const canvasEl = document.getElementById('canvas');

const flappyBirdGame = new Game(canvasEl.getContext('2d'), ['/FlappyBird.png', '/runner.png']);

// Draw scene loading
flappyBirdGame.loading = (game) => {
    game.ctx.clearRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height);
    game.ctx.fillText("Loading...", 50, 100);
}

// Draw scene pause
flappyBirdGame.pause = (game) => {
    game.ctx.clearRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height);
    game.ctx.fillText("Press space to play", 50, 100);
}

// Load cac tai nguyen
flappyBirdGame.loadAssets();

flappyBirdGame.gameLoop();

