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
    this.scroll = options.scroll || CANVAS_X_SIZE + 100;

    this.numberOfFrames = options.numberOfFrames || 1;
    this.startFrame = options.startFrame || 0;
    this.ticksPerFrame = options.ticksPerFrame || 0;
    this.frameIndex = this.startFrame;
    this.tickCount = 0;
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

  draw() {
    // if (this.scroll <= -CANVAS_X_SIZE) { this.scroll = 0; }

    let img = this.image;
    let sx = (this.imgW / this.numberOfFrames) * this.frameIndex;
    let sy = 0;
    let sw = this.imgW / this.numberOfFrames;
    let sh = this.imgH;
    let dx = this.xPos || this.scroll;
    let dy = this.yPos;
    let dw = (this.imgW / this.numberOfFrames) * this.scale;
    let dh = this.imgH * this.scale;

    this.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);

    this.scroll -= this.speed;
  }

}

export default Sprite;
