const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('Connection to Mongo DB successful'))
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log('Backend server is running');
});
