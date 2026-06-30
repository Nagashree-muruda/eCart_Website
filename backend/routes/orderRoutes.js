const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

router.post(
  "/place",
  function (req, res, next) {
    // if user sent a token then verify it, otherwise continue as guest
    var authHeader = req.headers.authorization;
    if (authHeader) {
      protect(req, res, next);
    } else {
      next();
    }
  },
  orderController.placeOrder,
);

router.get("/my", protect, orderController.getMyOrders);

module.exports = router;
