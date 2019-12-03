let w;
let columns;
let rows;
let running = true;
let opacity = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = 15;
  c_size = w;
  distance_between_circles = c_size*4/7;
  
  // Calculate columns and rows
  columns = ceil(width / w) + 4;
  rows = ceil(height / w) + 4;
  cyan_universe     = new Universe(columns, rows, color( 255, 0, 0 ), 0, 0);
  yellow_universe   = new Universe(columns, rows, color( 0, 255, 0 ), distance_between_circles, 0);
  magenta_universe  = new Universe(columns, rows, color( 0, 0, 255 ), distance_between_circles/2, 0.866*distance_between_circles);
  frameRate(10);
  noStroke();
  strokeWeight(0);
}

function draw() {
  blendMode(BLEND);
  background(255);
  blendMode(DIFFERENCE);
  cyan_universe.generate();
  yellow_universe.generate();
  magenta_universe.generate();

  cyan_universe.draw_universe();
  yellow_universe.draw_universe();
  magenta_universe.draw_universe();
}

// reset board when mouse is pressed
function mousePressed() {
  if (running) {
    noLoop();
    running = false;
  } else if (!running) {
    loop();
    running = true;
  }
}

function keyTyped() {
	if(key==='r') {
		init();
	}
}



// Fill board randomly
class Universe {
	constructor(uni_width,uni_height,color, offset_x, offset_y) {
    this.columns = uni_width;
    this.rows = uni_height;
    this.color = color;
    this.offset_x = offset_x;
    this.offset_y = offset_y;

    // Wacky way to make a 2D array is JS
    this.board = new Array(this.columns);
    for (let i = 0; i < this.columns; i++) {
      this.board[i] = new Array(this.rows);
    }

    // Going to use multiple 2D arrays and swap them
    this.next = new Array(this.columns);
    for (let i = 0; i < this.columns; i++) {
      this.next[i] = new Array(this.rows);
    }
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        // Lining the edges with 0s
        if (i == 0 || j == 0 || i == this.columns-1 || j == this.rows-1) this.board[i][j] = 0;
        // Filling the rest randomly
        else this.board[i][j] = floor(random(2));
        this.next[i][j] = 0;
      }
    }
  }

// The process of creating the new generation
  generate() {
    // Loop through every spot in our 2D array and check spots neighbors
    for (let x = 1; x < this.columns - 1; x++) {
      for (let y = 1; y < this.rows - 1; y++) {
        // Add up all the states in a 3x3 surrounding grid
        let neighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            neighbors += this.board[x+i][y+j];
          }
        }

        // A little trick to subtract the current cell's state since
        // we added it in the above loop
        neighbors -= this.board[x][y];
        // Rules of Life
        if      ((this.board[x][y] == 1) && (neighbors <  2)) this.next[x][y] = 0;           // Loneliness
        else if ((this.board[x][y] == 1) && (neighbors >  3)) this.next[x][y] = 0;           // Overpopulation
        else if ((this.board[x][y] == 0) && (neighbors == 3)) this.next[x][y] = 1;           // Reproduction
        else                                   this.next[x][y] = this.board[x][y];           // Stasis
      }
    }

    // Swap!
    let temp = this.board;
    this.board = this.next;
    this.next = temp;
  }
  draw_universe() {
    for ( let i = 0; i < this.columns;i++) {
      for ( let j = 0; j < this.rows;j++) {
        if ((this.board[i][j] == 1)) {
          fill(this.color)
          ellipse(i * w - w + this.offset_x, j * w - w + this.offset_y, c_size, c_size);
        }
      }
    }
  }

}
