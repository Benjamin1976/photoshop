#include "aiGenerals.jsxinc"
// app.displayDialogs = DialogModes.NO;
var doc = app.activeDocument;
var defaultName = doc.activeLayer.name;
var layers = doc.layers;


var redOrig = [255, 51, 51]
var yellowOrig = [255, 210, 21]
var goldOrig = [255, 204, 0]
var white = [255,255,255]
var furOrig = [255, 153, 51]
var cnyPink = [255, 153, 153]
var anotherPink = [255, 204, 204]
var cnyGold = [204, 153, 51]
var hatMustard = [255, 204, 51]
var hatGreen = [51, 204, 102]
var hatRed = [204, 51, 51]
var hatPupil = [51, 51, 0]
var hatIris = [204, 102, 51]
var tigerEye = [51, 51, 0]

var imageVariations = [
  {
    type: "clothing", change: false, name: "Clothes 1", filename: "clothesType1-", outputPath: "clothes", count:30, attributesToChange: [
      {name: "Clothes1-Pants", change: true, typeName: "colour", path: ["Clothes1","Pants","Colour"], controls: [1,2], range: [0,2],  orig: redOrig, colours: [redOrig, cnyGold, cnyPink]},
      {name: "Clothes1-Shirt", change: true, typeName: "colour", path: ["Clothes1","T-Shirt","Colour"], controls: [1,5], range: [0,2], orig: white, colours: [white, cnyGold, [255, 255, 102]]},
      {name: "T-Shirt-Logo", change: true, typeName: "images", path: ["Clothes1","T-Shirt-Logos"], range: [1,15]}
    ] 
  },
  {
    type: "clothing", change: true, name: "Clothes 2", filename: "clothesType2-", outputPath: "clothes", count:30, attributesToChange: [
      {name: "Clothes2-Pants", change: true, typeName: "colour", path: ["Clothes2","Pants","Colour"], controls: [1,2], range: [0,2], orig: redOrig, colours: [redOrig, cnyGold, anotherPink]},
      {name: "Clothes2-Shirt", change: true, typeName: "colour", path: ["Clothes2","Shirt","Colour"], controls: [1,3], range: [0,2], orig: redOrig, colours: [redOrig, cnyGold, anotherPink]},
      {name: "Clothes2-Shirt-Trim", change: true, typeName: "colour", path: ["Clothes2","Shirt","Colour"], controls: [1,6], range: [0,0],  orig: goldOrig, colours: [goldOrig]},
      {name: "Clothes2-Shirt-Fast", change: true, typeName: "colour", path: ["Clothes2","Buttons"], controls: [1,9], range: [0,0],  orig: goldOrig, colours: [goldOrig]},      
    ] 
  },
  {
    type: "hat", name: "Hat 2", change: false, filename: "hatType1-", outputPath: "hats", count:5, attributesToChange: [
      {name: "EmpHatMain", change: true, typeName: "colour", path: ["Hat2","Colour"], controls: [1,3], range: [0,1], orig: redOrig, colours: [redOrig, white]},
      {name: "EmpHatTrim", change: true, typeName: "colour", path: ["Hat2","Colour"], controls: [1,3], range: [0,1], orig: yellowOrig, colours: [yellowOrig, cnyGold]},
      {name: "EmpHatEdge", change: true, typeName: "colour", path: ["Hat2","Colour"], controls: [1,1], range: [0,1], orig: white, colours: [white, cnyGold, [131, 137, 161]]},
    ] 
  },
  {
    type: "hat", name: "Hat 1", change: false, filename: "hatType2-", outputPath: "hats", count:15, attributesToChange: [
      {name: "Base", change: true, typeName: "colour", path: ["Hat1","Colour"], controls: [1,13], range: [0,1], orig: hatMustard, colours: [hatMustard, [41, 171, 226]]},
      {name: "ThirdColour", change: true, typeName: "colour", path: ["Hat1","Colour"], controls: [1,9], range: [0,1], orig: hatRed, colours: [hatRed, [241, 90, 36]]},
      {name: "FourthColour", change: true, typeName: "colour", path: ["Hat1","Colour"], controls: [1,2], range: [0,1], orig: hatGreen, colours: [hatGreen, [252, 36, 242]]},
      {name: "EyePupil", change: true, typeName: "colour", path: ["Hat1","Colour"], controls: [1,2], range: [0,1], orig: hatPupil, colours: [hatPupil, [0, 0, 0]]},
      {name: "EyeIris", change: true, typeName: "colour", path: ["Hat1","Colour"], controls: [1,4], range: [0,2], orig: hatIris, colours: [hatIris, [51, 102, 204], [0, 153, 51]]},
    ] 
  },
  {
    type: "body", name: "Body", change: false,  filename: "bodyType1-", outputPath: "body", count:15, attributesToChange: [
      {name: "Fur", change: true, typeName: "colour", path: ["Base","Body","Fur"], controls: [1,14], range: [0,1], orig: furOrig, colours: [furOrig, [255, 204, 153]]},
      {name: "WhiteFur", change: true, typeName: "colour", path: ["Base","Body","WhiteFur"], controls: [1,7], range: [0,0], orig: white, colours: [white]},
      {name: "Stripes", change: true, typeName: "colour", path: ["Base","Body","Stripes"], controls: [1,28], range: [0,1], orig: hatPupil, colours: [hatPupil, redOrig]},
      {name: "Teeth", change: false, typeName: "colour", path: ["Base","Teeth"], controls: [1,2], range: [0,0], orig: white, colours: [white]},
      {name: "Pupil", change: true, typeName: "colour", path: ["Base","Eyes"], controls: [1,2], range: [0,0], orig: [51, 0, 0], colours: [[51, 0, 0]]},
      {name: "Iris", change: true, typeName: "colour", path: ["Base","Eyes"], controls: [1,2], range: [0,2], orig: tigerEye, colours: [tigerEye, [51, 102, 204], [0, 153, 51]]},
      {name: "EyeBrow", change: false, typeName: "colour", path: ["Base","Eyebrows"], controls: [1,2], range: [0,0], orig: hatPupil, colours: [hatPupil]},
      {name: "Nose", change: false, typeName: "colour", path: ["Base","Nose"], controls: [1,1], range: [0,0], orig: hatPupil, colours: [hatPupil]},
      {name: "Mouth", change: false, typeName: "colour", path: ["Base","Mouth"], controls: [1,2], range: [0,0], orig: [255, 44, 44], colours: [[255, 44, 44]]},
    ] 
  },
]

