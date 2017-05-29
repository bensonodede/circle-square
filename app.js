var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var firebase = require("firebase");
var $ = require('jquery');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var admin = require("firebase-admin");
app.use(bodyParser.urlencoded({ extended: true }));



//Give access to css and js files
app.use(express.static(__dirname + '/public'));

//Express routing
app.get('/shop', function(req, res){
  res.sendFile(__dirname + '/public/shop.html');
});

app.get('/products', function(req, res){
  res.sendFile(__dirname + '/public/products.html');
});

app.get('/index0', function(req, res){
  res.sendFile(__dirname + '/public/index0.html');
});

















//Launch Server
http.listen(process.env.PORT || 5000);
console.log("*****App running on port 5000*****");
