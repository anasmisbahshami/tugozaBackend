const express = require('express');
const router = express.Router();
const media = require('../controllers/media');
const upload = require('../config/uploadConfig');

router.get('/getMediaByUserId', media.getMediaByUserId);
router.get('/getAllMedia', media.getAllMedia);
router.post('/createMedia',upload.single('url'),media.createMedia);
router.put('/updateMedia',upload.single('url'), media.updateMedia);
router.delete('/deleteMedia', media.deleteMedia);
router.post('/changeMediaStatus', media.changeMediaStatus);
router.post('/getPendingMedia', media.getPendingMedia);
router.post('/getRejectedMedia', media.getRejectedMedia);
module.exports = router;
