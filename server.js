// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//Validate essential environment variables
if (!process.env.MONGO_URI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in .env');
  process.exit(1);
}

//CORS Configuration
//Allow all origins during development
app.use(cors());

//Middleware
app.use(express.json()); // Built-in JSON parser

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

//Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

//Test Route
app.get('/', (req, res) => {
  res.send('CV-P16 API is running...');
});

//Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Internal Error:', err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message || 'Something went wrong!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
