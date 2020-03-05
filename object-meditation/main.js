let level = 1;
let myDrawer = 0;
let myFile = 0;

function random() {
  let mySelection=0;
  if (level == 1) {
    mySelection = parseInt(1 + 3 * Math.random());
    go(mySelection);
  }
  else if (level == 2) {
    mySelection = parseInt(myDrawer*10 + 9 * Math.random());
    gogo(mySelection);
  }
}

function go(x) {
  myDrawer = x;
  console.log("My Drawer is: " + myDrawer);
  if (level != 3) {
    level += 1;
  }
  drawerClickable(false);
  cabinetVisible(false);
  drawerVisible(true,myDrawer);
  fileVisible(true,myDrawer*10,myDrawer*10+10);
  console.log(level);
}

function gogo(x) {
  myFile = x;
  console.log("My File is: " + myFile);
  if (level != 3) {
    level += 1;
  }
  drawerVisible(true,0);
  fileVisible(true,myFile,myFile+1);
  drawerClickable(true);
  console.log(level);
}

function back() {
  if (level != 1) {
    level -= 1;
  }
  if (level == 1) {
    drawerClickable(true);
    cabinetVisible(true);
    drawerVisible(false,0);
    fileVisible(false,0,0);
  }
  if (level == 2) {
    drawerClickable(false);
    cabinetVisible(false);
    drawerVisible(true, myDrawer);
    fileVisible(true, myDrawer * 10, myDrawer * 10 + 10);
  }
  console.log("Level: " + level);
}

// myBool true/false determines show/hide operation
function cabinetVisible(myBool) {
  $("#Cabinet").css("visibility", showHideOperation(myBool));
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
// For example, true=show apply 0 would show files 1-30
// For example, false=hide apply 0 would hide files 1-30
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

function drawerClickable(myBool) {
  if (myBool==true) {
    $("#Drawers>g:hover").css("fill", "black");
  }
  else {
    $("#Drawers>g:hover").css("fill", "white");
  }
}

function debug(x) {
  console.log("Hello");
  console.log(x);
}
