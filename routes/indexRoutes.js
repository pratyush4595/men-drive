const express = require('express');
const multer = require('../config/multer');
const authMiddleware = require('../middlewares/auth');
const filesModel = require('../models/filesModel');

const router = express.Router();

router.get('/home', authMiddleware, (req, res) => {
    res.render('home');
});

router.post('/upload', authMiddleware, multer.upload.single('file'), async (req, res) => {
    const newFile = await filesModel.create({
        path: req.file.path,
        originalname: req.file.originalname,
        user: req.user.userId
    });

    res.status(200).json(newFile);
});

module.exports.router = router;