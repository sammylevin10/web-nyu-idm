/* JS RESOURCES
Using the HTML Canvas
  >https://www.w3schools.com/html/html5_canvas.asp
  >https://www.w3schools.com/tags/canvas_drawimage.asp
  >https://davidwalsh.name/canvas-filters
JQuery
  >https://api.jquery.com/fadeto/
  >https://www.w3schools.com/jquery/jquery_fade.asp
  >https://api.jquery.com/toggleclass/
  >https://stackoverflow.com/questions/56511466/how-to-create-a-jquery-function-to-toggle-dark-mode
*/

let myLevel = 1,        //myLevel stores which directory the user is currently in (1=Cabinet, 2=Drawer, 3=File)
  myDrawer = 0,         //myDrawer stores which drawer the user selected
  myFile = 0,           //myFile stores which file the user selected
  myBlur = 40,          //myBlur stores the default bluriness (px) of the canvas
  mySaturation = 0,     //mySaturation stores the default saturation of the canvas
  fadeTime = 1000,      //fadeTime stores the default crossfade duration for vectors
  settingsBar = false,  //settingsBar stores the visibility state of the expanded settings buttons
  textbox = true;       //textbox stores the visibility state of the informational textbox

//The canvas is declared, set to a 2d context, and a grey background is established
let c = document.getElementById("imageCanvas");
let ctx = c.getContext("2d");
//Anti-aliasing is disabled to prevent pixel binning
ctx.imageSmoothingEnabled = false;
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, c.width, c.height);

//loopDraw() is invoked, drawing all 30 (blurry and grayscale) images to canvas
loopDraw();

//The expanded settings buttons are hidden by default
$("#info").fadeOut(0);
$("#light").fadeOut(0);
$("#dark").fadeOut(0);
$("#matrix").fadeOut(0);

// -----DRAWING FUNCTIONS-----
// Images are drawn to the canvas background corresponding to what level, drawer, or file the user selected

//The draw() function is an abstraction of the HTML canvas' drawImage() function and serves as a helper function to loopDraw()
function draw(myImage, sx, sy, sw, sh, x, y, w, h) {
  let ctx = document.getElementById("imageCanvas").getContext('2d');
  //The canvas is filtered with blur and saturation, referencing the variables mySaturation and myBlur
  ctx.filter = 'saturate(' + mySaturation + ') blur(' + myBlur + 'px)';
  //An image is instantiated based on the myImage string argument
  var img = new Image();
  img.src = "images/" + myImage + ".jpg";
  //The program asynchronously awaits the img to load before invoking the HTML canvas' drawImage() function
  img.onload = function() {
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }
}
//loopDraw draws a grid of images to the canvas, depending on the user's level
//Values are hardcoded because the HTML canvas' dimensions are not adaptive, meaning pixels are not always square. Hence, an adaptive function for maintaining image aspect ratios would be quite a challenge to write.
function loopDraw() {
  let myImage,  //myImage stores the single image to be drawn in each loop
    tileWidth,  //tileWidth stores the width (px) of each image tile
    tileHeight, //tileHeight stores the height (px) of each image tile
    sx,         //sx stores the starting x coordinate in which a segment is clipped from
    sy,         //sy stores the starting y coordinate in which a segment is clipped from
    sw,         //sw stores the width of the clipped segment
    sh;         //sh stores the height of the clipped segment
  //At level 1, a 3x10 grid is drawn for 30 total images
  if (myLevel == 1) {
    tileWidth = 200;
    tileHeight = 267;
    sx = 550;
    sw = 900;
    sy = 0;
    sh = 1333;
    myImage = 10;
  //At level 2, a 2x5 grid is drawn for 10 total images
  } else if (myLevel == 2) {
    tileWidth = 400;
    tileHeight = 400;
    sx = 400;
    sw = 1200;
    sy = 0;
    sh = 1333;
    myImage = myDrawer * 10;
  // At level 3, a 1x1 grid is drawn for 1 total image
  } else {
    tileWidth = 2000;
    tileHeight = 900;
    sx = 0;
    sw = 2000;
    sy = 250;
    sh = 833;
    myImage = myFile;
  }
  // A nested for loop is used to invoke draw() for a grid of canvas coordinates
  for (let x = 0; x < 2000; x += tileWidth) {
    for (let y = 100; y < 900; y += tileHeight) {
      draw(myImage, sx, sy, sw, sh, x, y, tileWidth, tileHeight);
      myImage += 1;
    }
  }
}

