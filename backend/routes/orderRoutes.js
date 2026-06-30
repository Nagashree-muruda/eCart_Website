const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

router.post("/place", orderController.placeOrder);
router.get("/my", protect, orderController.getMyOrders);

module.exports = router;
