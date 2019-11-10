function setup() {
  // Sets the screen to be 720 pixels wide and 400 pixels high
  createCanvas(1620, 920);
  smooth();
  pixelDensity(4);
  background('#f5f2e6');
  noStroke();
}

function draw() {
  fill(0);
  let num_circles = random(5,20);
  let diameter_diff = (height-150)/num_circles;
  let diameter = height-100;

  for (var i = 0; i <=num_circles; i++) {
    fill(rcol());
    ellipse(width/2,height/2, diameter,diameter);
    if (random()<0.5) {
      fill(rcol());
      arc(width/2,height/2, diameter,diameter,PI/2,3*PI/2);
    }


    diameter -=diameter_diff;
  }
  fill('#232224')
  rect(width/2-5, height/2-10, 10, height/2+10);


  noisee(10, 0, 0, width, height);


  function noisee(n, x, y, w, h) {
    x1 = constrain(x, 0, width);
    x2 = constrain(x+w, 0, width);
    y1 = constrain(y, 0, height);
    y2 = constrain(y+h, 0, height);
    loadPixels();
    for (j = 0; j < pixels.length; j+=4) {
      pixels[j] = pixels[j]+random(-n, n);
      pixels[j + 1] = pixels[j+1]+random(-n, n);
      pixels[j + 2] = pixels[j+2]+random(-n, n);
      pixels[j + 3] = pixels[j+3]+random(-n, n);
    }
    updatePixels();
  }

  variable_grainsize(1,2);

  noLoop();

}


hilma_colors = ['#f5f2e6','#040204','#306dc9','#D1AE45','#b53012'];
function rcol() {
  index = int(random(0,hilma_colors.length));
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

//function set 