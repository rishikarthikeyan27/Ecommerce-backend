const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const cartRoute = require('./routes/cart');

dotenv.config();

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('Connection to Mongo DB successful'))
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);

app.get('/', (req, res) => {
  res.json({ response: 'Yo' });
});

app.listen(PORT, () => {
  console.log('Backend server is running');
});