// var imageVariations = [
//   {
//     type: "clothing", change: true, name: "Clothes 1", filename: "clothesType1-", outputPath: "clothes", count:5, attributesToChange: [
//       {name: "Clothes1-Pants", change: true, typeName: "colour", path: ["Clothes1","Pants","Colour"], controls: [1,2], range: [0,1], colours: [[0, 255, 6], white]},
//       {name: "Clothes1-Shirt", change: true, typeName: "colour", path: ["Clothes1","T-Shirt","Colour"], controls: [1,5], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "T-Shirt-Logo", change: true, typeName: "images", path: ["Clothes1","T-Shirt-Logos"], range: [1,15]}
//     ] 
//   },
//   {
//     type: "clothing", change: true, name: "Clothes 2", filename: "clothesType2-", outputPath: "clothes", count:5, attributesToChange: [
//       {name: "Clothes2-Pants", change: true, typeName: "colour", path: ["Clothes2","Pants","Colour"], controls: [1,2], range: [0,1], colours: [[0, 255, 6], white]},
//       {name: "Clothes2-Shirt", change: true, typeName: "colour", path: ["Clothes2","Shirt","Colour"], controls: [1,3], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "Clothes2-Shirt-Trim", change: true, typeName: "colour", path: ["Clothes2","Shirt","Colour"], controls: [1,6], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "Clothes2-Shirt-Fast", change: true, typeName: "colour", path: ["Clothes2","Buttons"], controls: [1,9], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},      
//     ] 
//   },
//   {
//     type: "hat", name: "Hat 2", change: true, filename: "hatType-2", outputPath: "hats", count:5, attributesToChange: [
//       {name: "EmpHatMain", change: true, typeName: "colour", path: ["Hat2","Colour"], controls: [1,3], range: [0,1], colours: [[0, 255, 6], white]},
//       {name: "EmpHatTrim", change: true, typeName: "colour", path: ["Hat2","Colour"], controls: [1,3], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "EmpHatEdge", change: true, typeName: "colour", path: ["Hat2","Colour"], controls: [1,1], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//     ] 
//   },
//   {
//     type: "hat", name: "Hat 1", change: true, filename: "hatType-1", outputPath: "hats", count:15, attributesToChange: [
//       {name: "Base", change: true, typeName: "colour", path: ["Hat1","Colour"], controls: [1,13], range: [0,1], colours: [[0, 255, 6], white]},
//       {name: "EyePupil", change: true, typeName: "colour", path: ["Hat1","Colour"], controls: [1,2], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "EyeIris", change: true, typeName: "colour", path: ["Hat1","Colour"], controls: [1,4], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "ThirdColour", change: true, typeName: "colour", path: ["Hat1","Colour"], controls: [1,9], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "FourthColour", change: true, typeName: "colour", path: ["Hat1","Colour"], controls: [1,2], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//     ] 
//   },
//   {
//     type: "body", name: "Body", change: true,  filename: "bodyType-1", outputPath: "body", count:15, attributesToChange: [
//       {name: "Fur", change: true, typeName: "colour", path: ["Base","Body","Fur"], controls: [1,14], range: [0,1], colours: [[0, 255, 6], white]},
//       {name: "WhiteFur", change: true, typeName: "colour", path: ["Base","Body","WhiteFur"], controls: [1,7], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "Stripes", change: true, typeName: "colour", path: ["Base","Body","Stripes"], controls: [1,28], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "Mouth", change: true, typeName: "colour", path: ["Base","Mouth"], controls: [1,2], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "Pupil", change: true, typeName: "colour", path: ["Base","Eyes"], controls: [1,2], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "Iris", change: true, typeName: "colour", path: ["Base","Eyes"], controls: [1,2], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "Teeth", change: true, typeName: "colour", path: ["Base","Teeth"], controls: [1,2], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "EyeBrow", change: true, typeName: "colour", path: ["Base","Eyebrows"], controls: [1,2], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "Nose", change: true, typeName: "colour", path: ["Base","Nose"], controls: [1,1], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//     ] 
//   },
// ]



