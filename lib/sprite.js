class Sprite {
  constructor(options){
    this.ctx = options.ctx;
    this.image = options.image;
    this.xPos = options.xPos;
    this.yPos = options.yPos;
    this.imgW = options.imgW;
    this.imgH = options.imgH;
    this.scale = options.scale;

    this.numberOfFrames = options.numberOfFrames || 1;
    this.startFrame = options.startFrame;
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

  render() {
    this.ctx.clearRect(
      this.xPos,
      this.yPos,
      this.imgW * this.scale,
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

}

export default Sprite;
