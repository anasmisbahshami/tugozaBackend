const express = require('express');
const router = express.Router();
const media = require('../controllers/media');

router.get('/getMediaByUserId', media.getMediaByUserId);
router.get('/getAllMedia', media.getAllMedia);
router.post('/createMedia', media.createMedia);
router.put('/updateMedia', media.updateMedia);
router.delete('/deleteMedia', media.deleteMedia);
module.exports = router;
