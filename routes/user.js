const router = require('express').Router();
const User = require('../models/User');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');

// Get all users
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const sortQuery = req.query.sort;

    const users = sortQuery
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();

    console.log('Users: ', users);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a user
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update user
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      registerDetails.password,
      PASS_SEC
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete user
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
