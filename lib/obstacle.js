import Sprite from './sprite';

const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;


class Obstacle {
  constructor(ctx, imageUrl, frames, speed, randomInt) {
    this.ctx = ctx;
    this.image = imageUrl;
    this.frames = frames;
    this.speed = speed;
    this.randomInt = randomInt;

    this.generateObstacles();
    this.update = this.update.bind(this);
  }

  generateObstacles() {
    const image = new Image();
    image.src = this.image;

    this.obstacle = new Sprite({
      ctx: this.ctx,
      image: image,
      scroll: CANVAS_X_SIZE + this.randomInt,
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

  isOutOfBounds() {
    return this.obstacle.scroll < -40;
  }

  update() {
    this.obstacle.update();
    this.obstacle.draw();
  }

  vectors() {
    return {
      x: this.obstacle.scroll,
      y: this.obstacle.yPos,
      width: this.obstacle.imgW / this.frames,
      height: this.obstacle.imgH
    };
  }
}

export default Obstacle;
