const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function signup(req, res) {
  const { email, password } = req.body;
  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "Signup failed",
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: "Login failed" });
  }
}

module.exports = { signup, login };
