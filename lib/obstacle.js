import Sprite from './sprite';

const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;

const OBSTACLES = [
  ['https://s3.us-east-2.amazonaws.com/donut-runner/selma.png', 6],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/barney.png', 3],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/martin-prince.png', 3],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/milhouse.png', 7],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/shifty-eyed-baby.png', 6]
];

class Obstacle {
  constructor(ctx) {
    this.ctx = ctx;

    this.initialize();
    this.draw = this.draw.bind(this);
  }

  initialize() {
    const image = new Image();
    image.src = OBSTACLES[0][0];

    this.obstacleSelma = new Sprite({
      ctx: this.ctx,
      image: image,
      xPos: CANVAS_X_SIZE / 2,
      yPos: CANVAS_Y_SIZE / 1.6,
      imgW: image.width,
      imgH: image.height,
      ticksPerFrame: 10,
      numberOfFrames: OBSTACLES[0][1],
      startFrame: 1,
      scale: 1.3,
      speed: 5
    });

  }

  draw() {
    this.obstacleSelma.update();
    this.obstacleSelma.renderObstacle();
  }
}

export default Obstacle;
