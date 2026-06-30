const Order = require("../models/Order");

async function placeOrder(req, res) {
  var items = req.body.items;
  var totalItems = req.body.totalItems;
  var totalPrice = req.body.totalPrice;
  var username = req.body.username || "guest";

  if (!items || items.length == 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  try {
    var newOrder = new Order({
      username: username,
      items: items,
      totalItems: totalItems,
      totalPrice: totalPrice,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getMyOrders(req, res) {
  try {
    var orders = await Order.find({ username: req.user.username });
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { placeOrder, getMyOrders };
