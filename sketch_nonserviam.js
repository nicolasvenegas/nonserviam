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

// variables para el perlin noise que afecta tamaño elipse mic
let xoff = 0;
let dilatacion = 50;

let ambar;


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
  //createCanvas(windowWidth, windowHeight, SVG); // para exportar en SVG
  //createCanvas(1080/2, 1350/2); // IG post size
  //createCanvas(1080 / 2, 1920 / 2); // IG story size
  smooth(1);
  ambar = color(255,191,0);
}


function draw() {
  background(0);
  stroke(255,191,0, 20); // Translucent white
  noFill();
  strokeWeight(1.5);

  // loop para dibujar las lineas en orden vertical
  for (let y = 0; y < height; y += lineSpacing) {
    beginShape();
    // loop para dibujar los segmentos de la onda cada 5 pixeles
    for (let x = 0; x <= width; x += 5) {
      // calculo del perlin para la posicion x, y
      const noiseVal = noise(x * noiseScale, y * noiseScale, t);
      // mapeo invertiendo la fase del ruido, inrementando la intensidad
      const phaseOffset = map(noiseVal, 0, 1, TWO_PI * 8, 0);
      // calculo de la posicion y
      const angle = x * baseFrequency + phaseOffset;
      const waveY = sin(angle) * amplitude;
      // imprimir posicion vertice x
      vertex(x, y + waveY);
    }
    endShape();
  }
  // incremento para animar el movimiento de los segmentos
  t += 0.0006;

  // variable para definir la proporcionalidad entre elementos de dibujo
  let ratio = 300;

  stroke(255,191,0, 40);
  fill(255,191,0, 20);

  // paneles
  rect(width / 2 - ratio / 2, height / 2 - ratio, ratio, ratio * 2);
  rect(width / 2 + ratio / 2 + 20, height / 2 - ratio, ratio, ratio * 2);
  rect(width / 2 + ratio * 1.5 + 40, height / 2 - ratio, ratio, ratio * 2);
  rect(width / 2 - ratio * 1.5 - 20, height / 2 - ratio, ratio, ratio * 2);
  rect(width / 2 - ratio * 2.5 - 40, height / 2 - ratio, ratio, ratio * 2);

  // titulo
  textSize(windowWidth * 0.04);
  textAlign(CENTER);
  fill(200);
  textFont(sgBlackItalic);
  text('NON SERVIAM ', width / 2, height / 2);


  // subtitulo
  textSize(windowWidth * 0.011);
  textFont(sgMedium);
  fill(255,191,0);
  text('inspirada en el Canto VII de Altazor', width / 2, height / 2 + ratio / 8);
  imageMode(CENTER);

  // animacion microfono e imagen mic
  fill(255,191,0,150);
  dilatacion = map(noise(xoff), 0, 1, 0, 10);
  ellipse(width / 2, height / 2 + ratio / 1.8, 73 + dilatacion, 73 + dilatacion);
  xoff += 0.025;
  image(mic1, width / 2, height / 2 + ratio / 1.8, 70, 70);

  fill(255, 200);
  textSize(windowWidth * 0.009);
  text('una instalación de Gabriel Oviedo', width / 2, height / 1.22 + ratio / 8);

  // exportar SVG, la libreria esta cargada en index.html
  //save("mySVG.svg");
  //print("saved svg");
  //noLoop();
}


