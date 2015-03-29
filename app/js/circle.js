function Circle() {
  var values = {
    'x': 0,
    'y': 0,
    'radius': 0,
    'r': 0,
    'g': 0,
    'b': 0,
    'a': 0
  };

  function setValues(v) {
    values = {};
    for(var k in v) { values[k]=v[k]; } 
  }

  function clone() {
    var c = new Circle();
    c.setValues(values);

    return c;
  }

  function randomizeValue(key) {
    switch(key) {
      case "r":
      case "g":
      case "b":
        values[key] = _.random(0, 255);
        break;

      default:
        values[key] = Math.random();
        break;
    }
  }

  function randomize() {
    for(var key in values) {
      randomizeValue(key);
    }
  }

  function randomizeRandomKey() {
    var keys = Object.keys(values);
    var key = keys[_.random(0, keys.length-1)];
    randomizeValue(key);
  }

  function draw(canvas) {
    var ctx = get2d(canvas);
    ctx.beginPath();
    ctx.fillStyle = "rgba("+values.r+","+values.g+","+values.b+","+values.a+")";
    ctx.strokeStyle = ctx.fillStyle; 
    ctx.arc(
        values.x*canvas.width,
        values.y*canvas.height,
        values.radius * canvas.width,
        0,2*Math.PI
        );
    ctx.fill();
    ctx.stroke();
  }

  randomize();
  return {
    setValues: setValues,
    clone: clone,
    randomizeRandomKey: randomizeRandomKey,
    draw:draw
  };
}
