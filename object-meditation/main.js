let myLevel = 1, myDrawer = 0, myFile = 0, myBlur = 40, mySaturation = 0, fadeTime = 1000, settingsBar = false, textbox = true;

let c = document.getElementById("imageCanvas");
let ctx = c.getContext("2d");
ctx.imageSmoothingEnabled= false;
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, c.width, c.height);

loopDraw();

$("#info").fadeOut(1);
$("#light").fadeOut(1);
$("#dark").fadeOut(1);
$("#matrix").fadeOut(1);

annyang.start();
if (annyang) {
  var commands = {
    'hello': function() {
      alert('world!');
    }
  }
  annyang.init(commands);
  annyang.debug();
}

function draw(myImage, sx, sy, sw, sh, x, y, w, h) {
  let ctx = document.getElementById("imageCanvas").getContext('2d');
  ctx.filter = 'saturate('+mySaturation+') blur('+myBlur+'px)';
  var img = new Image();
  img.src = "images/"+myImage+".jpg";
  img.onload = function() {
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }
}

function loopDraw() {
  let myImage, tileWidth, tileHeight, sx, sy, sw, sh;
  if (myLevel==1) {
    tileWidth=200;
    tileHeight=267;
    sx = 550;
    sw = 900;
    sy = 0;
    sh = 1333;
    myImage = 10;
  }
  else if (myLevel==2) {
    tileWidth=400;
    tileHeight=400;
    sx = 400;
    sw = 1200;
    sy = 0;
    sh = 1333;
    myImage = myDrawer*10;
    // console.log(myDrawer);
  }
  else {
    tileWidth=2000;
    tileHeight=900;
    sx = 0;
    sw = 2000;
    sy = 250;
    sh = 833;
    myImage = myFile;
  }
  for (let x = 0; x<2000; x+=tileWidth) {
    for (let y = 100; y<900; y+=tileHeight) {
      draw(myImage, sx, sy, sw, sh, x, y, tileWidth, tileHeight);
      myImage+=1;
    }
  }
}

function random() {
  let mySelection=0;
  if (myLevel == 1) {
    mySelection = parseInt(1 + 3 * Math.random());
    go(mySelection);
  }
  else if (myLevel == 2) {
    mySelection = parseInt(myDrawer*10 + 9 * Math.random());
    gogo(mySelection);
  }
}

function go(x) {
  myDrawer = x;
  if (myBlur>-1) myBlur-=2, mySaturation+=0.05;
  if (myLevel != 3) myLevel += 1;
  loopDraw();
  cabinetVisible(false);
  drawerVisible(true,myDrawer);
  fileVisible(true,myDrawer*10,myDrawer*10+10);
}

function gogo(x) {
  myFile = x;
  if (myBlur>-1) myBlur-=2, mySaturation+=0.05;
  if (myLevel != 3) myLevel += 1;
  loopDraw();
  elementClickable("Files", false);
  drawerVisible(true,0);
  fileVisible(true,myFile,myFile+1);
}

function back() {
  if (myLevel != 1) myLevel -= 1;
  loopDraw();
  if (myLevel == 1) {
    cabinetVisible(true);
    drawerVisible(false,0);
    fileVisible(false,0,0);
  }
  if (myLevel == 2) {
    cabinetVisible(false);
    drawerVisible(true, myDrawer);
    fileVisible(true, myDrawer * 10, myDrawer * 10 + 10);
    elementClickable("Files", true);
  }
}

function colorMode(mode) {
  $("#colorWrap").removeClass("light");
  $("#colorWrap").removeClass("dark");
  $("#colorWrap").removeClass("matrix");
  if (mode=="light") {
    console.log("light mode");
    $("#colorWrap").addClass("light");
  }
  else if (mode=="dark") {
    console.log("dark mode");
    $("#colorWrap").toggleClass("dark");
  }
  else {
    console.log("matrix mode");
    $("#colorWrap").toggleClass("matrix");
  }
}

function textboxVisible() {
  if (textbox) {
    $(".textbox").fadeTo( fadeTime , 0, function() {
      $(".textbox").css("visibility", "hidden");
    });
  }
  else {
    $(".textbox").fadeTo( fadeTime , 1, function() {
      $(".textbox").css("visibility", "visible");
    });
  }
  textbox=!textbox;
}

function settingsBarVisible() {
  if (settingsBar) {
    $("#info").fadeOut(fadeTime);
    $("#light").fadeOut(fadeTime);
    $("#dark").fadeOut(fadeTime);
    $("#matrix").fadeOut(fadeTime);
  }
  else {
    $("#info").fadeIn(fadeTime);
    $("#light").fadeIn(fadeTime);
    $("#dark").fadeIn(fadeTime);
    $("#matrix").fadeIn(fadeTime);
  }
  settingsBar = !settingsBar;
}

// myBool true/false determines show/hide operation
function cabinetVisible(myBool) {
  if (myBool) $("#Cabinet").fadeIn(fadeTime);
  else $("#Cabinet").fadeOut(fadeTime);
  elementClickable("Drawers", myBool);
}

// myBool true/false determines show/hide operation
// myInt 0-3 determines the unit upon which the operation is uniquely applied
// For example, true=show apply 0 would hide drawers 1-3
// For example, false=hide apply 0 would show drawers 1-3
function drawerVisible(myBool, myInt) {
  for (let i = 1; i < 4; i++) {
    if (i == myInt) {
      if (myBool) $("#drawer"+i).fadeIn(fadeTime);
      else $("#drawer"+i).fadeOut(fadeTime);
    } else {
      if (myBool) $("#drawer"+i).fadeOut(fadeTime);
      else $("#drawer"+i).fadeIn(fadeTime);
    }
  }
}

// myBool true/false determines show/hide operation
// myMin is an inclusive bottom selector of units upon which the operation is uniquely applied
// myMax is an exclusive top selector of units upon which the operation is uniquely applied
// For example, true=show apply 0 would show none of the 1-30 folders
// For example, false=hide apply 0 would hide none of the 1-30 folders
function fileVisible(myBool, myMin, myMax) {
  for (let i = 10; i < 40; i++) {
    if (i > myMin - 1 && i < myMax) {
      if (myBool) $("#file"+i).fadeIn(fadeTime);
      else $("#file"+i).fadeOut(fadeTime);
      // console.log(i);
    } else {
      if (myBool) $("#file"+i).fadeOut(fadeTime);
      else $("#file"+i).fadeIn(fadeTime);
    }
  }
}

// myBool true/false determines show/hide myOperation
// returns a string of visible or hidden
function showHideOperation(myBool) {
  let myOperation;
  if (myBool == true) {
    myOperation = "visible";
  } else {
    myOperation = "hidden";
  }
  return myOperation;
}

function elementClickable(myId, myBool) {
  if (myBool==true) {
    $("#"+myId+">g:hover").css("fill", "black");
    // console.log(myId+" are clickable!");
  }
  else {
    $("#"+myId+">g:hover").css("fill", "white");
    // console.log(myId+" are not clickable!");
  }
}
