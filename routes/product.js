const router = require('express').Router();
const Product = require('../models/Product');
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');

// Create product
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update product
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete product
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted');
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all products
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const sortQuery = req.query.sort;

    const products = sortQuery
      ? await Product.find().sort({ _id: -1 }).limit(1)
      : await Product.find();

    res.status(200).json(Product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get user by ID
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    const { password, ...others } = product._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
