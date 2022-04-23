// app.displayDialogs = DialogModes.NO;
var doc = app.activeDocument;
var defaultName = doc.activeLayer.name;
var layers = doc.layers;
var layerSets = doc.layerSets;
var artLayers = doc.artLayers;

// var colourA = "28bd98";
// var colourY = "ff00ff";

// changeFontColour(colourA, colourY);
// changeLayerColor();
// aiChangeLayerColor();

// function aiChangeLayerColor() {
//   $.writeln("-------------");
//   for (var i; i < layerSets; i++) {
//     $.writeln(layerSets[i].name);
//   }
// }

// var colourA = "28bd98";
// var colourY = "ff00ff";

// changeFontColour(colourA, colourY);
changeLayerColor();

function changeLayerColor() {
  var changeLayerList = ["Hair"];
  var newColour = new SolidColor();
  var rgb = newColour.rgb;
  var colours = getRandomColours(20);

  for (var n = 0; n < colours.length; n++) {
    rgb.red = colours[n][0];
    rgb.green = colours[n][1];
    rgb.blue = colours[n][2];

    for (var i = 0; i < artLayers.length; i++) {
      if (contains(changeLayerList, artLayers[i].name)) {
        var currentLayer = artLayers[i];
        currentLayer.pixelsLocked = false;
        currentLayer.transparentPixelsLocked = true;

        $.writeln("-------------");
        $.writeln(currentLayer.name + " layer exists");
        $.writeln("rgb: (" + rgb.red + "," + rgb.green + "," + rgb.blue + ")");

        doc.selection.selectAll();
        doc.selection.fill(newColour, ColorBlendMode.NORMAL, 100, true);
        doc.selection.deselect();
      }
    }
    app.refresh();
    $.writeln("sleeping");
    // $.sleep(500);
    $.writeln("awake");
  }
}

function getRandomColours(n) {
  var colours = [];
  for (var c = 0; c < n; c++) {
    var colour = [];
    for (var i = 0; i < 3; i++) {
      colour.push(Math.floor(Math.random() * 255));
    }
    colours.push(colour);
  }
  return colours;
}

// for (var i = 0; i < layerSets.length; i++) {
//   $.writeln(layerSets[i].name);
// }

function contains(a, obj) {
  var i = a.length;
  while (i--) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
}

function changeFontColour(X, Y) {
  var numOfLayers = app.activeDocument.layers.length;

  // main loop
  for (var i = numOfLayers - 1; i >= 0; i--) {
    var thisLayer = app.activeDocument.layers[i];

    if (app.activeDocument.layers[i].kind == "LayerKind.NORMAL") {
      var currentFontCol = getFontColour(thisLayer);

      // alert(currentFontCol + "\n" + X);

      if (currentFontCol.toUpperCase() == X.toUpperCase()) {
        var myColour = new SolidColor();
        var RGB = HEXtoRGB(Y);
        myColour.rgb.red = RGB[0];
        myColour.rgb.green = RGB[1];
        myColour.rgb.blue = RGB[2];

        // replace text colour
        thisLayer.textItem.color = myColour;
      }
    }
  } //end of loop
}

function changeFontColour2(X, Y) {
  var numOfLayers = app.activeDocument.layers.length;

  // main loop
  for (var i = numOfLayers - 1; i >= 0; i--) {
    var thisLayer = app.activeDocument.layers[i];

    if (app.activeDocument.layers[i].kind == "LayerKind.TEXT") {
      var currentFontCol = getFontColour(thisLayer);

      // alert(currentFontCol + "\n" + X);

      if (currentFontCol.toUpperCase() == X.toUpperCase()) {
        var myColour = new SolidColor();
        var RGB = HEXtoRGB(Y);
        myColour.rgb.red = RGB[0];
        myColour.rgb.green = RGB[1];
        myColour.rgb.blue = RGB[2];

        // replace text colour
        thisLayer.textItem.color = myColour;
      }
    }
  } //end of loop
}

function getFontColour(alayer) {
  var fontColor = alayer.textItem.color;
  return fontColor.rgb.hexValue;
}

function HEXtoRGB(hex) {
  var c = 1;
  if (hex.charAt(0) != "#") c = 0;

  var r = parseInt(hex.substring(c, c + 2), 16);
  var g = parseInt(hex.substring(c + 2, c + 4), 16);
  var b = parseInt(hex.substring(c + 4, c + 6), 16);
  return [r, g, b];
}

// $.writeln(doc.layers.length);
// for (var i = 0; 1 < doc.layers.length - 1; i++) {
//   $.writeln((doc.layers[i] = null));
//   //   var layer = doc.layers[i];
//   //   $.writeln(layer.name);
//   // for (var layer = doc.layerSets.length - 1; groupI < 0; groupI--)
//   //   $.writeln(i);
// }
