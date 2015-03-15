var DRAWINGS_COUNT = 40;
var drawings = [];

function generateDrawings() {
  drawings = [];
  _.times(DRAWINGS_COUNT, function() {
    var drawing = new DrawingDNA();
    drawing.randomize();
    drawings.push(drawing);
  });
}

function scoreDrawings() {
  for(var i = 0; i < drawings.length; i++) {
    var drawing = drawings[i];
    if(!drawing.score) {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.height = '320';
    canvas.width = '200';

    renderDrawing(drawing, canvas);
    drawing.score = matchingScore(getTemplateCanvas(), canvas);
    document.body.removeChild(canvas);
    }
 }
}

function selectDrawings() {
  var sorted = _.sortBy(drawings, "score");
  console.log(_.pluck(sorted, "score"));
  return _.first(sorted, 10); 
}

function crossOverAndMutate(selected) {
  console.log(selected.length);
  drawings = selected;
  console.log(drawings.length);
  _.times(20, function() {
    var mutated = selected[_.random(0, selected.length-1)].clone();
    mutated.mutate();
    mutated.score = null;
    drawings.push(mutated);
  });
  console.log(drawings.length);
  _.times(DRAWINGS_COUNT - drawings.length, function() {
    var crossed1 = selected[_.random(0, selected.length-1)].clone();
    var crossed2 = selected[_.random(0, selected.length-1)];
    crossed1.crossOver(crossed2);
    crossed1.score = null;
    drawings.push(crossed1);
  });
  console.log(drawings.length);
}


function renderDrawing(drawing, canvas) {
  _.each(drawing.getShapes(), function(shape) {

    drawCircle(
          canvas,
          shape.x,
          shape.y,
          shape.radius,
          shape.r,
          shape.g,
          shape.b,
          shape.a
        );

  });  
}

var processing = false;

function init() {
  loadTenplateImage("img/joconde.jpg");
  generateDrawings();
  var count = 0;

  var update = setInterval(function() {
    if(!processing) {
    count++;
    console.log("generation : " + count);
    nextGeneration();
    console.log(drawings[0].score);
    getRender2d().clearRect ( 0 , 0 , getRenderCanvas().width, getRenderCanvas().height );
    renderDrawing(drawings[0], getRenderCanvas());
    }  
},1000/15);
}

function nextGeneration() {
  processing = true;
  scoreDrawings();
  crossOverAndMutate(selectDrawings());
  processing = false;
}
