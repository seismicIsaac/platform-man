import { collisionDetector } from '../../src/geometry/collisionDetector.js';
import { pointsEqual } from '../../src/geometry/somemath.js';
import { platform, newPlatform } from '../../src/entities/platform.js';

import { expect } from 'chai';
import { expectedPointString } from '../utils/expectedString.js';

describe('collisionDetector', function() {
  describe('collisionDetector', function() {
    describe('getLineSegmentIntersectionPoint', function() {
      it('should return intersection point if boundary line is horizontal', function() {
        let entityDesiredPath = {p1: {x: 0, y: 0}, p2: {x: 4, y: 4}};
        let platformBoundary = {p1: {x: 0, y: 2}, p2: {x: 4, y: 2}};
        let expectedCollisionPoint = {x: 2, y: 2};
        let collisionPoint = collisionDetector.getLineSegmentIntersectionPoint({}, entityDesiredPath, platformBoundary);
        expect(pointsEqual(expectedCollisionPoint, collisionPoint), expectedPointString(expectedCollisionPoint, collisionPoint)).to.be.true;
      });

      it('should return intersection point if boundary line is vertical', function() {
        let entityDesiredPath = {p1: {x: 0, y: 0}, p2: {x: 4, y: 4}};
        let platformBoundary = {p1: {x: 3, y: 0}, p2: {x: 3, y: 4}};
        let expectedCollisionPoint = {x: 3, y: 3};
        let collisionPoint = collisionDetector.getLineSegmentIntersectionPoint({}, entityDesiredPath, platformBoundary);
        expect(pointsEqual(expectedCollisionPoint, collisionPoint), expectedPointString(expectedCollisionPoint, collisionPoint)).to.be.true;
      });

      it('should return a point if two diagonal lines intersect', function() {
        let entityDesiredPath = {p1: {x: 0, y: 0}, p2: {x: 4, y: 4}};
        let platformBoundary = {p1: {x: 0, y: 4}, p2: {x: 4, y: 0}};
        let expectedCollisionPoint = {x: 2, y: 2};
        let collisionPoint = collisionDetector.getLineSegmentIntersectionPoint({}, entityDesiredPath, platformBoundary);
        expect(pointsEqual(expectedCollisionPoint, collisionPoint), expectedPointString(expectedCollisionPoint, collisionPoint)).to.be.true;
      });

      it('should return desired position if lines are parallel and do not overlap', function() {
        let entityDesiredPath = {p1: {x: 0, y: 0}, p2: {x: 4, y: 4}};
        let platformBoundary = {p1: {x: 2, y: 0}, p2: {x: 5, y: 3}};
        let collisionPoint = collisionDetector.getLineSegmentIntersectionPoint({}, entityDesiredPath, platformBoundary);
        let desiredPosition = {x: 4, y: 4};
        expect(pointsEqual(collisionPoint, desiredPosition)).to.be.true;
      });

      it('should return desired position if diagonal  lines would intersect but not in range.', function() {
        let entityDesiredPath = {p1: {x: 0, y: 0}, p2: {x: 1, y: 1}};
        let platformBoundary = {p1: {x: 4, y: 0}, p2: {x: 3, y: 1}};
        let collisionPoint = collisionDetector.getLineSegmentIntersectionPoint({}, entityDesiredPath, platformBoundary);
        let desiredPosition = {x: 1, y: 1};
        expect(pointsEqual(collisionPoint, desiredPosition)).to.be.true;
      });

      it('should return desired position if perpendicular lines would intersect but not in range.', function() {
        let entityDesiredPath = {p1: {x: 0, y: 0}, p2: {x: 4, y: 0}};
        let platformBoundary = {p1: {x: 1, y: 1}, p2: {x: 1, y: 4}};
        let collisionPoint = collisionDetector.getLineSegmentIntersectionPoint({}, entityDesiredPath, platformBoundary);
        let desiredPosition = {x: 4, y: 0};
        expect(pointsEqual(desiredPosition, collisionPoint), expectedPointString(desiredPosition, collisionPoint)).to.be.true;
      });

      it('should return desired position if parallel lines would intersect but not in range.', function() {
        let entityDesiredPath = {p1: {x: 0, y: 0}, p2: {x: 4, y: 4}};
        let platformBoundary = {p1: {x: 5, y: 5}, p2: {x: 8, y: 8}};
        let collisionPoint = collisionDetector.getLineSegmentIntersectionPoint({}, entityDesiredPath, platformBoundary);
        let desiredPosition = {x: 4, y: 4};
        expect(pointsEqual(desiredPosition, collisionPoint), expectedPointString(desiredPosition, collisionPoint)).to.be.true;
      });

      it('should return desired position if no collision point horizontal', function() {
        let entityDesiredPath = {p1: {x: 0, y: 2}, p2: {x: 4, y: 2}};
        let platformBoundary = {p1: {x: 2, y: 8}, p2: {x: 8, y: 8}};
        let collisionPoint = collisionDetector.getLineSegmentIntersectionPoint({}, entityDesiredPath, platformBoundary);
        let desiredPosition = {x: 4, y: 2};
        expect(pointsEqual(desiredPosition, collisionPoint)).to.be.true;
      });

      it('should return desired position if no collision point vertical', function() {
        let entityDesiredPath = {p1: {x: 0, y: 2}, p2: {x: 4, y: 2}};
        let platformBoundary = {p1: {x: 2, y: 8}, p2: {x: 2, y: 10}};
        let collisionPoint = collisionDetector.getLineSegmentIntersectionPoint({}, entityDesiredPath, platformBoundary);
        let desiredPosition = {x: 4, y: 2};
        expect(pointsEqual(desiredPosition, collisionPoint)).to.be.true;
      });

      it('should return earliest point if lines are overlapping', function() {
        let entityDesiredPath = {p1: {x: 2, y: 2}, p2: {x: 4, y: 2}};
        let platformBoundary = {p1: {x: 2, y: 2}, p2: {x: 4, y: 2}};
        let collisionPoint = collisionDetector.getLineSegmentIntersectionPoint({}, entityDesiredPath, platformBoundary);
        let expectedCollisionPoint = {x: 2, y: 2};
        expect(pointsEqual(expectedCollisionPoint, collisionPoint), expectedPointString(expectedCollisionPoint, collisionPoint)).to.be.true;
      });

      it('should return the correct point >:-[', function() {

      })
    });

    describe('checkTerrainCollisionPointForEntityMovingToPoint', function() {
      //        ____________
      //  I -> |            |
      //       |____________|
      it('should return collision point for entity moving perpendicular to vertical barrier', function() {
        let platform1 = newPlatform(2, 2, 3, 3);
        let myEntity = { x: 0, y: 2, width: 2, height: 2};
        let desiredPosition = {x: 4, y: 2};
        let collisionPoint = collisionDetector.checkTerrainCollisionPointForEntityMovingToPoint(myEntity, desiredPosition, [platform1]);
        let expectedPosition = {x: 2, y: 2};
        expect(collisionPoint.x).to.equal(2);
        expect(collisionPoint.y).to.equal(2);
      });
      //       _____________
      //      |_____________|
      //  I -> 
      it('should return desired position for entity passing under platform', function() {
        let platform1 = newPlatform(2, 8, 2, 2);
        let myEntity = { x: 0, y: 2, width: 2, height: 2};
        let desiredPosition = {x: 4, y: 2};
        let collisionPoint = collisionDetector.checkTerrainCollisionPointForEntityMovingToPoint(myEntity, desiredPosition, [platform1]);
        expect(pointsEqual(collisionPoint, desiredPosition)).to.be.true;
      });

      it('should return a collision point ')
    });
  });
});