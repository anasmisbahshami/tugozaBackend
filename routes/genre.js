const express = require('express');
const router = express.Router();
const genre = require('../controllers/genre');

router.get('/getAllGenres', genre.getAllGenres);
router.get('/getGenreById', genre.getGenreById);
router.post('/createGenre', genre.createGenre);
router.post('/updateGenre', genre.updateGenre);
router.delete('/deleteGenre', genre.deleteGenre);

module.exports = router;