var nonVariedItems = [
  {
    type: "accessories", name: "Chopsticks", change: true,  filename: "chopsticks-", outputPath: "clothes", count:1, attributesToChange: [
      {name: "Chopsticks", change: true, typeName: "export", path:[], controls: [1,2]}
    ]
  },
  {
    type: "accessories", name: "Food", change: true,  filename: "food-", outputPath: "food", count:1, attributesToChange: [
      {name: "Food", change: true, typeName: "export", path:["Food"], controls: [1,12]}
    ]
  },
  {
    type: "accessories", name: "Chopstick Food", change: true,  filename: "chopstickFood-", outputPath: "food", count:1, attributesToChange: [
      {name: "Chopstick", change: true, typeName: "export", path:["ChopstickFood"], controls: [1,21]},
    ]
  },
  {
    type: "accessories", name: "Hand", change: true,  filename: "hand-", outputPath: "holding", count:1, attributesToChange: [      
      {name: "Hand", change: true, typeName: "export", path:["Hand"], controls: [1,15]},
    ] 
  },
  {
    type: "background", name: "Hand", change: true,  filename: "hand-", outputPath: "holding", count:1, attributesToChange: [      
      {name: "Hand", change: true, typeName: "export", path:["Hand"], controls: [1,15]},
    ] 
  },
  {
    type: "background", name: "Background", change: true,  filename: "background-", outputPath: "background", count:1, attributesToChange: [      
      {name: "Background", change: true, typeName: "export", path:["Backgrounds"], controls: [1,8]},
    ] 
  },
  {
    type: "background", name: "Shading", change: true,  filename: "shading-", outputPath: "shading", count:1, attributesToChange: [      
      {name: "Shading", change: true, typeName: "export", path:["Shading"], controls: [1,5]},
    ] 
  },
]


//export Image with name newImage.png (I have a specific path here)
// var pathNow = "G:\\Coding\\NFTs\\CNY\\scriptOutput\\";
var pathNow = "G:\\coding\\envs\\cny-images\\scriptOutput\\";
var filename = "newImage.png";
var suppressMsg = true;
var emptyOutputFolder = true

createNFTLayers()


function createNFTLayers() {

  emptyOutputFolder = false
  if (emptyOutputFolder) {
    var exPath = "/" + pathNow.replace(":", "").replace(/\\/g, "/");
    removeFolder(exPath, true)
    createFolder(exPath)
  }

  hideAllLayers(doc)
  createImagesFromImageSets(imageVariations)

  // hideAllLayers(doc)
  // // for (var i=0; i < nonVariedItems.length; i ++) {
  // //   if (nonVariedItems[i].name=="Shading") {
  // //     nonVariedItems[i].name = true
  // //   } else {
  // //     nonVariedItems[i].name = false
  // //   }
  // // }
  // exportNonVariedItems(nonVariedItems)

  // createMeta()
}


