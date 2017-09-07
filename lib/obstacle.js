import Sprite from './sprite';

const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;


class Obstacle {
  constructor(ctx, imageUrl, frames) {
    this.ctx = ctx;
    this.image = imageUrl;
    this.frames = frames;

    this.generateObstacles();
    this.draw = this.draw.bind(this);
  }

  generateObstacles() {
    const image = new Image();
    image.src = this.image;

    this.obstacle = new Sprite({
      ctx: this.ctx,
      image: image,
      yPos: CANVAS_Y_SIZE / 1.6,
      imgW: image.width,
      imgH: image.height,
      ticksPerFrame: 10,
      numberOfFrames: this.frames,
      startFrame: 1,
      scale: 1.7,
      speed: 5
    });

  }

  draw() {
    this.obstacle.update();
    this.obstacle.renderObstacle();
  }
}

export default Obstacle;
