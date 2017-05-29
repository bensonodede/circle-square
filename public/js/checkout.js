
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
    { view: "decrement" , label: false , text: "Remove" } ,
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
