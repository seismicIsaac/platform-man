import { platform, newPlatform } from '../../src/entities/platform.js';
import { expect } from 'chai';

describe('platform', function() {
  describe('getLineSegments', function() {
    it('should return 4 line segments', function() {
      const platform1 = newPlatform(1, 2, 3, 5);
      const lineSegments = platform1.getLineSegments();
      expect(lineSegments.length).to.equal(4); 
    });
  });
});