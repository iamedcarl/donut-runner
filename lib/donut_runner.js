document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');

  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0, 1712, 400);
  };
  img.src = 'https://s3.us-east-2.amazonaws.com/donut-runner/background.png';
});
