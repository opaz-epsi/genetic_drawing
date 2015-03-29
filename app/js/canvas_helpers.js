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

function rgb2hsv () {
  var rr, gg, bb,
  r = arguments[0] / 255,
  g = arguments[1] / 255,
    b = arguments[2] / 255,
    h, s,
      v = Math.max(r, g, b),
      diff = v - Math.min(r, g, b),
        diffc = function(c){
          return (v - c) / 6 / diff + 1 / 2;
        };

  if (diff === 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(r);
    gg = diffc(g);
    bb = diffc(b);

    if (r === v) {
      h = bb - gg;
    }else if (g === v) {
      h = (1 / 3) + rr - bb;
    }else if (b === v) {
      h = (2 / 3) + gg - rr;
    }
    if (h < 0) {
      h += 1;
    }else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
}

function matchingScore(canvas1, canvas2) {
  var  p1 = get2d(canvas1).getImageData(0, 0, canvas1.width, canvas1.height).data;

  var  p2 = get2d(canvas2).getImageData(0, 0, canvas2.width, canvas2.height).data;

  var score = 0;
  for(var i = 0; i < p1.length; i+=4) {
    hsv1 = rgb2hsv(p1[i], p1[i+1], p1[i+2]);
    hsv2 = rgb2hsv(p2[i], p2[i+1], p2[i+2]);
    var dist = (hsv1.h - hsv2.h) *  (hsv1.h - hsv2.h) +
      (hsv1.s - hsv2.s) *  (hsv1.s - hsv2.s) +
      (hsv1.v - hsv2.v) *  (hsv1.v - hsv2.v);

    dist += (p1[i] - p2[i]) * (p1[i] - p2[i]) +
      (p1[i+1] - p2[i+1]) * (p1[i+1] - p2[i+1]) +
      (p1[i+2] - p2[i+2]) * (p1[i+2] - p2[i+2]); 
    score += dist;
  }
  return score;
}

