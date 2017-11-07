var canvas;

const CANVAS_HEIGHT = 416;
const CANVAS_WIDTH = 450;

const getCanvas = function(document) {
  var context;

  function setupCanvas(document) {
    const canvasDOMElement = document.getElementById('tutorial');
    context = getContext(canvasDOMElement);
  }

  function getContext(canvasElement) {
    if (canvasElement.getContext) {
      return canvasElement.getContext('2d');  
    } else {
      // TODO: Provide a backup if canvas is unsupported.
      console.log("Canvas unsuported. TODO: Provide backup.");
    }
  }
  
  if (!canvas) {
    setupCanvas(document);

    canvas = {
      drawEntities: function(entities) {
        entities.forEach(function(entity) {
          if (entity.imageLoaded) {
            context.drawImage.apply(context, entity.getDrawParameters());
          }
        });
      },

      drawPlatforms: function(platforms) {
        platforms.forEach(function(platform) {
          context.beginPath();
          context.rect.apply(context, platform.getDrawParameters());
          context.fillStyle = 'blue';
          context.fill();
        });
      },

      clearEntities: function(entities) {
        entities.forEach(function(entity) {
          if (entity.imageLoaded) {
            context.clearRect(entity.x - entity.speed, entity.y - entity.speed, entity.width + entity.speed, entity.height + entity.speed);
          }
        })
      },

      drawLines: function(lines) {
        lines.forEach(function(line) {
          context.moveTo(line.p1.x, line.p1.y);
          context.lineTo(line.p2.x, line.p2.y);
          context.stroke();
        });
      },

      getHeight: function() {
        return CANVAS_HEIGHT;
      },

      getWidth: function() { 
        return CANVAS_WIDTH;
      }
    }
  }
  return canvas;
}

export { getCanvas };