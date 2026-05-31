import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['wheels', 'brakes', 'interior', 'exhaust', 'suspension'],
    lowercase: true,
    trim: true
  },
  price: {
    type: Number, // 👈 Stored as a Number to align with frontend parsing and valuation logic
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  stock: {
    type: Number,
    required: [true, 'Stock level is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: '' // 👈 Dynamic asset file destination route path mapping pointer
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);