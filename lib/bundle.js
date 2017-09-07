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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {
  const backgroundCanvas = document.getElementById('background');
  const backgroundCtx = backgroundCanvas.getContext('2d');

  const gameCanvas = document.getElementById('game');
  const gameCtx = gameCanvas.getContext('2d');

  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](gameCanvas, gameCtx, backgroundCtx);
  game.draw();

});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__runner__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__obstacle__ = __webpack_require__(5);




class Game {
  constructor(gameCanvas, gameCtx, backgroundCtx) {
    this.gameCtx = gameCtx;
    this.gameCanvas = gameCanvas;

    this.runner = new __WEBPACK_IMPORTED_MODULE_1__runner__["a" /* default */](gameCtx);
    this.obstacle = new __WEBPACK_IMPORTED_MODULE_2__obstacle__["a" /* default */](gameCtx);
    this.createBackground(backgroundCtx);
    this.bindKeyHandlers();

    this.draw = this.draw.bind(this);
  }

  createBackground(ctx) {
    const bg = new Image();
    bg.src = 'https://s3.us-east-2.amazonaws.com/donut-runner/background.png';
    this.background = new __WEBPACK_IMPORTED_MODULE_0__background__["a" /* default */](ctx, bg, 5);
  }

  bindKeyHandlers() {
    key("space", () => { this.runner.jump() });
  }

  draw() {
    this.obstacle.draw();
    this.runner.draw();
    this.background.draw();
    requestAnimationFrame(this.draw);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(4);


const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;

class Runner {
  constructor(ctx) {
    this.ctx = ctx;

    this.initialize();
    this.draw = this.draw.bind(this);
  }

  initialize() {
    const image = new Image();
    image.src = 'https://s3.us-east-2.amazonaws.com/donut-runner/running-homer.png';

    this.runningHomer = new __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */]({
      ctx: this.ctx,
      image: image,
      xPos: CANVAS_X_SIZE / 50,
      yPos: CANVAS_Y_SIZE / 1.7,
      imgW: image.width,
      imgH: image.height,
      ticksPerFrame: 3,
      numberOfFrames: 12,
      startFrame: 4,
      scale: 1.5
    });

  }

  jump() {
    this.runningHomer.yPos = 100;
  }

  draw() {
    this.runningHomer.update();
    this.runningHomer.renderRunner();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Runner);


/***/ }),
/* 4 */
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

/* harmony default export */ __webpack_exports__["a"] = (Sprite);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(4);


const CANVAS_X_SIZE = 900;
const CANVAS_Y_SIZE = 450;

const OBSTACLES = [
  ['https://s3.us-east-2.amazonaws.com/donut-runner/selma.png', 6],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/barney.png', 3],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/martin-prince.png', 3],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/milhouse.png', 7],
  ['https://s3.us-east-2.amazonaws.com/donut-runner/shifty-eyed-baby.png', 6]
];

class Obstacle {
  constructor(ctx) {
    this.ctx = ctx;

    this.initialize();
    this.draw = this.draw.bind(this);
  }

  initialize() {
    const image = new Image();
    image.src = OBSTACLES[0][0];

    this.obstacleSelma = new __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */]({
      ctx: this.ctx,
      image: image,
      xPos: CANVAS_X_SIZE / 2,
      yPos: CANVAS_Y_SIZE / 1.6,
      imgW: image.width,
      imgH: image.height,
      ticksPerFrame: 10,
      numberOfFrames: OBSTACLES[0][1],
      startFrame: 1,
      scale: 1.3,
      speed: 5
    });

  }

  draw() {
    this.obstacleSelma.update();
    this.obstacleSelma.renderObstacle();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Obstacle);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map