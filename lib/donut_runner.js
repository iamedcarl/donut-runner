document.addEventListener("DOMContentLoaded", () => {
  // const canvas = document.getElementById('game');
  // const ctx = canvas.getContext('2d');

  var img = new Image();
  img.src = 'https://s3.us-east-2.amazonaws.com/donut-runner/background.png';
  var CanvasXSize = 800;
  var CanvasYSize = 400;
  var speed = 0; // lower is faster
  var y = -4.5; // vertical offset

  // Main program

  var dx = 1;
  var imgW;
  var imgH;
  var x = 0;
  var clearX;
  var clearY;
  var ctx;

  img.onload = function() {
    imgW = img.width * 1.7;
    imgH = CanvasYSize;
    clearX = imgW;
    clearY = CanvasYSize;
    ctx = document.getElementById('game').getContext('2d');
    return setInterval(draw, speed);
  };

  function draw() {
    ctx.clearRect(0, 0, clearX, clearY);
    if (x <= -imgW) { x = 0; }
    ctx.drawImage(img, x, y, imgW, imgH);
    ctx.drawImage(img, x + imgW, y, imgW, imgH);
    x -= dx;
  }

});
