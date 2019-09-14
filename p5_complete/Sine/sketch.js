let xspacing = 8; // Distance between each horizontal location
let w; // Width of entire wave
let maxwaves = 30; // total # of waves to add together

let theta = 0.0;
let amplitude = new Array(maxwaves); // Height of wave
// Value for incrementing X, to be calculated
// as a function of period and xspacing
let omega = new Array(maxwaves);
let wave_number = new Array(maxwaves);
// Using an array to store height values
// for the wave (not entirely necessary)
let xvalues;
let most_recent_yvalues;
let wave_y;
let history = [];
let wave_vel = 0;
let shown_history = 10;

function setup() {
	pixelDensity(2);
  createCanvas(displayWidth, displayHeight);
  frameRate(60);
  colorMode(RGB, 255, 255, 255, 100);
  w = width + 16;
  wave_y = height/2;
  for (let i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10, 30); // set up waves with random properties
    omega[i] = random(0, 0.2);
    wave_number[i] = TWO_PI/random(50,700);
  }

  xvalues = new Array(floor(w / xspacing));
  for (let i = 0; i < xvalues.length; i++) { // set up x values for which to render waves (full domain)
    xvalues[i] = -8+i*xspacing;
  }
}

function draw() {
  background(0,0,0);
  calcWave();
  renderWave();
  wave_y = wave_y+wave_vel; // float waves vertically
  wave_vel += randomGaussian()-((wave_y-height/2))/300;
}

function calcWave() {
  // Set all height values to zero
  let yvalues = new Array(floor(w / xspacing));
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = wave_y;
  }

  // Accumulate wave height values
  t = frameCount;
  for (let j = 0; j < maxwaves; j++) {
    for (let i = 0; i < yvalues.length; i++) {
      // Every other wave is cosine instead of sine
      if (j % 2 == 0) yvalues[i] += sin(wave_number[j] * xvalues[i] - omega[j] * t ) * amplitude[j];
      else yvalues[i] += cos(wave_number[j] * xvalues[i] - omega[j] * t ) * amplitude[j];
    }
  }
  most_recent_yvalues = yvalues;
  if (t%2 == 1) {
  	history.push(yvalues);
  	if (history.length > shown_history) history.splice(0,1);
  }
}

function renderWave() {
  // A simple way to draw the wave with an ellipse at each location

  // draw history 
  for (let i = 0; i < history.length; i++) {
  	color = int((i+1)/history.length*255);
  	stroke(color);
	  for (let x = 0; x < xvalues.length-3; x++) {
	  	c1_x = xvalues[x];
	  	p1_x = xvalues[x+1];
	  	p2_x = xvalues[x+2];
	  	c2_x = xvalues[x+3];

	  	// draw most recent curve at the very top
	  	c1_y = history[i][x];
	  	p1_y = history[i][x+1];
	  	p2_y = history[i][x+2];
	  	c2_y = history[i][x+3];
	  	curve(c1_x, c1_y, p1_x, p1_y, p2_x, p2_y, c2_x, c2_y);
	  	//bezier(c1_x, c1_y,p1_x, p1_y, p2_x, p2_y,c2_x, c2_y);
	  }
	}
  stroke(255);
  for (let x = 0; x < xvalues.length-3; x++) {
	  c1_x = xvalues[x];
	  p1_x = xvalues[x+1];
	  p2_x = xvalues[x+2];
	  c2_x = xvalues[x+3];

  	// draw most recent curve at the very top
  	c1_y = most_recent_yvalues[x];
  	p1_y = most_recent_yvalues[x+1];
  	p2_y = most_recent_yvalues[x+2];
  	c2_y = most_recent_yvalues[x+3];
  	curve(c1_x, c1_y, p1_x, p1_y, p2_x, p2_y, c2_x, c2_y);
	  //bezier(c1_x, c1_y,p1_x, p1_y, p2_x, p2_y,c2_x, c2_y);
  }
}
