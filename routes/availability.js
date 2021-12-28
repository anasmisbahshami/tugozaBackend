const express = require('express');
const router = express.Router();
const availability = require('../controllers/availability');

router.get('/getUserUnAvailability', availability.getUserUnAvailability);
router.post('/markUnAvailable', availability.markUnAvailable);
router.post('/markDayUnAvailable', availability.markDayUnAvailable);
router.delete('/removeUnAvailability', availability.removeUnAvailability);

module.exports = router;
