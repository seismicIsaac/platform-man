
function newline() {
  if (arguments.length === 4) {
    return newlineWithCoords(arguments[0], arguments[1], arguments[2], arguments[3]);
  }
  else if (arguments.length === 2) {
    return newlineWithPoints(arguments[0], arguments[1]);
  }
  else {
    throw 'Improper number of arguments. Please specify 4 ints, (x1, y1, x2, y2), or 2 points.';
  }
}

function newlineWithCoords(x1, y1, x2, y2) {
  return {p1: {x: x1, y: y1}, p2: {x: x2, y: y2}};
}

function newlineWithPoints(p1, p2) {
  return {p1: p1, p2: p2};
}

export { newline };