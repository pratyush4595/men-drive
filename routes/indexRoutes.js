const express = require('express');
const multer = require('../config/multer');
const authMiddleware = require('../middlewares/auth');
const filesModel = require('../models/filesModel');
const firebase = require('../config/firebase');

const router = express.Router();

router.get('/home', authMiddleware, async (req, res) => {

    const userFiles = await filesModel.find({
        user: req.user.userId
    });

    console.log(userFiles);

    res.render('home', {
        files: userFiles
    });
});

router.post('/upload', authMiddleware, multer.upload.single('file'), async (req, res) => {
    const newFile = await filesModel.create({
        path: req.file.path,
        originalname: req.file.originalname,
        user: req.user.userId
    });

    res.status(200).json(newFile);
});

router.get('/download/:path', authMiddleware, async (req, res) => {

    try {
        const loggedInUserId = req.user.userId;
        const path = req.params.path;

        const file = filesModel.findOne({
            user: loggedInUserId,
            path: path
        });

        if (!file) {
            res.status(401).json({
                message: 'Unauthorised'
            });
        }

        const signedUrl = await firebase.storage().bucket().file(path).getSignedUrl({
            action: 'read',
            expires: Date.now() + 60 * 1000
        })

        res.redirect(signedUrl[0]);
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: 'Server Error'
        });
    }
});

module.exports.router = router;