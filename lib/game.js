import Background from './background';
import Runner from './runner';
import Obstacle from './obstacle';

class Game {
  constructor(gameCanvas, gameCtx, backgroundCtx) {
    this.gameCtx = gameCtx;
    this.gameCanvas = gameCanvas;

    this.runner = new Runner(gameCtx);
    this.obstacle = new Obstacle(gameCtx);
    this.createBackground(backgroundCtx);
    this.bindKeyHandlers();

    this.draw = this.draw.bind(this);
  }

  createBackground(ctx) {
    const bg = new Image();
    bg.src = 'https://s3.us-east-2.amazonaws.com/donut-runner/background.png';
    this.background = new Background(ctx, bg, 5);
  }

  bindKeyHandlers() {
    key("space", () => { this.runner.jump() });
  }

  draw() {
    this.obstacle.draw();
    this.runner.draw();
    this.background.draw();
    requestAnimationFrame(this.draw);
  }
}

export default Game;
