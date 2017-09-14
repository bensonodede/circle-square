var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');
var twilio = require('twilio');
var imageSearch = require('node-google-image-search');
var Accountkit = require('node-accountkit');

//Initialize the database
mongoose.connect( process.env.MONGODB_URI );
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are CONNECTED!*****");
  // we're connected!
});



//Twilio Credentials
var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_TOKEN;

// Require  the twiio module and create a REST client
var client = require('twilio')(accountSid, authToken);
//Initialize app
var app = require('express')();

//Give access to css and js files
app.use(express.static(__dirname + '/public'));

//Import models
var Shops = require('./public/models/shops');
var Products = require('./public/models/products');
var Orders = require('./public/models/orders');

//Load view engine
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');

// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

/*
Shops.create({
  _id: "5984d5c5c1533b43ac446109",
  name: "Shoe empire",
  link: "Shoe_empire",
  number: "+254724645546",
  banner: "http://res.cloudinary.com/dzxuz9zc9/image/upload/v1501133850/Shoe_empire/Shoe_empire_banner.jpg"
}, function(err) {
  if (err) return handleError(err);
});
*/

// Home page route
app.get('/', function(req, res) {
  //Query db for all products
  Products.find({}, function(err, products) {
    if (err) {
      console.log(err);
    } else {
      //Render home page
      res.render('home', {
        products: products
      });
    }
  });
});

//Featured shops route
app.get('/featured', function(req, res) {

  //Query db for all shops
  Shops.find({}, function(err, shops) {
    if (err) {
      console.log(err);
    } else {
      //Render featured page
      res.render('featured', {
        shops: shops
      });
    }
  });

});


//Products list page
app.get('/featured/:shopName', function(req, res) {
  //Query db for all products
  Products.find({}, function(err, products) {
    if (err) {
      console.log(err);
    } else {

      //Query for shop banner
      Shops.findOne({
        'link': req.params.shopName
      }, function(err, shop) {
        //Render shop page
        res.render('shop', {
          products: products,
          shop: shop
        });
        //End render
      });
      //End shop banner query

    }
  });
});


//Product info page
app.get('/shop/view', function(req, res) {
  var p = req.query.p;

  Products.findOne({
    '_id': p
  }, function(err, details) {
    if (err) {
      console.log(err);
    } else {
      var sum = details.price + 300;
      var total = sum.toLocaleString();
      res.render('product', {
        details: details,
        slideshows: details.slideshow,
        total: total
      });
    }
  });

});

// Post Checkout details
app.post('/shop/view', function(req, res) {
  var myNum = req.body.number;
  if (myNum.charAt(0) === '0') {
    myNum = myNum.slice(1);
    var number = "+254" + myNum;
    var size = req.body.size;
    var str = req.body.productID;
    var productID = str.replace('#!', '');
    console.log(productID);

    function createOrder() {
      //Generate UNIQUE ID
      var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var token = '';
      for (var i = 16; i > 0; --i) {
        token += chars[Math.round(Math.random() * (chars.length - 1))];
      }
      res.send(token);
      console.log("ORDER TOKEN: " + token);
      //END UNIQUE ID generation

      //Save order to db
      Orders.create({
        _id: token,
        productID: productID,
        size: size,
        number: number
      }, function(err) {
        if (err) return handleError(err);
      });

      //Query db
      Products.findOne({
        '_id': productID
      }, function(err, details) {
        if (err) {
          console.log(err);
        } else {
          Shops.findOne({
            '_id': details.shopID
          }, function(err, shop) {
            if (err) {
              console.log(err);
            } else {
              //Send confirm message
              client.messages.create({
                to: shop.number,
                from: "+16466797502 ",
                body: "You have a new order!" + "\n" + "Order ID: #" + token + "\n" + "\n" + "Click the link below to confirm: " + "\n" + "https://thewarehouseke.herokuapp.com/seller-confirm/" + token
              }, function(err, sms) {
                process.stdout.write(sms.sid);
              });
              //End send confirm message
            }
          });
        }
      });
      //End query db

    }
    createOrder();
  } else {
    console.log('ERROR');
  }
});

