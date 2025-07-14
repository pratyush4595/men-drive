const express = require('express');
const userModel = require('../models/userModel');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// User register form
router.get('/register', (req, res) => {
    res.render('register');
});

// User login form
router.get('/login', (req, res) => {
    res.render('login');
});

// Register new user
router.post('/register',
    body('username').trim().isLength({ min: 5 }),
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            });
        }

        const { username, email, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username: username,
            email: email,
            password: hashPassword
        });

        res.status(200).send(newUser);
});

// User login
router.post('/login',
    body('username').trim().isLength({ min: 5 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            });
        }

        const { username, password } = req.body;

        const user = await userModel.findOne({
            username: username
        });

        if (!user) {
            return res.status(400).json({
                message: 'Username or Password is incorrect'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Username or Password is incorrect'
            });
        }

        const token = jwt.sign({
            userId: user.id,
            email: user.email,
            password: password
        }, process.env.JWT_SECRET);

        res.cookie('token', token);

        res.status(200).send('Logged in');
    }
);

module.exports.router = router;