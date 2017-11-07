
function inRange(num, p1, p2) {
  let low = (p1 > p2) ? p2 : p1;
  let high = (p1 > p2) ? p1 : p2;
  return num >= low && num <= high;
}

function distance(p1, p2) {
  Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p2.y - p2.y));
}

function pointsEqual(p1, p2) {
  if (p1 && p2) {
    return p1.x === p2.x && p1.y === p2.y;
  }
  else if (p1 === undefined && p2 === undefined) {
    throw Error("Points are undefined");
  }
  else if (p1 === undefined || p2 === undefined) {
    return false;
  }
}

export { inRange, distance, pointsEqual };