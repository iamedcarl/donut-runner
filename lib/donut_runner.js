document.addEventListener("DOMContentLoaded", () => {
  // const canvas = document.getElementById('game');
  // const ctx = canvas.getContext('2d');

  var img = new Image();
  img.src = 'https://s3.us-east-2.amazonaws.com/donut-runner/background.png';
  var CanvasXSize = 800;
  var CanvasYSize = 400;
  var speed = 1; // lower is faster
  // var scale = 1.05;
  var y = -4.5; // vertical offset

  // Main program

  var dx = 0.75;
  var imgW;
  var imgH;
  var x = 0;
  var clearX;
  var clearY;
  var ctx;

  img.onload = function() {
    imgW = img.width;
    imgH = img.height;

    if (imgW > CanvasXSize) {
      x = CanvasXSize - imgW;
    } // image larger than canvas
    if (imgW > CanvasXSize) {
      clearX = imgW;
    } // image width larger than canvas
    else {
      clearX = CanvasXSize;
    }
    if (imgH > CanvasYSize) {
      clearY = imgH;
    } // image height larger than canvas
    else {
      clearY = CanvasYSize;
    }

    // get canvas context
    ctx = document.getElementById('game').getContext('2d');

    // set refresh rate
    return setInterval(draw, speed);
  };

  function draw() {
    ctx.clearRect(0, 0, clearX, clearY); // clear the canvas

    // if image is <= Canvas Size
    if (imgW <= CanvasXSize) {
      // reset, start from beginning
      if (x > CanvasXSize) {
        x = -imgW + x;
      }
      // draw additional image1
      if (x > 0) {
        ctx.drawImage(img, -imgW + x, y, imgW, 400);
      }
      // draw additional image2
      if (x - imgW > 0) {
        ctx.drawImage(img, -imgW * 2 + x, y, imgW, 400);
      }
    }

    // if image is > Canvas Size
    else {
      // reset, start from beginning
      if (x > (CanvasXSize)) {
        x = CanvasXSize - imgW;
      }
      // draw aditional image
      if (x > (CanvasXSize - imgW)) {
        ctx.drawImage(img, x - imgW + 1, y, imgW, 400);
      }
    }
    // draw image
    ctx.drawImage(img, x, y, imgW, 400);
    // amount to move
    x += dx;
  }

});
