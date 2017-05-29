var socket = io();

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBngrEriZV5kEmLCe-RsRHAuKa-qqH9WwU",
  authDomain: "theshop-7c5b7.firebaseapp.com",
  databaseURL: "https://theshop-7c5b7.firebaseio.com",
  projectId: "theshop-7c5b7",
  storageBucket: "theshop-7c5b7.appspot.com",
  messagingSenderId: "71632938094"
};
firebase.initializeApp(config);




var shopKey = Cookies.get('allProducts');
var productKey = Cookies.get('productDetails');
console.log(shopKey);
console.log(productKey);
firebase.database().ref('/products/' + shopKey + '/' + productKey).on('value', function(snapshot) {
  var details = snapshot.val();
  console.log(snapshot.val());
  var slideshow = snapshot.val().slideshow;
  var fit = snapshot.val().sizes;


  var app = new Vue({
    el: '#product-details',
    data: {
      details: details
    }
  })


  var app2 = new Vue({
    el: '#description',
    data: {
      details: details
    }
  })



  function a() {
    var carousel = document.getElementById("carousel");
    var sizes = document.getElementById('sizes');
    var urls = slideshow;
    for (i = 0; i < urls.length; i++) {
      carousel.insertAdjacentHTML('beforeend', '<div class="item"><div class="imageContainer"><img src="' + urls[i] + '" alt="""></div></div>');
    }
    for (i = 0; i < fit.length; i++) {
    sizes.insertAdjacentHTML('beforeend', '<span class="size">' + fit[i] + '</span>');
    }
    _next();
  }

  function b() {
    $('.carousel').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: false,
      variableWidth: false,
      autoplay: false,
      arrows: false
    });
    _next();
  }


  function chainCallbacks() {

    var _this = this;
    var _counter = 0;
    var _callbacks = arguments;

    var _next = function() {
      _counter++;
      if (_counter < _callbacks.length) {
        _callbacks[_counter].apply(_this);
      }
    };

    _this._next = _next;

    return function() {
      if (_callbacks.length > 0) {
        _callbacks[0].apply(_this);
      }
    };
  }

  var queue = chainCallbacks(a, b);
  queue();




  var cartButton = document.getElementById('add_to_cart');
  cartButton.addEventListener('click', function() {
    console.log("Item has been added!");


  var added = simpleCart.add({
      name: details.title,
      price: details.price,
      thumb: slideshow[0],
      itemTotal: 0
    });
    /*simpleCart.bind( 'afterSave' , function(){
      console.log( item.get('name') );
      var some = item.get('total');
      console.log(some);
      added.set("itemTotal", some );
    });
*/

simpleCart.add({
    name: "Cool Thing",
    price: 2000,
    thumb: slideshow[1],
    itemTotal: 0
  });
  console.log(added.total());

Materialize.toast('Item has been added to cart!', 4000 );
var ids = [];
var prices = [];
var names = [];
var subtotal = [];



simpleCart.each(function( item , x ){
    prices.push( item.get('price') );
    names.push( item.get('name') );
    subtotal.push( item.get('total') );
    ids.push( item.get('id') );

});

console.log( prices );
console.log( names );
console.log( subtotal );
console.log( ids );

var cart = JSON.parse(localStorage.simpleCart_items);
console.log(cart);
var arr = Object.keys(cart).map(function(k){
  return cart[k]
});

console.log(arr);

for (i = 0; i <= arr.length; i++) {
//sizes.insertAdjacentHTML('beforeend', '<span class="size">' + fit[i] + '</span>');
console.log(arr[i]);
}

    /*simpleCart.each(function( item ){
    console.log(item.get('name'));
  });*/
});







});
