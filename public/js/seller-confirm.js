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


  var data = JSON.parse(Cookies.get('confirm'));
  console.log(data);


  var details = data.info;
  console.log(details);
  var slideshow = details.slideshow;

  var app = new Vue({
    el: '#product-details',
    data: {
      details: details,
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
    var fit = data.size;
    for (i = 0; i < urls.length; i++) {
      carousel.insertAdjacentHTML('beforeend', '<div class="item"><div class="imageContainer"><img src="' + urls[i] + '" alt="""></div></div>');
    }
    sizes.insertAdjacentHTML('beforeend', '<span class="size">' + fit + '</span>');    

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
    socket.disconnect();
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



  var queue = chainCallbacks(a, b, c);
  queue();
