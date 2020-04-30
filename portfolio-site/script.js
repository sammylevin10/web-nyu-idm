console.log("Script is here");

$(document).ready(function() {
  $(".menu").hide();
  console.log("hello");
    $('html, body, *').mousewheel(function(e, delta) {
        this.scrollLeft -= (delta * 0.5);
        e.preventDefault();
    });

});

window.addEventListener('scroll', function(e) {
  const target1 = document.querySelectorAll('.parallax1');
  const target2 = document.querySelectorAll('.parallax2');
  const target3 = document.querySelectorAll('.parallax3');
  const target4 = document.querySelectorAll('.down1');
  const target5 = document.querySelectorAll('.right1');
  var scrolled = window.pageXOffset;
  console.log(scrolled);
  var rate1 = scrolled*0.5;
  var rate2 = scrolled*0.3;
  var rate3 = scrolled*0.1;
  var down1 = scrolled*0.3;
  var skew = scrolled*0.05;
  if (skew>60) skew=60;
  for (let i = 0; i<target1.length; i++) {
    target1[i].style.transform = 'translate3d('+rate1+'px, 0px, 0px)';
    target1[i].style.transform += 'skewX(-'+skew+'deg)';
  }
  for (let i = 0; i<target2.length; i++) {
    target2[i].style.transform = 'translate3d('+rate2+'px, 0px, 0px)';
    target2[i].style.transform += 'skewX(-'+skew+'deg)';
  }
  for (let i = 0; i<target3.length; i++) {
    target3.style.transform = 'translate3d('+rate3+'px, 0px, 0px)';
    target2[i].style.transform += 'skewX(-'+skew+'deg)';
  }
  for (let i = 0; i<target4.length; i++) {
    let limit = 1500;
    if(scrolled<=limit) {
      target4[i].style.transform = 'translate3d('+scrolled+'px, -'+down1+'px, 0px)';
    }
    else {
      target4[i].style.transform = 'translate3d('+scrolled+'px, -'+limit*0.3+'px, 0px)';
    }
  }
  for (let i = 0; i<target5.length; i++) {
    target5[i].style.transform = 'translate3d('+scrolled+'px, 0px, 0px)';
  }
  if (scrolled>=3000) {
    $(".menu").fadeIn(1000);
  }
  else {
    $(".menu").fadeOut(1000);
  }
});


//JS SMOOTH ANCHORS
// $("a[href^='#']").click(function(e) {
//   e.preventDefault();
//   console.log("invoked");
//
//   var position = $($(this).attr("href")).offset().top;
//   console.log(position);
//   console.log($($(this).attr("href")));
//
//   $("body, html").animate({
//     scrollTop: position
//   } /* speed */ );
// });
// Add smooth scrolling to all links
// $("a").on('click', function(event) {
//
//   // Make sure this.hash has a value before overriding default behavior
//   if (this.hash !== "") {
//     // Prevent default anchor click behavior
//     event.preventDefault();
//
//     // Store hash
//     var hash = this.hash;
//
//     // Using jQuery's animate() method to add smooth page scroll
//     // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
//     $('html, body').animate({
//       scrollTop: $(hash).offset().top
//     }, 800, function(){
//
//       // Add hash (#) to URL when done scrolling (default click behavior)
//       window.location.hash = hash;
//     });
//   } // End if
// });
