const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project showcase name is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand/Manufacturer is required'],
    trim: true
  },
  theme: {
    type: String,
    required: [true, 'Visual theme is required'],
    enum: ['CYAN', 'GREEN', 'GOLD', 'RED'],
    default: 'CYAN'
  },
  specs: {
    hp: {
      type: String,
      required: [true, 'Horsepower specification is required'],
      trim: true
    },
    launch: {
      type: String,
      required: [true, '0-100 acceleration spec is required'],
      trim: true
    },
    sound: {
      type: String,
      required: [true, 'Exhaust decibel level spec is required'],
      trim: true
    }
  },
  description: {
    type: String,
    required: [true, 'Build overview description is required'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
