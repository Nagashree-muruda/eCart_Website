require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const productController = require("./controllers/productController");

const app = express();
const PORT = process.env.PORT || 5000;

// connect to database
connectDB().then(function () {
  productController.seedProducts();
});

app.use(cors());
app.use(express.json());

// serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// api routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// open login page on home
app.get("/", function (req, res) {
  res.redirect("/pages/products.html");
});

app.listen(PORT, function () {
  console.log("Server running on port " + PORT);
});
