var data = JSON.parse(Cookies.get('thisProduct'));
console.log(data);

var shopKey = data.shopKey;
var productKey = data.productKey;
var details = data.info;
var slideshow = details.slideshow;
var fit = details.sizes;

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

function c() {

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
/*
var cartButton = document.getElementById('add_to_cart');
cartButton.addEventListener('click', function() {
  var size = Cookies.get('size');

  if (size) {
    simpleCart.add({
      name: details.title,
      price: details.price,
      thumb: slideshow[0],
      size: size,
      shopKey: shopKey,
      productKey: productKey,
    });

    Materialize.toast('Item has been added to cart!', 4000);
    Cookies.remove('size', {
      path: window.location.pathname
    });
  } else {
    Materialize.toast('Please choose a size', 4000, 'red');
  }

});
*/
function getID(theKey) {
  //bake cookie for size
  key = theKey.id;
  Cookies.set('size', key, {
    path: window.location.pathname
  });
}

Cookies.remove('size', {
  path: window.location.pathname
});
