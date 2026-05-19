import express from 'express';
const router = express.Router();

import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking
} from '../controllers/bookingController.js';


router.route('/')
  .get(getBookings)
  .post(createBooking);

router.route('/:id')
  .put(updateBooking)
  .delete(deleteBooking);

export default router;