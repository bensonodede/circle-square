var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true
});

$(document).ready(function() {

  $(function() {
  //  $(".lazy").Lazy();
  });

  $('#home-grid').slick({
    dots: false,
    infinite: false,
    speed: 300,
    mobileFirst: true,
    centerMode: false,
    variableWidth: false,
    autoplay: false,
    arrows: false
  });




  $('#cart-button').on("click", function() {
    /*
  simpleCart.add({
    name: "Cool T-Shirt",
    price: 45.99,
    size: "Small",
    quantity: 3
  });
*/




  });

});


function getID(theKey) {
  //Redirect
  key = theKey.id;
  console.log(key);
  var str = "/shop/view?p=" + key;
  window.location.href = str;
}
