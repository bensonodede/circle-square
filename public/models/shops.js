var mongoose = require('mongoose');

//Shops Schema
var shopSchema = mongoose.Schema({
  name: String,
  link: String,
  number: String,
  banner: String
});

var shops = module.exports = mongoose.model('Shop', shopSchema);
