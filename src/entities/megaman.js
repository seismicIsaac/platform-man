import { addDrawable } from './drawable.js';

var getMegaman = function() {
  var spriteFrameX = 0;
  var spriteFrameY = 34;
  var spriteWidth = 34;
  var spriteHeight = 34;
  var animationFrameCounter = 0;
  var isHumanControlled = true;

  var megaman = addDrawable({});
  megaman.verticalSpeed = 0;
  megaman.speed = 3;
  megaman.x = 100;
  megaman.y = 200;
  megaman.width = 34;
  megaman.height = 34;
  megaman.loadImage('./images/sprites/megaman-x-walking.png');

  megaman.getDesiredPosition = function(direction) {
    let desiredX = megaman.x;
    let desiredY = megaman.y;
    if (direction.right) {
      desiredX += megaman.speed;
    }
    if (direction.left) {
      desiredX -=  megaman.speed;
    }
    if (direction.up && !megaman.inAir) {
      megaman.verticalSpeed = 15;
      desiredY -= megaman.verticalSpeed;
    }

    if (!(desiredX === megaman.x && desiredY === megaman.y)) {
      animationFrameCounter++;
      if (animationFrameCounter > 11) {
       animationFrameCounter = 0;
      }
    }
    return { x: desiredX, y: desiredY};
  }

  megaman.getPathLineSegments = function(desiredPosition) {
    let topLeft, topRight, middleLeft, middleRight, bottomLeft, bottomRight;
    let startX, endX
    if (desiredPosition.x > megaman.x) {
      //We're facing right, so starting point should be at the end of megaman's width
      startX = megaman.x + megaman.width;
    }
    else {
      startX = megaman.x;
    }

    if (desiredPosition.y > megaman.y) {
      startY = megaman.y;
    }
    else {
      startY = megaman.y + megaman.height;
    }
  }

  megaman.getDrawParameters = function() {
    return [megaman.image, spriteFrameX + 34 * animationFrameCounter, spriteFrameY, spriteWidth, spriteHeight, megaman.x, megaman.y, megaman.width, megaman.height];
  }
  return megaman;
}

export { getMegaman };