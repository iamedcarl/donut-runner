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

    this.runner = new Runner(gameCtx);
    this.createBackground(backgroundCtx, 1);
    this.createObstacles(gameCtx, 3);
    this.bindKeyHandlers();

    this.draw = this.draw.bind(this);
  }

  createBackground(ctx, speed) {
    const bg = new Image();
    bg.src = 'https://s3.us-east-2.amazonaws.com/donut-runner/background.png';
    this.background = new Background(ctx, bg, speed);
  }

  bindKeyHandlers() {
    key("space", () => { this.runner.jump() });
  }

  createObstacles(ctx, speed) {
    this.obstacleSelma = new Obstacle(ctx, IMGS[0][0], IMGS[0][1], speed);
    this.obstacleBarney = new Obstacle(ctx, IMGS[1][0], IMGS[1][1], speed);
    this.obstacleMartin = new Obstacle(ctx, IMGS[2][0], IMGS[2][1], speed);
    this.obstacleMilhouse = new Obstacle(ctx, IMGS[3][0], IMGS[3][1], speed);
    this.obstacleBaby = new Obstacle(ctx, IMGS[4][0], IMGS[4][1], speed);
  }

  draw() {
    requestAnimationFrame(this.draw);
    this.background.draw();
    this.obstacleSelma.draw();
    this.runner.draw();
    // this.obstacleBarney.draw();
    // this.obstacleMartin.draw();
    // this.obstacleMilhouse.draw();
    // this.obstacleBaby.draw();
  }
}

export default Game;
