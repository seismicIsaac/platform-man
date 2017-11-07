import { pointsEqual } from '../../src/geometry/somemath.js';
import { expect } from 'chai';

describe('pointsEqual', function() {
  it('should return true if x and y points are equal', function() {
    let point1 = {x: 1, y: 1};
    let point2 = {x: 1, y: 1};
    expect(pointsEqual(point1, point2)).to.be.true;
    
  });

  it('should return false if x1 is not equal to x2', function() {
    let point1 = {x: 2, y: 1};
    let point2 = {x: 1, y: 1};
    expect(pointsEqual(point1, point2)).to.be.false;
  });

  it('should return false if y1 is not equal to y2', function() {
    let point1 = {x: 1, y: 2};
    let point2 = {x: 1, y: 1};
    expect(pointsEqual(point1, point2)).to.be.false;
  });

  it('should return false if x1 != x2 and y1 != y2', function() {
    let point1 = {x: 2, y: 1};
    let point2 = {x: 1, y: 3};
    expect(pointsEqual(point1, point2)).to.be.false;
  });

  it('should return false if one of the points is undefined', function() {
    let point1 = undefined;
    let point2 = {x: 1, y: 1};
    expect(pointsEqual(point1, point2)).to.be.false;
  });
});