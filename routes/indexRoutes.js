const express = require('express');
const multer = require('../config/multer');

const router = express.Router();

router.get('/home', (req, res) => {
    res.render('home');
});

router.post('/upload', multer.upload.single('file'), (req, res) => {
    res.send(req.file);
});

module.exports.router = router;