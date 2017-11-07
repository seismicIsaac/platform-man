require('./style.css');
import { getCanvas } from './canvas.js';
import { getMegaman } from './entities/megaman.js';
import { newPlatform } from './entities/platform.js';
import { collisionDetector } from './geometry/collisionDetector.js';
import { rectPathing } from './geometry/entityPathing.js';
import { pointsEqual } from './geometry/somemath.js';

var myCanvas;
var megaman = getMegaman();
var entities = [megaman];
var terrain = [];
window.megaman = megaman;
window.terrain = terrain;

document.addEventListener("DOMContentLoaded", function() {
  myCanvas = getCanvas(document);
  addInputListeners(document);
  gameLoop.loop();
});
var platform1 = newPlatform(200, 350, 150, 30);
var platform2 = newPlatform(350, 300, 20, 300);
terrain.push(platform1);
terrain.push(platform2);

function addInputListeners(document) {
  input.addCanvasListeners(document);
}

var gameLoop = {
  quit: false,
  loop: function() {
    if ( !this.quit ) {
      myCanvas.clearEntities([megaman]);
      movementManager.updatePositionForEntity(megaman, input.processInput());
      myCanvas.drawPlatforms(terrain);
      myCanvas.drawEntities([megaman]);
      setTimeout(gameLoop.loop.bind(this), 16);
    }
  }
}

var physics = {
  GRAVITY: 1,
  TERMINAL_VELOCITY: -10,

  applyGravity: function(entity, desiredPosition) {
    entity.verticalSpeed -= this.GRAVITY;
    if (entity.verticalSpeed < this.TERMINAL_VELOCITY) {
      entity.verticalSpeed = this.TERMINAL_VELOCITY;
    }
    if (desiredPosition) {
      desiredPosition.y -= entity.verticalSpeed;
    }
    return desiredPosition;
  }
}

var movementManager = {
  updatePositionForEntity: function(entity, desiredPosition) {
    desiredPosition = physics.applyGravity(entity, desiredPosition);
    let lines = rectPathing.getPathLineSegments(entity, desiredPosition);
    myCanvas.drawLines(lines);


    let collisionPoint = collisionDetector.detectPathCollisionForEntityMovingToPoint(entity, desiredPosition);
    let terrainCollisionPoint = collisionDetector.checkTerrainCollisionPointForEntityMovingToPoint(megaman, desiredPosition, terrain);
    if (collisionPoint) {
      entity.x = collisionPoint.x;
      entity.y = collisionPoint.y;
      console.log('path collision?')
    }
    else if (terrainCollisionPoint && !pointsEqual(terrainCollisionPoint, desiredPosition)) {
      entity.x = terrainCollisionPoint.x;
      entity.y = terrainCollisionPoint.y - entity.height;
      console.log('terrain collision');
    }
    else {
      entity.x = desiredPosition.x;
      entity.y = desiredPosition.y;
    }
  }
}

var input = {
  inputDirection: {},

  addCanvasListeners: function(document) {
    document.getElementById('myBody').addEventListener('keydown', this.handleKeyPressed.bind(this));
    document.getElementById('myBody').addEventListener('keyup', this.handleKeyPressed.bind(this));
  },
  handleKeyPressed: function(event) {
    const eventKey = event.key.toLowerCase();
    if (eventKey === 's') {
      this.inputDirection.down = event.type === 'keydown';
    }
    else if (eventKey === 'a') {
      this.inputDirection.left = event.type === 'keydown';
    }
    else if (eventKey === 'd') {
      this.inputDirection.right = event.type === 'keydown';
    }
    else if (eventKey === 'w') {
      this.inputDirection.up = event.type === 'keydown';
    }
    else if (eventKey === 'q') {
      gameLoop.quit = !gameLoop.quit;
      if (!gameLoop.quit) {
        gameLoop.loop();
      }
    }
  },

  processInput: function() {
    const desiredPosition = megaman.getDesiredPosition(this.inputDirection);
    return desiredPosition;
  }
}