// -----SELECTOR FUNCTIONS-----
// The user can jump between levels (directories) by choosing a specific drawer or file to view, or stepping back one level

//The go() function enables the user to select a drawer when on level 1
function go(x) {
  myDrawer = x;
  //myBlur and mySaturation are decremented to yield a clearer image after every selection
  if (myBlur > -1) myBlur -= 2, mySaturation += 0.05;
  if (myLevel != 3) myLevel += 1;
  //loopDraw() is invoked to draw the corresponding images to canvas
  loopDraw();
  //The necessary vectors are made visible or invisible in order to visualize the transition from level 1 to level 2
  cabinetVisible(false);
  drawerVisible(true, myDrawer);
  fileVisible(true, myDrawer * 10, myDrawer * 10 + 10);
}
//The gogo() function enables the user to select a file when on level 2
function gogo(x) {
  myFile = x;
  //myBlur and mySaturation are decremented to yield a clearer image after every selection
  if (myBlur > -1) myBlur -= 2, mySaturation += 0.05;
  if (myLevel != 3) myLevel += 1;
  //loopDraw() is invoked to draw the corresponding images to canvas
  loopDraw();
  //The necessary vectors are made visible or invisible in order to visualize the transition from level 2 to level 3
  elementClickable("Files", false);
  drawerVisible(true, 0);
  fileVisible(true, myFile, myFile + 1);
}
//The random() function enables the user to make a random selection of a drawer or file
function random() {
  let mySelection;
  //If the user is on level 1 (cabinet directory) three possible random selections could be made
  if (myLevel == 1) {
    mySelection = parseInt(1 + 3 * Math.random());
    //go() is used as a helper method to perform the selection
    go(mySelection);
  // If the user is on level 2 (drawer directory) ten possible random selections could be made per drawer
  } else if (myLevel == 2) {
    mySelection = parseInt(myDrawer * 10 + 9 * Math.random());
    //gogo() is used as a helper method to perform the selection
    gogo(mySelection);
  }
}
//The back() function enables the user to navigate back one level
function back() {
  //myLevel is decremented with error-catching in the event of multiple clicks
  if (myLevel != 1) myLevel -= 1;
  //loopDraw() is invoked to draw the corresponding images to canvas
  loopDraw();
  //The necessary vectors are made visible or invisible in order to visualize the transition between levels
  if (myLevel == 1) {
    cabinetVisible(true);
    drawerVisible(false, 0);
    fileVisible(false, 0, 0);
  }
  if (myLevel == 2) {
    cabinetVisible(false);
    drawerVisible(true, myDrawer);
    fileVisible(true, myDrawer * 10, myDrawer * 10 + 10);
    elementClickable("Files", true);
  }
}

// -----COLOR MODES-----
// Different color modes can be selected to change the look and feel of the website

//The colorMode() function modifies HTML classes in order for CSS to alter color variables referenced by other rule sets
function colorMode(mode) {
  //The colorWrap wrapper id is stripped of any corresponding classes, which determine the color variables in CSS
  $("#colorWrap").removeClass("light");
  $("#colorWrap").removeClass("dark");
  $("#colorWrap").removeClass("matrix");
  //A new class is assigned to the wrapper, corresponding to the mode string argument
  if (mode == "light") {
    $("#colorWrap").addClass("light");
  } else if (mode == "dark") {
    $("#colorWrap").toggleClass("dark");
  } else {
    $("#colorWrap").toggleClass("matrix");
  }
}

