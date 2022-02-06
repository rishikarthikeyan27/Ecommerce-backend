const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');

dotenv.config();

const PASS_SEC = process.env.PASS_SEC;
// REGISTER
router.post('/register', async (req, res) => {
  const userDetails = req.body;
  const newUser = new User({
    username: userDetails.username,
    email: userDetails.email,
    password: CryptoJS.AES.encrypt(userDetails.password, PASS_SEC).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
