var mongoose = require('mongoose');

//Orders Schema
var orderSchema = mongoose.Schema({
  _id: String,
  productID: String,
  size: String,
  number: String
});

var orders = module.exports = mongoose.model('Order', orderSchema);
