$(document).ready(function() {
  //Init image carousel
  $('.carousel').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    centerMode: false,
    variableWidth: false,
    autoplay: false,
    arrows: false
  });
});
