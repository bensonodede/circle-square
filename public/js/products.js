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

var productKey = Cookies.get('allProducts');
console.log(productKey);
firebase.database().ref('/products/' + productKey).on('value', function(snapshot) {
  console.log(snapshot.val());
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

firebase.database().ref('/products/' + productKey).on('value', function(snapshot) {
  var allProducts = snapshotToArray(snapshot);
  console.log(allProducts);
  var shopBanner = Cookies.get('shopBanner');
  console.log(shopBanner);

  var app = new Vue({
    el: '#products-template',
    data: {
      items: allProducts
    }
  })

  var app2 = new Vue({
    el: '#banner',
    data: {
      banner: shopBanner,
      name: "Shop name"
    }
  })
});

function getID(theKey) {
  //bake cookie for product ID
  key = theKey.id;
  Cookies.set('productDetails', key);
  var Something = Cookies.get('productDetails');
  console.log(Something);


  //Redirect
  window.location.href = "product.html";
}
