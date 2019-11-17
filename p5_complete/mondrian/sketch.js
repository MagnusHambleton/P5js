function setup() {
  var cnv = createCanvas(displayWidth,displayHeight);
  //cnv.parent(document.getElementById('markdown'));
  frameRate(60);
  background('#F1F2ED');
}
color_probability = 0.1;

function draw() {
	split_into_grid(0,0,width, height,0);
	variable_grainsize(3, 3);
    variable_grainsize(1, 4);
  	variable_grainsize(2, 4);
	noLoop();
}

function split_into_grid(start_x, start_y, end_x, end_y, depth) {
	var grid_height = end_y - start_y;
	var grid_width = end_x - start_x
	var lh_ratio = grid_width / grid_height;
	var width_cubes = int( random( 1, 5));
	var height_cubes = int( random( 1, 5)/lh_ratio);
	console.log('width'+ width_cubes);
	console.log('height'+ height_cubes);
	console.log('depth' + depth);
	var rect_length = grid_width / width_cubes;
	var rect_height = grid_height / height_cubes;
	noFill();
	stroke(0);
	strokeWeight(2);
	var rect_x = start_x;
	var rect_y = start_y;
	var depth = depth;
	for(var i=0; i < height_cubes; i++) {
		for(var j=0; j < width_cubes; j++) {
			if(depth<2) {
				split_into_grid(rect_x, rect_y, rect_x+rect_length, rect_y+rect_height, depth+1);
				rect(rect_x, rect_y, rect_length, rect_height);
			} else {
				if(random(0,1)<color_probability) {
					fill(rcol());
				} else {
					noFill();
				}
				rect(rect_x, rect_y, rect_length, rect_height);
			}
			rect_x += rect_length;
		}
		rect_x = start_x;
		rect_y += rect_height;
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

function mousePressed() {
  draw();
}