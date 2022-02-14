const express = require('express');
const router = express.Router();
const media = require('../controllers/media');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Config = require('../config/aws');
const multerS3Config = multerS3({
    s3: s3Config,
    bucket: process.env.BUCKET_NAME,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        //console.log(file)
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: multerS3Config,
    // fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    }
});

router.get('/getMediaByUserId', media.getMediaByUserId);
router.get('/getAllMedia', media.getAllMedia);
router.post('/createMedia',upload.single('url'),media.createMedia);
router.put('/updateMedia',upload.single('url'), media.updateMedia);
router.delete('/deleteMedia', media.deleteMedia);
router.post('/changeMediaStatus', media.changeMediaStatus);
router.post('/getPendingMedia', media.getPendingMedia);
router.post('/getRejectedMedia', media.getRejectedMedia);
module.exports = router;
