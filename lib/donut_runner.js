import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const backgroundCanvas = document.getElementById('background');
  const backgroundCtx = backgroundCanvas.getContext('2d');

  const gameCanvas = document.getElementById('game');
  const gameCtx = gameCanvas.getContext('2d');

  const game = new Game(gameCanvas, gameCtx, backgroundCtx);
  game.openMenu();

});
