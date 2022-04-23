function getGradient(colourArray) {
  // var newGradient = new RB
  // var newRGB = new RGBColor();
  // newRGB.red = colourArray[0];
  // newRGB.green = colourArray[1];
  // newRGB.blue = colourArray[2];
  // return newRGB;

  // Create a color for both ends of the gradient
  var startColor = new RGBColor();
  startColor.red = 255;
  startColor.green = 255;
  startColor.blue = 255;

  var endColor = new RGBColor();
  endColor.red = colourArray[0];
  endColor.green = colourArray[1];
  endColor.blue = colourArray[2];

  // Create a new gradient
  // A new gradient always has 2 stops

  var gradients = app.activeDocument.gradients;
  var gradientExists = false;
  for (var i = 0; i < gradients.length; i++) {
    if (gradients[i].name == "CustomGradient") {
      gradientExists = true;
      break;
    }
  }

  if (gradientExists) {
    var newGradient = app.activeDocument.gradients["CustomGradient"];
  } else {
    var newGradient = app.activeDocument.gradients.add();
    newGradient.name = "CustomGradient";
    newGradient.type = GradientType.LINEAR;

    newGradient.gradientStops[0].rampPoint = 30; // Modify the first gradient stop
    newGradient.gradientStops[0].midPoint = 40; // newGradient.gradientStops[0].midPoint = 60;
    newGradient.gradientStops[1].rampPoint = 80; // Modify the last gradient stop
  }

  newGradient.gradientStops[0].color = startColor;
  newGradient.gradientStops[1].color = endColor;

  // construct an Illustrator.GradientColor object referring to the newly created gradient
  var colorOfGradient = new GradientColor();
  colorOfGradient.gradient = newGradient;

  return colorOfGradient;

  // // get first path item, apply new gradient as its fill
  // var topPath = app.activeDocument.pathItems[0];
  // topPath.filled = true;
  // topPath.fillColor = colorOfGradient;
}
