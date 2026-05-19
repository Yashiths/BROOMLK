const mongoose = require('mongoose');

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
    enum: ['Wheels', 'Brakes', 'Interior', 'Exhaust', 'Suspension']
  },
  price: {
    type: String, // Stored as a formatted string (e.g. '$8,400') to match frontend telemetry
    required: [true, 'Price is required'],
    trim: true
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
