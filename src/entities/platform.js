
function Platform(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.fillStyle = 'blue';
}

Platform.prototype.getDrawParameters = function() {
  return [this.x, this.y, this.width, this.height];
};

Platform.prototype.getLineSegments = function() { 
  let topLeft = {x: this.x, y: this.y};
  let topRight = {x: this.x + this.width, y: this.y};
  let bottomLeft = {x: this.x, y: this.y + this.height};
  let bottomRight = {x: this.x + this.width, y: this.y + this.height};
  return [{p1: topLeft, p2: topRight},
          {p1: topLeft, p2: bottomLeft},
          {p1: bottomLeft, p2: bottomRight},
          {p1: bottomRight, p2: topRight}];
}

Platform.prototype.getTopEdge = function() {
  return {p1: {x: this.x, y: this.y}, p2:{x: this.x + this.width, y: this.y}};
}

function newPlatform(x, y, width, height) { 
  return new Platform(x, y, width, height);
}

export { newPlatform };