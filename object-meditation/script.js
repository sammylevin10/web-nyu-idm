console.log("I'm here, I'm here!!")

var level = 1;

function go(x) {
  $(".cabinet").css("visibility", "hidden");
  if(level!=3) {
    level+=1;
  }
  console.log(level);
}

function back() {
  $(".cabinet").css("visibility", "visible");
  if(level!=1){
    level-=1;
  }
  console.log(level);
}
