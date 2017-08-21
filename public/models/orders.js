var mongoose = require('mongoose');

//Orders Schema
var orderSchema = mongoose.Schema({
  orderID: String,
  productID: String,
  size: String,
  number: String
});

var orders = module.exports = mongoose.model('Order', orderSchema);
