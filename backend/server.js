import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import process from 'node:process';

// Import Routes
import productRoutes from './src/routes/productRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB Database (Smart Local Engine Selection)
const connectDB = async () => {
  try {
    let dbUrl = process.env.MONGO_URI;

    if (dbUrl && (dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1'))) {
      console.log('[DATABASE] Windows MongoDB Service not found. Starting In-Memory DB Engine...');
      const mongoServer = await MongoMemoryServer.create();
      dbUrl = mongoServer.getUri();
    }

    await mongoose.connect(dbUrl);
    console.log('[DATABASE] MongoDB Connection Established Successfully');
  } catch (error) {
    console.error(`[DATABASE] Connection Failure Error: ${error.message}`);
    process.exit(1);
  }
};

// start Database 
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