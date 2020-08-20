let slider;
let brushSize;
let brushColor;
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


let div1=document.getElementById("drawing-area");

function setup() {
  console.log("start");

  let canvasheight=windowHeight-16;

  let c=createCanvas(windowWidth, canvasheight);

    

  background(255);

  slider = createSlider(1, 50, 10);
  slider.style('width', '80px');
  slider.position(0, height + 10)
  slider.size(200);

  colorPicker = createColorPicker('#ed225d');
  colorPicker.position(0, height + 35);

  eraserCheckbox = createCheckbox("Eraser", false);
  eraserCheckbox.position(60, height + 35);
  eraserCheckbox.changed(activateEraser);

  saveImageButton = createButton("Download");
  saveImageButton.position(140, height + 35);
  saveImageButton.mousePressed(saveImage);

  addToPaletteBtn = createButton("Add Color to Palette");
  addToPaletteBtn.position(220, height + 35);
  addToPaletteBtn.mousePressed(addToPalette);

  rectCheckbox = createCheckbox("RectangleTool", false);
  rectCheckbox.position(60, height + 55);
  rectCheckbox.changed(activateRect);
  rectMode(CORNERS);

  ellipseCheckbox = createCheckbox("EllipseTool", false);
  ellipseCheckbox.position(60, height + 75);
  ellipseCheckbox.changed(activateEllipse);
  ellipseMode(CORNERS);

  clearCanvasBtn = createButton("Clear");
  clearCanvasBtn.position(360, height + 35);
  clearCanvasBtn.mousePressed(clearCanvas);


  c.parent("drawing-area");


}

function activateEraser() {
  if (this.checked()) {
    console.log("Eraser Active")
    eraserActive = true;
  } else {
    eraserActive = false;
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

function addToPalette() {
  colorPalette.push(brushColor);
  console.log("Added Color To palette successfully")
  addToPaletteBtn.style(`border-color:${brushColor.toString()}`);
}

function activateRect() {
  if (this.checked()) {
    console.log("Rectangle Active")
    rectActive = true;
  } else {
    rectActive = false;
  }
}

function activateEllipse() {
  if (this.checked()) {
    console.log("Ellipse Active")
    ellipseActive = true;
  } else {
    ellipseActive = false;
  }
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

