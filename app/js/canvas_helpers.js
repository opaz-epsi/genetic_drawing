function getCanvas(id) {
  return document.getElementById(id);
}

function get2d(canvas) {
  return canvas.getContext("2d");
}

function getTemplateCanvas() {
  return getCanvas("template");
}

function getTemplate2d() {
  return get2d(getTemplateCanvas());
}

function getRenderCanvas() {
  return getCanvas("render");
}

function getRender2d() {
  return get2d(getRenderCanvas());
}

function loadTenplateImage(imagePath) {
  var img = new Image();
  img.src = imagePath;
  img.onload = function() {
    var ratio =  getTemplateCanvas().height / img.height;
    getTemplate2d().drawImage(img, 0, 0, img.width*ratio, img.height*ratio );
  };
}

function drawCircle(canvas, x, y, radius, r, g, b, a) {
  var ctx = get2d(canvas);
  ctx.beginPath();
  ctx.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
  ctx.strokeStyle = ctx.fillStyle; 
  ctx.arc(
      x*canvas.width,
      y*canvas.height,
      radius*canvas.width/2,
      0,2*Math.PI
  );
  ctx.fill();
  ctx.stroke();
}

function matchingScore(canvas1, canvas2) {
  var  p1 = get2d(canvas1).getImageData(0, 0, canvas1.width, canvas1.height).data;

  var  p2 = get2d(canvas2).getImageData(0, 0, canvas2.width, canvas2.height).data;

  var score = 0;
  for(var i = 0; i < p1.length; i+=4) {
    var dist = (p1[i] - p2[i]) * (p1[i] - p2[i]) +
      (p1[i+1] - p2[i+1]) * (p1[i+1] - p2[i+1]) +
      (p1[i+2] - p2[i+2]) * (p1[i+2] - p2[i+2]) +
      (p1[i+3] - p2[i+3]) * (p1[i+3] - p2[i+3]);
    score += dist;
  }
  return score;
}
