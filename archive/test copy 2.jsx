// app.displayDialogs = DialogModes.NO;
var doc = app.activeDocument;
var defaultName = doc.activeLayer.name;
var layers = doc.layers;
// var layerSets = doc.layerSets;
// var artLayers = doc.artLayers;

// var colourA = "28bd98";
// var colourY = "ff00ff";

// changeFontColour(colourA, colourY);
// changeLayerColor();

// aiChangeLayerColor();
var layerName = doc.layers;
// var pathsToChange = ["ToChange-Pants"];
var layersToChange = [
  {
    rgb: [70, 70, 235],
    pathsToChange: [
      "Hat-Color1",
      "Hat-Color2",
      "Hat-Color3",
      "Hat-Color4",
      "Hat-Color5",
      "Hat-Color6",
    ],
  },
  {
    rgb: [70, 70, 235],
    pathsToChange: [
      "Pants-Color1",
      "Pants-Color2",
      "Pants-Color3",
      "Pants-Color4",
    ],
  },
  {
    rgb: [70, 70, 235],
    pathsToChange: [
      "T-Shirt-Shadow1",
      "T-Shirt-Shadow2",
      "T-Shirt-Shadow3",
      "T-Shirt-Shadow4",
    ],
  },
];

var rgb = [70, 70, 235];
var newRGB = new RGBColor();
newRGB.red = rgb[0];
newRGB.green = rgb[1];
newRGB.blue = rgb[2];

for (var i = 0; i < pathsToChange.length; i++) {
  try {
    var pathChange = doc.pathItems.getByName(pathsToChange[i]);
    pathChange.fillColor = newRGB;
    $.writeln(
      "Changed" +
        pathsToChange[i] +
        " color to: RGB:(" +
        newRGB.red +
        "," +
        newRGB.green +
        "," +
        newRGB.blue +
        ")"
    );
  } catch (err) {
    $.writeln("error: " + err.message);
  }
}

function aiChangeLayerColor() {
  $.writeln("-------------");
  for (var i = 0; i < layers.length; i++) {
    $.writeln(layers[i].name);
    if (layers[i].name == "Hat") {
      $.writeln("here");
      $.writeln(layers[i].pathItems.length);

      // layers[i].color.red = 10; // 255
      // layers[i].color.green = 10; // 255
      // layers[i].color.blue = 10; // 78.6926070038911
    }
  }
}

function pathName(nameOfPath) {
  for (var ii = 0; ii < layerName.length; ii++) {
    //looping through all the layers
    var currentLayer = layerName[ii];
    var layerLocked = currentLayer.locked;

    if (currentLayer.locked == false) {
      var currentLayerPath = currentLayer.pathItems; //getting the pathItems of the layers that are unlocked
      // $.writeln("name: " + currentLayer.name);
      // // $.writeln("groups: " + currentLayer.groups.length);
      // $.writeln("layers: " + currentLayer.layers.length);
      // $.writeln("paths: " + currentLayer.pathItems.length);

      for (var p = 0; p < currentLayerPath.length; p++) {
        //looping through the pathItems in the layers that are unlocked
        var currentPath = currentLayerPath[p];
        var pathNames = currentPath.name;
        var searchIndexPath = pathNames.indexOf(nameOfPath);

        if (searchIndexPath != -1) {
          currentPath.selected = true;
          $.writeln(currentLayer);
        }
      }
    }
  }
  $.writeln("search finished");
}

function pathName2(nameOfPath) {
  for (var ii = 0; ii < layerName.length; ii++) {
    //looping through all the layers
    var currentLayer = layerName[ii];
    var layerLocked = currentLayer.locked;

    if (currentLayer.locked == false) {
      var currentLayerPath = currentLayer.pathItems; //getting the pathItems of the layers that are unlocked

      for (var p = 0; p < currentLayerPath.length; p++) {
        //looping through the pathItems in the layers that are unlocked
        var currentPath = currentLayerPath[p];
        var pathNames = currentPath.name;
        var searchIndexPath = pathNames.indexOf(nameOfPath);

        if (searchIndexPath != -1) {
          currentPath.selected = true;
          $.writeln("found");
        }
      }
    }
  }
}
