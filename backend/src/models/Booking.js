const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  client: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  car: {
    type: String,
    required: [true, 'Car model details are required'],
    trim: true
  },
  date: {
    type: String, // Stored as a date string (e.g. '2026-05-24')
    required: [true, 'Appointment date is required'],
    trim: true
  },
  time: {
    type: String, // Stored as a time string (e.g. '10:00 AM')
    required: [true, 'Appointment time slot is required'],
    trim: true
  },
  status: {
    type: String,
    required: [true, 'Booking status is required'],
    enum: ['PENDING', 'APPROVED', 'COMPLETED'],
    default: 'PENDING'
  },
  phone: {
    type: String,
    required: [true, 'Client contact phone number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Client email address is required'],
    trim: true
  },
  services: {
    type: [String],
    default: []
  },
  specs: {
    hpGain: {
      type: String,
      default: 'N/A'
    },
    fuelSystem: {
      type: String,
      default: '95 Octane'
    },
    assignedTech: {
      type: String,
      default: 'Unassigned'
    },
    notes: {
      type: String,
      default: ''
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
