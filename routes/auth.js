const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');

dotenv.config();

const PASS_SEC = process.env.PASS_SEC;

// REGISTER
router.post('/register', async (req, res) => {
  const registerDetails = req.body;
  const newUser = new User({
    username: registerDetails.username,
    email: registerDetails.email,
    password: CryptoJS.AES.encrypt(
      registerDetails.password,
      PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json('Wrong credentials!');
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const { password, ...others } = user;
    req.body.password == hashedPassword.toString(CryptoJS.enc.Utf8)
      ? res.status(200).json(others._doc)
      : res.status(401).json('Wrong credentials!');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
