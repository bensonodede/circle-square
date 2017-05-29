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

firebase.database().ref('/shop').on('value', function(snapshot) {
  //console.log(snapshot.val());
});

function snapshotToArray(snapshot) {
  var returnArr = [];

  snapshot.forEach(function(childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};

firebase.database().ref('/shop').on('value', function(snapshot) {
  var allShops = snapshotToArray(snapshot);
  //console.log(allShops);

  var app = new Vue({
    el: '#shop-template',
    data: {
      items: allShops
    },
    mounted: function () {
  this.$nextTick(function () {
    // code that assumes this.$el is in-document
    console.log("Complete");
  })
}
  })
  //  console.log(allShops[0].key);
});

function getID(theKey) {
  //bake cookie for shop ID
  key = theKey.id;
  Cookies.set('allProducts', key);
  var divID = Cookies.get('allProducts');
  console.log(divID);

  //bake cookie for shop banner
  var imgSrc = document.getElementById(key + "1").src;
  Cookies.set('shopBanner', imgSrc);
  var imgID = Cookies.get('shopBanner');
  console.log(imgID);

  //Redirect
  window.location.href = "products.html";
}
