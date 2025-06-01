const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String
  },
  product: {
    id: Number,
    title: String,
    price: Number,
    imageUrl: String,
    variant: String,
    quantity: Number
  },
  status: String, // approved | declined | error
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
