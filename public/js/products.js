/*var data = JSON.parse(Cookies.get('name'));
console.log(data);

var app2 = new Vue({
  el: '#banner',
  data: {
    banner: data.details.banner,
    name: data.details.name
  }
})

var app = new Vue({
  el: '#products-template',
  data: {
    items: data.products
  },
  mounted: function() {
    this.$nextTick(function() {
      // code that assumes this.$el is in-document
      console.log("Complete");
    })
  }
})

function getID(theKey) {
  //Redirect
  key = theKey.id;
  var str = window.location.pathname + '/' + key;
  window.location.href = str;
}
*/
var socket = io();

socket.on('allProducts', function (data) {
  console.log(data.shops);
});
