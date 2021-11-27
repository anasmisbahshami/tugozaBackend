const express = require('express');
const router = express.Router();
const media = require('../controllers/media');

router.get('/getMediaByUserId', media.getMediaByUserId);
router.get('/getAllMedia', media.getAllMedia);
router.post('/createMedia', media.createMedia);
router.put('/updateMedia', media.updateMedia);
router.delete('/deleteMedia', media.deleteMedia);
router.post('/changeMediaStatus', media.changeMediaStatus);
router.post('/getPendingMedia', media.getPendingMedia);
router.post('/getRejectedMedia', media.getRejectedMedia);
module.exports = router;
