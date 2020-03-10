let myLevel = 1;
let myDrawer = 0;
let myFile = 0;
let d = new Date("January, 2020 01:00:00:000");
let millis = d.getMilliseconds();

// if (millis%1000==0) {
//   // loopDraw(myLevel, myDrawer, myFile);
//   console.log("hello");
// }

loopDraw(myLevel, myDrawer, myFile);

var c = document.getElementById("imageCanvas");
var ctx = c.getContext("2d");
ctx.imageSmoothingEnabled= false;
ctx.filter = 'saturate(0)';
console.log(c.width);
console.log(c.height);
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, c.width, c.height);

function draw(myImage, x, y, w, h) {
  var ctx = document.getElementById("imageCanvas").getContext('2d');
  var img = new Image();
  img.src = "images/"+myImage+".jpg";
  // ctx.mozImageSmoothingEnabled = false;
  // ctx.imageSmoothingEnabled = false;
  img.onload = function() {
    ctx.drawImage(img, x, y, w, h);
  }
}

function loopDraw() {
  let myImage;
  let xIncrement;
  let yIncrement;
  if (myLevel==1) {
    xIncrement=200;
    yIncrement=267;
    myImage = 10;
  }
  else if (myLevel==2) {
    xIncrement=400;
    yIncrement=400;
    myImage = myDrawer*10;
    console.log(myDrawer);
  }
  else {
    xIncrement=2000;
    yIncrement=900;
    myImage = myDrawer+myFile;
    console.log("The image: " + myDrawer+myFile)
  }
  for (let x = 0; x<2000; x+=xIncrement) {
    for (let y = 100; y<900; y+=yIncrement) {
      // console.log(x);
      // console.log(y);
      draw(myImage, x, y, xIncrement, yIncrement);
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
  console.log("My Drawer is: " + myDrawer);
  if (myLevel != 3) {
    myLevel += 1;
  }
  loopDraw();
  cabinetVisible(false);
  drawerVisible(true,myDrawer);
  fileVisible(true,myDrawer*10,myDrawer*10+10);
  console.log(myLevel);
}

function gogo(x) {
  elementClickable("Files", false);
  myFile = x;
  console.log("My File is: " + myFile);
  if (myLevel != 3) {
    myLevel += 1;
  }
  loopDraw();
  drawerVisible(true,0);
  fileVisible(true,myFile,myFile+1);
  console.log(myLevel);
}

function back() {
  loopDraw();
  if (myLevel != 1) {
    myLevel -= 1;
  }
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
  console.log("myLevel: " + myLevel);
}

// myBool true/false determines show/hide operation
function cabinetVisible(myBool) {
  $("#Cabinet").css("visibility", showHideOperation(myBool));
  // $("#Cabinet").fadeTo( "slow" , 0.5);
  elementClickable("Drawers", myBool);
}

// myBool true/false determines show/hide operation
// myInt 0-3 determines the unit upon which the operation is uniquely applied
// For example, true=show apply 0 would hide drawers 1-3
// For example, false=hide apply 0 would show drawers 1-3
function drawerVisible(myBool, myInt) {
  for (let i = 1; i < 4; i++) {
    if (i == myInt) {
      $("#drawer" + i).css("visibility", showHideOperation(myBool));
    } else {
      $("#drawer" + i).css("visibility", showHideOperation(!myBool));
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
      $("#file"+i).css("visibility", showHideOperation(myBool));
      console.log(i);
    } else {
      $("#file"+i).css("visibility", showHideOperation(!myBool));
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
    console.log(myId+" are clickable!");
  }
  else {
    $("#"+myId+">g:hover").css("fill", "white");
    console.log(myId+" are not clickable!");
  }
}

function debug(x) {
  console.log("Hello");
  console.log(x);
}
