import Background from './background';
import Runner from './runner';
import Obstacle from './obstacle';

const OBSTACLES = [
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
    this.createBackground(backgroundCtx);
    this.createObstacles(gameCtx);
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

  createObstacles(ctx) {
    this.obstacleSelma = new Obstacle(ctx, OBSTACLES[0][0], OBSTACLES[0][1]);
    this.obstacleBarney = new Obstacle(ctx, OBSTACLES[1][0], OBSTACLES[1][1]);
    this.obstacleMartin = new Obstacle(ctx, OBSTACLES[2][0], OBSTACLES[2][1]);
    this.obstacleMilhouse = new Obstacle(ctx, OBSTACLES[3][0], OBSTACLES[3][1]);
    this.obstacleBaby = new Obstacle(ctx, OBSTACLES[4][0], OBSTACLES[4][1]);
  }

  draw() {
    // this.obstacleSelma.draw();
    // this.obstacleBarney.draw();
    // this.obstacleMartin.draw();
    this.obstacleMilhouse.draw();
    // this.obstacleBaby.draw();
    this.runner.draw();
    this.background.draw();
    requestAnimationFrame(this.draw);
  }
}

export default Game;
