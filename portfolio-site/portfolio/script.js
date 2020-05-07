let arrWorks = []
let titles = []


$(document).ready(function() {

  arrWorks = Object.values(works);

  fillInWorks(arrWorks);

});

  function fillInWorks(arrWorks) {
    var i = 0;
    while (i !== arrWorks.length) {
    // $( ".main-content" ).append(
    //   $('<div>', {
    //     class: 'project-wrapper',
    //     html: '<img class="thumbnail" src=../images/portfolio/' + arrWorks[i].id + '.jpg>'
    //   }),
    //   $('<div>', {
    //     class: 'column-text',
    //     html: ''
    //   })
    // );
    $( ".main-content" ).append(
    $('<div/>', {'class': 'project-wrapper'}).append(
      $('<div/>', {'class': 'column-image'}).append(
        $('<img/>', {'src': '../images/portfolio/'+ arrWorks[i].id + '.jpg'})
      )
    )
    .append(
        $('<div/>', {'class': 'column-text'}).append(
          $('<h2>', {text: arrWorks[i].title}),
          $('<h3>', {text: arrWorks[i].clients}),
          $('<h4>', {text: 'Developed with ' + arrWorks[i].collaborationWith}),
          $('<p>', {text: arrWorks[i].description}),
          $('<h3>', {text: 'RELATED LINKS'}),
          $('<div>', {
            class: 'link-bar',
            html:  arrWorks[i].relevantLinks
            }
          )
        )
      )
    );
    //
    //   $('<div>', {
    //     id: arrWorks[i].id,
    //     class: "project-wrapper"
    //   }).append(
    //     $('<div>', {
    //       class: 'column-image',
    //       html: '<img class="thumbnail" src=../images/portfolio/' + arrWorks[i].id + '.jpg>'
    //     }),
    //     $('<h1>', {
    //       class: 'title',
    //       text: arrWorks[i].title
    //     }),
    //     $('<p>', {
    //       class: 'description',
    //       html: arrWorks[i].description
    //     }),
    //     $('<div>', {
    //       class: 'website',
    //       html: "▁ ▂ ▃ " + arrWorks[i].website.join("<br>▁ ▂ ▃ ")
    //     }),
    //     $('<div>', {
    //       class: 'relevantLinks',
    //       html:  "Related links: " + arrWorks[i].relevantLinks.join(" ⤻ ")
    //     })
    //   ).appendTo('.col2');
    //
    //
    //   if (jQuery.isEmptyObject(arrWorks[i].collaborationWith) == true){
    //     $('#'+arrWorks[i].id).find('.collaborationWith').hide();
    //   }
    //   if (jQuery.isEmptyObject(arrWorks[i].website) == true){
    //     $('#'+arrWorks[i].id).find('.website').hide();
    //   }
    //   if (jQuery.isEmptyObject(arrWorks[i].relevantLinks) == true){
    //     $('#'+arrWorks[i].id).find('.relevantLinks').hide();
    //   }
    //
      i += 1;
    }
  };
