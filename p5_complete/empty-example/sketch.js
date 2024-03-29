function preload(){
  song = loadSound('assets/SwimGoodxMerival_SinceUAsked.wav');
  data = loadTable(
  'assets/CIE_table.csv',
	'csv',
	'header');
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(0,0,0);
  fft = new p5.FFT();
  song.play();
  frameRate(60);
}

function draw() {
  // background(0);
  var spectrum = fft.analyze();
  noStroke();
  //fill(0,255,0); // spectrum is green
  //for (var i = 0; i< spectrum.length; i++){
  //  var x = map(i, 0, spectrum.length, 0, width);
  //  var h = -height + map(spectrum[i], 0, 255, height, 0);
  //  rect(x, height, width / spectrum.length, h )
  //}
  //endShape();
  // calculating frequencies and brightnesses
  
  var frequencies = [];
  var amplitudes = [];
  var wavelengths = [];
  if(frameCount%2==1) {
  	//console.log(spectrum);
  	var b = Math.log(1000)/2000.0;
  	var a = 20;
  	var upper=680;
	  var lower=380;
	  var log_20khz = Math.log(20000);
	  var log_20hz = Math.log(20);
  	for (var i=0; i < 2000; i++) {
  	  var low = a*Math.exp(b*i);
  	  var high = a*Math.exp(b*(i+1));
  	  frequencies[i] = low;
  	  amplitudes[i] = fft.getEnergy(low,high);
      wavelengths[i] = lower + (upper-lower) * (log_20khz - Math.log(frequencies[i]))/(log_20khz-log_20hz)
    }
    console.log(frequencies);
    console.log(amplitudes);
    //console.log(wavelengths);
    background(0);
    for (var i = 0; i< amplitudes.length; i++){
	    var x = map(wavelengths[i], lower, upper, 0, width);
	    var h = -height + map(amplitudes[i], 0, 255, height, 0);
	    rect(x, height, width / amplitudes.length, h )
	  }
		CIE = {};
		var CIE_wl = data.getColumn("Wavelength");
		var CIE_wl_int = [];
		var CIE_x =  data.getColumn("x");
		CIE_y = data.getColumn("y");
		var CIE_z = data.getColumn("z");
		total_y = 0;
		for(var i = 0; i < CIE_wl.length; i++) {
		  CIE[CIE_wl[i]] = {x: CIE_x[i], y: CIE_y[i], z: CIE_z[i]};
		  CIE_wl_int[i] = int(CIE_wl[i]);
		  total_y += float(CIE_y[i]);
		}
		// interpolate 
		var total = [0,0,0];
		total_y = total_y;
		for(var i = 0; i < wavelengths.length; i++) {
			var current_wl = wavelengths[i];
			var low_wl = CIE_wl_int.find(function(element) {
				return element > current_wl;
			}) - 5 ;
			var lowerCIE = CIE[low_wl];
			var upperCIE = CIE[low_wl+5];
			var weight = (current_wl - low_wl)/5;
			total[0] += amplitudes[i]/255.0*(lowerCIE.x*(1-weight) + upperCIE.x * weight)/total_y;
			total[1] += amplitudes[i]/255.0*(lowerCIE.y*(1-weight) + upperCIE.y * weight)/total_y;
			total[2] += amplitudes[i]/255.0*(lowerCIE.z*(1-weight) + upperCIE.z * weight)/total_y;
		}
		var sum_total = total[1];
		total[0] = total[0]/sum_total;
		total[1] = total[1]/sum_total;
		total[2] = total[2]/sum_total;
		var rgb = [];
		console.log("tota",total);
    // D50 non Bradford-adapted D50 matrix
		//rgb[0] = int( 255 * ( 3.1338561 * total[0] - 1.6168667 * total[1] - 0.4906146 * total[2] ) );
		//rgb[1] = int( 255 * (-0.9787684 * total[0] + 1.9161415 * total[1] + 0.0334540 * total[2] ) );
		//rgb[2] = int( 255 * ( 0.0719453 * total[0] - 0.2289914 * total[1] + 1.4052427 * total[2] ) );


    // xyz to RGB D65 matrix conversion (assuming CIE 1964 was using D64)
		rgb[0] = int( 255 * ( 3.2404542 * total[0] - 1.5371385 * total[1] -0.4985314 * total[2] ) );
	  rgb[1] = int( 255 * (-0.9692660 * total[0] + 1.8760108 * total[1] + 0.0415560 * total[2] ) );
		rgb[2] = int( 255 * ( 0.0556434 * total[0] - 0.2040259 * total[1] + 1.0572252  * total[2] ) );

		

		if(min(rgb)<0) {
			var min_rgb = min(rgb);
			rgb[0] += -min_rgb;
			rgb[1] += -min_rgb;
			rgb[2] += -min_rgb;
		}
		if(max(rgb)>255) {
			var max_rgb = max(rgb)/255;
			rgb[0] = int(rgb[0]/max_rgb);
			rgb[1] = int(rgb[1]/max_rgb);
			rgb[2] = int(rgb[0]/max_rgb);
		}
		console.log("rgb",rgb);


		background(rgb[0], rgb[1], rgb[2]);
		//console.log(total);
		//console.log(rgb)
		function componentToHex(c) {
    	var hex = c.toString(16);
    	return hex.length == 1 ? "0" + hex : hex;
		}

		function rgbToHex(r, g, b) {
		    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}
		var hex = rgbToHex(rgb[0], rgb[1], rgb[2])
		fill(255);
		textAlign(LEFT,BOTTOM);
		textSize(20);
		text(hex, displayWidth*0.01, displayHeight*0.9)
		//noLoop();
  }

}

function mousePressed() {
  if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.pause();
    noLoop();
  } else {
    song.play();
    loop();
  }
}