function createImagesFromImageSets(varyImages) {
  
  // run through imageSet and create images
  for (var varyNo=0; varyNo < varyImages.length; varyNo ++) {

    var imageSet = varyImages[varyNo];
    var patternSet = [];

    o("-------------changing set-------------");
    o(imageSet.name);         // Clothes 1
    createOneFolder(pathNow + imageSet.outputPath)

    // run through iteration count and create random layer
    var runCheck = 0
    var runLimit = 5 + imageSet.count
    for (var iterNo=0; iterNo < imageSet.count; iterNo ++) {   // run through based on count and pick an item randomly
      if (!imageSet.change) continue;

      // run through each attribute to change and select random item
      var newPattern = ""
      for (var attrNo=0; attrNo < imageSet.attributesToChange.length; attrNo++) {
        var attr = imageSet.attributesToChange[attrNo]
        if (!suppressMsg) o("------- changing attribute");
        if (!suppressMsg) o(attr.name);               // T-Shirt, Pants

        attr["selected"] = getRandomRange(attr.range);
        newPattern = newPattern + ([attr.name, "=", attr.selected].join("")) + "|";

        if (!suppressMsg) o(newPattern)
        if (!suppressMsg) o("------- changing attribute end");
      }

      // check if the  item exists in the current patterns
      if (existsInArray(newPattern, patternSet)) {
        iterNo--; 
        if (!suppressMsg) o("Skipping, pattern exists: " + newPattern)
      } else {
        if (!suppressMsg) o("Creating images: " + newPattern)
        createImages(imageSet, iterNo + 1)
        patternSet.push(newPattern)
      }
    }
    runCheck++
    if (runCheck >= runLimit) break;
  }
}



function createImages(imageSet, iterNo) {

  var layerPrefix = "ToColour-"
  var hideLayers = []
  hideAllLayers(doc)
  for (var attrNo=0; attrNo < imageSet.attributesToChange.length; attrNo++) {
    var attr = imageSet.attributesToChange[attrNo]
    if (!attr.change) continue;

    var toHide = getAiImage(doc, [], attr.path[0])
    if (toHide != null) hideLayers.push[toHide];

    if (!suppressMsg) o("creating type: " + attr.typeName);
    switch(attr.typeName.toLowerCase()) {
      case "colour":
        
        var newRGB = getRGB(attr.colours[attr.selected])
        if (!suppressMsg) o("setting colour of " + attr.name + " to rgb: " + ([newRGB.red, newRGB.green, newRGB.blue].join(",")))

        for (var pathNo=attr.controls[0]; pathNo < (attr.controls[1] - attr.controls[0] + 2); pathNo++) {
          
          var pathName = layerPrefix + attr.name + pathNo;
          if (!suppressMsg) o("changing colour of path: " + pathName)

          var changePath = getAiImage(doc, attr.path, pathName) 
          if (changePath != null) {
            if (!suppressMsg) o("changing colour of path and making visible: " + pathName + ", so it's included in the export") 

            changePath.visible = true
            changeColour(changePath, newRGB)
            hideLayers.push(changePath)

          } else {
            o("could not find path: " + pathName) 
          }
        }

      break;

      case "images":
        var pathName = attr.name + attr.selected;
        // var changePath = findItem(doc, pathName)    
        var changePath = getAiImage(doc, attr.path, pathName) 
        if (changePath != null) {
          if (!suppressMsg) o("showing path: " + pathName + ", so it's included in the export") 
        
          changePath.visible = true
          hideLayers.push(changePath)
        } else {
          o("could not find path: " + pathName) 
        }    
      break;
      default:
        o("type not specified") 
    }
  }
  // output Image
  var fullFilename = [pathNow, imageSet.outputPath, "\\", imageSet.filename, iterNo, ".png"].join("")
  if (suppressMsg) o("outputting image: " + fullFilename)
  exportFileToPNG24(fullFilename);

  // hide the layers again
  if (!suppressMsg) o("hiding used layers for next iteration")
  hideLayerObjects(hideLayers)
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
    if (!imageSet.change) continue;
    hideAllLayers()
    createOneFolder(pathNow + imageSet.outputPath)

    o("-------------outputing items -------------");
    o(imageSet.name);    

    // run through each attribute to change and select random item
    for (var attrNo=0; attrNo < imageSet.attributesToChange.length; attrNo++) {
      
      var attr = imageSet.attributesToChange[attrNo]
      for (var pathNo=attr.controls[0]; pathNo < (attr.controls[1] - attr.controls[0] + 2); pathNo++) {
        
        var pathName = attr.name + pathNo;
        var changePath = getAiImage(doc, attr.path, pathName) 
        if (changePath != null) {
          if (!suppressMsg) o("making visible: " + pathName + " to the export it") 
        
          // output Image
          changePath.visible = true
          var fullFilename = [pathNow, imageSet.outputPath, "\\", imageSet.filename, (pathNo + 1), ".png"].join("")
          if (suppressMsg) o("outputting image: " + fullFilename)
          exportFileToPNG24(fullFilename);

          // hide the layers again
          if (!suppressMsg) o("hiding used layers for next iteration")
          changePath.visible = false

        } else {
          o("could not find path: " + pathName) 
        }
      }
    }
  }
}


