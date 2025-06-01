const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  variants: [String],
  stock: Number
});

module.exports = mongoose.model('Product', productSchema);
