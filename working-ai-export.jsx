#include "aiGenerals.jsxinc"
#include "nft_cnyTiger.jsxinc"

// app.displayDialogs = DialogModes.NO;
var doc = app.activeDocument;
var defaultName = doc.activeLayer.name;
var layers = doc.layers;

//export Image with name newImage.png (I have a specific path here)
// var pathNow = "G:\\Coding\\NFTs\\CNY\\scriptOutput\\";
var pathNow = "G:\\coding\\envs\\cny-images\\scriptOutput\\";
var filename = "newImage.png";
var noMsg = true;

var options = {
  revertToOrig: false,
  emptyOutputFolder: false, exportFiles: true,
  createVariations: true, createNonVariations:false, 
  useGradient: true, gradientColourLeft: true}


createNFTImageLayers(options)

function createNFTImageLayers(options) {

  if (options.emptyOutputFolder) {
    if (!isDefined(pathNow)) {
      o("Error: Cannot find doc of pathNow, not running imageVariations.")
      return
    } else {
      var exPath = "/" + pathNow.replace(":", "").replace(/\\/g, "/");
      removeFolder(exPath, true)
      var created = createFolder(exPath)
      if (!created) {
        o("Error: folder failed to create, exiting.")
        return
      }
    }
  }

  if (options.createVariations) {
    if (!isDefined(doc) || !isDefined(imageVariations)) {
      o("Error: Cannot find doc of createImagesFromImageSets, not running imageVariations.")
      return
    } else {
      hideAllLayers(doc)
      createImageVariations(imageVariations, options)
    }
  }

  if (options.createNonVariations) {
    if (!isDefined(doc) || !isDefined(nonVariedItems)) {
      o("Error: Cannot find doc of nonVariedItems, not running exportNonVariedItems.")
      return
    } else {
      hideAllLayers(doc)
      exportNonVariedItems(nonVariedItems, options.exportFiles)
    }
  }

  // createMeta()
}


function createImageVariations(varyImages, options) {
  
  // run through imageSet and create images
  // e.g. clothes1, clothes2, hat1, hat2
  for (var varyNo=0; varyNo < varyImages.length; varyNo ++) {

    var imageSet = varyImages[varyNo];
    var patternSet = [];

    o("-------------changing set-------------");
    o(imageSet.name);         // Clothes 1
    createOneFolder(pathNow + imageSet.outputPath)

    // run through the number to create. e.g. clothing.count on the image set
    var runCheck = 0
    var runLimit = 5 + imageSet.count
    for (var iterNo=0; iterNo < imageSet.count; iterNo ++) {   // run through based on count and pick an item randomly
      if (!imageSet.change) continue;

      // run through attribute of the image and select a random item
      // e.g. clothes1-pants, clothes1-shirt, t-shirt-logo
      // e.g. clothes2-pants, clothes2-shirt, clothes2-trim, clothes2-fast
      // e.g. emphatmain, emphattrim, emphatedge
      var newPattern = ""

      for (var attrNo=0; attrNo < imageSet.attributesToChange.length; attrNo++) {
        var attr = imageSet.attributesToChange[attrNo]

        if (options.revertToOrig) {                       // revert to the original colours
          attr["selected"] = attr.range[0];
        } else {                                  // select random colours
          if (!noMsg) o("------- changing attribute");
          if (!noMsg) o(attr.name);               // T-Shirt, Pants

          // Get random colour variation based on the .range value of the attribute
          // to-do: using the range: [] but unless you update this for colour variations,
          //        it may not use all colours.  
          //    e.g. range: [0,1] but colours[0...10] will not use all 0-10, only 0-1
          //        suggest to do count of colors array instead of range
          attr["selected"] = getRandomRange(attr.range); 
          
          newPattern = newPattern + ([attr.name, "=", attr.selected].join("")) + "|";

          if (!noMsg) o(newPattern)
          if (!noMsg) o("------- changing attribute end");
        }
      }

      // check if the  item exists in the current patterns
      // if it exists, rollback the iteration
      if (existsInArray(newPattern, patternSet)) {
        iterNo--; 
        if (!noMsg) o("Skipping, pattern exists: " + newPattern)
      } else {
        if (!noMsg) o("Creating images: " + newPattern)
        
        // create the image with the random variation
        //    and add variation to the unique array
        createImages(imageSet, iterNo + 1, options)
        patternSet.push(newPattern)
      }
    }
    runCheck++
    if (runCheck >= runLimit) break;

    o("----------- finished changing set-------------");
  }
}



