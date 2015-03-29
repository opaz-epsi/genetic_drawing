function DrawingDNA() {
  var MUTATIONS_COUNT = 10;
  var shapesCount = 4;

  var shapes = [];

  function getShapes() {
    return shapes;
  }

  function setShapes(values) {
    shapes = [];
    _.each(values, function(shape) {
      shapes.push(shape.clone());
    });
  }

  function randomize() {
    _.times(shapesCount, function() {
      shapes.push(new Circle());
    });
  }

  function mutate() {
    var randIndex = _.random(0, shapes.length);
    _.times(MUTATIONS_COUNT, function() {
      if(randIndex === shapes.length) {
        shapesCount+=1;
        shapes.push(new Circle());
        randIndex = _.random(0, shapes.length);
      } else {
        shapes[randIndex].randomizeRandomKey();
      }
    });
  }

  function crossOver(drawingDNA) {
    var crossedShapes = drawingDNA.getShapes();    
    for(var i = 0; i < crossedShapes.length; i++) {
      if(Math.random() <= 0.5) {
        var crossedShape = crossedShapes[i];
        if(crossedShape) {
          shapes[i] = crossedShape.clone();
        } 
      }
    }
  }

  function clone() {
    var cloned = new DrawingDNA();
    cloned.setShapes(shapes);
    return cloned;
  }

  function render(canvas) {
    get2d(canvas).clearRect ( 0, 0, canvas.width, canvas.height);
    _.each(shapes, function(shape) {
      shape.draw(canvas);
    });  
  }

  return Object.create({
    randomize: randomize,
    getShapes: getShapes,
    setShapes: setShapes,
    mutate: mutate,
    crossOver: crossOver,
    clone: clone,
    render: render
  });
}
