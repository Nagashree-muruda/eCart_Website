const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { family: 4 });
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("Database connection failed");
    console.log(err);
    process.exit(1);
  }
}

module.exports = connectDB;
