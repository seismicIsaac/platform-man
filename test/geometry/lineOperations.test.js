import { lineOperations } from '../../src/geometry/lineOperations.js';
import { pointsEqual } from '../../src/geometry/somemath.js';
import { expect } from 'chai';

describe('lineOperations', function() {
  describe('getSlope', function() {
    it('should return the correct slope for a horizontal line', function() {
      let line = {p1: {x: 2, y: 2}, p2: {x: 6, y: 2}};
      let slope = lineOperations.getSlope(line);
      expect(slope.rise).to.equal(0);
      expect(slope.run).to.equal(1);
    });

    it('should return the correct slope for a vertical line', function() {
      let line = {p1: {x: 2, y: 2}, p2: {x: 2, y: 6}};
      let slope = lineOperations.getSlope(line);
      expect(slope.rise).to.equal(1);
      expect(slope.run).to.equal(0);
    });

    it('should return the correct slope for a diagonal line with positive slope', function() {
      let line = {p1: {x: 1, y: 1}, p2: {x: 3, y: 4}};
      let slope = lineOperations.getSlope(line);
      expect(slope.rise).to.equal(3);
      expect(slope.run).to.equal(2);
    });

    it('should reuturn the correct slope for a diagonal line with negative slope', function() {
      let line = {p1: {x: 4, y: 5}, p2: {x: 6, y: 3}};
      let slope = lineOperations.getSlope(line);
      expect(slope.rise).to.equal(-2);
      expect(slope.run).to.equal(2);
    });
  });

  describe('getYIntercept', function() {
    it('should return the proper y intercept for a horizontal line', function() {
      let line = {p1: {x:2, y: 2}, p2: {x: 6, y: 2}};
      expect(lineOperations.getYIntercept(line)).to.equal(2);
    });

    it('should return the proper y intercept for a vertical line not at the origin.', function() {
      let line = {p1: {x:2, y: 1}, p2: {x: 2, y: 4}};
      expect(lineOperations.getYIntercept(line)).to.equal(undefined);
    });

    it('should return the proper y intercept for a diagonal line.', function() {
      let line = {p1: {x: 3, y: 4}, p2: {x: 6, y: 7}};
      expect(lineOperations.getYIntercept(line), `oh no slope: ${line.slope}`).to.equal(1);
    });
  });

  describe('areSlopesEqual', function() {
    it('should return true for two horizontal lines', function() {
      let line1 = {p1: {x: 1, y: 2}, p2: {x: 4, y: 2}};
      let line2 = {p1: {x: 0, y: 1}, p2: {x: -3, y: 1}};
      expect(lineOperations.areSlopesEqual(line1, line2)).to.be.true;
    });

    it('should return true for two vertical lines', function() {
      let line1 = {p1: {x: 1, y: 2}, p2: {x: 1, y: 6}};
      let line2 = {p1: {x: -3, y: 1}, p2: {x: -3, y: -4}};
      expect(lineOperations.areSlopesEqual(line1, line2)).to.be.true;
    });

    it('should return true for two diagonal parallel lines', function() {
      let line1 = {p1: {x: 1, y: 2}, p2: {x: 3, y: 4}};
      let line2 = {p1: {x: -3, y: -1}, p2: {x: -7, y: -5}};
      expect(lineOperations.areSlopesEqual(line1, line2)).to.be.true;
    });

    it('should return true for two parallel diagonal lines with negative slope', function() {
      let line1 = {p1: {x: 0, y: 3}, p2: {x: 3, y: -2}};
      let line2 = {p1: {x: -4, y: -1}, p2: {x: -1, y: -6}};
      expect(lineOperations.areSlopesEqual(line1, line2)).to.be.true;
    });

    it('should return false for two intersecting diagonal lines', function() {
      let line1 = {p1: {x: 0, y: 0}, p2: {x: 3, y: 4}};
      let line2 = {p1: {x: 0, y: 4}, p2: {x: 5, y: -5}};
      expect(lineOperations.areSlopesEqual(line1, line2)).to.be.false;
    });
  });

  describe('pointIsOnLineSegment', function() {
    it('should return true if a point is on the given horizontal line segment', function() {
      let point = {x: 0, y: 0};
      let line = {p1:{x:-1, y: 0}, p2:{x:4, y: 0}};
      expect(lineOperations.pointIsOnLineSegment(point, line)).to.be.true;
    });

    it('should return true if a point in on the given vertical line segment', function() {
      let point = {x: 1, y: 1};
      let line = {p1:{x:1, y: 0}, p2:{x:1, y: 4}};
      expect(lineOperations.pointIsOnLineSegment(point, line)).to.be.true;
    });

    it('should return true if a point is on the given diagonal line segment', function() {
      let point = {x: 1, y: 1};
      let line = {p1:{x:0, y: 0}, p2:{x:4, y: 4}};
      expect(lineOperations.pointIsOnLineSegment(point, line)).to.be.true;
    });

    it('should return false if a point is not on the given line sigment', function() {
      let point = {x: 1, y: 2};
      let line = {p1:{x:0, y: 0}, p2:{x:4, y: 4}};
      expect(lineOperations.pointIsOnLineSegment(point, line)).to.be.false;
    });

    it('should return false if a point is not in range on a vertical line segment', function() {
      let point = {x: 1, y: 0};
      let line = {p1:{x:1, y: 4}, p2:{x:1, y: 1}};
      expect(lineOperations.pointIsOnLineSegment(point, line)).to.be.false;
    });

    it('should return false if a point is not in range on a horizontal line segment', function() {
      let point = {x: 5, y: 1};
      let line = {p1:{x:4, y: 1}, p2:{x:1, y: 1}};
      expect(lineOperations.pointIsOnLineSegment(point, line)).to.be.false;
    })
  });

  describe('getIntersectionPointForLines', function() {
    it('should return correct intersection point when intersecting with a horizontal line', function() {
      let line1 = {p1: {x: 0, y: 0}, p2: {x: 4, y: 4}};
      let line2 = {p1: {x: 0, y: 2}, p2: {x: 4, y: 2}};
      let expectedIntersectionPoint = {x: 2, y: 2};
      let intersectionPoint = lineOperations.getIntersectionPointForLines(line1, line2);
      expect(pointsEqual(expectedIntersectionPoint, intersectionPoint), `expected: x:${expectedIntersectionPoint.x}, y:${expectedIntersectionPoint.y}, actual: x:${intersectionPoint.x}, y:${intersectionPoint.y}`).to.be.true;
    });

    it('should return correct intersection point if intersecting with a vertical line', function() {
      let line1 = {p1: {x: 0, y: 0}, p2: {x: 4, y: 4}};
      let line2 = {p1: {x: 3, y: 0}, p2: {x: 3, y: 4}};
      let expectedIntersectionPoint = {x: 3, y: 3};
      let intersectionPoint = lineOperations.getIntersectionPointForLines(line1, line2);
      expect(pointsEqual(expectedIntersectionPoint, intersectionPoint), `expected: x:${expectedIntersectionPoint.x}, y:${expectedIntersectionPoint.y}, actual: x:${intersectionPoint.x}, y:${intersectionPoint.y}`).to.be.true;
    });

    it('should return an intersection point if two diagonal lines intersect', function() {
      let line1 = {p1: {x: 0, y: 0}, p2: {x: 4, y: 4}};
      let line2 = {p1: {x: 0, y: 4}, p2: {x: 4, y: 0}};
      let expectedIntersectionPoint = {x: 2, y: 2};
      let intersectionPoint = lineOperations.getIntersectionPointForLines(line1, line2);
      expect(pointsEqual(expectedIntersectionPoint, intersectionPoint), `expected: x:${expectedIntersectionPoint.x}, y:${expectedIntersectionPoint.y}, actual: x:${intersectionPoint.x}, y:${intersectionPoint.y}`).to.be.true;
    });

    it('should return undefined if lines are parallel and have different y intercept', function() {
      let line1 = {p1: {x: 0, y: 0}, p2: {x: 4, y: 4}};
      let line2 = {p1: {x: 2, y: 0}, p2: {x: 5, y: 3}};
      let intersectionPoint = lineOperations.getIntersectionPointForLines(line1, line2);
      expect(intersectionPoint).to.equal(undefined);
    });

    it('should return 1 if we have the same line', function() {
      let line1 = {p1: {x: 0, y: 0}, p2: {x: 4, y: 4}};
      let line2 = {p1: {x: 6, y: 6}, p2: {x: 10, y: 10}};
      let intersectionPoint = lineOperations.getIntersectionPointForLines(line1, line2);
      expect(intersectionPoint).to.equal(1);
    });
  });
});