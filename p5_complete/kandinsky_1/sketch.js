//seed = int(random(999996));
num_shapes = 100; 
opacity = 200;
density = 4;
function setup() {
  var cnv = createCanvas(displayWidth,displayHeight);
  //cnv.parent(document.getElementById('markdown'));
  smooth();
  pixelDensity(density);
  background('#f5f2e6');
  strokeWeight(2);
  rectMode(CENTER);
}

counter = 1;
function draw() {
  //draw_gradientshape(color('#D1AE45'), width/2, height/2, 400, 100, 'square');
  
  for (i = 0; i < num_shapes; i++) {
    var size = int(random(10,20));
    noStroke();
    var col = rcol();
    col.setAlpha(opacity);
    var thickness = random(0,size/2);
    thickness = thickness*thickness;
    var shape = random(['circle', 'arc', 'square']);
    draw_gradientshape(col,int(random(0,width)),int(random(0,height)), size*size, thickness, shape);
    console.log(shape);
  }
  variable_grainsize(5,3);
  variable_grainsize(1,3);
  variable_grainsize(2,3);

  function noisee(n, x, y, w, h) {
    x1 = constrain(x, 0, width);
    x2 = constrain(x+w, 0, width);
    y1 = constrain(y, 0, height);
    y2 = constrain(y+h, 0, height);
    // for (j = y1; j < y2; j+=0.25) {  
    //   for (i = x1; i < x2; i+=0.25) {
    //     let col = get(i, j);
    //     b = random(-n, n);
    //     col = color(red(col)+b, green(col)+b, blue(col)+b);
    //     set(i, j, col);
    //   }
    // }
    loadPixels();
    let d = pixelDensity();
    for (yj = y1; yj < y2; yj++) {  
      for (xi = x1; xi < x2; xi++) {
        for (let i = 0; i < d; i++) {
          for (let j = 0; j < d; j++) {
            // loop over
            b = random(-n, n);
            index = 4 * ((yj * d + j) * width * d + (xi * d + i));
            pixels[index] += b;
            pixels[index+1] += b;
            pixels[index+2] += b;
            pixels[index+3] += b;
          }
        }
      }
    }
    updatePixels();
    console.log('finished');
  }

  noLoop();

}

function draw_gradientshape(starting_color, x_pos, y_pos, d, thickness, shape) {
  var red_col = red (starting_color );
  var green_col = green( starting_color );
  var blue_col = blue( starting_color );
  var step_size = (255-min( red_col,green_col, blue_col )) / (thickness*4);
  // make the gradient randomly fade darker or lighter
  if(random(0,1)<0.5) { step_size = step_size * -1; }
  
  start_angle = random(0,TWO_PI);
  stop_angle = random(start_angle,TWO_PI);

  for( let r = d; r > d-thickness; r--) {
    var col = color(red_col, green_col, blue_col);
    draw_shape(col, x_pos, y_pos, r, shape, start_angle, stop_angle);
    red_col = min(255, red_col + step_size);
    green_col = min(255, green_col + step_size);
    blue_col = min(255, blue_col + step_size);
  }
  //fill('#f5f2e6');
  //draw_shape('#f5f2e6',x_pos, y_pos, d - thickness*2, shape);
  
  function draw_shape(color, x_pos, y_pos, shape_size, shape, start_angle, stop_angle) {
    stroke(color);
    strokeWeight(2);
    noFill();

    if(shape === 'circle') {
      arc(x_pos, y_pos, shape_size, shape_size, 0, TWO_PI*2);
    } if (shape === 'arc') {
      arc(x_pos, y_pos, shape_size, shape_size, start_angle, stop_angle);
    } if (shape === 'square') {
      rect(x_pos, y_pos, shape_size, shape_size);
    }
    noStroke();
  }
}

function mouseClicked() {
  if(mouseX>0 && mouseY>0 && mouseX<width && mouseY<height) {
    draw();
  }
}


//old colors = ['#2D2615', '#19647E', '#28AFB0', '#F4D35E', '#EE964B', '#000000'] ;
function rcol() {
  colors = ['#f5f2e6','#040204','#306dc9','#D1AE45','#b53012'];
  index = int(random(0,colors.length));
  print(index);
  return color(colors[index]);
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
