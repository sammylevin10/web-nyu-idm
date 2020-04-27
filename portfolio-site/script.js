console.log("Script is here");

$(document).ready(function() {
  console.log("hello");
    $('html, body, *').mousewheel(function(e, delta) {
        this.scrollLeft -= (delta * 3);
        e.preventDefault();
    });
});
