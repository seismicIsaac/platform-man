import { newline } from './line.js';
import { inRange } from './somemath.js';

var lineOperations = { 
  getSlope: function(line) {
    if (line.slope) {
      return line.slope;
    }
    let slope = { rise: line.p1.y - line.p2.y, run: line.p1.x - line.p2.x };
    if (this.isHorizontalLine(line)) {
      line.slope = { rise: 0, run: 1};
    } else if (this.isVerticalLine(line)) {
      line.slope = {rise: 1, run: 0};
    } else {
      if (slope.rise < 0 && slope.run < 0 || slope.run < 0) {
        slope.rise = (-1) * slope.rise;
        slope.run = (-1) * slope.run;
      }
      line.slope = slope;
    }
    return line.slope;
  },

  getYIntercept: function(line) {
    if (this.isHorizontalLine(line)) {
      return line.p1.y;
    }
    else if (this.isVerticalLine(line)) {
      return (line.p1.x === 0) ? 0 : undefined;
    }
    let slope = this.getSlope(line);
    let y = line.p1.y;
    let x = line.p1.x;
    return y - (x * slope.rise / slope.run);
  },

  isHorizontalLine: function(line) {
    return line.p1.y === line.p2.y;
  },

  isVerticalLine: function(line) {
    return line.p1.x === line.p2.x;
  },

  areParallel: function(line1, line2) {
    return (this.isHorizontalLine(line1) && this.isHorizontalLine(line2)) ||
          (this.isVerticalLine(line1) && this.isVerticalLine(line2)) ||
          this.slopesEqual(line1, line2);
  },

  areSlopesEqual: function(line1, line2) {
    let slope1 = this.getSlope(line1);
    let slope2 = this.getSlope(line2);
    return (slope1.rise / slope1.run) === (slope2.rise / slope2.run);
  },

  areYInterceptsEqual: function(line1, line2) {
    return this.getYIntercept(line1) === this.getYIntercept(line2);
  },

  pointIsOnLineSegment: function(point, line) {
    let testLine = newline(point, {x: line.p1.x, y: line.p1.y});
    if (this.areSlopesEqual(line, testLine) && this.areYInterceptsEqual(line, testLine)) {
      //They are parallel. Check the range.
      return inRange(point.y, line.p1.y, line.p2.y) && inRange(point.x, line.p1.x, line.p2.x);
    }
    return false;
  },

  getIntersectionPointForLines: function(line1, line2) {
    const line1Slope = this.getSlope(line1);
    const line2Slope = this.getSlope(line2);
    const line1yIntercept = this.getYIntercept(line1);
    const line2yIntercept = this.getYIntercept(line2);

    if (this.areSlopesEqual(line1, line2)) {
      if (line1yIntercept !== line2yIntercept) {
        return undefined;
      } 
      else if (this.isVerticalLine(line1) && this.isVerticalLine(line2) && line1.p1.x !== line2.p1.x) {
        return undefined;
      }
      return 1; // 1 for they're overlapping everywhere.
    }
    let combinedIntercepts = line1yIntercept + line2yIntercept;
    let combinedSlopes = (line1Slope.rise / line1Slope.run) - (line2Slope.rise / line1Slope.run);
    let intersectionX = combinedIntercepts / combinedSlopes;
    let intersectionY = intersectionX * (line1Slope.rise / line1Slope.run) + line1yIntercept;
    
    if (this.isVerticalLine(line1)) {
      intersectionX = line1.p1.x;
      intersectionY = intersectionX * (line2Slope.rise / line2Slope.run) + line2yIntercept;
    }
    else if (this.isVerticalLine(line2)) {
      intersectionX = line2.p1.x;
      intersectionY = intersectionX * (line1Slope.rise / line1Slope.run) + line1yIntercept;
    }
    
    return {x: intersectionX, y: intersectionY};
  }
}

export { lineOperations };