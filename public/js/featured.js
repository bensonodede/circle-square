var data = JSON.parse(Cookies.get('name'));
console.log(data);

/******* Render vue template *******/
var app = new Vue({
  el: '#shop-template',
  data: {
    items: data
  },
  mounted: function() {
    this.$nextTick(function() {
      // code that assumes this.$el is in-document
      console.log("Complete");
    })
  }
})
/******* End render vue template *******/


function getID(theKey) {
  //Redirect
  key = theKey.id;
  window.location.href = "products/" + key;
}
