function DrawingDNA() {
  var shapes = [];

  function getShapes() {
    return shapes;
  }

  function setShapes(values) {
    shapes = [];
    _.each(values, function(shape) {
      shapes.push(cloneShape(shape));
    });
  }

  function randomize() {
    _.times(300, function() {
      shapes.push({
        x:      Math.random(),
        y:      Math.random(),
        radius: Math.random(),
        r:      _.random(0,255),
        g:      _.random(0,255),
        b:      _.random(0,255),
        a:      Math.random()
      });
    });
  }

  function mutate() {
    _.times(50, function() {
      var randIndex = _.random(0, shapes.length-1);
      var shape = shapes[randIndex];
      var shapeKeys = Object.keys(shape);
      var randKey = shapeKeys[_.random(0, shapeKeys.length)];
      shape[randKey] *= 1+ Math.random() * 0.8 - 0.4;
    });
  }

  function crossOver(drawingDNA) {
    var crossedShapes = drawingDNA.getShapes();    
    for(var i = 0; i < crossedShapes.length; i++) {
      if(Math.random() <= 0.5) {
        shapes[i] = cloneShape(crossedShapes[i]);
      }
    }
  }

  function clone() {
    var cloned = new DrawingDNA();
    cloned.setShapes(shapes);
    return cloned;
  }

  function cloneShape(shape) { 
    var cloned = {};
    for(var k in shape) { cloned[k]=shape[k]; } 
    return cloned;
  }

  return Object.create({
    randomize: randomize,
    getShapes: getShapes,
    setShapes: setShapes,
    mutate: mutate,
    crossOver: crossOver,
    clone: clone
  });
}
