const Booking = require('../models/Booking');

/**
 * @desc    Get all bookings (with optional status filter)
 * @route   GET /api/bookings
 * @access  Private/Admin
 */
const getBookings = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== 'All') {
      filter.status = status;
    }
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error retrieving bookings queue' });
  }
};

/**
 * @desc    Create a VIP booking
 * @route   POST /api/bookings
 * @access  Public
 */
const createBooking = async (req, res) => {
  try {
    const { client, car, date, time, phone, email, services, specs } = req.body;
    if (!client || !car || !date || !time || !phone || !email) {
      return res.status(400).json({ error: 'Please provide all required fields (client, car, date, time, phone, email)' });
    }

    const newBooking = await Booking.create({
      client,
      car,
      date,
      time,
      phone,
      email,
      services: services || [],
      specs: specs || {
        hpGain: 'N/A',
        fuelSystem: '95 Octane',
        assignedTech: 'Unassigned',
        notes: ''
      }
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @desc    Update consultation details / status / specs
 * @route   PUT /api/bookings/:id
 * @access  Private/Admin
 */
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    let booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking = await Booking.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @desc    Delete booking records
 * @route   DELETE /api/bookings/:id
 * @access  Private/Admin
 */
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking record not found' });
    }
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: 'Booking record successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting booking record' });
  }
};

module.exports = {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking
};
