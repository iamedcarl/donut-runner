/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Sprite);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(2);


document.addEventListener("DOMContentLoaded", () => {
  const backgroundCanvas = document.getElementById('background');
  const backgroundCtx = backgroundCanvas.getContext('2d');

  const gameCanvas = document.getElementById('game');
  const gameCtx = gameCanvas.getContext('2d');

  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](gameCanvas, gameCtx, backgroundCtx);
  game.start();

});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__runner__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__obstacle__ = __webpack_require__(5);




const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;

const IMGS = [
  ['https://s3.us-east-2.amazonaws.com/donut-runner/selma.png', 6],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/barney.png', 3],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/martin-prince.png', 3],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/milhouse.png', 5]
];

class Game {
  constructor(gameCanvas, gameCtx, backgroundCtx) {
    this.gameCtx = gameCtx;
    this.gameCanvas = gameCanvas;

    this.runner = new __WEBPACK_IMPORTED_MODULE_1__runner__["a" /* default */](gameCtx);
    this.createBackground(backgroundCtx, 1);
    this.bindKeyHandlers();

    this.draw = this.draw.bind(this);
    this.start = this.start.bind(this);
    this.runnerJump = this.runnerJump.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }

  bindKeyHandlers() {
    key("space", () => { this.runnerJump(); });
    key("p", () => { this.togglePause(); });
    key("r", () => {
      if (this.gameOver) { this.start(); }
    });
  }

  createBackground(ctx, speed) {
    const bg = new Image();
    bg.src = 'https://s3.us-east-2.amazonaws.com/donut-runner/background.png';
    this.background = new __WEBPACK_IMPORTED_MODULE_0__background__["a" /* default */](ctx, bg, speed);
  }

  draw() {
    if (!this.gameOver) {
      requestAnimationFrame(this.draw);

      if (!this.pause) {
        this.gameCtx.clearRect(0, 0, CANVAS_X_SIZE, CANVAS_Y_SIZE);
        this.background.draw();
        this.runner.update();
        this.updateObstacles();
        this.gameCtx.fillText("SCORE GOES HERE", 900 - 140, 30);

        if (this.ticker > this.spawnTick) {
          this.spawnObstacles();
          this.ticker = 0;
        }
        this.ticker += 1;
      }
    }
  }

  stop() {
    this.gameOver = true;
  }

  randomSpawnInterval() {
    const intervals = [500, 1000, 1500, 2000];
    return intervals[Math.floor(Math.random() * intervals.length)];
  }

  runnerJump() {
    this.runner.jumping = true;
    this.runner.jump();
  }

  spawnObstacles() {
    let idx = Math.floor(Math.random() * IMGS.length);
    if (Math.random() > 0.50 && this.obstacles.length < 2) {
      this.obstacles.push(new __WEBPACK_IMPORTED_MODULE_2__obstacle__["a" /* default */](
        this.gameCtx,
        IMGS[idx][0],
        IMGS[idx][1],
        Math.floor(Math.random() * (10 - 5))+ 5,
        this.randomSpawnInterval()
      ));
    }
  }

  start() {
    this.obstacles = [];
    this.pause = false;
    this.gameOver = false;
    this.ticker = 0;
    this.spawnTick = 30;
    this.draw();
  }

  togglePause() {
    this.pause = !this.pause;
  }

  updateObstacles() {
    let vectors;
    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].update();
      vectors = this.obstacles[i].vectors();
      if (this.obstacles[i].isOutOfBounds() || vectors.width === 0) {
        this.obstacles.splice(i,1);
      }

      if (this.runner.getDistance(this.obstacles[i]) <
      (this.runner.width / 2) + (vectors.width / 2 - 10)) {
        this.stop();
      }
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;

class Background {
  constructor(ctx, img, speed) {
    this.ctx = ctx;
    this.img = img;
    this.speed = speed;

    this.scroll = 0;
    this.imgW = this.img.width * 1.7;
    this.imgH = CANVAS_Y_SIZE;
    this.clearX = this.imgW;
    this.clearY = CANVAS_Y_SIZE;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.clearX, this.clearY);
    if (this.scroll <= -this.imgW) { this.scroll = 0; }
    this.ctx.drawImage(this.img, this.scroll, 0, this.imgW, this.imgH);
    this.ctx.drawImage(this.img, this.scroll + this.imgW, 0, this.imgW, this.imgH);
    this.scroll -= this.speed;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Background);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);


const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;

class Runner {
  constructor(ctx) {
    this.ctx = ctx;

    this.initialize();
    this.update = this.update.bind(this);
    this.jump = this.jump.bind(this);

    this.jumping = false;
    this.groundDy = CANVAS_Y_SIZE / 1.6;
    this.jumpDy = 23;
    this.gravity = 1;
    this.jumpCount = 0;
  }

  getDistance(obstacle) {
    if (obstacle !== undefined) {
      const obstacleVec = obstacle.vectors();
      let xDist, yDist;

      xDist = this.x - obstacleVec.x;
      yDist = this.y - obstacleVec.y;

      return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    }
  }

  initialize() {
    const running = new Image();
    const jumping = new Image();
    running.src =
      'https://s3.us-east-2.amazonaws.com/donut-runner/running-homer.png';
    jumping.src =
      'https://s3.us-east-2.amazonaws.com/donut-runner/jumping-2-homer.png';

    this.runningHomer = new __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */]({
      ctx: this.ctx,
      image: running,
      xPos: CANVAS_X_SIZE / 50,
      yPos: CANVAS_Y_SIZE / 1.6,
      imgW: running.width,
      imgH: running.height,
      ticksPerFrame: 3,
      numberOfFrames: 12,
      startFrame: 4,
      scale: 1.6,
    });

    this.jumpingHomer = new __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */]({
      ctx: this.ctx,
      image: jumping,
      xPos: CANVAS_X_SIZE / 50 + 15,
      yPos: CANVAS_Y_SIZE / 1.6,
      imgW: jumping.width,
      imgH: jumping.height,
      ticksPerFrame: 27,
      numberOfFrames: 3,
      startFrame: 0,
      scale: 1.6,
    });

  }

  jump() {
    if (
      this.jumpCount === 0
      || (this.jumpingHomer.yPos !== this.groundDy)
      && this.jumping
    ) {
      this.jumpingHomer.yPos -= this.jumpDy - this.gravity * this.jumpCount;
      this.jumpCount += 1;
    } else {
      this.jumpingHomer.yPos = this.groundDy;
      this.jumpCount = 0;
      this.jumping = false;
    }
  }

  update() {
    if(this.jumping) {
      this.jump();
      this.jumpingHomer.update();
      this.jumpingHomer.draw();
      this.vectors(this.jumpingHomer);
    } else {
      this.runningHomer.update();
      this.runningHomer.draw();
      this.vectors(this.runningHomer);
    }
  }

  vectors(runner) {
    this.x = runner.xPos;
    this.y = runner.yPos;
    this.width = runner.imgW / runner.numberOfFrames;
    this.height = runner.imgH;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Runner);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);


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

    this.obstacle = new __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */]({
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

/* harmony default export */ __webpack_exports__["a"] = (Obstacle);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map