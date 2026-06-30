const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
async function register(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // check if username already taken
    var existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // hash the password
    var salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(password, salt);

    // create and save user
    var newUser = new User({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    // generate token
    var token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      message: "Registration successful",
      token: token,
      username: newUser.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

// login
async function login(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // find user in database
    var user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    // check password
    var isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    // generate token
    var token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login successful",
      token: token,
      username: user.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { register, login };
