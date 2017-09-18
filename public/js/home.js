var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true
});

$(document).ready(function() {

  $(function() {
    $('.lazy').lazy({
      beforeLoad: function(element) {
        $grid.masonry();
      },
      // called after an element was successfully handled
      afterLoad: function(element) {
        $grid.masonry();
      },
    });
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
