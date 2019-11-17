function setup() {
  createCanvas(displayWidth, displayHeight);
  //cnv.parent(document.getElementById('markdown'));
  smooth();
  pixelDensity(4);
  noStroke();
  background('#f5f2e6');
}

function draw() {

  // this part is for making the canvas rotate 90 degrees in case the screen is vertical (e.g. mobile)
  if(displayWidth<displayHeight) {
    canvas_height = displayWidth;
    canvas_width = displayHeight;
    rotate(HALF_PI);
    translate(0,-displayWidth);
  } else {
    canvas_height = displayHeight;
    canvas_width = displayWidth;
  }

  // this part sets how many circles will be generate and how big they will be
  fill(0);
  let num_circles = int(random(5,15));
  console.log(num_circles);
  let diameter_diff = (canvas_height*0.75)/num_circles;
  let diameter = canvas_height*0.8;

  while (diameter>canvas_height*0.05) {
    shape_thickness = random()>0.5? diameter_diff : diameter_diff*2;
    var col = rcol();
    draw_gradientshape(col,canvas_width/2,canvas_height/2, diameter, shape_thickness, 'circle')
    if (random()<0.5) {
      arc_thickness = random()>0.5? diameter_diff : diameter_diff*2;
      col = rcol();
      draw_gradientshape(col,canvas_width/2,canvas_height/2, diameter, arc_thickness, 'arc')
    } 
    if (shape_thickness === diameter_diff*2 && random()<0.5) {
      arc_thickness = random()>0.5? diameter_diff : diameter_diff*2;
      col = rcol();
      draw_gradientshape(col,canvas_width/2,canvas_height/2, diameter-diameter_diff, arc_thickness, 'arc')
    }
    diameter -=shape_thickness;
  }

  fill('#232224')
  rect(canvas_width/2-5, canvas_height/2-10, 10, canvas_height/2+10);

  //draw_gradientshape('#306dc9', width/2, height/2, diameter, 100, 'arc')

  // generates noise to add texture to the picture
  noisee(10, 0, 0, canvas_width, canvas_height);
  
  function noisee(n, x, y, w, h) {
    var x1 = constrain(x, 0, canvas_width);
    var x2 = constrain(x+w, 0, canvas_width);
    var y1 = constrain(y, 0, canvas_height);
    var y2 = constrain(y+h, 0, canvas_height);
    loadPixels();
    for (j = 0; j < pixels.length; j+=4) {
      pixels[j] = pixels[j]+random(-n, n);
      pixels[j + 1] = pixels[j+1]+random(-n, n);
      pixels[j + 2] = pixels[j+2]+random(-n, n);
      pixels[j + 3] = pixels[j+3]+random(-n, n);
    }
    updatePixels();
  }
  variable_grainsize(3, 3);
  variable_grainsize(1, 4);
  variable_grainsize(2, 4);

  noLoop();
}

function draw_gradientshape(starting_color, x_pos, y_pos, d, thickness, shape) {
  var red_col = red (starting_color );
  var green_col = green( starting_color );
  var blue_col = blue( starting_color );
  var step_size = (255-min( red_col,green_col, blue_col )) / (thickness*4);

  for( let r = d; r > d-thickness; r--) {
    var col = color(red_col, green_col, blue_col);
    draw_shape(col, x_pos, y_pos, r, shape);
    red_col = min(255, red_col + step_size);
    green_col = min(255, green_col + step_size);
    blue_col = min(255, blue_col + step_size);
  }
  //fill('#f5f2e6');
  //draw_shape('#f5f2e6',x_pos, y_pos, d - thickness*2, shape);
  
  function draw_shape(color, x_pos, y_pos, shape_size, shape) {
    stroke(color);
    strokeWeight(2);
    noFill();
    if(shape === 'circle') {
      arc(x_pos, y_pos, shape_size, shape_size, 0, TWO_PI*2);
    } if (shape === 'arc') {
      arc(x_pos, y_pos, shape_size, shape_size, -HALF_PI, HALF_PI);
    }
    noStroke();
  }
}

// color array and function to return a random one from the array
hilma_colors = ['#f5f2e6','#040204','#306dc9','#D1AE45','#b53012'];
function rcol() {
  var index = int(random(0,hilma_colors.length));
  print(index);
  return color(hilma_colors[index]);
}

// function to add noise at an arbitrary grain size 
// i.e. not just at the pixel level, but also at higher levels if wanted
function variable_grainsize(grain_size,amount) {
  let d = pixelDensity()*grain_size;
  var adjusted_width = canvas_width/grain_size;
  var adjusted_height = canvas_height/grain_size;

  loadPixels();
  for (let x_coord = 0; x_coord < adjusted_width; x_coord++) {
    for (let y_coord = 0; y_coord < adjusted_height; y_coord++) {
      var b_r = random(-amount,amount);
      var b_g = random(-amount,amount);
      var b_b = random(-amount,amount);
      var b_a = 0;
      for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
          // loop over
          var index = 4 * ((y_coord * d + j) * width * d + (x_coord * d + i));
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


function mouseClicked() {
  if(mouseX>0 && mouseY>0 && mouseX<width && mouseY<height) {
    draw();
  }
}