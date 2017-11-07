import { model } from '../databinding/model.js';

// Add drawable props onto an object
var addDrawable = function(newDrawable) {
  newDrawable.x = 0;
  newDrawable.y = 0;
  newDrawable.width = 0;
  newDrawable.height = 0;
  newDrawable.imageLoaded = false;

  newDrawable.loadImage = function(path) {
    const image = new Image();
    image.onload = function() { this.imageLoaded = true; console.log('onLoadCallback: ', this); }.bind(this);
    image.src = path;
    this.image = image;
  }

  newDrawable.getDrawParameters = function() {
    return [this.image, this.x, this.y, this.width, this.height];
  }
  return newDrawable;
}

// Create a new drawable
var createDrawable = function() {
  var x, y, width, height;
  var imageLoaded = false;

  return {
    loadImage: function(path) {
      const image = new Image();
      image.onload = this.onImageLoaded;
      image.src = path;
      this.image = image;
    },

    onImageLoaded: function() {
      debugger;
      imageLoaded = true;
      console.log('image loaded! ', this);
    },

    getDrawParameters: function() {
      return [this.image, this.x, this.y, this.width, this.height];
    },

    getImageLoaded: function() {
      return imageLoaded;
    },

    setX: function(newX) {
      x = newX;
    },

    getX: function() {
      return x;
    },

    setY: function(newY) {
      y = newY;
    },

    getY: function() {
      return y;
    },

    setWidth: function(newWidth) {
      width = newWidth;
    },

    getWidth: function() {
      return width;
    },

    setHeight: function(newHeight) { 
      height = newHeight;
    },

    getHeight: function() {
      return height;
    },
  };
}

export { addDrawable, createDrawable };