var createModel = function() {
  var callbacksByPropertyName = {};
  
  var dispatchPropertyChange = function(changedProperty) {
    const callbackArray = callbacksByPropertyName[changedProperty];
    if (callbackArray) {
      callbackArray.forEach(function(callback) {
        callback.call();
      }, this);
    }
  }

  return {
    addListener: function(propertyName, callback) {
      if (!callbacksByPropertyName[propertyName]) {
        callbacksByPropertyName[propertyName] = [callback];
      }
      else {
        callbacksByPropertyName[propertyName].push(callback);
      }
    },

    removeListener: function(propertyName, callback) {
      if (!callbacksByPropertyName[propertyName]) {
        return;
      }
      let callbackList = callbacksByPropertyName[propertyName];
      callbackList.splice(callbackList.indexOf(callback), 1);
    },

    removeAll: function(propertyName) {
      if (!callbacksByPropertyName[propertyName]) {
        return;
      }
      delete callbacksByPropertyName[propertyName];
    },

    set: function(propertyName, newValue) {
      if (this[propertyName] != newValue) {
        this[propertyName] = newValue;
        dispatchPropertyChange(propertyName);
      }
    },

    get: function(propertyName) {
      return this[propertyName];
    },
  } 
}

export { createModel };


