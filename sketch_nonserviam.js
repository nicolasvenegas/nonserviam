let mic1;
let ciica1;

// Global variable to control the animation over time (3rd dimension of noise)
let t = 0;
// Define the scale of the noise field. Smaller numbers = larger, smoother patterns.
const noiseScale = 0.004;
// Set the vertical distance between lines
const lineSpacing = 15;
// Set a CONSTANT amplitude for the waves.
const amplitude = 10;
// Define a base frequency for the underlying wave structure.
const baseFrequency = 0.0900;


function preload() {
  // Load a custom font before the sketch starts
  sgBlack = loadFont('data/SchibstedGrotesk-Black.ttf');
  sgBlackItalic = loadFont('data/SchibstedGrotesk-BlackItalic.ttf');
  sgMedium = loadFont('data/SchibstedGrotesk-Medium.ttf');
  sgMediumItalic = loadFont('data/SchibstedGrotesk-MediumItalic.ttf');
  mic1 = loadImage('data/mic_1.png');
  ciica1 = loadImage('data/ciica_1.png');
}

/**
 * p5.js setup function, runs once at the beginning.
 */
function setup() {
  // Create a fixed square canvas.
  // We take the smaller of the window dimensions to ensure it fits.
  const canvasSize = min(windowWidth, windowHeight);
  //createCanvas(canvasSize, canvasSize);
  createCanvas(windowWidth, windowHeight);
}

/**
 * p5.js draw function, runs in a continuous loop.
 */
function draw() {
  // Clear the canvas with a solid black background.
  background(0);
  // Set the drawing style for the waves.
  stroke(205, 102, 0, 50); // Translucent white
  noFill();
  strokeWeight(1.5);

  // Loop through the canvas vertically, drawing one continuous line at a time
  for (let y = 0; y < height; y += lineSpacing) {

    beginShape();
    // Loop across the width of the canvas to draw the segments of the wave
    for (let x = 0; x <= width; x += 5) {

      // Calculate a Perlin noise value for the current (x, y) position and time
      const noiseVal = noise(x * noiseScale, y * noiseScale, t);

      // --- INVERTED PHASE MODULATION BASED ON LOCAL NOISE ---

      // Map the noise value to an inverted phase shift.
      // Increased the maximum offset to heighten high-frequency intensity.
      const phaseOffset = map(noiseVal, 0, 1, TWO_PI * 8, 0);

      // Calculate the y-position of the wave.
      const angle = x * baseFrequency + phaseOffset;
      const waveY = sin(angle) * amplitude;

      // Draw a vertex at the current x position, offset by the wave
      vertex(x, y + waveY);
    }
    endShape();
  }

  // Increment time to animate the noise field smoothly
  t += 0.0006;

  stroke(205, 102, 0, 70);
  fill(205, 102, 0, 30);
  rect(width/2-175, height/2-300, 350,600);
  textSize(80);
  textAlign(CENTER);
  fill(255);
  textFont(sgBlackItalic);
  text('NON ', width / 2 - 210, height / 2);
  textFont(sgBlack);
  text('SERVIAM', width / 2 + 90, height / 2);
  textSize(20);
  textFont(sgMediumItalic);
  text('instalación sonora inspirada en el Canto VII de Altazor', width / 2, height / 2 + 40);
  image(mic1, width/2-35, height/2+75, 70, 70);
}

// The windowResized function is no longer needed for a fixed-size canvas.