function createImages(imageSet, iterNo, options) {
  
  // this function only outputs one unique image based on the patter 

  var layerPrefix = "ToColour-"
  var hideLayers = []
  hideAllLayers(doc)            // hide all the layers

  // run through attribute of the image and select a random item
  // e.g. clothes1-pants, clothes1-shirt, t-shirt-logo
  // e.g. clothes2-pants, clothes2-shirt, clothes2-trim, clothes2-fast
  // e.g. emphatmain, emphattrim, emphatedge
  var logoId = ""
  var lastAttr = ""
  for (var attrNo=0; attrNo < imageSet.attributesToChange.length; attrNo++) {
    var attr = imageSet.attributesToChange[attrNo]
    if (!attr.change) continue;                                                 // skip if marked not to change

    // add layers to the layers to hide array
    var toHide = getAiImage(doc, [], attr.path[0])                              // get image layer / path from AI DOM
    if (toHide != null) hideLayers.push[toHide];                                // Add parent node / layer to hide list

    // Alter image based on variation Type
    o('---------------------------')
    o("creating type: " + attr.typeName + " on path: " + attr.name);
    var gradientName
    var newGradient
    switch(attr.typeName.toLowerCase()) {
      case "colour":
        
        // change colour based on random variation
        var newRGB = getRGB(attr.colours[attr.selected])                        // Get new RGB based on previous random selection
        var isShirt = attr.name.indexOf("Shirt") > -1
        if (isShirt) {
          gradientName = "CNY-Gradient-1" 
        } else {
          gradientName = "CNY-Gradient-2"
        }
        newGradient = getGradient(attr.colours[attr.selected], options.gradientColourLeft, gradientName)

        if (!noMsg) o("setting colour of " + attr.name + " to rgb: " + ([newRGB.red, newRGB.green, newRGB.blue].join(",")))

        // run through all controls on that layer so the colours
        // are all the same
        for (var pathNo=attr.controls[0]; pathNo < (attr.controls[1] - attr.controls[0] + 2); pathNo++) {     // Loop through each control and change to same colour

          // get the change patth
          var pathName = layerPrefix + attr.name + pathNo;                    
          if (!noMsg) o("changing colour of path: " + pathName)
          var changePath = getAiImage(doc, attr.path, pathName)                 // get image layer / path from AI DOM
          if (changePath != null) {
            if (!noMsg) o("changing colour of path and making visible: " + pathName + ", so it's included in the export") 

            changePath.visible = true                                           // make sure path is visible
            if (options.useGradient) {
              changeColour(changePath, newGradient)                             // change the colour of the path
              o(attr.name + ": " + attr.colours[attr.selected])
            } else {
              changeColour(changePath, newRGB)                                  // change the colour of the path
            }
            hideLayers.push(changePath)                                         // hide the layer later, after export

          } else {
            o("could not find path: " + pathName) 
          }
        }

      break;

      case "images":

        // alternate the images
        var pathName = attr.name + attr.selected;                     
        var changePath = getAiImage(doc, attr.path, pathName)                   // get image layer / path from AI DOM
        if (attr.name == "T-Shirt-Logo") {
          logoId = attr.selected
          lastAttr = "T-Shirt-Logo"
        }
        if (changePath != null) {
          if (!noMsg) o("showing path: " + pathName + ", so it's included in the export") 
        
          changePath.visible = true                                             // make sure the layer is visible, so available when exporting
          hideLayers.push(changePath)                                           // hide the layer later, after export
        } else {
          o("could not find path: " + pathName) 
        }    
      break;
      default:
        o("type not specified") 
    }
  }
  // output Image
  if (options.exportFiles) {
    var fileName = imageSet.filename;

    // add the Logo id if that is the new layer
    if (fileName.indexOf("clothes1-") > -1) {
      fileName = fileName  + "Logo" + logoId + "-"
    }
    var fullFilename = [pathNow, imageSet.outputPath, "\\", fileName, iterNo, ".png"].join("")
    if (noMsg) o("outputting image: " + fullFilename)
    exportFileToPNG24(fullFilename);
  }

  // hide the layers again
  if (!noMsg) o("hiding used layers for next iteration")
  hideLayerObjects(hideLayers)                                                  // hide all the layers in the hideLayers array
}