app.get('/seller-confirm/:id', function(req, res) {

  Orders.findOne({
    '_id': req.params.id
  }, function(err, orders) {
    if (err) {
      console.log(err);
    } else {

      Products.findOne({
        '_id': orders.productID
      }, function(err, details) {
        if (err) {
          console.log(err);
        } else {
          var sum = details.price;
          var total = sum.toLocaleString();
          res.render('seller-confirm', {
            details: details,
            slideshows: details.slideshow,
            total: total,
            size: orders.size
          });
        }
      });

    }
  });

});

app.post('/seller-confirm/:id', function(req, res) {
  var value = req.body.value;
  var path = req.body.path;

  Orders.findOne({
    '_id': path
  }, function(err, orders) {
    if (err) {
      console.log(err);
    } else {

      if (value === "True") {
        client.messages.create({
          to: orders.number,
          from: "+16466797502 ",
          body: "Order ID: #" + orders._id + "\n" + "\n" + "Your order has been confirmed! Our courier will contact you shortly to deliver your item." + "\n" + "\n" + "Warehouse Africa."
        }, function(err, sms) {
          process.stdout.write(sms.sid);
        });
        res.send("done");
      } else {
        client.messages.create({
          to: orders.number,
          from: "+16466797502 ",
          body: "Order ID: #" + orders._id + "\n" + "\n" + "Sorry, the item you ordered is currently not available" + "\n" + "\n" + "Warehouse Africa."
        }, function(err, sms) {
          process.stdout.write(sms.sid);
        });
        res.send("done");
      }

    }
  });

});
//Size chart
app.get('/size-chart', function(req, res) {
  res.sendFile(__dirname + '/public/size-chart.html')
});

//success page
app.get('/success/:id', function(req, res) {
  Orders.findOne({
    '_id': req.params.id
  }, function(err, orders) {
    if (err) {
      console.log(err);
    } else {
      Products.findOne({
        '_id': orders.productID
      }, function(err, details) {
        if (err) {
          console.log(err);
        } else {
          res.render('success', {
            id: orders._id,
            title: details.title,
            img: details.slideshow[0],
            size: orders.size
          });
        }
      });

    }
  });
  //res.sendFile(__dirname + '/public/success.html')
});

app.get('/success-seller', function(req, res) {
  res.sendFile(__dirname + '/public/success-seller.html')
});

//upload
app.get('/upload/:id', function(req, res) {
  var query = req.params.id;
  //console.log(query);

  // Build the request
  // Parameters = {1.'search term', 2.callback function, 3.offset 4.number of results(10 max) }
  var offset = 0;
  var results = imageSearch (query, callback, offset, 10);

  function callback(products) {
      //View results of the request
      console.log(products.length);
      res.render('upload', {
        results: products
      });
      var array = products;
      //console.log(array.length);
      for (var i = 0; i < array.length; i++) {
        console.log(array[i].link);
        console.log(array[i]);
      }
  }

});

app.post('/upload/:id', function(req, res) {
  console.log(req.body.name);
  console.log(req.body.price);
  console.log(req.body.imgs);

  Products.create({
    shopID: '5984d5c5c1533b43ac446109',
    title: req.body.name,
    slideshow: JSON.parse(req.body.imgs),
    price: req.body.price,
    //tags: ['Shoes', 'Skateboarding'],
    //sizes: ['4', '5', '6'],
    //inventory: 12
  }, function(err) {
    if (err) return handleError(err);
  });
  res.send('/search');


});

//contact
app.get('/contact', function(req, res) {
  res.render('contact');
});

app.get('/nav', function(req, res) {
  res.sendFile(__dirname + '/public/mynav.html')
});

app.get('/grid', function(req, res) {
  res.sendFile(__dirname + '/public/gallery-card.html')
});

//search
app.get('/search', function(req, res) {
  res.sendFile(__dirname + '/public/search.html')
});

app.post('/search', function(req, res) {
  var params = req.body.search;
  res.send('/upload/' + params);
});
//Start Server
app.listen(process.env.PORT || 3000, function() {
  console.log('Server started on port 3000...');
});
