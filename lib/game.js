import Background from './background';
import Runner from './runner';
import Obstacle from './obstacle';

const IMGS = [
  ['https://s3.us-east-2.amazonaws.com/donut-runner/selma.png', 6],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/barney.png', 3],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/martin-prince.png', 3],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/milhouse.png', 5],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/shifty-eyed-baby.png', 6]
];

class Game {
  constructor(gameCanvas, gameCtx, backgroundCtx) {
    this.gameCtx = gameCtx;
    this.gameCanvas = gameCanvas;

    this.obstacles = [];
    this.pause = false;

    this.runner = new Runner(gameCtx);
    this.createBackground(backgroundCtx, 1);
    this.createObstacles(gameCtx, 5);
    this.bindKeyHandlers();

    this.draw = this.draw.bind(this);
    this.runnerJump = this.runnerJump.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }

  bindKeyHandlers() {
    key("space", () => { this.runnerJump() });
    key("p", () => { this.togglePause() });
  }

  createBackground(ctx, speed) {
    const bg = new Image();
    bg.src = 'https://s3.us-east-2.amazonaws.com/donut-runner/background.png';
    this.background = new Background(ctx, bg, speed);
  }

  createObstacles(ctx, speed) {
    for (let i = 0; i < IMGS.length; i++) {
      this.obstacles.push(new Obstacle(ctx, IMGS[i][0], IMGS[i][1], speed));
    }
  }

  draw() {
    requestAnimationFrame(this.draw);
    if (this.pause === false) {
      this.background.draw();
      this.runner.draw();
      // this.spawnObstacles();
      this.obstacles[0].draw();
    }
  }

  gameOver() {
    this.gameOver = true;
  }

  isOutOfBounds() {
    
  }

  runnerJump() {
    this.runner.jumping = true;
    this.runner.jump();
  }

  spawnObstacles() {
    let obstacle;
    if (Math.random() > 0.50) {
      obstacle = this.obstacles[Math.floor(Math.random() * this.obstacles.length)];
    }
    obstacle.draw();
  }

  start() {
    this.gameOver = false;
    this.draw();
  }

  togglePause() {
    this.pause = !this.pause;
  }

}

export default Game;
