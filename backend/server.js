require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();

// Connect to MongoDB Database
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Diagnostic Test Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ACTIVE',
    message: 'BROOMLK Customs backend API services are operational.',
    timestamp: new Date().toISOString()
  });
});

// Mounting API Routes
app.use('/api/products', require('./src/routes/productRoutes'));
app.use('/api/projects', require('./src/routes/projectRoutes'));
app.use('/api/bookings', require('./src/routes/bookingRoutes'));

// Configure Port & Listen
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[SERVER] BROOMLK Customs API Server running on port: ${PORT}`);
});
