console.log("I'm here, I'm here!!")

let level = 1;

function go(x) {
  if(x==0) {
    x=parseInt(1+3*Math.random());
    console.log("Random selection: " + x);
  }
  $("#Cabinet").css("visibility", "hidden");
  for(let i = 1; i<4; i++) {
    if(i!=x) {
      $("#drawer"+i).css("visibility", "hidden");
    }
  }
  if(level!=3) {
    level+=1;
  }
  console.log(level);
}

function gogo(x) {
  $("#Drawers").css("visibility", "hidden");
  for(let i = 1; i<11; i++) {
    if(i!=x) {
      $("#file"+i).css("visibility", "hidden");
    }
  }
  if(x==0) {
    x=parseInt(1+3*Math.random());
    console.log("Random selection: " + x);
  }
  if(level!=3) {
    level+=1;
  }
  console.log(level);
  console.log("MY SELECTION: " + x)
}

function back() {
  if(level!=1){
    level-=1;
  }
  if(level==1) {
    $("#Cabinet").css("visibility", "visible");
    for(let i = 1; i<4; i++) {
      $("#drawer"+i).css("visibility", "visible");
    }
  }
  if(level==2) {
    $("#Cabinet").css("visibility", "hidden");
    for(let i = 1; i<4; i++) {
      $("#drawer"+i).css("visibility", "visible");
    }
    for(let i = 1; i<11; i++) {
      $("#file"+i).css("visibility", "visible");
    }
  }
  if(level==3) {
    $("#Cabinet").css("visibility", "hidden");
    $("#Drawers").css("visibility", "hidden");
    for(let i = 1; i<11; i++) {
      $("#file"+i).css("visibility", "visible");
    }
  }
  console.log(level);
}

function debug() {
  console.log("Hello");
}