// #include "aiGenerals.jsxinc"

// // app.displayDialogs = DialogModes.NO;
// var doc = app.activeDocument;
// var defaultName = doc.activeLayer.name;
// var layers = doc.layers;

//   // {
//   //   type: "clothing", name: "Clothes 1", filename: "clothesType1-", count:5, attributesToChange: [
//   //     {name: "Clothes1-Pants", typeName: "colour", path: "Clothes1|Pants|Colour", controls: [1,2], range: [0,1], colours: [[0, 255, 6], white]},
//   //     {name: "Clothes1-Shirt", typeName: "colour", path:"Clothes1|T-Shirt|Colour", controls: [1,5], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//   //     {name: "T-Shirt-Logo", typeName: "images", path: "Clothes1|T-Shirt-Logos", range: [1,15]}
//   //   ] 
//   // },
//   // {
//   //   type: "clothing", name: "Clothes 2", filename: "clothesType2-", count:5, attributesToChange: [
//   //     {name: "Clothes2-Pants", typeName: "colour", path: "Clothes2|Pants|Colour", controls: [1,2], range: [0,1], colours: [[0, 255, 6], white]},
//   //     {name: "Clothes2-Shirt", typeName: "colour", path:"Clothes2|Shirt|Colour", controls: [1,3], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//   //     {name: "Clothes2-Shirt-Trim", typeName: "colour", path:"Clothes2|Shirt|Colour", controls: [1,6], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//   //     {name: "Clothes2-Shirt-Fast", typeName: "colour", path:"Clothes2|Buttons", controls: [1,9], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},      
//   //   ] 
//   // },
//   // {
//   //   type: "hat", name: "Hat 2", filename: "hatType-2", count:5, attributesToChange: [
//   //     {name: "EmpHatMain", typeName: "colour", path:"Hat2|Colour", controls: [1,3], range: [0,1], colours: [[0, 255, 6], white]},
//   //     {name: "EmpHatTrim", typeName: "colour", path:"Hat2|Colour", controls: [1,3], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//   //     {name: "EmpHatEdge", typeName: "colour", path:"Hat2|Colour", controls: [1,1], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//   //   ] 
//   // },
//   {
//     type: "hat", name: "Hat 1", filename: "hatType-1", count:15, attributesToChange: [
//       {name: "Base", typeName: "colour", path:"Hat1|Colour", controls: [1,13], range: [0,1], colours: [[0, 255, 6], white]},
//       {name: "EyePupil", typeName: "colour", path:"Hat1|Colour", controls: [1,2], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "EyeIris", typeName: "colour", path:"Hat1|Colour", controls: [1,4], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "ThirdColour", typeName: "colour", path:"Hat1|Colour", controls: [1,9], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "FourthColour", typeName: "colour", path:"Hat1|Colour", controls: [1,2], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//     ] 
//   },
// var imageVariations = [
//   {
//     type: "hat", name: "Hat 1", filename: "hatType-1", count:15, attributesToChange: [
//       {name: "Base", typeName: "colour", path:"Hat1|Colour", controls: [1,13], range: [0,1], colours: [[0, 255, 6], white]},
//       {name: "EyePupil", typeName: "colour", path:"Hat1|Colour", controls: [1,2], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "EyeIris", typeName: "colour", path:"Hat1|Colour", controls: [1,4], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "ThirdColour", typeName: "colour", path:"Hat1|Colour", controls: [1,9], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//       {name: "FourthColour", typeName: "colour", path:"Hat1|Colour", controls: [1,2], range: [0,2], colours: [[0,0,0], [100, 100, 100], [255, 10, 20]]},
//     ] 
//   },
// ]


