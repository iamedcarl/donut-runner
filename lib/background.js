const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;

class Background {
  constructor(ctx, img, speed) {
    this.ctx = ctx;
    this.img = img;
    this.speed = speed;

    this.x = 0;
    this.imgW = this.img.width * 1.7;
    this.imgH = CANVAS_Y_SIZE;
    this.clearX = this.imgW;
    this.clearY = CANVAS_Y_SIZE;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.clearX, this.clearY);
    if (this.x <= -this.imgW) { this.x = 0; }
    this.ctx.drawImage(this.img, this.x, 0, this.imgW, this.imgH);
    this.ctx.drawImage(this.img, this.x + this.imgW, 0, this.imgW, this.imgH);
    this.x -= this.speed;
  }

}

export default Background;
