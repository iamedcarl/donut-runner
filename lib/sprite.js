const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;

class Sprite {
  constructor(options){
    this.ctx = options.ctx;
    this.image = options.image;
    this.xPos = options.xPos;
    this.yPos = options.yPos;
    this.imgW = options.imgW;
    this.imgH = options.imgH;
    this.scale = options.scale;
    this.speed = options.speed || 0;

    this.numberOfFrames = options.numberOfFrames || 1;
    this.startFrame = options.startFrame;
    this.ticksPerFrame = options.ticksPerFrame || 0;
    this.frameIndex = this.startFrame;
    this.tickCount = 0;
    this.scroll = 0;
  }

  update() {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames -1 ){
        this.frameIndex += 1;
      } else {
        this.frameIndex = this.startFrame;
      }
    }
  }

  renderRunner() {
    this.ctx.clearRect(
      0,
      0,
      CANVAS_X_SIZE,
      CANVAS_Y_SIZE
    );

    let img = this.image;
    let sx = (this.imgW / this.numberOfFrames) * this.frameIndex;
    let sy = 0;
    let sw = this.imgW / this.numberOfFrames;
    let sh = this.imgH;
    let dx = this.xPos;
    let dy = this.yPos;
    let dw = (this.imgW / this.numberOfFrames) * this.scale;
    let dh = this.imgH * this.scale;

    this.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  renderObstacle() {
    this.ctx.clearRect(
      100,
      0,
      CANVAS_X_SIZE,
      CANVAS_Y_SIZE
    );

    if (this.scroll <= -CANVAS_X_SIZE) { this.scroll = 0; }

    let img = this.image;
    let sx = (this.imgW / this.numberOfFrames) * this.frameIndex;
    let sy = 0;
    let sw = this.imgW / this.numberOfFrames;
    let sh = this.imgH;
    let dx = this.scroll + CANVAS_X_SIZE;
    let dy = this.yPos;
    let dw = (this.imgW / this.numberOfFrames) * this.scale;
    let dh = this.imgH * this.scale;

    this.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);

    this.scroll -= this.speed;
  }

}

export default Sprite;
