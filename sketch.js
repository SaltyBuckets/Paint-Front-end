let slider;
let brushSize;
let brushColor;
let shapeColor;
let eraserActive = false;

let colorPalette = [];
let addToPaletteBtn;

let rectCheckbox;
let rectActive = false;
let rectPosX, rectPosY;

let ellipseCheckbox;
let ellipseActive = false;
let ellipsePosX, ellipsePosY;

let clearCanvasBtn;



function setup() {

  let canvasHeight = windowHeight-16;

  let c = createCanvas(windowWidth, canvasHeight);

  background(255);

  slider = createSlider(1, 50, 10);
  slider.style('width', '80px');
  slider.size(200);
  
  colorPicker = createColorPicker('#ed225d');


  rectMode(CORNERS);
  ellipseMode(CORNERS);
   
  c.parent("drawing-area");
  
  slider.parent("brushSizeDropdown");
  slider.position(0,0,"relative");  

  colorPicker.parent("colorSelectionDropdown");
  colorPicker.size();
  colorPicker.position(0,0,"relative");
  colorPicker.style("margin")

}

function activateTool(tool){

  if(tool=='brush'){
    eraserActive=false;
    rectActive=false;
    ellipseActive=false;
  }
 else if(tool=='eraser'){
    eraserActive=true;
    rectActive=false;
    ellipseActive=false;
  }
 else if(tool=='rect'){
    eraserActive=false;
    rectActive=true;
    ellipseActive=false;
  }
 else if(tool=='ellipse'){
    
    eraserActive=false;
    rectActive=false;
    ellipseActive=true;
  }

}


function updateBrushColor() {
  if (eraserActive) {
    brushColor = 255;
  } else {
    brushColor = colorPicker.color();
  }
}

function saveImage() {
  saveCanvas("Drawing", "jpg");
}


function clearCanvas() {
  background(255);
}


function draw() {
  brushSize = slider.value();
  updateBrushColor();
  strokeWeight(brushSize);
  stroke(brushColor);

  fill(brushColor);

  if (mouseIsPressed) {
    if (!rectActive && !ellipseActive) {
      line(beforeX, beforeY, mouseX, mouseY);
    }
  }
  beforeX = mouseX;
  beforeY = mouseY;

}

function mousePressed() {
  rectPosX = mouseX;
  rectPosY = mouseY;
  ellipsePosX = mouseX;
  ellipsePosY = mouseY;
  if (rectActive)
    point(rectPosX, rectPosY);
}

function mouseReleased() {
  if (rectActive) {
    rect(rectPosX, rectPosY, mouseX, mouseY);
  } else if (ellipseActive) {
    ellipse(ellipsePosX, ellipsePosY, mouseX, mouseY);
  }
}


