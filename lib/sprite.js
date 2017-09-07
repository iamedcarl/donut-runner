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
      this.xPos,
      this.yPos,
      (this.imgW / this.numberOfFrames) * this.scale,
      this.imgH * this.scale
    );

    this.ctx.drawImage(
      this.image, // img
      (this.imgW / this.numberOfFrames) * this.frameIndex,  // sx
      0,          // sy
      this.imgW / this.numberOfFrames,  // sw
      this.imgH,  // sh
      this.xPos,  // dx
      this.yPos,  // dy
      (this.imgW / this.numberOfFrames) * this.scale,  // dw
      this.imgH * this.scale  // dh
    );
  }

  renderObstacle() {
    this.ctx.clearRect(
      0,
      0,
      CANVAS_X_SIZE,
      CANVAS_Y_SIZE
    );

    if (this.scroll <= -CANVAS_X_SIZE) { this.scroll = 0; }

    this.ctx.drawImage(
      this.image, // img
      (this.imgW / this.numberOfFrames) * this.frameIndex,  // sx
      0,          // sy
      this.imgW / this.numberOfFrames,  // sw
      this.imgH,  // sh
      this.scroll + CANVAS_X_SIZE,  // dx
      this.yPos,  // dy
      (this.imgW / this.numberOfFrames) * this.scale,  // dw
      this.imgH * this.scale  // dh
    );

    this.scroll -= this.speed;
  }

}

export default Sprite;
