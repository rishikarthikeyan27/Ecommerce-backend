const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, unique: true },
    desc: { type: String, require: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
