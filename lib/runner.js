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
    this.jumpDy = 12;
    this.gravity = 0.3;
    this.jumpCount = 0;
  }

  draw() {
    if(this.jumping) { this.jump(); }
    this.runningHomer.update();
    this.runningHomer.renderRunner();
  }

  initialize() {
    const img = new Image();
    img.src =
      'https://s3.us-east-2.amazonaws.com/donut-runner/running-homer.png';

    this.runningHomer = new Sprite({
      ctx: this.ctx,
      image: img,
      xPos: CANVAS_X_SIZE / 50,
      yPos: CANVAS_Y_SIZE / 1.6,
      imgW: img.width,
      imgH: img.height,
      ticksPerFrame: 7,
      numberOfFrames: 12,
      startFrame: 4,
      scale: 1.6,
    });

  }

  jump() {
    if (
      this.jumpCount === 0
      || (this.runningHomer.yPos !== this.groundDy)
      && this.jumping
    ) {
      this.runningHomer.yPos -= this.jumpDy - this.gravity * this.jumpCount;
      this.jumpCount += 1;
    } else {
      this.runningHomer.yPos = this.groundDy;
      this.jumpCount = 0;
      this.jumping = false;
    }
  }

}

export default Runner;
