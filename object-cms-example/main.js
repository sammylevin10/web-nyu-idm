let arrWorks = []
let titles = []


$(document).ready(function() {

  arrWorks = Object.values(works);

  fillInWorks(arrWorks);

});

  function fillInWorks(arrWorks) {
    var i = 0;
    while (i !== arrWorks.length) {

      $('<div>', {
        id: arrWorks[i].id,
        class: "a-work"
      }).append(
        $('<div>', {
          class: 'image',
          html: '<img class="smallImage" src=assets/' + arrWorks[i].id + '.png>'
        }),
        $('<div>', {
          class: 'title',
          text: arrWorks[i].title
        }),
        $('<div>', {
          class: 'description',
          html: arrWorks[i].description
        }),
        $('<div>', {
          class: 'website',
          html: "▁ ▂ ▃ " + arrWorks[i].website.join("<br>▁ ▂ ▃ ")
        }),
        $('<div>', {
          class: 'relevantLinks',
          html:  "Related links: " + arrWorks[i].relevantLinks.join(" ⤻ ")
        })
      ).appendTo('.col2');


      if (jQuery.isEmptyObject(arrWorks[i].collaborationWith) == true){
        $('#'+arrWorks[i].id).find('.collaborationWith').hide();
      }
      if (jQuery.isEmptyObject(arrWorks[i].website) == true){
        $('#'+arrWorks[i].id).find('.website').hide();
      }
      if (jQuery.isEmptyObject(arrWorks[i].relevantLinks) == true){
        $('#'+arrWorks[i].id).find('.relevantLinks').hide();
      }

      i += 1;
    }
  };
