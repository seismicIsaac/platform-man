import { rectPathing } from '../../src/geometry/entityPathing.js';
import { expect } from 'chai';

describe('entityPathing', function() {
  describe('rectPathing', function() {
    describe('getPathLineSegments', function() {
      it('should return an array with 3 elements when going right', function() {
        let myEntity = {x: 100, y: 120, width: 33, height: 35};
        let goingTo = {x: 140, y: 120};
        let lineSegments = rectPathing.getPathLineSegments(myEntity, goingTo);
        expect(lineSegments.length).to.equal(3);
      });

      it('should return an array with 3 elements when going left', function() {
        let myEntity = {x: 100, y: 120, width: 33, height: 35};
        let goingTo = {x: 40, y: 120};
        let lineSegments = rectPathing.getPathLineSegments(myEntity, goingTo);
        expect(lineSegments.length).to.equal(3);
      });

      it('should return an array with 3 elements when going up', function() {
        let myEntity = {x: 100, y: 120, width: 33, height: 35};
        let goingTo = {x: 100, y: 80};
        let lineSegments = rectPathing.getPathLineSegments(myEntity, goingTo);
        expect(lineSegments.length).to.equal(3);
      });

      it('should return an array with 3 elements when going down', function() {
        let myEntity = {x: 100, y: 120, width: 33, height: 35};
        let goingTo = {x: 100, y: 160};
        let lineSegments = rectPathing.getPathLineSegments(myEntity, goingTo);
        expect(lineSegments.length).to.equal(3);
      });

      it('should calculate moving left line segments correctly', function() {
        let myEntity = {x: 160, y: 120, width: 34, height: 36};
        let goingTo = {x: 120, y: 120};
        let lineSegments = rectPathing.getPathLineSegments(myEntity, goingTo);
        let line1 = lineSegments[0];
        let line2 = lineSegments[1];
        let line3 = lineSegments[2];
        expect(line1.p1.x, 'expect1').to.equal(160);
        expect(line1.p1.y, 'expect2').to.equal(120);
        expect(line1.p2.x, 'expect3').to.equal(120);
        expect(line1.p2.y, 'expect4').to.equal(120);
        //line2
        expect(line2.p1.x, 'expect5').to.equal(160);
        expect(line2.p1.y, 'expect6').to.equal(120 + 36);
        expect(line2.p2.x, 'expect7').to.equal(120);
        expect(line2.p2.y, 'expect8').to.equal(120 + 36);
        //line3
        expect(line3.p1.x, 'expect9').to.equal(160);
        expect(line3.p1.y, 'expect10').to.equal(120 + 18);
        expect(line3.p2.x, 'expect11').to.equal(120);
        expect(line3.p2.y, 'expect12').to.equal(120 + 18);
      });

      it('should calculate moving right line segments correctly', function() {
        let myEntity = {x: 120, y: 120, width: 34, height: 36};
        let goingTo = {x: 160, y: 120};
        let lineSegments = rectPathing.getPathLineSegments(myEntity, goingTo);
        let line1 = lineSegments[0];
        let line2 = lineSegments[1];
        let line3 = lineSegments[2];
        expect(line1.p1.x, 'expect1').to.equal(154);
        expect(line1.p1.y, 'expect2').to.equal(120);
        expect(line1.p2.x, 'expect3').to.equal(194);
        expect(line1.p2.y, 'expect4').to.equal(120);
        //line2
        expect(line2.p1.x, 'expect5').to.equal(154);
        expect(line2.p1.y, 'expect6').to.equal(120 + 36);
        expect(line2.p2.x, 'expect7').to.equal(194);
        expect(line2.p2.y, 'expect8').to.equal(120 + 36);
        //line3
        expect(line3.p1.x, 'expect9').to.equal(154);
        expect(line3.p1.y, 'expect10').to.equal(120 + 18);
        expect(line3.p2.x, 'expect11').to.equal(194);
        expect(line3.p2.y, 'expect12').to.equal(120 + 18);
      });

      it('should calculate moving up line segments correctly', function() {
        let myEntity = {x: 160, y: 120, width: 34, height: 36};
        let goingTo = {x: 160, y: 80};
        let lineSegments = rectPathing.getPathLineSegments(myEntity, goingTo);
        let line1 = lineSegments[0];
        let line2 = lineSegments[1];
        let line3 = lineSegments[2];
        expect(line1.p1.x, 'expect1').to.equal(160);
        expect(line1.p1.y, 'expect2').to.equal(120);
        expect(line1.p2.x, 'expect3').to.equal(160);
        expect(line1.p2.y, 'expect4').to.equal(80);
        //line2
        expect(line2.p1.x, 'expect5').to.equal(160 + 34);
        expect(line2.p1.y, 'expect6').to.equal(120);
        expect(line2.p2.x, 'expect7').to.equal(160 + 34);
        expect(line2.p2.y, 'expect8').to.equal(80);
        //line3
        expect(line3.p1.x, 'expect9').to.equal(160 + 17);
        expect(line3.p1.y, 'expect10').to.equal(120);
        expect(line3.p2.x, 'expect11').to.equal(160 + 17);
        expect(line3.p2.y, 'expect12').to.equal(80);
      });

      it('should calculate moving down line segments correctly', function() {
        let myEntity = {x: 160, y: 80, width: 34, height: 36};
        let goingTo = {x: 160, y: 120};
        let lineSegments = rectPathing.getPathLineSegments(myEntity, goingTo);
        let line1 = lineSegments[0];
        let line2 = lineSegments[1];
        let line3 = lineSegments[2];
        expect(line1.p1.x, 'expect1').to.equal(160);
        expect(line1.p1.y, 'expect2').to.equal(116);
        expect(line1.p2.x, 'expect3').to.equal(160);
        expect(line1.p2.y, 'expect4').to.equal(156);
        //line2
        expect(line2.p1.x, 'expect5').to.equal(160 + 34);
        expect(line2.p1.y, 'expect6').to.equal(116);
        expect(line2.p2.x, 'expect7').to.equal(160 + 34);
        expect(line2.p2.y, 'expect8').to.equal(156);
        //line3
        expect(line3.p1.x, 'expect9').to.equal(160 + 17);
        expect(line3.p1.y, 'expect10').to.equal(116);
        expect(line3.p2.x, 'expect11').to.equal(160 + 17);
        expect(line3.p2.y, 'expect12').to.equal(156);
      });

      it('should calculate moving up and to the right line segments correctly', function() {
        let myEntity = {x: 160, y: 120, width: 34, height: 36};
        let goingTo = {x: 190, y: 80};
        let lineSegments = rectPathing.getPathLineSegments(myEntity, goingTo);
        let line1 = lineSegments[0];
        let line2 = lineSegments[1];
        let line3 = lineSegments[2];
        expect(line1.p1.x, 'expect1').to.equal(160 + 34);
        expect(line1.p1.y, 'expect2').to.equal(120);
        expect(line1.p2.x, 'expect3').to.equal(190 + 34);
        expect(line1.p2.y, 'expect4').to.equal(80);
        //line2
        expect(line2.p1.x, 'expect5').to.equal(160 + 34);
        expect(line2.p1.y, 'expect6').to.equal(120 + 36);
        expect(line2.p2.x, 'expect7').to.equal(190 + 34);
        expect(line2.p2.y, 'expect8').to.equal(80 + 36);
        //line3
        expect(line3.p1.x, 'expect9').to.equal(160);
        expect(line3.p1.y, 'expect10').to.equal(120);
        expect(line3.p2.x, 'expect11').to.equal(190);
        expect(line3.p2.y, 'expect12').to.equal(80);
      });

      it('should calculate moving up and to the left line segments correctly', function() {
        let myEntity = {x: 120, y: 120, width: 34, height: 36};
        let goingTo = {x: 90, y: 80};
        let lineSegments = rectPathing.getPathLineSegments(myEntity, goingTo);
        let line1 = lineSegments[0];
        let line2 = lineSegments[1];
        let line3 = lineSegments[2];
        expect(line1.p1.x, 'expect1').to.equal(120);
        expect(line1.p1.y, 'expect2').to.equal(120);
        expect(line1.p2.x, 'expect3').to.equal(90);
        expect(line1.p2.y, 'expect4').to.equal(80);
        //line2
        expect(line2.p1.x, 'expect5').to.equal(120);
        expect(line2.p1.y, 'expect6').to.equal(120 + 36);
        expect(line2.p2.x, 'expect7').to.equal(90);
        expect(line2.p2.y, 'expect8').to.equal(80 + 36);
        //line3
        expect(line3.p1.x, 'expect9').to.equal(120 + 34);
        expect(line3.p1.y, 'expect10').to.equal(120);
        expect(line3.p2.x, 'expect11').to.equal(90 + 34);
        expect(line3.p2.y, 'expect12').to.equal(80);
      });

      it('should calculate moving down and to the left line segments correctly', function() {
        let myEntity = {x: 120, y: 80, width: 34, height: 36};
        let goingTo = {x: 90, y: 120};
        let lineSegments = rectPathing.getPathLineSegments(myEntity, goingTo);
        let line1 = lineSegments[0];
        let line2 = lineSegments[1];
        let line3 = lineSegments[2];
        expect(line1.p1.x, 'expect1').to.equal(120);
        expect(line1.p1.y, 'expect2').to.equal(80);
        expect(line1.p2.x, 'expect3').to.equal(90);
        expect(line1.p2.y, 'expect4').to.equal(120);
        //line2
        expect(line2.p1.x, 'expect5').to.equal(120);
        expect(line2.p1.y, 'expect6').to.equal(80 + 36);
        expect(line2.p2.x, 'expect7').to.equal(90);
        expect(line2.p2.y, 'expect8').to.equal(120 + 36);
        //line3
        expect(line3.p1.x, 'expect9').to.equal(120 + 34);
        expect(line3.p1.y, 'expect10').to.equal(80 + 36);
        expect(line3.p2.x, 'expect11').to.equal(90 + 34);
        expect(line3.p2.y, 'expect12').to.equal(120 + 36);
      });

      it('should calculate moving down and to the right line segments correctly', function() {
        let myEntity = {x: 120, y: 80, width: 34, height: 36};
        let goingTo = {x: 150, y: 120};
        let lineSegments = rectPathing.getPathLineSegments(myEntity, goingTo);
        let line1 = lineSegments[0];
        let line2 = lineSegments[1];
        let line3 = lineSegments[2];
        expect(line1.p1.x, 'expect1').to.equal(120 + 34);
        expect(line1.p1.y, 'expect2').to.equal(80);
        expect(line1.p2.x, 'expect3').to.equal(150 + 34);
        expect(line1.p2.y, 'expect4').to.equal(120);
        //line2
        expect(line2.p1.x, 'expect5').to.equal(120 + 34);
        expect(line2.p1.y, 'expect6').to.equal(80 + 36);
        expect(line2.p2.x, 'expect7').to.equal(150 + 34);
        expect(line2.p2.y, 'expect8').to.equal(120 + 36);
        //line3
        expect(line3.p1.x, 'expect9').to.equal(120);
        expect(line3.p1.y, 'expect10').to.equal(80 + 36);
        expect(line3.p2.x, 'expect11').to.equal(150);
        expect(line3.p2.y, 'expect12').to.equal(120 + 36);
      });
    });
  });
});