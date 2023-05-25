const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
import dotenv from 'dotenv'

require('dotenv').config();

const app = express();
const PORT = 4000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});