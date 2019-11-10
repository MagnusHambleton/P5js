//seed = int(random(999996));
num_circles = 90; 
num_lines = 30; 
opacity = 200;
function setup() {
  createCanvas(1660, 960);
  smooth();
  pixelDensity(4);
  background('#FFFCF9');
  strokeWeight(2);
}

counter = 1;
function draw() {
  background('#FFFCF9');
  for (i = 0; i < num_circles; i++) {
    size = int(random(1,20));
    noStroke();
    fillColor = rcol();
    fillColor.setAlpha(opacity);
    fill(fillColor);
    ellipse(int(random(0,width)),int(random(0,height)), size*size, size*size);
  }
  for (i = 0; i < num_lines; i++) {
    size = int(random(5,30));
    strokeWeight(random(0,10));
    noFill();
    strokeCap(PROJECT);
    strokeColor = rcol();
    strokeColor.setAlpha(opacity);
    stroke(strokeColor);
    start = random(0,TWO_PI);
    arc_length = random(0,3*PI/2);
    arc(int(random(0,width)),int(random(0,height)), size*size, size*size, start, start+arc_length);
  }
  noisee(2, 0, 0, width, height);

  noLoop();

  function noisee(n, x, y, w, h) {
    x1 = constrain(x, 0, width);
    x2 = constrain(x+w, 0, width);
    y1 = constrain(y, 0, height);
    y2 = constrain(y+h, 0, height);
    loadPixels();
    for (j = y1; j < y2; j++) {  
      for (i = x1; i < x2; i++) {
        let col = get(i, j);
        b = random(-n, n);
        col = color(red(col)+b, green(col)+b, blue(col)+b);
        set(i, j, col);
      }
    }
    updatePixels();
  }

}
function mouseClicked() {
	draw();
}


colors = ['#2F1847', '#FF6978', '#475841', '#53DD6C', '#3F403F', '#000000','#FFFCF9'] ;
//old colors = ['#2D2615', '#19647E', '#28AFB0', '#F4D35E', '#EE964B', '#000000'] ;
function rcol() {
  index = int(random(0,colors.length));
  print(index);
  return color(colors[index]);
}
