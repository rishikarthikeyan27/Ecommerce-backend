const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('Connection to Mongo DB successful'))
  .catch((error) => {
    console.log(error);
  });

app.listen(5000, () => {
  console.log('Backend server is running');
});
