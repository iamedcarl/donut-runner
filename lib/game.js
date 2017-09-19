import Menu from './menu';
import Background from './background';
import Runner from './runner';
import Obstacle from './obstacle';

const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;

const IMGS = [
  ['https://s3.us-east-2.amazonaws.com/donut-runner/selma.png', 6],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/barney.png', 3],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/martin-prince.png', 3],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/milhouse.png', 5]
];

class Game {
  constructor(gameCanvas, gameCtx, backgroundCtx) {
    this.gameCtx = gameCtx;
    this.gameCanvas = gameCanvas;

    this.runner = new Runner(gameCtx);
    this.createBackground(backgroundCtx, 1);
    this.bindKeyHandlers();

    this.menu = new Menu(this);

    this.draw = this.draw.bind(this);
    this.start = this.start.bind(this);
    this.runnerJump = this.runnerJump.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }

  bindKeyHandlers() {
    key("space", () => { this.runnerJump(); });
    key("p", () => { this.togglePause(); });
    key("r", () => {
      if (this.gameOver) { this.start(); }
    });
  }

  createBackground(ctx, speed) {
    const bg = new Image();
    bg.src = 'https://s3.us-east-2.amazonaws.com/donut-runner/background.png';
    bg.onload = () => {
      this.background = new Background(ctx, bg, speed);
    };
  }

  draw() {
    if (!this.gameOver) {
      requestAnimationFrame(this.draw);

      if (!this.pause) {
        this.gameCtx.clearRect(0, 0, CANVAS_X_SIZE, CANVAS_Y_SIZE);
        this.background.draw();
        this.runner.update();
        this.updateObstacles();
        this.gameCtx.fillText("SCORE GOES HERE", 900 - 140, 30);

        if (this.ticker > this.spawnTick) {
          this.spawnObstacles();
          this.ticker = 0;
        }
        this.ticker += 1;
      }
    }
  }

  openMenu() {
    this.menu.openMainMenu();
  }

  stop() {
    this.gameOver = true;
  }

  randomSpawnInterval() {
    const intervals = [500, 1000, 1500, 2000];
    return intervals[Math.floor(Math.random() * intervals.length)];
  }

  runnerJump() {
    this.runner.jumping = true;
    this.runner.jump();
  }

  spawnObstacles() {
    let idx = Math.floor(Math.random() * IMGS.length);
    if (Math.random() > 0.50 && this.obstacles.length < 2) {
      this.obstacles.push(new Obstacle(
        this.gameCtx,
        IMGS[idx][0],
        IMGS[idx][1],
        Math.floor(Math.random() * (10 - 5))+ 5,
        this.randomSpawnInterval()
      ));
    }
  }

  start() {
    this.obstacles = [];
    this.pause = false;
    this.gameOver = false;
    this.ticker = 0;
    this.spawnTick = 30;
    this.draw();
  }

  togglePause() {
    this.pause = !this.pause;
  }

  updateObstacles() {
    let vectors;
    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].update();
      vectors = this.obstacles[i].vectors();
      if (this.obstacles[i].isOutOfBounds() || vectors.width === 0) {
        this.obstacles.splice(i,1);
      }

      if (this.runner.getDistance(this.obstacles[i]) <
      (this.runner.width / 2) + (vectors.width / 2 - 10)) {
        this.stop();
      }
    }
  }

}

export default Game;
