import { lineOperations } from './lineOperations.js';
import { rectPathing } from './entityPathing.js';
import { inRange, distance, pointsEqual } from './somemath.js';

const CANVAS_HEIGHT = 416;

var collisionDetector = {
  detectPathCollisionForEntityMovingToPoint: function(entity, desiredPosition) {
    let collisionPoint;
    //handle falling off of canvas.
    if (desiredPosition.y >= CANVAS_HEIGHT) {
      collisionPoint = {x: desiredPosition.x, y: CANVAS_HEIGHT};
      this.setLandedOnPlatform(entity);
    }
    else {
      entity.inAir = true;
    }
    return collisionPoint;
  },

  setLandedOnPlatform: function(entity) {
    entity.verticalSpeed = 0;
    entity.inAir = false;
  },

  checkLandedOnPlatform: function(entity, desiredPosition, platforms) {   
    for (let i = 0; i < platforms.length; i++) {
      let platform = platforms[i];
      // grab top edge;

    }
  },

  checkTerrainCollisionPointForEntityMovingToPoint: function(entity, desiredPosition, platforms) {
    // Loop through terrain objects checking for the intersection point of 3 lines from the entities current position, to the desired position.
    let entityPathLines = rectPathing.getPathLineSegments(entity, desiredPosition);
    let collisionPoint;
    for(let i = 0; i < platforms.length; i++) {
      let platform = platforms[i];
      let platformLineSegments = platform.getLineSegments();
      for(let j = 0; j < platformLineSegments.length; j++) {
        let platformBoundary = platformLineSegments[j];
        for(let k = 0; k < entityPathLines.length; k++) {
          let entityPath = entityPathLines[k];

          collisionPoint = this.getLineSegmentIntersectionPoint(entity, entityPath, platformBoundary);

          // There was no collision
          if (pointsEqual(collisionPoint, entityPath.p2))
          {
            continue;
          }

          if (lineOperations.isHorizontalLine(platformBoundary)) {
            if (entity.y < platformBoundary.p1.y) {
              entity.verticalSpeed = 0;
            }
            else {
              this.setLandedOnPlatform(entity);
            }
            return { x: desiredPosition.x, y: platformBoundary.p1.y };
          }
          else if (lineOperations.isVerticalLine(platformBoundary)) {
          }


          // if (entityStandingOnLine(entity, platformLineSegments[i])) {

          // }
          // collisionPoint = this.getLineSegmentIntersectionPoint(entity, entityPathLines[k], platformLineSegments[j]);
          
          // // // There is no collision point.
          // if (pointsEqual(entityPathLines[k].p2, collisionPoint)) {
          //   continue;
          // }
          // else {
          // //   //Return the offset from where the collisionPoint is vs the Desired path line.
          // //   // let offset = { x: entityPathLines[k].p2.x - collisionPoint.x, y: entityPathLines[k].p2.y - collisionPoint.y}
          // //   // if (k === 1) {
          // //   //   offset.y += entity.height / 2;
          // //   // }
          // //   // else if (k === 0) {
          // //   //   offset.y += entity.height;
          // //   // }
          // //   // console.log('whaaaaa? collision?', offset, {x: desiredPosition.x + offset.x, y: desiredPosition.y + offset.y});
          // //   // console.log('DesiredPath: ', entityPathLines[k]);
          // //   // console.log('PlatformLineSegment: ', platformLineSegments[j]);
          // //   // console.log('PlatformLineSegments: ', platformLineSegments);
          // //   // console.log('EntityPathLines', entityPathLines);
          // //   // return {x: desiredPosition.x - offset.x, y: desiredPosition.y + offset.y};
          // //   let deltaX = collisionPoint.x - entityPathLines[k].p1.x;
          // //   let deltaY = collisionPoint.y - entityPathLines[k].p1.y;
          //   return collisionPoint;
          //}
        }
      }
    }
    return desiredPosition;
  },

  //To answer the question, am I next to the line, or am I on it.
  // entityStandingOnLine: function(entity, lineSegment) {
  //   if (entity && lineSegment) {
  //     (entity.y + entity.height === lineSegment.p1.y) || (entity.y + entity.height === lineSegment.p2.y) {
  //       return inRange();
  //     }
  //   }
  // },

  // TODO: Make this more generic? (It's designed to handle User vs Platform collisions.)
  getLineSegmentIntersectionPoint: function(entity, desiredPath, platformBoundary) {
    const intersectionPoint = lineOperations.getIntersectionPointForLines(desiredPath, platformBoundary); 
    
    // If the lines are overlapping, figure out if the segments actually intersect.
    if (intersectionPoint === 1 && 
          (lineOperations.pointIsOnLineSegment(desiredPath.p1, platformBoundary) ||
           lineOperations.pointIsOnLineSegment(desiredPath.p2, platformBoundary))) {

      return { x: desiredPath.p1.x, y: desiredPath.p1.y };
    }
    else if (intersectionPoint === undefined) {
      return { x: desiredPath.p2.x, y: desiredPath.p2.y };
    }
    else if (lineOperations.pointIsOnLineSegment(intersectionPoint, desiredPath) &&
        lineOperations.pointIsOnLineSegment(intersectionPoint, platformBoundary)) {
      return intersectionPoint;
    }
    else {
      return { x: desiredPath.p2.x, y: desiredPath.p2.y}
    }
  }
}

export { collisionDetector };