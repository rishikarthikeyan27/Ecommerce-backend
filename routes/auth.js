const router = require('express').Router();
const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
  const userDetails = req.body;
  const newUser = new User({
    username: userDetails.username,
    email: userDetails.email,
    password: userDetails.password,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
