const express = require('express');
const router = express.Router();
const services = require('../controllers/services');

router.get('/getAllServices', services.getAllServices);
router.get('/getAllServicesById', services.getAllServicesById);
router.post('/createService', services.createService); 
router.put('/updateService', services.updateService);
router.delete('/deleteService', services.deleteService);

module.exports = router;
