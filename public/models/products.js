var mongoose = require('mongoose');

//Products Schema
var productSchema = mongoose.Schema({
  shopID: {
    type: String,
    required: true
  },
  slideshow:{
    type: Array,
    required: true
  },
  title: {
    type:String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  tags: Array,
  sizes: Array,
  inventory: Number
});

var products = module.exports = mongoose.model('Product', productSchema);
