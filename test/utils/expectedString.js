
function expectedPointString(expectedPoint, actualPoint) {
  return `expected: x:${expectedPoint.x}, y:${expectedPoint.y}, actual: x:${actualPoint.x}, y:${actualPoint.y}`;
}

export { expectedPointString };