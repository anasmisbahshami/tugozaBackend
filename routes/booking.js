const express = require('express');
const router = express.Router();
const booking = require('../controllers/booking');

router.get('/getAllBookingsByUser', booking.getAllBookingsByUser);
router.get('/getAllBookingsByStatus', booking.getAllBookingsByStatus);
router.post('/createUserBooking', booking.createUserBooking);
router.delete('/deleteBooking', booking.deleteBooking);
router.post('/changeBookingStatusForUser', booking.changeBookingStatusForUser);
router.get('/getAllBookingsByClient', booking.getAllBookingsByClient);
module.exports = router;
