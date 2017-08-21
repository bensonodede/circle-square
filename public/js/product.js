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

  //Start array function
  function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }
  var result = range(2, 16);

  //Insert sizes
  var urls = result;
  var sizes = document.getElementById('sizes');
  for (i = 0; i < urls.length; i++) {
    sizes.insertAdjacentHTML('beforeend', '<span id=' + urls[i] + ' class="size" onclick="getID(this)">' + urls[i] + '</span>');
  }

  //Init sizes carousel
  $('#sizes').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    variableWidth: false,
    autoplay: false,
    mobileFirst: true,
    arrows: false,
    swipeToSlide: true,
    initialSlide: 6
  });

  //Init checkout slides on btn click
  $( "#collect_btn" ).one("click", function() {
    //Checkout slides
    $('.checkout-carousel').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true,
      centerMode: false,
      variableWidth: false,
      autoplay: false,
      arrows: false,
      swipeToSlide: false,
      initialSlide: 0
    });
  });

  //Move to next slide on button
  $('.next-slide-btn').click(function() {
    $('.checkout-carousel').slick('slickNext');
  });

});

//Checkout function
function checkout() {

  // Grab input value, size value and productID
  var productID = window.location.pathname.split("/").pop();
  var num = document.getElementById('checkout-number-input');
  var myNum = num.value;
  sizeCookie = Cookies.get('name');
  console.log(sizeCookie);
  //Regex test
  var regExNumber = new RegExp("^[0-9\-\+]{10}$");
  //Check for size cookie
  if (sizeCookie) {
    //Verify number format length
    if (regExNumber.test(myNum)) {
      //Check for '0' as first number
      if (myNum.charAt(0) === '0') {
        Materialize.toast('Success!', 3000, 'green');
        $.post("/shop", {
          productID: productID,
          size: sizeCookie,
          number: myNum
        }, function(data) {
          window.location.href = "/success";
        });
      } else {
        Materialize.toast('Invalid phone number', 3000, 'red');
      }
      //End check for '0' as first number
    } else {
      Materialize.toast('Invalid phone number', 3000, 'red');
    }
    //End verify number format length
  } else {
    Materialize.toast('Please choose your size', 3000, 'red');
  }
  //End check for size cookie

}


//Get size value and bake cookie
function getID(size) {
  var size = size.id;
  Cookies.set('name', size);
}
//remove any previous size cookies
Cookies.remove('name');
