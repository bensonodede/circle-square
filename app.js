var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var firebase = require('firebase');
var $ = require('jquery');
var cloudinary = require('cloudinary');
var twilio = require('twilio');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var algoliasearch = require('algoliasearch');
var admin = require("firebase-admin");
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

//Cloudinary config
cloudinary.config({
  cloud_name: "dzxuz9zc9",
  api_key: "161726958168723",
  api_secret: "6nCXJz8_GjTNgZV9LbWXp3G0U_o"
});

io.on('connection', function(socket){
  socket.on('news', function (data) {
    console.log(data);
    cloudinary.uploader.upload(data.hello, function(result) {
      console.log(result.secure_url)
    });
    //var image = new Image();
    //image.src = e.target.result;
    //document.body.appendChild(image);
  });
});

//Algolia search
var algoliaClient = algoliasearch('53Q7NWI1VU', '4d0bcc1ee9c0e9572105f373457fe849')

//Twilio Credentials
var accountSid = 'ACfefa7ab7db30fedd3ba418d0838bbe11';
var authToken = '248923d6ebb40fa7a445edfe1e668a42';

// Require  the twiio module and create a REST client
var client = require('twilio')(accountSid, authToken);



//Give access to css and js files
app.use(express.static(__dirname + '/public'));

//Express routing
app.get('/featured', function(req, res) {

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
    var data = JSON.stringify(allShops);
    console.log(data);
    res.cookie('name', data, {
      path: '/featured'
    }).sendFile(__dirname + '/public/featured.html');
  });
});


app.get('/',function(req,res){
  res.redirect("/featured");
});

app.get('/contact', function(req, res) {
  res.sendFile(__dirname + '/public/contact.html');
})

app.get('/products/:token', function(req, res) {
  var shopKey = req.params.token;
  /************ Push all objects into array **************/
  function snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });
    return returnArr;
  };
  /************ End push all objects into array **************/
  firebase.database().ref('/products/' + shopKey).on('value', function(snapshot) {
    //console.log(allProducts);
    if (snapshot.val() === null) {
      res.sendFile(__dirname + '/public/404.html');
      console.log("Not found");
    } else {
      firebase.database().ref('/shop').child(shopKey).on('value', function(snap) {
        var allProducts = snapshotToArray(snapshot);
        var shopDetails = snap.val();
        var str = {
          products: allProducts,
          details: shopDetails
        };
        var data = JSON.stringify(str);
        console.log(data);
        res.cookie('name', data, {
          path: '/products'
        }).sendFile(__dirname + '/public/products.html');
        console.log("Found it!");
      });
    }
  });

});

app.get('/products/:token/:tokenChild', function(req, res) {

  var shopKey = req.params.token;
  var productKey = req.params.tokenChild;

  //console.log(shopKey);
  console.log(productKey);



  firebase.database().ref('/products/' + shopKey + '/' + productKey).on('value', function(snapshot) {
    var info = snapshot.val();
    var str = {
      info: info,
      shopKey: shopKey,
      productKey: productKey
    };
    var data = JSON.stringify(str);
    console.log(data);
    res.cookie('thisProduct', data, {
      path: '/products'
    }).sendFile(__dirname + '/public/product.html');
  })
});


app.get('/checkout', function(req, res) {
  res.sendFile(__dirname + '/public/checkout.html');
});


app.get('/seller-confirm/:token', function(req, res) {
  console.log(req.params.token);
  var token = req.params.token;
  firebase.database().ref('order').child(token).once('value', function(snapshot) {
    if (snapshot.val() === null) {
      res.sendFile(__dirname + '/public/404.html')
      console.log("Page not found");
    } else {
      console.log(snapshot.val());

      var sKey = snapshot.val().shopKey;
      var pKey = snapshot.val().productKey;
      var size = snapshot.val().size;

      firebase.database().ref('/products/' + sKey).child(pKey).once('value', function(snapshot) {
        var info = snapshot.val();
        console.log(info);
        var str = {
          info: info,
          size: size
        };
        var data = JSON.stringify(str);
        res.cookie('confirm', data, {
          path: '/seller-confirm'
        }).sendFile(__dirname + '/public/seller-confirm.html');


      })
    }
  });

});


app.get('*',function(req,res){
  res.sendFile(__dirname + "/public/404.html");
});

/************************* MOVE DATA FROM FIREBASE --> ALGOLIA ***************************/
//Add index of products from  Firebase --> Algolia
var index = algoliaClient.initIndex('products');

function snapshotToArray(snapshot) {
  var returnArr = [];
  snapshot.forEach(function(childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};

firebase.database().ref('/products').on('child_added', function(snapshot) {
  var allProducts = snapshotToArray(snapshot);
  console.log(allProducts);

  /*    index.addObjects(allProducts, function(err, content) {
        console.log(content);
      }); */
});
/************************* END MOVE DATA FROM FIREBASE --> ALGOLIA ***************************/



io.on('connection', function(socket) {
  socket.on('checkout event', function(data) {
    var order = data.order;
    var recNum = data.recNum;
    console.log("RECIPIENT'S NUMBER: " + recNum);

    /*** Begin loop through cart items ***/
    var keys = Object.keys(order);
    for (var i = 0, length = keys.length; i < length; i++) {
      console.log(order[keys[i]].productKey);
      var size = (order[keys[i]].size);
      var shopKey = (order[keys[i]].shopKey);
      var productKey = (order[keys[i]].productKey);

      firebase.database().ref('/shop/' + shopKey).on('value', function(snapshot) {
        var a_sellerNum = snapshot.val().number;
        var b_sellerNum = a_sellerNum.slice(1);
        var sellerNum = "+254" + b_sellerNum;
        console.log("SELLER NUMBER: " + sellerNum);

        /***** Generate UNIQUE ID *****/
        function loopItems() {
          var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
          var token = '';
          for (var i = 16; i > 0; --i) {
            token += chars[Math.round(Math.random() * (chars.length - 1))];
          }
          console.log("ORDER TOKEN: " + token);
          /****** END UNIQUE ID generation *****/

        /*  client.messages.create({
            to: sellerNum,
            from: "+16466797502 ",
            body: "You have a new order! Click the link below to confirm: " + "\n" + "https://thewarehouseke.herokuapp.com/seller-confirm/" + token
          }, function(err, sms) {
            process.stdout.write(sms.sid);
          });
*/
          /***** Write order for each item in cart to db *****/
          var orderRef = firebase.database().ref('/order');

          function createOrder() {
            orderRef.child(token).set({
              recNum: recNum,
              shopKey: shopKey,
              productKey: productKey,
              sellerNum: sellerNum,
              size: size
            });
          }
          createOrder();
          /***** END write order for each item in cart to db *****/
        }
        loopItems();
      });
    }
    /*** End loop through cart items ***/

  });

});


//Launch Server
http.listen(process.env.PORT || 5000);
console.log("*****App running on port 5000*****");
