const mongoose = require('mongoose');

const filesSchema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, 'Path is required']
    },
    originalname: {
        type: String,
        requied: [true, 'Originalname is required']
    },
    user: {
        type: mongoose.Schema.type.ObjectId,
        required: [true, 'User is required']
    }
});

const filesModel = mongoose.model('files', filesSchema);

module.exports = filesModel;