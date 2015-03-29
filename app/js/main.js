var solver = new GeneticSolver();
var processing = false;

function nextGeneration() {
  processing = true;
  solver.nextGeneration(); 
  processing = false;
}

function init() {
  loadTenplateImage("img/joconde.jpg");
  solver.generate();

  var update = setInterval(function() {
    if(!processing) {
      nextGeneration();
      solver.bestMatch().render(getRenderCanvas());
    }  
  },1000/30);
}

