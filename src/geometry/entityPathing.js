import { lineOperations } from './lineOperations.js';
import { newline } from './line.js';


var rectPathing = {
  getPathLineSegments: function(entity, desiredPosition) {
    let offset = { rise: entity.y - desiredPosition.y, run: entity.x - desiredPosition.x};
    let lineSegments = [];
    
    let startX = (offset.run < 0) ? entity.x + entity.width : entity.x;
    let startY = (offset.rise < 0) ? entity.y + entity.height : entity.y;

    if (offset.rise !== 0 && offset.run !== 0) {
      //We're moving in two directions at once. Use the corners as starting points and corners + offset as destination points.
      lineSegments.push(newline(startX, entity.y, startX - offset.run, entity.y - offset.rise));
      lineSegments.push(newline(startX, entity.y + entity.height, startX - offset.run, entity.y + entity.height - offset.rise));
      //Calculate the last point /line segment based on y.
      let opposingX = (startX === entity.x) ? entity.x + entity.width : entity.x;
      let lastY = (offset.rise < 0) ? entity.y + entity.height : entity.y;
      lineSegments.push(newline(opposingX, lastY, opposingX - offset.run, lastY - offset.rise));
    
    } else if (offset.rise === 0) {
      lineSegments.push(newline(startX, entity.y, startX - offset.run, entity.y));
      lineSegments.push(newline(startX, entity.y + entity.height, startX - offset.run, entity.y + entity.height));
      lineSegments.push(newline(startX, entity.y + (entity.height / 2), startX - offset.run, entity.y + (entity.height / 2)));
    
    } else {
      lineSegments.push(newline(entity.x, startY, entity.x, startY - offset.rise));
      lineSegments.push(newline(entity.x + entity.width, startY, entity.x + entity.width, startY - offset.rise));
      lineSegments.push(newline(entity.x + (entity.width / 2), startY, entity.x + (entity.width / 2), startY - offset.rise));
    }
    return lineSegments; 
  }
}

export { rectPathing };