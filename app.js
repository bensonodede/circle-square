var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');
var api_key = 'SEM3F7ED8B41D23C63B8A78673721B336BBC';
var api_secret = 'ODg5NjRjMmJlYjY2MDlmZmFlZTU0Mzg2MGI1N2I3MDU';
var sem3 = require('semantics3-node')(api_key, api_secret);

//Initialize the database
mongoose.connect('mongodb://bensonodede:Odede300@ds145263.mlab.com:45263/warehouse');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are CONNECTED!*****");
  // we're connected!
});

//Initialize app
var app = require('express')();

//Give access to css and js files
app.use(express.static(__dirname + '/public'));

//Import models
var Shops = require('./public/models/shops');
var Products = require('./public/models/products');
var Orders = require('./public/models/orders');


/*
// Build the request
sem3.products.products_field( "search", "iphone" );

// Run the request
sem3.products.get_products(
   function(err, products) {
      if (err) {
         console.log("Couldn't execute request: get_products");
         return;
      }
    // View results of the request
    console.log( "Results of request:\n" + JSON.stringify( products ) );
   }
);
Products.create({
  shopID:'5984d5c5c1533b43ac446109',
  title: 'Nike Sb stefan janoski',
  slideshow: ['https://images.nike.com/is/image/DotCom/PDP_HERO/833603_012_A_PREM/sb-zoom-stefan-janoski-og-mens-skateboarding-shoe.jpg','https://images.nike.com/is/image/DotCom/PDP_HERO_S/833603_012_D_PREM/sb-zoom-stefan-janoski-og-mens-skateboarding-shoe.jpg'],
  price: 4000,
  description: 'Designed with insights from a legendary athlete, the Nike SB Zoom Stefan Janoski OG Mens Skateboarding Shoe features a low-profile cushioning for a clean, classic look and responsive impact protection. A flexible rubber outsole with herringbone traction offers exceptional grip and boardfeel.',
  tags: ['Shoes', 'Skateboarding'],
  sizes: ['4', '5', '6'],
  inventory: 12
}, function(err) {
  if (err) return handleError(err);
  // saved!
});
*/

//Load view engine
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');

// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Home page route
app.get('/', function(req, res) {

  //Query db for all products
  Products.find({}, function(err, products) {
    if (err) {
      console.log(err);
    } else {
      //Render featured page
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

/*
Products list page
app.get('/shop/:shopName', function(req, res) {
  //Query db for all products
  Products.find({}, function(err, products) {
    if (err) {
      console.log(err);
    } else {

      //Query for shop banner
      Shops.findOne({
        'link': req.params.shopName
      }, function(err, shop) {
        //Render featured page
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
*/

//Product info page
app.get('/shop', function(req, res) {
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
app.post('/shop', function(req, res) {
  var myNum = req.body.number;
  if (myNum.charAt(0) === '0') {
    myNum = myNum.slice(1);
    var number = "+254" + myNum;
    var size = req.body.size;
    var productID = req.body.productID;
    res.send('Done');

    function createOrder() {
      //Generate UNIQUE ID
      var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var token = '';
      for (var i = 16; i > 0; --i) {
        token += chars[Math.round(Math.random() * (chars.length - 1))];
      }
      console.log("ORDER TOKEN: " + token);
      //END UNIQUE ID generation

      Orders.create({
        _id: token,
        productID: productID,
        size: size,
        number: number
      }, function(err) {
        if (err) return handleError(err);
      });

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
          console.log(details);
          var sum = details.price;
          var total = sum.toLocaleString();
          console.log(total);
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
//Size chart
app.get('/size-chart', function(req, res) {
  res.sendFile(__dirname + '/public/size-chart.html')
});

//success page
app.get('/success', function(req, res) {
  res.sendFile(__dirname + '/public/success.html')
});

//upload
app.get('/upload/:id', function(req, res) {
  var query = req.params.id;
  console.log(query);
  // Build the request
  sem3.products.products_field("search", query);

  // Run the request
  sem3.products.get_products(
    function(err, products) {
      if (err) {
        console.log("Couldn't execute request: get_products");
        return;
      }
      // View results of the request
      var one = JSON.parse(products);
      var results = one.results;
      //console.log(results);
      res.render('upload' ,{
        results: results
      })
      var index;
      var a = results;
      for (index = 0; index < a.length; ++index) {
        var images = a[index].images;
        //console.log(images);
        console.log("Name is: " + a[index].name);
      }
    }
  );
});

app.post('/upload/:id', function(req, res) {
  console.log(req.body.name);
  console.log(req.body.price);
  console.log(req.body.imgs);
  console.log(req.body.desc);


  Products.create({
    shopID:'5984d5c5c1533b43ac446109',
    title: req.body.name,
    slideshow: JSON.parse(req.body.imgs),
    price: req.body.price,
    description: req.body.desc,
    //tags: ['Shoes', 'Skateboarding'],
    //sizes: ['4', '5', '6'],
    //inventory: 12
  }, function(err) {
    if (err) return handleError(err);
  });
  res.send('/search');


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
