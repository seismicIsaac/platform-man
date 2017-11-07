import { createModel } from '../../src/databinding/model.js';
import { expect } from 'chai';

describe('model', function() {
  it('createModel should return an object that is not null', function() {
    let myObject = createModel();
    expect(myObject.addListener).not.undefined;
    expect(myObject.removeListener).not.undefined;
    expect(myObject.removeAll).not.undefined;
    expect(myObject.get).not.undefined;
    expect(myObject.set).not.undefined;
  });

  describe('addListener', function() {
    it('should should correctly add a callback to the model object', function() {
      let myObject = createModel();
      myObject.addListener('hello', function() { myObject.favorite = 5 });
      myObject.set('hello', 4);
      expect(myObject.favorite).to.equal(5);
    });
  })

  describe('removeListener', function() {
    it('remove listener should remove the given listener from the model object', function() {
      let myObject = createModel();
      let myFunction = function() { myObject.favorite = 5};
      myObject.favorite = 3;
      myObject.addListener('hello', myFunction);
      myObject.removeListener('hello', myFunction);
      myObject.set('hello', 4);
      expect(myObject.favorite).to.equal(3);
    });

    it('remove listener removes the correct listener', function() { 
      let myObject = createModel();
      let myFunction = function() { myObject.favorite = 5; };
      let myFunction2 = function() { myObject.howdy = 'why'; };
      myObject.favorite = 3;
      myObject.howdy = 'thank ya mam';
      myObject.addListener('hello', myFunction);
      myObject.addListener('hello', myFunction2);
      myObject.removeListener('hello', myFunction);
      myObject.set('hello', 4);
      expect(myObject.favorite).to.equal(3);
      expect(myObject.howdy).to.equal('why');
    });
  });

  describe('removeAll', function() {
    it('remove all should remove all listeners for a given property', function() { 
      let myObject = createModel();
      let myFunction = function() { myObject.favorite = 5; };
      let myFunction2 = function() { myObject.howdy = 'why'; };
      myObject.favorite = 3;
      myObject.howdy = 'thank ya mam';
      myObject.addListener('hello', myFunction);
      myObject.addListener('hello', myFunction2);
      myObject.removeAll('hello');
      myObject.set('hello', 4);
      expect(myObject.favorite).to.equal(3);
      expect(myObject.howdy).to.equal('thank ya mam');
    });
  });

  describe('set', function() {
    it('set does not fire off an event if the value has not changed', function() {
      let myObject = createModel();
      let myFunction = function() { myObject.favorite = 5};
      myObject.favorite = 3;
      myObject.hello = 4;
      myObject.addListener('hello', myFunction);
      myObject.set('hello', 4);
      expect(myObject.favorite).to.equal(3);
    });
  });
});