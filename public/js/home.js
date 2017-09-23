var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true
});


$(document).ready(function() {

  new Siema({
    selector: '#home-grid',
    duration: 500,
    easing: 'ease-out',
    perPage: 2.2,
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 10,
    loop: false
    //onInit: () => {},
    //onChange: () => {},
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
