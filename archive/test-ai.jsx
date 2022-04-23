#include "aiGenerals.jsxinc"

// app.displayDialogs = DialogModes.NO;
var doc = app.activeDocument;
var defaultName = doc.activeLayer.name;
var layers = doc.layers;

var layerName = doc.layers;
var layersToChange = [
  {
    rgb: [25, 100, 0],
    pathsToChange: ["Jacket-Cuff"],
    pathsCount: 6,
  },
  {
    rgb: [35, 222, 222],
    pathsToChange: ["Jacket"],
    pathsCount: 3,
  },
  {
    rgb: [6, 40, 20],
    pathsToChange: ["Jacket-Fastener"],
    pathsCount: 9,
  },
  {
    rgb: [200, 150, 10],
    pathsToChange: ["Pants"],
    pathsCount: 3,
  },
];



newLayerChange(layersToChange);
function newLayerChange(layersToChange) {
  var newRGB = new RGBColor();

  var iters = 1;
  for (var iter = 0; iter < iters; iter++) {
    // run through specific layers n times
    $.writeln("Starting iteration #" + (iter + 1));

    for (var layNo = 0; layNo < layersToChange.length; layNo++) {
      // var rgbb = [getRandom(255), getRandom(255), getRandom(255)];

      // run through each layers in range once
      // newRGB.red = 220;
      // newRGB.green = 200;
      // newRGB.blue = 200;

      var pathsToChange = layersToChange[layNo].pathsToChange;
      var pathsCount = layersToChange[layNo].pathsCount;
      var rgbNew = layersToChange[layNo].rgb;
      // rgbNew = rgbb;

      for (var pathNo = 0; pathNo < pathsCount; pathNo++) {
        var pathToChange = pathsToChange + (pathNo + 1);

        $.writeln("----------------------------------");
        $.writeln("Item to Change: " + pathToChange);
        newRGB.red = rgbNew[0];
        newRGB.green = rgbNew[1];
        newRGB.blue = rgbNew[2];
        $.writeln(
          "New Color: " + [newRGB.red, newRGB.green, newRGB.blue].join(" ")
        );

        $.writeln("Trying to find item");
        var item = findItem(pathToChange);
        if (!item) {
          $.writeln("Unable to find item: " + pathToChange);
        } else {
          $.writeln("Found item: " + pathToChange + " of " + item[1]);

          var itemsToColor = [];
          if (item[1] == "compoundPathItem") {
            for (
              var cPathNo = 0;
              cPathNo < item[0].pathItems.length;
              cPathNo++
            ) {
              itemsToColor.push(item[0].pathItems[cPathNo]);
            }
          } else {
            itemsToColor.push(item[0]);
          }
          $.writeln("Colouring Items: " + itemsToColor);

          for (var itemNo = 0; itemNo < itemsToColor.length; itemNo++) {
            var itemToColor = itemsToColor[itemNo];
            try {
              //code
              itemToColor.color = newRGB;
              $.writeln("Colored " + itemToColor.name);
            } catch (x_x) {
              $.writeln([x_x.message, x_x.line, $.stack].join("|"));
            }

            $.writeln("4");

            try {
              //code
              itemToColor.fillColor = newRGB;
              $.writeln("2. colored " + itemToColor.name);
            } catch (x_x) {
              $.writeln([x_x.message, x_x.line, $.stack].join("|"));
            }
            $.writeln("Tried colouring item: " + itemToColor);
          }
          $.writeln("Finished colouring Items");
        }
        $.writeln("Finished item: " + pathToChange);
      }
      app.redraw();
    }
    $.writeln("Finish iteration #" + (iter + 1));
  }
}

function findItem(name) {
  var item = findInLayers(name);
  if (item != null) return [item, "layer"];

  item = findInPathItems(name);
  if (item != null) return [item, "pathItem"];

  item = findInCompoundPathItems(name);
  if (item != null) return [item, "compoundPathItem"];

  return null;
}

function findInLayers(name) {
  var layers = doc.layers;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].name == name) {
      return layers[i];
    }
  }
  return null;
}

function findInPathItems(name) {
  var pathItems = doc.pathItems;
  for (var i = 0; i < pathItems.length; i++) {
    if (pathItems[i].name == name) {
      return pathItems[i];
    }
  }
  return null;
}

function findInCompoundPathItems(name) {
  var compoundPathItems = doc.compoundPathItems;
  for (var i = 0; i < compoundPathItems.length; i++) {
    if (compoundPathItems[i].name == name) {
      return compoundPathItems[i];
    }
  }
  return null;
}

function changePants(layersToChange) {
  var newRGB = new RGBColor();

  for (var layNo = 0; layNo < layersToChange.length; layNo++) {
    var rgbNew = layersToChange[layNo].rgb;
    var pathsToChange = layersToChange[layNo].pathsToChange;
    newRGB.red = rgbNew[0];
    newRGB.green = rgbNew[1];
    newRGB.blue = rgbNew[2];
    // $.writeln("---------------");
    // $.writeln(rgbNew);
    // $.writeln(pathsToChange);

    for (var i = 0; i < pathsToChange.length; i++) {
      try {
        // $.writeln(pathsToChange[i]);
        if (doc.layers.getByName(pathsToChange[i]))
          var pathChange = doc.layers.getByName(pathsToChange[i]);
        var pathChange = doc.pathItems.getByName(pathsToChange[i]);
        var pathChange = doc.compoundPathItems.getByName(pathsToChange[i]);

        var layer = (pathChange.fillColor = newRGB);
        $.writeln(
          "Changed " +
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
        $.writeln("error: " + err.message + " : " + pathsToChange[i]);
      }
    }
    // app.redraw();
  }
}

// aiChangeLayerColor();

function aiChangeLayerColor() {
  var newRGB = new RGBColor();
  newRGB.red = 220;
  newRGB.green = 200;
  newRGB.blue = 200;

  $.writeln("-------------");

  for (var i = 0; i < layers.length; i++) {
    // $.writeln(layers[i].name);
    if (layers[i].name == "PantsNew") {
      $.writeln("here");
      layers[i].fillColor = newRGB;
      layers[i].fillColor;
      $.writeln(layers[i].fillColor);
      app.redraw();

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
