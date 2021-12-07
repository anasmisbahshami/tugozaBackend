const express = require('express');
const router = express.Router();
const availability = require('../controllers/availability');

router.get('/getUserUnAvailability', availability.getUserUnAvailability);
router.post('/markUnAvailable', availability.markUnAvailable);
router.delete('/removeUnAvailability', availability.removeUnAvailability);

module.exports = router;
