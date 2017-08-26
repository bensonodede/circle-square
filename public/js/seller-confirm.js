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

console.log(window.location.pathname);

function done() {
  var str = window.location.pathname;
  var str1 = str.replace('/seller-confirm/','');
  var path = str1.replace('#!','');
  console.log(path);
  $.post("/seller-confirm/:id", {
    value : "True",
    path : path
  }, function(data) {
    window.location.href = "/success";
  });
}

function notDone() {
  var str = window.location.pathname;
  var str1 = str.replace('/seller-confirm/','');
  var path = str1.replace('#!','');
  $.post("/seller-confirm/:id", {
    value : "False",
    path : path
  }, function(data) {
    window.location.href = "/success-seller";
  });
}
