const express = require('express');
const router = express.Router();
const Tnc = require('../controllers/tnc');

router.get('/getAllTnc', Tnc.getAllTnc);
router.get('/getTncById', Tnc.getTncById);
router.post('/createTnc', Tnc.createTnc);
router.put('/updateTnc', Tnc.updateTnc);
router.delete('/deleteTnc', Tnc.deleteTnc);

module.exports = router;
