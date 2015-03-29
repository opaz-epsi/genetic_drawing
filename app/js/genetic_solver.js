function GeneticSolver() {
  var DRAWINGS_COUNT = 100;
  var SELECTED_COUNT = 5;
  var MUTATED_COUNT = 80;
  var drawings = [];

  function generate() {
    drawings = [];
    _.times(DRAWINGS_COUNT, function() {
      var drawing = new DrawingDNA();
      drawing.randomize();
      drawings.push(drawing);
    });
  }

  function evaluate() {
    for(var i = 0; i < drawings.length; i++) {
      var drawing = drawings[i];
      if(!drawing.score) {
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        canvas.height = getTemplateCanvas().height;
        canvas.width = getTemplateCanvas().width;

        drawing.render(canvas);
        drawing.score = matchingScore(getTemplateCanvas(), canvas);
        document.body.removeChild(canvas);
      }
    }
  }

  function select() {
    drawings = _.sortBy(drawings, "score");
    //    console.log(_.pluck(drawings, 'score'));
    drawings =  _.first(drawings, SELECTED_COUNT); 
  }

  function crossOverAndMutate() {
    _.times(MUTATED_COUNT, function() {
      var randIndex = _.random(0, SELECTED_COUNT-1);
      var mutated = drawings[randIndex].clone();
      mutated.mutate();
      mutated.score = null;
      drawings.push(mutated);
    });

    _.times(DRAWINGS_COUNT - drawings.length, function() {
      var crossed1 = drawings[_.random(0, SELECTED_COUNT-1)].clone();
      var crossed2 = drawings[_.random(0, SELECTED_COUNT-1)];
      crossed1.crossOver(crossed2);
      crossed1.score = null;
      drawings.push(crossed1);
    });
  }

  function init() {
    generate(); 
  }

  function nextGeneration() {
    evaluate();
    select();
    crossOverAndMutate();
  }

  function bestMatch() {
    console.log(drawings[0].score);
    return drawings[0];
  }

  return {
    init: init,
    nextGeneration: nextGeneration,
    bestMatch: bestMatch,
    generate: generate   
  };
}
