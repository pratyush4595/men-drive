const mongoose = require('mongoose');

// Create user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [5, 'Username must be atleast 5 characters long']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [13, 'Email must be atleast 10 characters long']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, "Password must be atleast 5 characters long"]
    }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;