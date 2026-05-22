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
    enum: ['wheels', 'brakes', 'interior', 'exhaust', 'suspension'], // 1. මෙතන ඔක්කොම lowercase කරන්න
    lowercase: true, // 2. මේක දැම්මම client මොන විදිහට කැපිටල් කරලා එව්වත් auto සිම්පල් වෙනවා
    trim: true
  },
  price: {
    type: String, // Stored as a formatted string (e.g. '$8,400')
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

export default mongoose.model('Product', productSchema);