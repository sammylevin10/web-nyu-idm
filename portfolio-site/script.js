console.log("Script is here");

$(document).ready(function() {
  $(".menu").hide();
  console.log("hello");
    $('html, body, *').mousewheel(function(e, delta) {
        this.scrollLeft -= (delta * 0.8);
        e.preventDefault();
    });
  window.addEventListener('scroll', function(e) {
    var scrolled = window.pageXOffset;
    console.log(scrolled);
    assignParallax(scrolled);
    console.log("you are scrolling");
    assignMotion(scrolled);
    assignLimits(scrolled);



    // else {
    //   $(".menu").fadeOut(500);
    // }
  });
});

function assignParallax(scrolled) {
  const target1 = document.querySelectorAll('.parallax1');
  const target2 = document.querySelectorAll('.parallax2');
  const target3 = document.querySelectorAll('.parallax3');
  var rate1 = scrolled*0.5;
  var rate2 = scrolled*0.3;
  var rate3 = scrolled*0.1;
  for (let i = 0; i<target1.length; i++) {
    target1[i].style.transform = 'translate3d('+rate1+'px, 0px, 0px)';
  }
  for (let i = 0; i<target2.length; i++) {
    target2[i].style.transform = 'translate3d('+rate2+'px, 0px, 0px)';
  }
  for (let i = 0; i<target3.length; i++) {
    target3.style.transform = 'translate3d('+rate3+'px, 0px, 0px)';
  }
}

function assignMotion(scrolled) {
  console.log("reached assignMotion");
  const target1 = document.querySelectorAll('.down1');
  // const target2 = document.querySelectorAll('.right1');
  console.log(target1[0]);
  var down1 = scrolled*0.3;
  // var right1 = scrolled;
  for (let i = 0; i<target1.length; i++) {
    target1[i].style.transform = 'translate3d(0px, -'+down1+'px, 0px)';
    // target1[i].style.color="red";
  }
  // for (let i = 0; i<target2.length; i++) {
  //   target2[i].style.transform = 'translate3d('+scrolled+'px, 0px, 0px)';
  // }
}

function assignLimits(scrolled) {
  //Verbs, -Er
  let limit1 = 1500;
  let limit2 = 2600;
  let limit3 = 3200;
  const verbs = document.querySelector('#verbs');
  if (scrolled>=limit1) {
    console.log("LIMIT");
    verbs.style.transform = 'translate3d(0px, -'+limit1*0.3+'px, 0px)';
    $("#verbs").css("color","black");
    $("#game-chang").css("color","#4fffd9");
    $("#er").css("color","#4fffd9");
  }
  else {
    $("#verbs").css("color","white");
    $("#game-chang").css("color","white");
    $("#er").css("color","white");
  }
  if (scrolled>=limit2) {
    $("#verbs").fadeOut(1000);
    $("#er").fadeOut(1000);
  }
  else {
    $("#verbs").fadeIn(1000);
    $("#er").fadeIn(1000);
  }
  if (scrolled>=limit3) {
    $(".menu").fadeIn(500);
  }
  else {
    $(".menu").fadeOut(500);
  }
}
