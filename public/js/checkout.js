var socket = io();

simpleCart({
  shippingFlatRate: 250,
  cartColumns: [{
      view: function(item, column) {
        return "<img src='" + item.get('thumb') + "'>";
      },
      attr: 'myimage'
    },

    {
      attr: "name",
      label: "Name"
    },
    {
      attr: "price",
      label: "Price",
      view: 'currency'
    },
    {
      view: "decrement",
      label: false,
      text: "Remove"
    },
    {
      attr: "quantity",
      label: "Qty"
    },
    //{ view: "increment" , label: false , text: "+" } ,
    {
      attr: "total",
      label: "SubTotal",
      view: 'currency'
    },
    /*{
      view: "remove",
      text: "Remove",
      label: false
    }*/
  ]
});

simpleCart.currency({
  code: "KSH",
  symbol: "KSh. ",
  name: "Kenyan shilling"
});

$(document).on('click', '.item-decrement', function() {
  Materialize.toast('Item has been removed from cart!', 4000, 'red');
});


var recNum = document.getElementById('phone');
var purchaseBtn = document.getElementById('purchase-button');

purchaseBtn.addEventListener('click', function() {
  /*** Grab input value ***/
  var myNum = recNum.value;
  var regExNumber = new RegExp("^[0-9\-\+]{10}$");
  if (regExNumber.test(myNum)) {
    if (myNum.charAt(0) === '0') {
      myNum = myNum.slice(1);
    }
    var number = "+254" + myNum;
    console.log(number);


    Materialize.toast('Success!', 3000, 'green');


    console.log("Purchased!");
    var cart = JSON.parse(localStorage.simpleCart_items);
    console.log(recNum.value);
    console.log(cart);
    var arr = Object.keys(cart).map(function(k) {
      return cart[k]
    });
    console.log(arr);

      socket.emit('checkout event', {
        order: arr,
        recNum: number
      });
    simpleCart.update();
    simpleCart.empty();
    simpleCart.update();
  } else {
    Materialize.toast('Invalid input', 4000, 'red');
  }

});
