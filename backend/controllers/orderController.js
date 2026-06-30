const Order = require("../models/Order");

// place order
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

    // if user is logged in save their id too
    if (req.user) {
      newOrder.userId = req.user.id;
      newOrder.username = req.user.username;
    }

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

// get orders of logged in user
async function getMyOrders(req, res) {
  try {
    var orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { placeOrder, getMyOrders };
