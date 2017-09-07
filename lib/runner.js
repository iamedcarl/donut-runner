import Sprite from './sprite';

const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;

class Runner {
  constructor(ctx) {
    this.ctx = ctx;
    this.initialize();
    this.draw = this.draw.bind(this);
  }

  initialize() {
    const image = new Image();
    image.src = 'https://s3.us-east-2.amazonaws.com/donut-runner/running-homer.png';
    this.runningHomer = new Sprite({
      ctx: this.ctx,
      image: image,
      xPos: CANVAS_X_SIZE / 50,
      yPos: CANVAS_Y_SIZE / 1.7,
      imgW: image.width,
      imgH: image.height,
      ticksPerFrame: 3,
      numberOfFrames: 12,
      startFrame: 4,
      scale: 1.5
    });

  }

  draw() {
    this.runningHomer.update();
    this.runningHomer.render();
  }
}

export default Runner;
