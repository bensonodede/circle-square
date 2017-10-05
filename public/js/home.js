var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true
});


$(document).ready(function() {

  $(function() {
    $('.lazy').lazy({
      effect: "fadeIn",
      effectTime: 2000,
      threshold: 0
    });
  });

  /*
  $(function() {
    $('#home-grid').slick({
      dots: false,
      infinite: false,
      slidesToScroll: 1,
      variableWidth: false,
      speed: 300,
      mobileFirst: true,
      arrows: false
    });
  //  $(".lazy").Lazy();
  });
*/


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
