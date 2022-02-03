const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');

dotenv.config();

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('Connection to Mongo DB successful'))
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());

app.use('/api/user', userRoute);

app.get('/', (req, res) => {
  res.json({ response: 'Yo' });
});

app.listen(PORT, () => {
  console.log('Backend server is running');
});
