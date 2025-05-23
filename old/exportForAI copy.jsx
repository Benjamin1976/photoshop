/**
 * Export for Android Photoshop Script
 *
 * Author: Rich Freedman (greybeardedgeek.net)
 * GitHub: https://github.com/rfreedman
 * Twitter: @greybeardedgeek
 *
 * ---------
 * Modified by Julien Quéré - @juli1quere - http://sinplicity.fr :
 *  - Add the ability to specify the source file density,
 *  - Add XXHDPI,
 *  - Add the "automatic" option for the resize method.
 * ---------
 * This script started as an 'Export for iOS' script, whose original author
 * has requested to remain anonymous.
 *
 * I modified the iOS script to instead export the appropriate image sizes for Android.
 *
 * This script is intended to be used on a photoshop document containing mdpi
 * artwork for Android. It will resize, trim and save the selected layer or group, into a
 * directory you select using the layer name (normalised) for the file name. There are a
 * couple of resizing options you can select such as the
 * resizing method and whether to scale styles or not. It does not alter your original
 * document in anyway.
 *
 * Images are saved to 'drawable-ldpi', 'drawable-mdpi', 'drawable-hdpi', and 'drawable-xhdpi'
 * directories under the selected output directory. If these directories do not exist,
 * the script will create them.
 *
 * Original 'license':
 * Feel free to share/reuse/modify to your heart's content.
 * Attribution would be nice but is not required.
 */
// constants
var ResizeMethod = {
  AUTO: { name: "Automatic", value: "automatic" },
  NEARESTNEIGHBOUR: { name: "Nearest Neighbour", value: "Nrst" },
  BILINEAR: { name: "Bilinear", value: "Blnr" },
  BICUBIC: { name: "Bicubic", value: "Bcbc" },
  BICUBICSMOOTHER: { name: "Bicubic Smoother", value: "bicubicSmoother" },
  BICUBICSHARPER: { name: "Bicubic Sharper", value: "bicubicSharper" },
};
var resizeMethodLookup = {};
resizeMethodLookup[ResizeMethod.AUTO.name] = ResizeMethod.AUTO.value;
resizeMethodLookup[ResizeMethod.NEARESTNEIGHBOUR.name] =
  ResizeMethod.NEARESTNEIGHBOUR.value;
resizeMethodLookup[ResizeMethod.BILINEAR.name] = ResizeMethod.BILINEAR.value;
resizeMethodLookup[ResizeMethod.BICUBIC.name] = ResizeMethod.BICUBIC.value;
resizeMethodLookup[ResizeMethod.BICUBICSMOOTHER.name] =
  ResizeMethod.BICUBICSMOOTHER.value;
resizeMethodLookup[ResizeMethod.BICUBICSHARPER.name] =
  ResizeMethod.BICUBICSHARPER.value;

var OriginalDensity = {
  MDPI: { name: "MDPI", value: 1 },
  HDPI: { name: "HDPI", value: 1.5 },
  XHDPI: { name: "XHDPI", value: 2 },
  XXHDPI: { name: "XXHDPI", value: 3 },
};

var origalDensityLookup = {};
origalDensityLookup[OriginalDensity.MDPI.name] = OriginalDensity.MDPI.value;
origalDensityLookup[OriginalDensity.HDPI.name] = OriginalDensity.HDPI.value;
origalDensityLookup[OriginalDensity.XHDPI.name] = OriginalDensity.XHDPI.value;
origalDensityLookup[OriginalDensity.XXHDPI.name] = OriginalDensity.XXHDPI.value;

var selectDialog;

function savePng(
  width,
  resizeMethod,
  scaleStyles,
  folderName,
  normalisedName,
  dupDoc
) {
  resizeImage(UnitValue(width, "px"), resizeMethod, scaleStyles);
  outputFolder = Folder(folderName);
  if (!outputFolder.exists) outputFolder.create();
  saveForWebPNG(dupDoc, outputFolder.fullName, normalisedName);
}

function saveForWebPNG(doc, outputFolderStr, filename) {
  var opts, file;
  opts = new ExportOptionsSaveForWeb();
  opts.format = SaveDocumentType.PNG;
  opts.PNG8 = false;
  opts.quality = 100;
  if (filename.length > 27) {
    file = new File(outputFolderStr + "/temp.png");
    doc.exportDocument(file, ExportType.SAVEFORWEB, opts);
    file.rename(filename + ".png");
  } else {
    file = new File(outputFolderStr + "/" + filename + ".png");
    doc.exportDocument(file, ExportType.SAVEFORWEB, opts);
  }
}

function resizeImage(width, method, scaleStyles) {
  var action = new ActionDescriptor();
  action.putUnitDouble(charIDToTypeID("Wdth"), charIDToTypeID("#Pxl"), width);

  if (scaleStyles == true)
    action.putBoolean(stringIDToTypeID("scaleStyles"), true);

  action.putBoolean(charIDToTypeID("CnsP"), true);
  if (method != ResizeMethod.AUTO.value) {
    action.putEnumerated(
      charIDToTypeID("Intr"),
      charIDToTypeID("Intp"),
      charIDToTypeID(method)
    );
  }
  executeAction(charIDToTypeID("ImgS"), action, DialogModes.NO);
}

