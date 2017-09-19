import Sprite from './sprite';

const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;

class Runner {
  constructor(ctx) {
    this.ctx = ctx;

    this.initialize();
    this.update = this.update.bind(this);
    this.jump = this.jump.bind(this);

    this.jumping = false;
    this.groundDy = CANVAS_Y_SIZE / 1.6;
    this.jumpDy = 23;
    this.gravity = 1;
    this.jumpCount = 0;
  }

  getDistance(obstacle) {
    if (obstacle !== undefined) {
      const obstacleVec = obstacle.vectors();
      let xDist, yDist;

      xDist = this.x - obstacleVec.x;
      yDist = this.y - obstacleVec.y;

      return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    }
  }

  initialize() {
    const running = new Image();
    const jumping = new Image();
    running.src =
      'https://s3.us-east-2.amazonaws.com/donut-runner/running-homer.png';
    jumping.src =
      'https://s3.us-east-2.amazonaws.com/donut-runner/jumping-2-homer.png';

    running.onload = () => {
      this.runningHomer = new Sprite({
        ctx: this.ctx,
        image: running,
        xPos: CANVAS_X_SIZE / 50,
        yPos: CANVAS_Y_SIZE / 1.6,
        imgW: running.width,
        imgH: running.height,
        ticksPerFrame: 3,
        numberOfFrames: 12,
        startFrame: 4,
        scale: 1.6,
      });
    };

    jumping.onload = () => {
      this.jumpingHomer = new Sprite({
        ctx: this.ctx,
        image: jumping,
        xPos: CANVAS_X_SIZE / 50 + 15,
        yPos: CANVAS_Y_SIZE / 1.6,
        imgW: jumping.width,
        imgH: jumping.height,
        ticksPerFrame: 27,
        numberOfFrames: 3,
        startFrame: 0,
        scale: 1.6,
      });
    };
  }

  jump() {
    if (
      this.jumpCount === 0
      || (this.jumpingHomer.yPos !== this.groundDy)
      && this.jumping
    ) {
      this.jumpingHomer.yPos -= this.jumpDy - this.gravity * this.jumpCount;
      this.jumpCount += 1;
    } else {
      this.jumpingHomer.yPos = this.groundDy;
      this.jumpCount = 0;
      this.jumping = false;
    }
  }

  update() {
    if(this.jumping) {
      this.jump();
      this.jumpingHomer.update();
      this.jumpingHomer.draw();
      this.vectors(this.jumpingHomer);
    } else {
      this.runningHomer.update();
      this.runningHomer.draw();
      this.vectors(this.runningHomer);
    }
  }

  vectors(runner) {
    this.x = runner.xPos;
    this.y = runner.yPos;
    this.width = runner.imgW / runner.numberOfFrames;
    this.height = runner.imgH;
  }

}

export default Runner;
