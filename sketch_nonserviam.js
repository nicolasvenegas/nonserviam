// variables imágenes
let mic1;
let ciica1;
// variables fuentes
let sgBlack;
let sgBlackItalic;
let sgMedium;
let sgMediumItalic;


// variable global para controlar el tiempo de la animacion
let t = 0;
// escala del ruido
const noiseScale = 0.004;
// distancia vertuical entre lineas
const lineSpacing = 17;
// amplitud de onda
const amplitude = 10;
// frecuencia base para la estructura de onda
const baseFrequency = 0.09;

let xoff = 0;
let col = 50;


function preload() {
  // precarga de tipografías e imágenes
  sgBlack = loadFont('data/SchibstedGrotesk-Black.ttf');
  sgBlackItalic = loadFont('data/SchibstedGrotesk-BlackItalic.ttf');
  sgMedium = loadFont('data/SchibstedGrotesk-Medium.ttf');
  sgMediumItalic = loadFont('data/SchibstedGrotesk-MediumItalic.ttf');
  mic1 = loadImage('data/mic_1.png');
  ciica1 = loadImage('data/ciica_1.png');
}

function setup() {
  // crear lienzo del tamaño de la pantalla
  createCanvas(windowWidth, windowHeight);
  //createCanvas(1080/2, 1350/2); // IG post size
  //createCanvas(1080 / 2, 1920 / 2); // IG story size
  smooth(1);
}


function draw() {
  background(0);
  stroke(205, 102, 0, 45); // Translucent white
  noFill();
  strokeWeight(1.5);

  // loop para dibujar las lineas en orden vertical
  for (let y = 0; y < height; y += lineSpacing) {
    beginShape();
    // loop para dibujar los segmentos de la onda cada 5 pixeles
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
  // incremento para animar el movimiento de los segmentos
  t += 0.0006;

  // variable para definir la proporcionalidad entre elementos de dibujo
  let ratio = 300;

  stroke(205, 102, 0, 40);
  fill(205, 102, 0, 25);
  rect(width / 2 - ratio / 2, height / 2 - ratio, ratio, ratio * 2);
  rect(width / 2 + ratio / 2 + 20, height / 2 - ratio, ratio, ratio * 2);
  rect(width / 2 + ratio * 1.5 + 40, height / 2 - ratio, ratio, ratio * 2);
  rect(width / 2 - ratio * 1.5 - 20, height / 2 - ratio, ratio, ratio * 2);
  rect(width / 2 - ratio * 2.5 - 40, height / 2 - ratio, ratio, ratio * 2);
  textSize(windowWidth * 0.04);
  textAlign(CENTER);
  fill(200);
  textFont(sgBlackItalic);
  text('NON SERVIAM ', width / 2, height / 2);

  

  textSize(windowWidth * 0.011);
  textFont(sgMedium);
  fill(205, 102, 0);
  text('inspirada en el Canto VII de Altazor', width / 2, height / 2 + ratio / 8);
  imageMode(CENTER);

  col = map(noise(xoff), 0, 1, 0, 10);
  ellipse(width / 2, height / 2 + ratio / 1.8, 73+col, 73+col);
  xoff += 0.025;

  image(mic1, width / 2, height / 2 + ratio / 1.8, 70, 70);

  fill(255,200);
  textSize(windowWidth * 0.009);
  text('una instalación de Gabriel Oviedo', width / 2, height / 1.22 + ratio / 8);
}