function exportImages(baseName, resizeMethod, scaleStyles, originalDensity) {
  // select a folder to save to
  var folder = Folder.selectDialog();
  if (folder) {
    // Save original units
    var originalRulerUnits = app.preferences.rulerUnits;
    var originalTypeUnits = app.preferences.typeUnits;

    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;

    // get currect document
    var doc = app.activeDocument;

    // create new document based on the current docs values except name which user
    var dup = app.documents.add(
      doc.width,
      doc.height,
      doc.resolution,
      baseName,
      NewDocumentMode.RGB,
      DocumentFill.TRANSPARENT
    );

    // switch back to origal doc to allow duplicate
    app.activeDocument = doc;

    // duplicate the selected layer (only works for one) at place it in the new doc
    doc.activeLayer.duplicate(dup);

    // switch back to the new document
    app.activeDocument = dup;

    // trim the document so that all that appears is our element
    dup.trim(TrimType.TRANSPARENT);

    // adjust canvas size so that it is an even number of pixels (so scaling down fits on whole pixel)
    dup.resizeCanvas(
      Math.ceil(dup.width / 2) * 2,
      Math.ceil(dup.height / 2) * 2,
      AnchorPosition.TOPLEFT
    );

    // normalise name (basic normalisation lower case and hyphenated, modify or remove to taste)
    var normalisedName = dup.name.toLowerCase().replace(" ", "-");

    var originalWidth = dup.width;

    var mdpiWidth =
      originalWidth * (OriginalDensity.MDPI.value / originalDensity);
    var hdpiWidth =
      originalWidth * (OriginalDensity.HDPI.value / originalDensity);
    var xhdpiWidth =
      originalWidth * (OriginalDensity.XHDPI.value / originalDensity);
    var xxhdpiWidth =
      originalWidth * (OriginalDensity.XXHDPI.value / originalDensity);

    savePng(
      mdpiWidth,
      resizeMethod,
      scaleStyles,
      folder.fullName + "/drawable-mdpi",
      normalisedName,
      dup
    );
    savePng(
      hdpiWidth,
      resizeMethod,
      scaleStyles,
      folder.fullName + "/drawable-hdpi",
      normalisedName,
      dup
    );
    savePng(
      xhdpiWidth,
      resizeMethod,
      scaleStyles,
      folder.fullName + "/drawable-xhdpi",
      normalisedName,
      dup
    );
    savePng(
      xxhdpiWidth,
      resizeMethod,
      scaleStyles,
      folder.fullName + "/drawable-xxhdpi",
      normalisedName,
      dup
    );

    dup.close(SaveOptions.DONOTSAVECHANGES);

    app.preferences.rulerUnits = originalRulerUnits;
    app.preferences.typeUnits = originalTypeUnits;
  }
}

function okClickedHandler() {
  // var resizeMethod =
  //   resizeMethodLookup[exportDialog.methodOptions.selection.text];
  // var scaleStyles = exportDialog.scaleStylesCheckBox.value;
  // var baseName = exportDialog.namePanel.nameBox.text;
  // var originalDensity =
  //   origalDensityLookup[exportDialog.originalDensityOptions.selection.text];
  // exportDialog.close();
  // exportImages(baseName, resizeMethod, scaleStyles, originalDensity);
}

function showSelectedClickedHandler() {
  // get currect document
  var doc = app.activeDocument;
}
function hideSelectedClickedHandler() {}
function lockSelectedClickedHandler() {}
function unlockSelectedClickedHandler() {}
function closeClickedHandler() {}

selectDialog = new Window("dialog", "Select Deselect");
selectDialog.alignChildren = "left";

selectDialog.buttonPanel = selectDialog.add("panel", undefined, "Select");
selectDialog.buttonPanel.alignChildren = "left";

selectDialog.buttonGroup = selectDialog.buttonPanel.add("group");
selectDialog.buttonGroup.showSelectedButton = selectDialog.buttonGroup.add(
  "button",
  undefined,
  "Show Selected"
);
selectDialog.buttonGroup.showSelectedButton.addEventListener(
  "click",
  showSelectedClickedHandler
);

selectDialog.buttonGroup.hideSelectedButton = selectDialog.buttonGroup.add(
  "button",
  undefined,
  "Hide Selected"
);
selectDialog.buttonGroup.hideSelectedButton.addEventListener(
  "click",
  hideSelectedClickedHandler
);

selectDialog.buttonGroup = selectDialog.buttonPanel.add("group");
selectDialog.buttonGroup.lockSelectedButton = selectDialog.buttonGroup.add(
  "button",
  undefined,
  "Show Selected"
);
selectDialog.buttonGroup.lockSelectedButton.addEventListener(
  "click",
  lockSelectedClickedHandler
);

selectDialog.buttonGroup.unlockSelectedButton = selectDialog.buttonGroup.add(
  "button",
  undefined,
  "Hide Selected"
);
selectDialog.buttonGroup.unlockSelectedButton.addEventListener(
  "click",
  unlockSelectedClickedHandler
);

selectDialog.buttonGroup = selectDialog.buttonPanel.add("group");
selectDialog.buttonGroup.closeButton = selectDialog.buttonGroup.add(
  "button",
  undefined,
  "Close"
);
selectDialog.buttonGroup.closeButton.addEventListener(
  "click",
  closeClickedHandler
);

selectDialog.show();

// selectDialog.buttonGroup = selectDialog.add("group");
// selectDialog.buttonGroup.cancelButton = selectDialog.buttonGroup.add(
//   "button",
//   undefined,
//   "Hide All"
// );
// selectDialog.buttonGroup.okButton = selectDialog.buttonGroup.add(
//   "button",
//   undefined,
//   "Show All"
// );
