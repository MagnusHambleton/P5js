// function setup() {
//   var cnv = createCanvas(displayWidth,displayHeight);
//   //cnv.parent(document.getElementById('markdown'));
//   frameRate(60);
//   background('#F1F2ED');
// }

// function draw() {
// 	split_into_grid(0,0,width, height,0);
// 	variable_grainsize(3, 3);
//     variable_grainsize(1, 4);
//   	variable_grainsize(2, 4);
// 	noLoop();
// }


function rcol() {
  var index = int(random(0,colors.length));
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

function mousePressed() {
  draw();
}

function setup() {
  var cnv = createCanvas(displayWidth,displayHeight);
  //cnv.parent(document.getElementById('markdown'));
  frameRate(60);
  background('#F1F2ED');
	colors = ['#4A71C0','#F0D32D','#AB3A2C'];
	segProb = 0.5;
	colourProb = 0.1;
}


function draw() {
  background(255);
  fill(255);
  rect(0,0,width,height);
  strokeWeight(2);
  horDivide(0,0, height, width);
  /* for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      noFill();
      rect(i*width/3, j* height/3, width/3, height/3);
      horDivide(i*width/3, j* height/3, width/3, height/3);
    }
  }
  */
  	variable_grainsize(3, 3);
    variable_grainsize(1, 4);
  	variable_grainsize(2, 4);
  noLoop();
}

function keyPressed() {
  fill(255);
  rect(0,0,width,height);
  redraw();
}



function horDivide(startingX, startingY, rectHeight, rectWidth) {

  if (rectWidth > 50) {
    var horSegments = int(random(3,7));
    var segWidth = rectWidth/horSegments;
    var xPos = startingX;

    for (var i = 0; i < horSegments; i++) {
      print(horSegments);
      if(random(0,1)<segProb && (xPos + segWidth) < (startingX + rectWidth)) {
        if (random(0,1)<colourProb) {
          var colour = rcol();
          fill(colour);
          rect(xPos, startingY, segWidth, rectHeight);
          noFill();
        } else { 
          noFill();
          rect(xPos, startingY, segWidth, rectHeight);
          vertDivide(xPos, startingY, rectHeight, segWidth);
        }
        segWidth = rectWidth/horSegments;
        xPos = xPos + segWidth;
        xPos = constrain(xPos, startingX, startingX+rectWidth);
      } else {
        segWidth = segWidth + rectWidth/horSegments;
      }
    }
  }
}

function vertDivide(startingX, startingY, rectHeight, rectWidth) {
  if (rectHeight > 50) {
    var vertSegments = int(random(3,7));
    var segHeight = rectHeight/vertSegments;
    var yPos = startingY;
    for (var i = 0; i < vertSegments; i++) {
      
      if(random(0,1)<segProb && (yPos + segHeight) < (startingY + rectHeight)) {
        if (random(0,1)<colourProb) {
          var colour = rcol();
          fill(colour);
          rect(startingX, yPos, rectWidth, segHeight);
        } else { 
          noFill();
          rect(startingX, yPos, rectWidth, segHeight);
          horDivide(startingX, yPos, segHeight, rectWidth);
       }
        segHeight = rectHeight/vertSegments;
        yPos = yPos + segHeight;
        yPos = constrain(yPos, startingY, startingY+rectHeight);
      } else {
      segHeight = segHeight + rectHeight/vertSegments;
      }
    }
  }
}
