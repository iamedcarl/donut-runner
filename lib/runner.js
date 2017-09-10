import Sprite from './sprite';

const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;

class Runner {
  constructor(ctx) {
    this.ctx = ctx;

    this.initialize();
    this.draw = this.draw.bind(this);
    this.jump = this.jump.bind(this);

    this.jumping = false;
    this.groundDy = CANVAS_Y_SIZE / 1.6;
    this.jumpDy = 10;
    this.gravity = 0.25;
    this.jumpCount = 0;
  }

  draw() {
    if(this.jumping) {
      this.jump();
      this.jumpingHomer.update();
      this.jumpingHomer.renderRunner();
    } else {
      this.runningHomer.update();
      this.runningHomer.renderRunner();
    }
  }

  initialize() {
    const running = new Image();
    const jumping = new Image();
    running.src =
      'https://s3.us-east-2.amazonaws.com/donut-runner/running-homer.png';
    jumping.src =
      'https://s3.us-east-2.amazonaws.com/donut-runner/jumping-2-homer.png';

    this.runningHomer = new Sprite({
      ctx: this.ctx,
      image: running,
      xPos: CANVAS_X_SIZE / 50,
      yPos: CANVAS_Y_SIZE / 1.6,
      imgW: running.width,
      imgH: running.height,
      ticksPerFrame: 7,
      numberOfFrames: 12,
      startFrame: 4,
      scale: 1.6,
    });

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

}

export default Runner;
