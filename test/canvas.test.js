import { getCanvas } from '../src/canvas.js';
import { sinon } from 'sinon';
import { expect } from 'chai';

describe('canvas', function() {
  describe('getCanvas', function() {
    var fakeDocument;
    before(function() {
      fakeDocument = {
        getElementById: function(id) {
          return {
            getContext: function(type) {
              return 'blah';
            }
          }
        }
      } 
    });

    it('should return a canvas object with a draw method', function() {
      const myCanvas = getCanvas(fakeDocument);
      expect(myCanvas.drawEntities).not.undefined;
    });
  });
});
