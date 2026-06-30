const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  username: String,
  userId: String,
  items: Array,
  totalItems: Number,
  totalPrice: Number,
  status: {
    type: String,
    default: "Placed",
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
