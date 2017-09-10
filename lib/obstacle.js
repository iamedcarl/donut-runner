import Sprite from './sprite';

const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;


class Obstacle {
  constructor(ctx, imageUrl, frames, speed) {
    this.ctx = ctx;
    this.image = imageUrl;
    this.frames = frames;
    this.speed = speed;

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
      ticksPerFrame: 80,
      numberOfFrames: this.frames,
      startFrame: 0,
      scale: 1.6,
      speed: this.speed
    });

  }

  draw() {
    this.obstacle.update();
    this.obstacle.renderObstacle();
  }
}

export default Obstacle;