function createMeta() {

//   {
//   "layersOrder": [
//     { "name": "body", "path": "body", "number": 26 },
//     { "name": "eye", "path": "eye", "number": 15 },
//     { "name": "hats", "path": "hats", "number": 25 },
//     { "name": "foot", "path": "foot", "number": 7 }
//   ],

//   "format": {
//     "width": 230,
//     "height": 230
//   },

//   "rarity": [
//     { "key": "", "val": "original" },
//     { "key": "_r", "val": "rare" },
//     { "key": "_sr", "val": "super rare" }
//   ],
//   "defaultEdition": 50
// }

  var folder = new Folder(pathNow)
  var files = folder.getFiles()
  var meta = { format: {width: 360, height: 360}, defaultEdition: 50, "rarity": [
    { "key": "", "val": "original" },
    { "key": "_r", "val": "rare" },
    { "key": "_sr", "val": "super rare" }
  ]}
  meta.layersOrder = []

  if (files.length>0) {
    for (var i=0; i<files.length; i++)
    {
      if (files[i] instanceof Folder) {
        var subFolder = new Folder(files[i])
        var subFiles = subFolder.getFiles()
        var metaLayer = {name: subFolder.name, path: subFolder.name, number: subFiles.length}
        meta.layersOrder.push(metaLayer)
      }
      
    }
  }
  o(meta)
}


function exportNonVariedItems(nonVariedItems) {
  
  // run through imageSet and create images
  for (var varyNo=0; varyNo < nonVariedItems.length; varyNo ++) {
    var imageSet = nonVariedItems[varyNo];
    var attr = imageSet.attributesToChange[varyNo]

    if (!imageSet.change) continue;
    hideAllLayers()
    createOneFolder(pathNow + imageSet.outputPath)

    o("-------------outputing items -------------");
    o(imageSet.name);    

    // run through each attribute to change and select random item
    for (var attrNo=0; attrNo < imageSet.attributesToChange.length; attrNo++) {
    // for (var pathNo=attr.controls[0]; pathNo < (attr.controls[1] - attr.controls[0] + 2); pathNo++) {     // Loop through each control and change to same colour

    
      var attr = imageSet.attributesToChange[attrNo]
      for (var pathNo=attr.controls[0]; pathNo < (attr.controls[1] - attr.controls[0] + 2); pathNo++) {
        // 2, 2 < (2-2+2)
        var pathName = attr.name + pathNo;
        var changePath = getAiImage(doc, attr.path, pathName) 
        if (changePath != null) {
          if (!noMsg) o("making visible: " + pathName + " to the export it") 
        
          // output Image
          changePath.visible = true
          var fullFilename = [pathNow, imageSet.outputPath, "\\", imageSet.filename, (pathNo), ".png"].join("")
          if (noMsg) o("outputting image: " + fullFilename)
          exportFileToPNG24(fullFilename);

          // hide the layers again
          if (!noMsg) o("hiding used layers for next iteration")
          changePath.visible = false

        } else {
          o("could not find path: " + pathName) 
        }
      }
    }
  }
}

