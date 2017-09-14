var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true
});

$(document).ready(function() {

  $('#featured-slide').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1.5,
    centerMode: false,
    variableWidth: false,
    autoplay: false,
    mobileFirst: true,
    arrows: false,
    swipeToSlide: true
  });

/*  $(function() {
    $('.lazy').lazy({
      effect: "fadeIn",
      effectTime: 2000,
      threshold: 0
    });
  });
*/

});
