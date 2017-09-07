import Background from './background';
import Runner from './runner';

class Game {
  constructor(gameCtx, backgroundCtx) {
    this.gameCtx = gameCtx;

    this.runner = new Runner(gameCtx);
    this.createBackground(backgroundCtx);

    this.draw = this.draw.bind(this);
  }

  createBackground(ctx) {
    const bg = new Image();
    bg.src = 'https://s3.us-east-2.amazonaws.com/donut-runner/background.png';
    this.background = new Background(ctx, bg, 5);
  }

  draw() {
    this.runner.draw();
    this.background.draw();
    requestAnimationFrame(this.draw);
  }
}

export default Game;