// //export Image with name newImage.png (I have a specific path here)
// var pathNow = "H:\\My Drive\\NFTs\\CNY\\scriptOutput\\";
// var filename = "newImage.png";
// var suppressMsg = true;



// // hideAllLayers(doc)
// // createImagesFromImageSets(imageVariations)

// function createImagesFromImageSets(varyImages) {
  
//   // run through imageSet and create images
//   for (var varyNo=0; varyNo < varyImages.length; varyNo ++) {

//     var imageSet = varyImages[varyNo];
//     var patternSet = [];

//     o("-------------changing set-------------");
//     o(imageSet.name);         // Clothes 1

//     // run through iteration count and create random layer
//     var runCheck = 0
//     var runLimit = 5 + imageSet.count
//     for (var iterNo=0; iterNo < imageSet.count; iterNo ++) {   // run through based on count and pick an item randomly

//       // run through each attribute to change and select random item
//       var newPattern = ""
//       for (var attrNo=0; attrNo < imageSet.attributesToChange.length; attrNo++) {
//         var attr = imageSet.attributesToChange[attrNo]
//         if (!suppressMsg) o("------- changing attribute");
//         if (!suppressMsg) o(attr.name);               // T-Shirt, Pants

//         attr["selected"] = getRandomRange(attr.range);
//         newPattern = newPattern + ([attr.name, "=", attr.selected].join("")) + "|";

//         if (!suppressMsg) o(newPattern)
//         if (!suppressMsg) o("------- changing attribute end");
//       }

//       // check if the  item exists in the current patterns
//       if (existsInArray(newPattern, patternSet)) {
//         iterNo--; 
//         if (!suppressMsg) o("Skipping, pattern exists: " + newPattern)
//       } else {
//         if (!suppressMsg) o("Creating images: " + newPattern)
//         createImages(imageSet, iterNo + 1)
//         patternSet.push(newPattern)
//       }
//     }
//     runCheck++
//     if (runCheck >= runLimit) break;
//   }
// }



// function createImages(imageSet, iterNo) {

//   var layerPrefix = "ToColour-"
//   var hideLayers = []
//   for (var attrNo=0; attrNo < imageSet.attributesToChange.length; attrNo++) {
//     var attr = imageSet.attributesToChange[attrNo]
//     if (!suppressMsg) o("creating type: " + attr.typeName)

//     switch(attr.typeName.toLowerCase()) {
//       case "colour":
        
//         var newRGB = getRGB(attr.colours[attr.selected])
//         if (!suppressMsg) o("setting colour of " + attr.name + " to rgb: " + ([newRGB.red, newRGB.green, newRGB.blue].join(",")))

//         for (var pathNo=attr.controls[0]; pathNo < (attr.controls[1] - attr.controls[0] + 2); pathNo++) {
          
//           var pathName = layerPrefix + attr.name + pathNo;
//           if (!suppressMsg) o("changing colour of path: " + pathName)

//           var changePath = getAiImage(doc, attr.path, pathName) 
//           if (changePath != null) {
//             if (!suppressMsg) o("changing colour of path and making visible: " + pathName + ", so it's included in the export") 

//             // o(attr.name + pathNo)
//             // if (layerPrefix + attr.name + pathNo == 'ToColour-Base12'){
//             //   o("here")
//             // }
          
//             changePath.visible = true
//             changeColour(changePath, newRGB)
//             hideLayers.push(changePath)

//           } else {
//             o("could not find path: " + pathName) 
//           }
//         }

//       break;

//       case "images":
//         var pathName = attr.name + attr.selected;
//         // var changePath = findItem(doc, pathName)    
//         var changePath = getAiImage(doc, attr.path, pathName) 
//         if (changePath != null) {
//           if (!suppressMsg) o("showing path: " + pathName + ", so it's included in the export") 
        
//           changePath.visible = true
//           hideLayers.push(changePath)
//         } else {
//           o("could not find path: " + pathName) 
//         }    
        

//       break;

//       default:
//         o("type not specified") 
//     }
//   }
//   // output Image
//   var fullFilename = [pathNow, imageSet.filename, iterNo, ".png"].join("")
//   if (suppressMsg) o("outputting image: " + fullFilename)
//   exportFileToPNG24(fullFilename);

//   // hide the layers again
//   if (!suppressMsg) o("hiding used layers for next iteration")
//   hideLayerObjects(hideLayers)
// }