// -----VISIBILITY/CLICKABILITY FUNCTIONS-----
// Different vectors are made visible, invisible, clickable, or unclickable depending on the user's level and selection

//The textboxVisible() function toggles the visibility of the informational textbox
function textboxVisible() {
  if (textbox) {
    //JQuery is used to fade out the textbox and hide its visibility in order to prevent it from interfering with other elements
    $(".textbox").fadeTo(fadeTime, 0, function() {
      $(".textbox").css("visibility", "hidden");
    });
  } else {
    //JQuery is used to fade in the textbox and hide its visibility in order to prevent it from interfering with other elements
    $(".textbox").fadeTo(fadeTime, 1, function() {
      $(".textbox").css("visibility", "visible");
    });
  }
  //The textbox flag is inverted
  textbox = !textbox;
}
//The settingsBarVisible() function toggles the visibility of the expanded settings bar
function settingsBarVisible() {
  //JQuery is used to fade out the textbox
  if (settingsBar) {
    $("#info").fadeOut(fadeTime);
    $("#light").fadeOut(fadeTime);
    $("#dark").fadeOut(fadeTime);
    $("#matrix").fadeOut(fadeTime);
  //JQuery is used to fade in the textbox
  } else {
    $("#info").fadeIn(fadeTime);
    $("#light").fadeIn(fadeTime);
    $("#dark").fadeIn(fadeTime);
    $("#matrix").fadeIn(fadeTime);
  }
  //The settingsBar flag is inverted
  settingsBar = !settingsBar;
}
//The cabinetVisible() function assigns the visibility of the cabinet vector based on the myBool argument
function cabinetVisible(myBool) {
  if (myBool) $("#Cabinet").fadeIn(fadeTime);
  else $("#Cabinet").fadeOut(fadeTime);
  //elementClickable() is invoked as a helper method to prevent drawers from inverting when moused over as the cabinet disappears
  elementClickable("Drawers", myBool);
}
// The drawerVisible() function assigns the visibility of drawer vectors based on the myBool argument
// myInt 0-3 determines the unit upon which the operation is uniquely applied
// For example, true=show apply 2 would show drawer 2 only
// For example, false=hide apply 0 would show drawers 1-3
function drawerVisible(myBool, myInt) {
  //All 3 drawers are looped, and their visibility is assigned based on arguments
  for (let i = 1; i < 4; i++) {
    if (i == myInt) {
      if (myBool) $("#drawer" + i).fadeIn(fadeTime);
      else $("#drawer" + i).fadeOut(fadeTime);
    } else {
      if (myBool) $("#drawer" + i).fadeOut(fadeTime);
      else $("#drawer" + i).fadeIn(fadeTime);
    }
  }
}
// The settingsBarVisible() function assigns the visibility of the cabinet vector based on the myBool argument
// myMin is an inclusive bottom selector of units upon which the operation is uniquely applied
// myMax is an exclusive top selector of units upon which the operation is uniquely applied
// For example, true=show apply 0 and 1 would show none of the 1-30 files
// For example, false=hide apply 11 and 20 would hide files 11-19
function fileVisible(myBool, myMin, myMax) {
  //All 30 files are looped, and their visibility is assigned based on arguments
  for (let i = 10; i < 40; i++) {
    if (i > myMin - 1 && i < myMax) {
      if (myBool) $("#file" + i).fadeIn(fadeTime);
      else $("#file" + i).fadeOut(fadeTime);
    } else {
      if (myBool) $("#file" + i).fadeOut(fadeTime);
      else $("#file" + i).fadeIn(fadeTime);
    }
  }
}
//The elementClickable() function is a helper method that modifies the :hover pseudoclass for clickable vectors, signalling to users that the vector is not longer a button
function elementClickable(myId, myBool) {
  if (myBool == true) {
    $("#" + myId + ">g:hover").css("fill", "black");
  } else {
    $("#" + myId + ">g:hover").css("fill", "white");
  }
}
