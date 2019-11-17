
function setup() {
  var cnv = createCanvas(displayWidth,displayHeight);
  //cnv.parent(document.getElementById('markdown'));
  background('#F1F2ED');
  starting_drift=0.2;
  resolution = 1;
  x_points = [];
  for(var i = 0; i < resolution * (width+200); i++) {
    x_points[i]= (width+200)*(i) /(resolution * (width+200)) -100;
  }
  pixelDensity(4);
  console.log("width is " + width + " and largest x is " + max(x_points));
  console.log("smallest x is " + min(x_points))
  console.log(x_points);
}

function draw() {
  num_lines = 60;
  curves = [];
  for(var i=0; i<num_lines; i++) {
    var momentum = 2*(i-num_lines/2)/(2*num_lines);
    var drift = 0.01;//abs(i-num_lines/2)/1000;
    curves[i] = new curve_shape(height/2, momentum, drift);
    curves[i].display();
  }
  noLoop();

}



class curve_shape {
  constructor(y_starting, starting_momentum, starting_drift) {
    this.drift = starting_drift;
    this.momentum = starting_momentum;
    this.y_points = [];
    this.y_points[0] = y_starting;
    for(var i=1; i < resolution * (width+200); i++) {
      this.y_points[i] = this.y_points[i-1] + this.momentum;
      this.momentum += random(-1,1) * this.drift;
    }
    this.color = rcol();
    //sconsole.log(this.color);
    //console.log(this.y_points);
  }

  display() {
    fill(this.color);
    beginShape();
    curveVertex(-100,height+100);
    curveVertex(-100,height+100);
    noStroke();
    for(var i = 0; i < this.y_points.length-1; i++) {
      curveVertex(x_points[i], this.y_points[i])
    }
    vertex(x_points[x_points.length-1],this.y_points[this.y_points.length-1])
    console.log(this.color)
    vertex(width+200,height+200);
    vertex(width+200,height+100);
    endShape(CLOSE);
    noFill();
  }
}

hilma_colors = ['#314290','#4A71C0','#F0D32D','#AB3A2C'];
function rcol() {
  var index = int(random(0,hilma_colors.length));
  print(index);
  return color(hilma_colors[index]);
}

function variable_grainsize(grain_size,amount) {
  let d = pixelDensity()*grain_size;
  adjusted_width = width/grain_size;
  adjusted_height = height/grain_size;
  loadPixels();
  for (let x_coord = 0; x_coord < adjusted_width; x_coord++) {
    for (let y_coord = 0; y_coord < adjusted_height; y_coord++) {
      b_r = random(-amount,amount);
      b_g = random(-amount,amount);
      b_b = random(-amount,amount);
      b_a = 0;
      for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
          // loop over
          index = 4 * ((y_coord * d + j) * width * d + (x_coord * d + i));
          pixels[index] = pixels[index]+b_r;
          pixels[index+1] = pixels[index+1]+b_g;
          pixels[index+2] = pixels[index+2]+b_b;
          pixels[index+3] = pixels[index+3]+b_a;
        }
      }
    }
  }
  updatePixels();
}