import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import process from 'node:process';
import path from 'path';
import fs from 'fs';

// Import Routes
import productRoutes from './src/routes/productRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists on server bootstrap
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Static Assets Route Middleware for Uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Global Middleware for Case-Sensitivity (POST/PUT body and GET query params)
app.use((req, res, next) => {
  // Fixes Category in Request Body (POST/PUT)
  if (req.body && req.body.category) {
    req.body.category = req.body.category.toLowerCase();
  }
  // Fixes Category in Query Parameters (GET)
  if (req.query && req.query.category) {
    req.query.category = req.query.category.toLowerCase();
  }
  next();
});

// Connect to MongoDB Database
const connectDB = async () => {
  try {
    let dbUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/broomlk';

    if (process.env.USE_MEMORY_DB === 'true') {
      console.log('[DATABASE] Force Starting In-Memory DB Engine...');
      const mongoServer = await MongoMemoryServer.create();
      dbUrl = mongoServer.getUri();
    } else {
      console.log(`[DATABASE] Connecting to Local/Cloud Instance: ${dbUrl}`);
    }

    await mongoose.connect(dbUrl);
    console.log('[DATABASE] MongoDB Connection Established Successfully');
  } catch (error) {
    console.error(`[DATABASE] Connection Failure Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Diagnostic Test Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ACTIVE',
    message: 'BROOMLK Customs backend API services are operational.',
    timestamp: new Date().toISOString()
  });
});

// Mounting API Routes
app.use('/api/products', productRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/bookings', bookingRoutes);

// Configure Port & Listen
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[SERVER] BROOMLK Customs API Server running on port: ${PORT}`);
});