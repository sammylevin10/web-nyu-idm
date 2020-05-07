console.log("Script running");

$(document).ready(function() {
  $(".menu").hide();
  $(".thumbnail").hide();
  $("#cover").fadeOut(1000);
    $('html, body, *').mousewheel(function(e, delta) {
        this.scrollLeft -= (delta * 0.8);
        e.preventDefault();
    });
  //Listen to scroll and affect DOM elements accordingly
  window.addEventListener('scroll', function(e) {
    var scrolled = window.pageXOffset;
    assignParallax(scrolled);
    assignMotion(scrolled);
    assignLimits(scrolled);
  });
});

// Assign scroll-based transformation to three degrees of parallax objects where 1 is foreground and 3 is background
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

// Assign specific motion to scroll-dependent objects like the verbs
function assignMotion(scrolled) {
  const target1 = document.querySelectorAll('.down1');
  var down1 = scrolled*0.35;
  for (let i = 0; i<target1.length; i++) {
    target1[i].style.transform = 'translate3d(0px, -'+down1+'px, 0px)';
  }
}

// Assign limits for content to fade in and out
function assignLimits(scrolled) {
  //Verbs, -Er
  let limit1 = 1285;
  let limit2 = 2300;
  let limit3 = 3000;
  let limit4 = 4000;
  const verbs = document.querySelector('#verbs');
  if (scrolled>=limit1) {
    verbs.style.transform = 'translate3d(0px, -'+limit1*0.35+'px, 0px)';
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
  if (scrolled>=limit4) {
    $("#wrapper-two").fadeOut(1000);
    $("#self-portrait").fadeOut(1000);
  }
  else {
    $("#wrapper-two").fadeIn(1000);
    $("#self-portrait").fadeIn(1000);
  }
}

// Pseudo anchor menu system with JQuery scrolling animations
function scrollToSection(destination) {
  if (destination=="intro") {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  if (destination=="about") {
    window.scrollTo({
      top: 0,
      left: 3300,
      behavior: 'smooth'
    });
  }
  if (destination=="portfolio") {
    window.scrollTo({
      top: 0,
      left: 5050,
      behavior: 'smooth'
    });
  }
  if (destination=="contact") {
    window.scrollTo({
      top: 0,
      left: 7200,
      behavior: 'smooth'
    });
  }
}

// Display portfolio image on mouseover
function displayImage(num) {
  if (num==1) $("#img-metro-archive").fadeIn(300);
  else if (num==2) $("#img-gait-mocap").fadeIn(300);
  else if (num==3) $("#img-design-shanghai").fadeIn(300);
  else if (num==4) $("#img-cyberbird").fadeIn(300);
  else if (num==5) $("#img-ny-state-of-mind").fadeIn(300);
}

// Hide portfolio image on mouseout
function hideImage(num) {
  if (num==1) $("#img-metro-archive").fadeOut(300);
  else if (num==2) $("#img-gait-mocap").fadeOut(300);
  else if (num==3) $("#img-design-shanghai").fadeOut(300);
  else if (num==4) $("#img-cyberbird").fadeOut(300);
  else if (num==5) $("#img-ny-state-of-mind").fadeOut(300);
}
