class Game {
    constructor(ctx, imgUrls) {
        this.ctx = ctx;
        this.imgUrls = imgUrls;

        this.scene = "loading";
        this.nLoadImg = 0;
        
        this.imgs = [];
        //this.loaded = false;
    }

    loadHandler() {
        this.nLoadImg += 1;
        if(this.nLoadImg == this.imgUrls.length) {
            // this.loaded = true;
            this.scene = "pause";
        }
    }

    // Load cac tai nguyen len browser
    loadAssets() {
        this.imgUrls.forEach(imgUrl => {
            const img = new Image();
            img.src = imgUrl;
            this.imgs.push(img);
            img.onload = this.loadHandler.bind(this);
        })
    }

    // Method
    gameLoop() {
        switch (this.scene) {
            case "loading":
                this.loading(this);
                break;
            case "pause":
                this.pause(this);
                break;
            case "playing":
                this.playing(this);
                break;
            case "gameOver":
                this.gameOver(this);
                break;
            default:
                this.playing(this);
                break;
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    // Reset game
    resetGame() {
        this.score = 0;
    }
}
